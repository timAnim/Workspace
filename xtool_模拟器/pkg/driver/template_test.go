package driver

import (
	"fmt"
	"testing"
	"xtool/pkg/auth"
)

func TestTemplate(t *testing.T) {
	Addr = "172.20.10.7"
	auth.Addr = Addr
	auth.Login("admin", "123456")
	//tpl, err := GetTemplate("2_6_1_1_1_1_1.dev")
	//if err != nil {
	//	t.Errorf("%s", err.Error())
	//}
	//fmt.Println(string(tpl))
	//dev, err := GetDev("2.6.1.1.1.1.1")
	//if err != nil {
	//	t.Errorf("%s", err.Error())
	//}
	//fmt.Println(dev)
	//brd, err := GetBrd("2.6.1.1.1.1.1")
	//if err != nil {
	//	t.Errorf("%s", err.Error())
	//}
	//fmt.Println(brd)

	gd, err := GetGroupDev()
	if err != nil {
		t.Errorf("%s", err.Error())
	}
	for _, d := range gd {
		fmt.Println(d)
	}
}
