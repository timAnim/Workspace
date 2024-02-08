package netutil

import (
	"xtool/pkg/net/proxy"
	"net"
	"os"
)

func AlwaysDialer(conn net.Conn) DialFunc {
	return DialFunc(func(network, addr string) (c net.Conn, err error) { return conn, nil })
}

// Deprecated: maybe dead-lock
func AlwaysPipe() (proxy.Dialer, net.Listener) {
	c1, c2 := net.Pipe()
	return AlwaysDialer(c1), OnceListener(c2)
}

type onceListener struct {
	chConn chan net.Conn
	addr   net.Addr
}

func OnceListener(conn net.Conn) net.Listener {
	l := &onceListener{
		chConn: make(chan net.Conn, 1),
		addr:   conn.LocalAddr(),
	}
	l.chConn <- &OnCloseConn{Conn: conn, OnClose: l.Close}
	return l
}

func (l *onceListener) Accept() (net.Conn, error) {
	conn, ok := <-l.chConn
	if !ok {
		return nil, os.ErrClosed
	}
	return conn, nil
}

func (l *onceListener) Close() error {
	close(l.chConn)
	return nil
}

func (l *onceListener) Addr() net.Addr {
	return l.addr
}
