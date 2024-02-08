package tsdb

import (
	xtsdb "xtool/pkg/tsdb"

	"xtool/pkg/glua/wrapper"

	lua "github.com/yuin/gopher-lua"
)

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("tsdb module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = wrapper.NewExports("tsdb", map[string]interface{}{
	"mget": xtsdb.GetSnapshot,
	"set":  xtsdb.Setting,
})
