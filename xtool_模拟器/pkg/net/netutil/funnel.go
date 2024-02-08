package netutil

import (
	"errors"
	"fmt"
	"net"
	"sync"
)

type FunnelFunc func(net.Conn) net.Conn

func FunnelListener(l net.Listener) *funnelListener {
	// TODO: Push其实还是有区别的
	//if fl, ok := l.(*funnelListener); ok {
	//	return fl
	//}

	fl := &funnelListener{
		Listener: l,
		chConn:   make(chan net.Conn),
		chErr:    make(chan error),
		filters:  make([]FunnelFunc, 0, 1),
		done:     make(chan struct{}),
	}

	go fl.loop()

	return fl
}

type funnelListener struct {
	net.Listener
	done      chan struct{}
	chConn    chan net.Conn
	chErr     chan error
	closeOnce sync.Once
	filters   []FunnelFunc
}

func (l *funnelListener) loop() {
	defer close(l.chConn)
	defer close(l.chErr)

	for {
		conn, err := l.Listener.Accept()
		if err != nil {
			select {
			case <-l.done:
				return
			case l.chErr <- err:
			}
			return
		}

		if conn == nil {
			continue
		}
		for i := range l.filters {
			conn = l.filters[i](conn)
			if conn == nil {
				break
			}
		}
		if conn != nil {
			select {
			case <-l.done:
				return
			case l.chConn <- conn:
			}
		}
	}
}

func (l *funnelListener) Accept() (net.Conn, error) {
	select {
	case conn, ok := <-l.chConn:
		if !ok {
			return nil, &net.OpError{Op: "accept", Addr: l.Listener.Addr(), Err: errors.New("closed")}
		}
		return conn, nil
	case err, ok := <-l.chErr:
		if !ok {
			return nil, &net.OpError{Op: "accept", Addr: l.Listener.Addr(), Err: errors.New("closed")}
		}
		return nil, err
	}
}

func (l *funnelListener) Close() (err error) {
	l.closeOnce.Do(func() {
		close(l.done)
		err = l.Listener.Close()
	})
	return
}

func (l *funnelListener) Use(fn FunnelFunc) {
	l.filters = append(l.filters, fn)
}

func (l *funnelListener) Push(conn net.Conn) (err error) {
	defer func() {
		if e := recover(); e != nil {
			err = &net.OpError{Op: "accept", Addr: l.Listener.Addr(), Err: errors.New(fmt.Sprint(e))}
		}
	}()
	// TODO: 依然会"send on closed channel"
	select {
	case <-l.done:
		return &net.OpError{Op: "accept", Addr: l.Listener.Addr(), Err: errors.New("closed")}
	case l.chConn <- conn:
		return nil
	}
}
