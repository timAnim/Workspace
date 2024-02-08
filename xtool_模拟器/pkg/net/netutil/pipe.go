package netutil

import (
	"github.com/xtaci/smux"
	"xtool/pkg/net/internal"
	"xtool/pkg/net/proxy"
	"io"
	"net"
	"os"
	"strconv"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

type pipeType = string

const (
	PipeTypeEnv string   = "XNET_PIPE_TYPE" // TODO: types.Env
	Buffered    pipeType = "buf"
	Chan        pipeType = "ch"
	Mux         pipeType = "mu"
)

// DefaultPipes default to use BufferedPipes
func DefaultPipes(addr net.Addr) (proxy.ContextDialer, net.Listener) {
	return Pipes(os.Getenv(PipeTypeEnv), addr)
}

// Pipes default to use BufferedPipes
func Pipes(network pipeType, addr net.Addr) (proxy.ContextDialer, net.Listener) {
	switch network {
	case Chan:
		return ChanPipes(addr)
	case Mux:
		return MuxPipes(addr)
	default:
		return BufferedPipes(-1, addr)
	}
}

func ChanPipes(addr net.Addr) (proxy.ContextDialer, net.Listener) {
	var (
		fl  = FunnelListener(NilListener(addr))
		cid uint64
	)

	return DialFunc(func(_, _ string) (net.Conn, error) {
		c1, c2 := net.Pipe()
		addr2 := MemoryAddr(strconv.FormatUint(atomic.AddUint64(&cid, 1), 10))

		if err := fl.Push(WrapAddr(c1, addr, addr2)); err != nil {
			return nil, err
		}
		return WrapAddr(c2, addr2, addr), nil
	}), fl
}

func MuxPipes(addr net.Addr) (proxy.ContextDialer, net.Listener) {
	var (
		c1, c2 = net.Pipe()
		l, _   = smux.Server(WrapAddr(c1, addr, nil), nil)
		s, _   = smux.Client(c2, nil)
		cid    uint64
	)

	return DialFunc(func(_, _ string) (net.Conn, error) {
			conn, err := s.OpenStream()
			if err != nil {
				return nil, err
			}

			addr2 := MemoryAddr(strconv.FormatUint(atomic.AddUint64(&cid, 1), 10))

			return WrapAddr(conn, addr2, addr), nil
		}), &OnCloseListener{
			Listener: internal.WrapListener(l, addr),
			OnClose:  s.Close,
		}
}

func BufferedPipes(softLimit int, addr net.Addr) (proxy.ContextDialer, net.Listener) {
	var (
		fl  = FunnelListener(NilListener(addr))
		cid uint64
	)

	return DialFunc(func(_, _ string) (net.Conn, error) {
		c1, c2 := BufferedPipe(softLimit)
		addr2 := MemoryAddr(strconv.FormatUint(atomic.AddUint64(&cid, 1), 10))

		if err := fl.Push(WrapAddr(c1, addr, addr2)); err != nil {
			return nil, err
		}
		return WrapAddr(c2, addr2, addr), nil
	}), fl
}

func BufferedPipe(softLimit int) (*fdxBufferedPipe, *fdxBufferedPipe) {
	if softLimit < 1 {
		softLimit = 65536
	}
	p1 := &fdxBufferedPipe{
		r: newBufferedPipe(softLimit),
		w: newBufferedPipe(softLimit),
	}
	p2 := &fdxBufferedPipe{
		r: p1.w,
		w: p1.r,
	}
	return p1, p2
}

// fdxBufferedPipe is full-duplex
type fdxBufferedPipe struct {
	r *bufferedPipe
	w *bufferedPipe

	closedMu sync.Mutex
	closed   bool
}

func (*fdxBufferedPipe) LocalAddr() net.Addr  { return MemoryAddr("BufferedPipe") }
func (*fdxBufferedPipe) RemoteAddr() net.Addr { return MemoryAddr("BufferedPipe") }

func (p *fdxBufferedPipe) Read(b []byte) (n int, err error) {
	return p.r.Read(b)
}

func (p *fdxBufferedPipe) Write(b []byte) (n int, err error) {
	return p.w.Write(b)
}

func (p *fdxBufferedPipe) Close() error {
	p.closedMu.Lock()
	if p.closed {
		p.closedMu.Unlock()
		return nil
	}
	p.closed = true
	p.closedMu.Unlock()

	p.r.Close()
	p.w.Close()
	return nil
}

func (p *fdxBufferedPipe) SetDeadline(t time.Time) error {
	p.r.SetReadDeadline(t)
	p.w.SetWriteDeadline(t)
	return nil
}

func (p *fdxBufferedPipe) SetReadDeadline(t time.Time) error {
	p.r.SetReadDeadline(t)
	return nil
}

func (p *fdxBufferedPipe) SetWriteDeadline(t time.Time) error {
	p.w.SetWriteDeadline(t)
	return nil
}

// newBufferedPipe refer to net/net_fake.go
func newBufferedPipe(softLimit int) *bufferedPipe {
	p := &bufferedPipe{softLimit: softLimit}
	p.rCond.L = &p.mu
	p.wCond.L = &p.mu
	return p
}

// bufferedPipe is simplex.
type bufferedPipe struct {
	softLimit int
	mu        sync.Mutex
	buf       []byte
	closed    bool
	rCond     sync.Cond
	wCond     sync.Cond
	rDeadline time.Time
	wDeadline time.Time
}

func (p *bufferedPipe) Read(b []byte) (int, error) {
	p.mu.Lock()
	defer p.mu.Unlock()

	for {
		if p.closed && len(p.buf) == 0 {
			return 0, io.EOF
		}
		if !p.rDeadline.IsZero() {
			d := time.Until(p.rDeadline)
			if d <= 0 {
				return 0, syscall.EAGAIN
			}
			time.AfterFunc(d, p.rCond.Broadcast)
		}
		if len(p.buf) > 0 {
			break
		}
		p.rCond.Wait()
	}

	n := copy(b, p.buf)
	p.buf = p.buf[n:]
	p.wCond.Broadcast()
	return n, nil
}

func (p *bufferedPipe) Write(b []byte) (int, error) {
	p.mu.Lock()
	defer p.mu.Unlock()

	for {
		if p.closed {
			return 0, syscall.ENOTCONN
		}
		if !p.wDeadline.IsZero() {
			d := time.Until(p.wDeadline)
			if d <= 0 {
				return 0, syscall.EAGAIN
			}
			time.AfterFunc(d, p.wCond.Broadcast)
		}
		if len(p.buf) <= p.softLimit {
			break
		}
		p.wCond.Wait()
	}

	p.buf = append(p.buf, b...)
	p.rCond.Broadcast()
	return len(b), nil
}

func (p *bufferedPipe) Close() {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.closed = true
	p.rCond.Broadcast()
	p.wCond.Broadcast()
}

func (p *bufferedPipe) SetReadDeadline(t time.Time) {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.rDeadline = t
	p.rCond.Broadcast()
}

func (p *bufferedPipe) SetWriteDeadline(t time.Time) {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.wDeadline = t
	p.wCond.Broadcast()
}
