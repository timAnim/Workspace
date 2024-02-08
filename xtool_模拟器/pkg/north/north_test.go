package north

import (
	"fmt"
	"testing"
	"xtool/pkg/auth"

	uuid "github.com/satori/go.uuid"
)

func TestNorth(t *testing.T) {
	auth.Addr = "192.168.201.223"
	Addr = auth.Addr
	auth.Login("admin", "123456")

	ps, err := GetNorthConfig("2")
	if err != nil {
		t.Error(err.Error())
	}
	for _, p := range ps {
		fmt.Println(p.GUID, p.SysName, p.SysType)
		fmt.Println(*p)
		p.SysName = "66666666666666"
		Modify(p)
	}
	guid, err := uuid.NewV4()
	p := Param{
		GUID:               guid.String(),
		Host:               "192.168.6.6",
		SysName:            "test",
		SysType:            2,
		NorthPort:          "6000",
		SouthPort:          "6001",
		ValuePushType:      valueDontPush,
		AggregatedPushType: aggregatedDontPush,
	}
	err = New(&p)
	fmt.Println(err)
}
