package net

import (
	"net"
	"os"
)

const (
	PodOwnIPAddressEnv string = "POD_OWN_IP_ADDRESS" // TODO: types.Env
)

func ListenInternal(network, address string) (net.Listener, error) {
	env, ok := os.LookupEnv(PodOwnIPAddressEnv)
	if !ok {
		return ListenMemory(network, address)
	}
	return Listen("tcp", env+":0")
}
