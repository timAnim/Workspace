package auc

import (
	"xtool/pkg/glua/wrapper"

	lua "github.com/yuin/gopher-lua"
)

// Preload 预加载
func Preload(L *lua.LState) {
	wrapper.WrapObj(L, "auc", &Client{})
	wrapper.WrapObj(L, "mq", &MQClient{})
}
