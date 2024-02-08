package demo

import (
	"fmt"
	"testing"
	"xtool/pkg/cmdb"

	lua "github.com/yuin/gopher-lua"
)

func TestWrapper(t *testing.T) {

	L := lua.NewState()
	defer L.Close()
	L.PreloadModule("demo", Loader)

	err := L.DoString(`
demo = require("demo")
demo.x("aaaaaaa", 6, 8)
	`)
	if err != nil {
		t.Error(err)
	}

	fmt.Println(toLValue("xxxx"))
	fmt.Println(toLValue(1))
	fmt.Println(toLValue(2.1))

	x := []*cmdb.Resource{}
	fmt.Println(toLValue(x))
}
