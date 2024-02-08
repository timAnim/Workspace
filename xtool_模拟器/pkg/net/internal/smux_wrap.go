package internal

import (
	"github.com/xtaci/smux"
	"net"
	"sync"
	"time"
)

var (
	sPool map[string]*smux.Session
	mu    sync.RWMutex
)

func RLock()   { mu.RLock() }
func RUnlock() { mu.RUnlock() }
func Lock()    { mu.Lock() }
func Unlock()  { mu.Unlock() }

func init() {
	sPool = make(map[string]*smux.Session)

	go func() {
		tick := time.NewTicker(3 * time.Second)
		for {
			<-tick.C
			mu.Lock()
			for addr, conn := range sPool {
				if conn.NumStreams() == 0 {
					mu.Unlock()
					time.Sleep(time.Second)
					mu.Lock()
					if conn.NumStreams() == 0 {
						err := conn.Close()
						if err != nil {
							// nothing
						}
						delete(sPool, addr)
					}
				}
			}
			mu.Unlock()
		}
	}()
}

// Get is goroutine-unsafe
func Get(network, addr string) (*smux.Session, bool) {
	conn, ok := sPool[network+"://"+addr]
	return conn, ok && !conn.IsClosed()
}

// Cache is goroutine-unsafe
func Cache(network, addr string, conn *smux.Session) {
	sPool[network+"://"+addr] = conn
}

type wrapListener struct {
	*smux.Session
	laddr net.Addr
}

func (w wrapListener) Accept() (net.Conn, error) {
	return w.AcceptStream()
}

func (w wrapListener) Addr() net.Addr {
	// TODO: smux 1.0.7 not support
	// return w.LocalAddr()
	return w.laddr
}

func WrapListener(s *smux.Session, laddr net.Addr) net.Listener {
	return wrapListener{Session: s, laddr: laddr}
}
