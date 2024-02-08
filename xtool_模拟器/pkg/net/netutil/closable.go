package netutil

import (
	"errors"
	"xtool/pkg/net/proxy"
	"net"
	"sync"
)

type closableDialer struct {
	dialer proxy.Dialer
	mu     *sync.Mutex
	conns  map[net.Conn]struct{}
}

func ClosableDialer(dialer proxy.Dialer) *closableDialer {
	return &closableDialer{
		dialer: dialer,
		mu:     new(sync.Mutex),
		conns:  make(map[net.Conn]struct{}),
	}
}

func (d *closableDialer) Dial(network, addr string) (net.Conn, error) {
	conn, err := d.dialer.Dial(network, addr)
	if err != nil {
		return nil, err
	}
	d.mu.Lock()
	d.conns[conn] = struct{}{}
	d.mu.Unlock()
	return &OnCloseConn{Conn: conn, OnClose: func() error {
		d.mu.Lock()
		delete(d.conns, conn)
		d.mu.Unlock()
		return nil
	}}, nil
}

func (d *closableDialer) Close() error {
	msg := ""

	d.mu.Lock()
	for conn := range d.conns {
		if err := conn.Close(); err != nil {
			msg += " [ " + conn.RemoteAddr().String() + " " + err.Error() + " ]"
		}
	}
	d.mu.Unlock()

	if msg != "" {
		return errors.New("ClosableDialer:" + msg)
	}
	return nil
}
