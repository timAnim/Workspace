package tsdb

import (
	"testing"
	"xtool/pkg/auth"
)

func TestAuth(t *testing.T) {
	Addr = "192.168.43.100"
	auth.Addr = Addr
	auth.Login("admin", "123456")
}

func TestGetEventLast(t *testing.T) {
	GetEventLast()
	GetSnapshot([]string{"0_2445_2_10037_0", "0_2445_2_10038_0"})
}
