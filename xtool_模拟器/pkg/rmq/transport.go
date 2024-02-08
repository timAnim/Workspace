package rmq

import (
	"context"
	"github.com/jolestar/go-commons-pool"
	"github.com/streadway/amqp"
	"xtool/pkg/net/netutil"
	"io"
	"net"
	"sync"
	"sync/atomic"
	"time"
)

const (
	MaxConnection = 200
	MaxChannel    = 2048
)

type transport struct {
	url    string
	config amqp.Config

	*pool.ObjectPool
	errChs map[*pool.PooledObject]chan *amqp.Error
	mu     *sync.RWMutex
}

func dialTransport(url string, config amqp.Config) (*transport, error) {
	backoff := &transport{
		url:    url,
		config: config,
		errChs: make(map[*pool.PooledObject]chan *amqp.Error),
		mu:     new(sync.RWMutex),
	}

	pCfg := pool.NewDefaultPoolConfig()
	pCfg.TestOnBorrow = true
	pCfg.MaxTotal = MaxConnection
	pCfg.MaxIdle = pCfg.MaxTotal
	backoff.ObjectPool = pool.NewObjectPool(context.Background(), backoff, pCfg)

	return backoff, nil
}

func (tp *transport) MakeObject(ctx context.Context) (*pool.PooledObject, error) {
	f, err := dial(tp.url, tp.config)
	if err != nil {
		return nil, err
	}
	obj := pool.NewPooledObject(f)

	tp.mu.Lock()
	tp.errChs[obj] = f.NotifyClose(make(chan *amqp.Error, 1))
	tp.mu.Unlock()

	return obj, nil
}

func (tp *transport) DestroyObject(ctx context.Context, obj *pool.PooledObject) error {
	f, ok := obj.Object.(*chFactory)
	if !ok {
		return ErrTypeAssert
	}

	tp.mu.Lock()
	delete(tp.errChs, obj)
	tp.mu.Unlock()

	return f.Close(ctx)
}

func (tp *transport) ValidateObject(ctx context.Context, obj *pool.PooledObject) bool {
	f, ok := obj.Object.(*chFactory)
	if !ok {
		return false
	}
	if f.isBroken() {
		return false
	}

	tp.mu.RLock()
	ch, ok := tp.errChs[obj]
	tp.mu.RUnlock()
	if !ok {
		return false
	}
	select {
	case <-ch:
		return false
	default:
	}
	return true
}

func (tp *transport) ActivateObject(ctx context.Context, obj *pool.PooledObject) error  { return nil }
func (tp *transport) PassivateObject(ctx context.Context, obj *pool.PooledObject) error { return nil }

// LeakBecauseOfBlock for recording leak in call stack
func LeakBecauseOfBlock(fn func()) {
	fn()
}

func doContext(ctx context.Context, fn func()) (timeout bool) {
	done := make(chan struct{})
	go LeakBecauseOfBlock(func() {
		defer close(done)
		fn()
	})

	select {
	case <-done:
		return false
	case <-ctx.Done():
		return true
	}
}

type chFactory struct {
	*amqp.Connection
	*pool.ObjectPool
	dialer io.Closer
	errChs map[*pool.PooledObject]chan *amqp.Error
	mu     *sync.RWMutex
	broken uint32
}

func dial(url string, config amqp.Config) (f *chFactory, err error) {
	f = &chFactory{
		errChs: make(map[*pool.PooledObject]chan *amqp.Error),
		mu:     new(sync.RWMutex),
	}

	if config.Dial == nil {
		config.Dial = (&net.Dialer{Timeout: 10 * time.Second}).Dial
	}
	dialer := netutil.ClosableDialer(netutil.DialFunc(config.Dial))
	config.Dial = dialer.Dial
	f.dialer = dialer

	if f.Connection, err = amqp.DialConfig(url, config); err != nil {
		return nil, err
	}

	pCfg := pool.NewDefaultPoolConfig()
	pCfg.TestOnBorrow = true
	pCfg.MaxTotal = config.ChannelMax
	if pCfg.MaxTotal < 1 || pCfg.MaxTotal > MaxChannel {
		pCfg.MaxTotal = MaxChannel
	}
	pCfg.MaxIdle = pCfg.MaxTotal
	f.ObjectPool = pool.NewObjectPool(context.Background(), f, pCfg)

	return f, nil
}

func (f *chFactory) isBroken() bool {
	if broken := atomic.LoadUint32(&f.broken); broken > 0 {
		return true
	}
	return false
}

func (f *chFactory) MakeObject(ctx context.Context) (*pool.PooledObject, error) {
	ch, err := f.Channel()
	if err != nil {
		if err == amqp.ErrChannelMax {
			// force close all
			atomic.StoreUint32(&f.broken, 1)
		}
		return nil, err
	}
	obj := pool.NewPooledObject(ch)

	f.mu.Lock()
	f.errChs[obj] = ch.NotifyClose(make(chan *amqp.Error, 1))
	f.mu.Unlock()

	return obj, nil
}

// DestroyObject is nonBlock
func (f *chFactory) DestroyObject(ctx context.Context, obj *pool.PooledObject) (err error) {
	ch, ok := obj.Object.(*amqp.Channel)
	if !ok {
		return ErrTypeAssert
	}

	f.mu.Lock()
	delete(f.errChs, obj)
	f.mu.Unlock()

	if _, ok := ctx.Deadline(); !ok {
		ctx, _ = context.WithTimeout(ctx, time.Second)
	}
	if ok := doContext(ctx, func() {
		err = ch.Close()
	}); ok {
		// force close all
		atomic.StoreUint32(&f.broken, 1)
	}
	return
}

func (f *chFactory) ValidateObject(ctx context.Context, obj *pool.PooledObject) bool {
	f.mu.RLock()
	ch, ok := f.errChs[obj]
	f.mu.RUnlock()
	if !ok {
		return false
	}
	select {
	case <-ch:
		return false
	default:
	}
	return true
}

func (f *chFactory) ActivateObject(ctx context.Context, obj *pool.PooledObject) error  { return nil }
func (f *chFactory) PassivateObject(ctx context.Context, obj *pool.PooledObject) error { return nil }

func (f *chFactory) Close(ctx context.Context) (err error) {
	atomic.StoreUint32(&f.broken, 1)
	f.ObjectPool.Close(ctx)

	if _, ok := ctx.Deadline(); !ok {
		ctx, _ = context.WithTimeout(ctx, time.Second)
	}
	if ok := doContext(ctx, func() {
		f.Connection.Close()
	}); ok {
		err = f.dialer.Close()
	}
	return
}
