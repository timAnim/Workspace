package rmq

import (
	"context"
	"io"
	"sync"
	"time"

	pool "github.com/jolestar/go-commons-pool"
	"github.com/pkg/errors"
	"github.com/streadway/amqp"
)

type Logger interface {
	Debug(args ...interface{})
	Warn(args ...interface{})
}

type DialOption func(*Client)

func WithLogger(logger Logger) DialOption {
	return func(clt *Client) {
		clt.logger = logger
	}
}

type Client struct {
	config amqp.Config
	logger Logger

	tp *transport
}

func Dial(url string, opts ...DialOption) (clt *Client, err error) {
	clt = &Client{
		config: amqp.Config{Heartbeat: 10 * time.Second, Locale: "en_US"},
		logger: &logger{},
	}
	for _, opt := range opts {
		opt(clt)
	}

	if clt.tp, err = dialTransport(url, clt.config); err != nil {
		return nil, err
	}

	// ping
	ch, err := clt.Channel()
	if err != nil {
		return nil, err
	}
	defer ch.Close()

	return clt, nil
}

func (clt *Client) Close() error {
	clt.tp.Close(context.Background())
	return nil
}

func (clt *Client) Channel(ctx ...context.Context) (*Channel, error) {
	if len(ctx) == 0 {
		ctx3, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer cancel()
		ctx = append(ctx, ctx3)
	}

	obj, err := clt.tp.BorrowObject(ctx[0])
	if err != nil {
		return nil, errors.WithMessage(err, "clt.tp.BorrowObject")
	}
	// return as faster
	ch := &Channel{p: obj.(*chFactory)}
	clt.tp.ReturnObject(ctx[0], ch.p)

	obj, err = ch.p.BorrowObject(ctx[0])
	if err != nil {
		return nil, errors.WithMessage(err, "ch.p.BorrowObject")
	}
	ch.Channel = obj.(*amqp.Channel)

	return ch, nil
}

func (clt *Client) DeclareExchange(exchange *Exchange) error {
	ch, err := clt.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	return ch.ExchangeDeclare(exchange.Name, exchange.Type, exchange.Durable, exchange.AutoDel, false, false, nil)
}

func (clt *Client) DeclareQueue(queue *Queue) (amqp.Queue, error) {
	ch, err := clt.Channel()
	if err != nil {
		return amqp.Queue{}, err
	}
	defer ch.Close()

	args := make(amqp.Table)
	if queue.TTL > 0 {
		args["x-message-ttl"] = queue.TTL * 1000
	}
	return ch.QueueDeclare(queue.Name, queue.Durable, queue.AutoDel, false, false, args)
}

func (clt *Client) DeclareBinding(name, key, exchange string) error {
	ch, err := clt.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	return ch.QueueBind(name, key, exchange, false, nil)
}

func (clt *Client) Declare(queue *Queue, key string, exchange *Exchange) error {
	if err := clt.DeclareExchange(exchange); err != nil {
		return err
	}
	if _, err := clt.DeclareQueue(queue); err != nil {
		return err
	}
	return clt.DeclareBinding(queue.Name, key, exchange.Name)
}

func (clt *Client) Publish(exchange, key string, msg amqp.Publishing) error {
	ch, err := clt.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	return ch.Publish(exchange, key, false, false, msg)
}

func (clt *Client) Get(queue string) (*amqp.Delivery, error) {
	ch, err := clt.Channel()
	if err != nil {
		return nil, err
	}
	defer ch.Close()

	dlv, ok, err := ch.Get(queue, true)
	if err != nil {
		return nil, err
	} else if !ok {
		return nil, ErrEmpty
	}
	return &dlv, nil
}

type Publisher interface {
	Publish([]byte) error
	PublishContext(ctx context.Context, payload []byte) (err error)
	io.Closer
}

type PublisherOpt func(*publisher)

// Ack means NOT auto ack and waiting for manual ack
func Ack(ok bool) PublisherOpt {
	return func(p *publisher) {
		p.Ack = ok
	}
}

func ContentType(arg MIME) PublisherOpt {
	return func(p *publisher) {
		p.ContentType = arg
	}
}

func AppId(arg string) PublisherOpt {
	return func(p *publisher) {
		p.AppId = arg
	}
}

func DeliveryMode(arg uint8) PublisherOpt {
	return func(p *publisher) {
		p.DeliveryMode = arg
	}
}

func ContentEncoding(arg string) PublisherOpt {
	return func(p *publisher) {
		p.ContentEncoding = arg
	}
}

type PublishingInterceptorFunc func(publishing amqp.Publishing) amqp.Publishing

func PublishingInterceptor(i PublishingInterceptorFunc) PublisherOpt {
	return func(p *publisher) {
		p.interceptor = i
	}
}

/*

| MaxTotal | PublishRate |
| 1 | 200 |
| 20 | 1400 |
| 50 | 2100 |
| 100 | 2900 |
| 200 | 3000 |
| 500 | 3800 |

*/
func PoolSize(count int) PublisherOpt {
	return func(p *publisher) {
		p.PoolSize = count
	}
}

type publisher struct {
	Exchange, Key string
	Ack           bool
	ContentType   MIME
	AppId         string
	DeliveryMode  uint8
	PoolSize      int

	interceptor PublishingInterceptorFunc

	ContentEncoding string
	enc             *sync.Pool //ContentEncoder
	encErr          error

	clt *Client
	ch  *pool.ObjectPool
}

type roundTrip struct {
	ch  *Channel
	ack chan amqp.Confirmation
}

func (clt *Client) NewPublisher(exchange, key string, opts ...PublisherOpt) Publisher {
	p := &publisher{
		Exchange:     exchange,
		Key:          key,
		Ack:          false,
		ContentType:  MIMEPlain,
		DeliveryMode: 2,
		AppId:        appTag(),
		PoolSize:     128,
		clt:          clt,
	}
	for _, opt := range opts {
		opt(p)
	}

	if p.ContentEncoding != "" {
		_, p.encErr = NewContentEncoder(p.ContentEncoding) // pre check
		p.enc = &sync.Pool{New: func() interface{} {
			enc, _ := NewContentEncoder(p.ContentEncoding)
			return enc
		}}
	}

	if p.Ack {
		cfg := pool.NewDefaultPoolConfig()
		cfg.MaxTotal = p.PoolSize
		cfg.MaxIdle = cfg.MaxTotal
		p.ch = pool.NewObjectPool(context.Background(), p, cfg)
	}
	return p
}

func (p *publisher) Close() error {
	p.ch.Close(context.Background())
	return nil
}

func (p *publisher) nackPublish(msg amqp.Publishing) error {
	return p.clt.Publish(p.Exchange, p.Key, msg)
}

func (p *publisher) Publish(payload []byte) error {
	return p.PublishContext(context.Background(), payload)
}

func (p *publisher) PublishContext(ctx context.Context, payload []byte) (err error) {
	if p.encErr != nil {
		return p.encErr
	}
	if p.enc != nil {
		enc := p.enc.Get()
		defer p.enc.Put(enc) // enc is shared, MUST reserve defer
		payload, err = enc.(ContentEncoder).Encode(payload)
		if err != nil {
			return
		}
	}

	msg := amqp.Publishing{
		ContentType:     string(p.ContentType),
		DeliveryMode:    p.DeliveryMode,
		AppId:           p.AppId,
		ContentEncoding: p.ContentEncoding,
		Body:            payload,
	}
	if p.interceptor != nil {
		msg = p.interceptor(msg)
	}

	startTime := time.Now()
	deadline, ok := ctx.Deadline()
	for i := 0; i < 3; i++ {
		if ok && deadline.Sub(startTime) > 0 {
			newCtx, cancel := context.WithTimeout(ctx, deadline.Sub(startTime)/3)
			if err = p.publishContext(newCtx, msg); err == nil {
				cancel()
				return
			}
			cancel()
		}
		if err = p.publishContext(ctx, msg); err == nil {
			return
		}
	}
	return
}

func (p *publisher) publishContext(ctx context.Context, msg amqp.Publishing) (err error) {
	if !p.Ack {
		return p.nackPublish(msg)
	}

	// AckPublish

	obj, err := p.ch.BorrowObject(ctx)
	if err != nil {
		return err
	}
	rt := obj.(*roundTrip)

	defer func() {
		if err == nil /*|| err == ErrRejected || err == ErrCanceled*/ {
			p.ch.ReturnObject(ctx, rt)
		} else {
			p.ch.InvalidateObject(ctx, rt)
		}
	}()

	if err = rt.ch.Publish(p.Exchange, p.Key, false, false, msg); err != nil {
		return
	}

	select {
	case <-ctx.Done():
		err = ctx.Err()
	case cfm, ok := <-rt.ack:
		if !ok {
			err = ErrClosed
		} else if !cfm.Ack {
			err = ErrRejected
		}
	}
	return
}

func (p *publisher) MakeObject(ctx context.Context) (*pool.PooledObject, error) {
	ch, err := p.clt.Channel(ctx)
	if err != nil {
		return nil, err
	}
	if err = ch.Confirm(false); err != nil {
		return nil, err
	}
	caller := &roundTrip{ch: ch}
	caller.ack = ch.NotifyPublish(make(chan amqp.Confirmation, 1))

	return pool.NewPooledObject(caller), nil
}

func (p *publisher) DestroyObject(ctx context.Context, obj *pool.PooledObject) error {
	return obj.Object.(*roundTrip).ch.Close()
}

func (p *publisher) ValidateObject(ctx context.Context, obj *pool.PooledObject) bool   { return true }
func (p *publisher) ActivateObject(ctx context.Context, obj *pool.PooledObject) error  { return nil }
func (p *publisher) PassivateObject(ctx context.Context, obj *pool.PooledObject) error { return nil }

type HandlerFunc func(Delivery) error

type Consumer interface {
	AddHandler(HandlerFunc) context.CancelFunc
	io.Closer
}

type ConsumerOpt func(p *consumer)

// Nack means auto ack and NOT waiting for manual ack
func Nack(ok bool) ConsumerOpt {
	return func(p *consumer) {
		p.nack = ok
	}
}

func Qos(count int) ConsumerOpt {
	return func(p *consumer) {
		p.qos = count
	}
}

// ContentDecoding specifies content decoder type,
// otherwise use Delivery.ContentEncoding
//func ContentDecoding(arg string) ConsumerOpt {
//	return func(p *consumer) {
//		p.ContentDecoding = arg
//	}
//}

type consumer struct {
	queue string
	nack  bool
	qos   int

	//ContentDecoding string
	//dec ContentDecoder

	done map[string]context.CancelFunc
	mu   *sync.RWMutex
	clt  *Client
}

func (clt *Client) NewConsumer(queue string, opts ...ConsumerOpt) Consumer {
	c := &consumer{
		queue: queue,
		nack:  false,
		qos:   3,
		done:  make(map[string]context.CancelFunc),
		mu:    new(sync.RWMutex),
		clt:   clt,
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func (c *consumer) Close() error {
	c.mu.Lock()
	defer c.mu.Unlock()

	for _, cancel := range c.done {
		cancel()
	}

	return nil
}

func (c *consumer) AddHandler(fn HandlerFunc) context.CancelFunc {
	ctx, cancel := context.WithCancel(context.Background())
	tag := uniqueConsumerTag()

	c.mu.Lock()
	c.done[tag] = cancel
	c.mu.Unlock()

	go func() {
		for {
			c.handle(ctx, tag, fn)

			select {
			case <-ctx.Done():
				c.clt.logger.Debug("handle loop", tag, "exited")
				return
			case <-time.After(time.Second):
			}
		}
	}()

	return cancel
}

func (c *consumer) handle(ctx context.Context, tag string, fn HandlerFunc) {
	ch, err := c.clt.Channel(ctx)
	if err != nil {
		c.clt.logger.Warn("clt.Channel", err)
		return
	}
	defer ch.Close()

	if err = ch.Qos(c.qos, 0, false); err != nil {
		c.clt.logger.Warn("ch.Qos", err)
		return
	}

	recv, err := ch.Consume(c.queue, tag, c.nack, false, false, false, nil)
	if err != nil {
		c.clt.logger.Warn("ch.Consume", err)
		return
	}

	for {
		select {
		case <-ctx.Done():
			ch.Cancel(tag, false)
			return
		case dlv, ok := <-recv:
			if !ok {
				return
			}

			err := fn(cutDelivery(&dlv))
			if c.nack {
				continue
			}
			if err != nil {
				dlv.Nack(false, true)
			} else {
				dlv.Ack(false)
			}
		}
	}
}
