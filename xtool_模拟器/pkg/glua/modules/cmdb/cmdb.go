package cmdb

import (
	xcmdb "xtool/pkg/cmdb"
	"xtool/pkg/glua/wrapper"

	lua "github.com/yuin/gopher-lua"
)

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("cmdb module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = wrapper.NewExports("cmdb", map[string]interface{}{
	"get_item":     xcmdb.GetItem,
	"get_children": xcmdb.GetChildren,
	"get_related":  xcmdb.GetRelated,
	"add_items":    xcmdb.AddItems,
	"upsert_items": xcmdb.UpsertItems,
	"delete":       xcmdb.Delete,
})
