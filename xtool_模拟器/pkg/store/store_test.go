package store

import (
	"testing"
	"xtool/pkg/auth"
)

func TestStorage(t *testing.T) {
	auth.Addr = "192.168.43.16"
	Addr = auth.Addr
	auth.Login("admin", "123456")
	cfg, _ := GetStorageConfig()
	cfg.Strategy.Method = 1
	cfg.DiskCapacity.Total = 20
	SetStorageConfig(cfg)
}
