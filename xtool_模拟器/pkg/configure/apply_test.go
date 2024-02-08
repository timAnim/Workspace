package configure

import (
	"testing"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
)

func TestAuth(t *testing.T) {
	auth.Addr = "192.168.0.103"
	cmdb.Addr = "192.168.0.103"
	auth.Login("admin", "123456")
}

func TestApplyDev(t *testing.T) {
	ApplyDevToID("0_101", "0_103,0_104,0_105,0_106,0_107")
}
func TestAddSpot(t *testing.T) {
	AddSpot("project_root", "test", "1")
	AddSpot("project_root", "test", "2")
}
