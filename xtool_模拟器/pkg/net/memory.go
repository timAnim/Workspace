package net

import (
	"context"
	"fmt"
	"xtool/pkg/net/netutil"
	"xtool/pkg/net/proxy"
	"math/rand"
	"net"
	"sync"
	"syscall"
	"time"
)

var (
	memorys  = make(map[string]proxy.ContextDialer)
	memorysM = new(sync.RWMutex)
)

func DialMemoryContext(ctx context.Context, network, address string) (net.Conn, error) {
	memorysM.RLock()
	defer memorysM.RUnlock()

	d, ok := memorys[address]
	if !ok {
		return nil, syscall.EADDRNOTAVAIL
	}
	return d.DialContext(ctx, network, address)
}

func ListenMemory(network, address string) (net.Listener, error) {
	memorysM.Lock()
	defer memorysM.Unlock()

	if address == ":0" {
		address = fmt.Sprintf("AUTO-%d-%d", time.Now().Unix(), rand.Int63())
	}

	_, ok := memorys[address]
	if ok {
		return nil, syscall.EADDRINUSE
	}
	d, l := netutil.DefaultPipes(netutil.MemoryAddr(address))
	memorys[address] = d

	return &netutil.OnCloseListener{
		Listener: l,
		OnClose: func() error {
			memorysM.Lock()
			delete(memorys, address)
			memorysM.Unlock()
			return nil
		}}, nil
}

func ListenMemoryDialer(address string, dialer proxy.ContextDialer) error {
	memorysM.Lock()
	defer memorysM.Unlock()

	_ /*old*/, ok := memorys[address]
	if ok {
		// return nil, syscall.EADDRINUSE
	}

	memorys[address] = dialer
	return nil
}
