package net

import (
	"context"
	"errors"
	"github.com/xtaci/smux"
	"xtool/pkg/net/internal"
	"xtool/pkg/net/netutil"
	"net"
	"strings"
	"time"
)

var defaultMuxConfig = &smux.Config{
	KeepAliveInterval: 30 * time.Second,
	KeepAliveTimeout:  31 * time.Second,
	MaxFrameSize:      4096,
	MaxReceiveBuffer:  10485760,
}

func DefaultMuxConfig() *smux.Config {
	cp := *defaultMuxConfig
	return &cp
}

func MuxListener(l net.Listener, c ...*smux.Config) net.Listener {
	if c == nil || len(c) == 0 {
		c = append(c, DefaultMuxConfig())
	}

	fl := netutil.FunnelListener(l)
	fl.Use(func(conn net.Conn) net.Conn {
		s, err := smux.Server(conn, c[0])
		if err != nil {
			conn.Close()
			return nil
		}

		// s.SetTimeout(c[0].KeepAliveTimeout)

		internal.Lock()
		if old, ok := internal.Get(conn.RemoteAddr().Network(), conn.RemoteAddr().String()); ok {
			go old.Close()
		}
		internal.Cache(conn.RemoteAddr().Network(), conn.RemoteAddr().String(), s)
		internal.Unlock()

		go func() {
			defer s.Close() // TODO: need?

			for {
				stream, err := s.AcceptStream()
				if err != nil {
					return
				}
				err = fl.Push(stream)
				if err != nil {
					return
				}
			}
		}()

		return nil
	})

	return fl
}

type MuxContextDialer func(ctx context.Context, network, addr string) (net.Conn, error)

// TODO: 这里还是有不少问题…
func (d MuxContextDialer) DialContext(ctx context.Context, network, addr string) (net.Conn, error) {
	internal.Lock()
	defer internal.Unlock()

	s, ok := internal.Get(network, addr)
	if !ok {
		conn, err := d(ctx, network, addr)
		if err != nil {
			return nil, err
		}

		s, err = smux.Client(conn, DefaultMuxConfig())
		if err != nil {
			conn.Close()
			return nil, err
		}

		// s.SetTimeout(DefaultMuxConfig().KeepAliveTimeout)

		// TODO: network or conn.RemoteAddr().Network() ?
		internal.Cache(network, conn.RemoteAddr().String(), s)
	}

	return s.OpenStream()
}

type MuxDialer func(network, addr string) (net.Conn, error)

func (d MuxDialer) Dial(network, addr string) (net.Conn, error) {
	return MuxContextDialer(func(_ context.Context, network, addr string) (net.Conn, error) {
		return d(network, addr)
	}).DialContext(context.Background(), network, addr)
}

func ListenMux(network, addr string) (net.Listener, error) {
	internal.RLock()
	defer internal.RUnlock()

	s, ok := internal.Get(network, addr)
	if !ok {
		return nil, &net.OpError{Op: "listen", Net: network,
			Addr: &MuxAddr{network: network, addr: addr},
			Err:  errors.New("spool uncached")}
	}
	return internal.WrapListener(s, &MuxAddr{network: network, addr: addr}), nil
}

func DialMux(network, addr string) (net.Conn, error) {
	internal.RLock()
	defer internal.RUnlock()

	s, ok := internal.Get(network, addr)
	if !ok {
		return nil, &net.OpError{Op: "dial", Net: network,
			Addr: &MuxAddr{network: network, addr: addr},
			Err:  errors.New("spool uncached")}
	}

	conn, err := s.OpenStream()
	if err != nil && strings.Contains(err.Error(), "stream id overflows") {
		s.Close()
	}
	return conn, err
}

type MuxAddr struct {
	network, addr string
}

func (addr *MuxAddr) Network() string {
	return addr.network
}

func (addr *MuxAddr) String() string {
	return addr.addr
}
