package cache

import (
	"sync"

	lua "github.com/yuin/gopher-lua"
)

var (
	mux = sync.RWMutex{}
	m   = map[string]lua.LValue{}
)

// Preload 预加载
func Preload(L *lua.LState) {
	L.PreloadModule("cache", Loader)
}

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("cache module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = map[string]lua.LGFunction{
	"set": Set,
	"get": Get,
}

// Set 设置值
func Set(L *lua.LState) int {
	k := L.CheckString(1)
	v := L.CheckAny(2)
	mux.Lock()
	m[k] = v
	mux.Unlock()
	return 0
}

// Get 获取值
func Get(L *lua.LState) int {
	k := L.CheckString(1)
	mux.RLock()
	v, ok := m[k]
	mux.RUnlock()
	if ok {
		L.Push(v)
		return 1
	}
	return 0
}
