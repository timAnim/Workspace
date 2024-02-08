package report

import (
	"testing"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/tsdb"
)

func TestGenReport(t *testing.T) {
	auth.Addr = "192.168.43.100"
	cmdb.Addr = auth.Addr
	tsdb.Addr = auth.Addr
	auth.Login("admin", "123456")
	//GenReportByDeviceType("2.5.1.10.1.1.1")
	GenDeviceStatusReport()
}
