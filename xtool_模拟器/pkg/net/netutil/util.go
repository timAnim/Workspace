package netutil

import (
	"context"
	"net"
	"strings"
	"sync"
	"syscall"
)

var NilCancel = func() {}

type MemoryAddr string

func (addr MemoryAddr) Network() string { return "memory" }
func (addr MemoryAddr) String() string  { return string(addr) }

type wrapAddr struct {
	net.Conn
	l, r net.Addr
}

func WrapAddr(conn net.Conn, l, r net.Addr) net.Conn {
	return wrapAddr{Conn: conn, l: l, r: r}
}

func (w wrapAddr) LocalAddr() net.Addr {
	if w.l != nil {
		return w.l
	}
	return w.Conn.LocalAddr()
}

func (w wrapAddr) RemoteAddr() net.Addr {
	if w.r != nil {
		return w.r
	}
	return w.Conn.RemoteAddr()
}

type nilListener struct {
	done chan struct{}
	addr net.Addr
}

func (l nilListener) Accept() (net.Conn, error) {
	<-l.done
	return nil, syscall.EPIPE
}

func (l nilListener) Close() error {
	close(l.done)
	return nil
}

func (l nilListener) Addr() net.Addr {
	return l.addr
}

func NilListener(addr net.Addr) net.Listener {
	return nilListener{done: make(chan struct{}), addr: addr}
}

type DialFunc func(network, addr string) (c net.Conn, err error)

func (f DialFunc) Dial(network, addr string) (c net.Conn, err error) {
	if f == nil {
		return nil, syscall.ECONNREFUSED
	}
	return f(network, addr)
}

func (f DialFunc) DialContext(_ context.Context, network, addr string) (c net.Conn, err error) {
	return f.Dial(network, addr)
}

type ContextDialFunc func(ctx context.Context, network, addr string) (c net.Conn, err error)

func (f ContextDialFunc) DialContext(ctx context.Context, network, addr string) (c net.Conn, err error) {
	if f == nil {
		return nil, syscall.ECONNREFUSED
	}
	return f(ctx, network, addr)
}

type OnCloseListener struct {
	net.Listener
	once    sync.Once
	OnClose func() error
}

func (l *OnCloseListener) Close() (err error) {
	l.once.Do(func() {
		err = l.OnClose()
	})
	return l.Listener.Close()
}

type OnCloseConn struct {
	net.Conn
	once    sync.Once
	OnClose func() error
}

func (conn *OnCloseConn) Close() (err error) {
	conn.once.Do(func() {
		err = conn.OnClose()
	})
	return conn.Conn.Close()
}

func ParseAddr(fAddr string) (network, addr string) {
	switch {
	case strings.HasPrefix(fAddr, "unix"):
		// unix:/tmp/xxx.socket
		return "unix", fAddr[5:]
	case strings.HasPrefix(fAddr, "tcp"):
		// tcp://0.0.0.0:6666
		return "tcp", fAddr[6:]
	default:
		// 0.0.0.0:6666
		return "tcp", fAddr
	}
}
