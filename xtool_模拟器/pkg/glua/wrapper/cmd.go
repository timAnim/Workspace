package wrapper

import (
	"fmt"
	"reflect"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	lua "github.com/yuin/gopher-lua"
)

func init() {
	reg.Regist("lua", "lua_help", LuaHelp, "查看内置模块", `lua_help`, []*reg.Param{})
}

var funcMap = map[string]map[string]string{}

// NewExports 新建导出方法集
func NewExports(module string, m map[string]interface{}) map[string]lua.LGFunction {
	exports := make(map[string]lua.LGFunction)
	help := make(map[string]string)
	for k, fn := range m {
		exports[k] = Wrap(fn)
		ft := reflect.TypeOf(fn)
		help[k] = ft.String()
	}
	funcMap[module] = help
	return exports
}

// LuaHelp 展示lua指令帮助
func LuaHelp(module string) {
	if module == "" {
		for m, help := range funcMap {
			fmt.Printf("%s:\n", m)
			for k, v := range help {
				fmt.Printf("\t%-20s%s\n", k, v)
			}
		}
		return
	}
	if help, ok := funcMap[module]; ok {
		fmt.Printf("%s:\n", module)
		for k, v := range help {
			fmt.Printf("\t%-20s%s\n", k, v)
		}
		return
	}
	log.Errorf("module '%s' not found", module)
}
