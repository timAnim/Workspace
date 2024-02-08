package netutil

import (
	"errors"
	"net/http"
	"sync"
)

type closeIdleTransport interface {
	CloseIdleConnections()
}

var Nrt = &nilRoundTripper{}

type nilRoundTripper struct{}

func (nrt *nilRoundTripper) RoundTrip(_ *http.Request) (*http.Response, error) {
	return nil, errors.New("UNAVAILABLE")
}

type RoundTrippers struct {
	m  map[string]http.RoundTripper
	mu sync.RWMutex
}

func NewRoundTrippers() *RoundTrippers {
	return &RoundTrippers{
		m: make(map[string]http.RoundTripper),
	}
}

// TODO: should use shared cc pool
func (rts *RoundTrippers) Set(k string, rt http.RoundTripper) {
	rts.mu.Lock()
	defer rts.mu.Unlock()

	if old, ok := rts.m[k]; ok {
		if closer, ok := old.(closeIdleTransport); ok {
			closer.CloseIdleConnections()
		}
	}

	rts.m[k] = rt
}

func (rts *RoundTrippers) Get(k string) http.RoundTripper {
	rts.mu.RLock()

	rt, ok := rts.m[k]
	if !ok {
		rts.mu.RUnlock()
		return Nrt
	}

	rts.mu.RUnlock()
	return rt
}

func (rts *RoundTrippers) Keys() (keys []string) {
	rts.mu.RLock()

	for k := range rts.m {
		keys = append(keys, k)
	}

	rts.mu.RUnlock()
	return
}

func (rts *RoundTrippers) Len() int {
	rts.mu.RLock()
	l := len(rts.m)
	rts.mu.RUnlock()
	return l
}
