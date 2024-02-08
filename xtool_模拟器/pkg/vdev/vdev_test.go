package vdev

import (
	"testing"
	"xtool/pkg/auth"
)

func TestSetRange(t *testing.T) {
	Addr = "192.168.79.75"
	auth.Addr = Addr
	auth.Login("admin", "123456")
	SetRange("0_101", "1_1_0", 10, 20)
	SetRange("0_101", "2_1_0", 10.5, 20.45)
}
