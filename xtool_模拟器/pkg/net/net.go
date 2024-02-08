package net

import (
	"context"
	"net"
)

type Conn = net.Conn
type Listener = net.Listener

func DialContext(ctx context.Context, network, address string) (net.Conn, error) {
	switch network {
	case "kcp":
		return DialKCPContext(ctx, network, address)
	case "memory":
		return DialMemoryContext(ctx, network, address)
	}
	return (&net.Dialer{}).DialContext(ctx, network, address)
}

func Listen(network, address string) (net.Listener, error) {
	switch network {
	case "kcp":
		return ListenKCP(network, address)
	case "memory":
		return ListenMemory(network, address)
	}
	return net.Listen(network, address)
}
