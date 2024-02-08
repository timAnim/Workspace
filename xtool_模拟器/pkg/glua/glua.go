package glua

import (
	"xtool/pkg/cmd"
	"xtool/pkg/glua/modules/auc"
	"xtool/pkg/glua/modules/cache"
	"xtool/pkg/glua/modules/cmdb"
	"xtool/pkg/glua/modules/excel"
	"xtool/pkg/glua/modules/logger"
	"xtool/pkg/glua/modules/mq"
	"xtool/pkg/glua/modules/tsdb"
	"xtool/pkg/glua/wrapper"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	libs "github.com/vadv/gopher-lua-libs"
	lua "github.com/yuin/gopher-lua"
)

func init() {
	reg.Regist("lua", "lua", Lua, "执行lua脚本", `lua <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: false, Desc: "lua脚本文件"},
	})
}

// Lua 执行lua脚本
func Lua(filename string) {
	L := lua.NewState()
	defer L.Close()

	L.SetGlobal("help", L.NewFunction(wrapper.Wrap(wrapper.LuaHelp)))
	L.SetGlobal("clear", L.NewFunction(wrapper.Wrap(cmd.Clear)))

	//L.PreloadModule("json", ljson.Loader)

	libs.Preload(L)
	cache.Preload(L)
	logger.Preload(L)
	auc.Preload(L)
	excel.Preload(L)

	L.PreloadModule("cmdb", cmdb.Loader)
	L.PreloadModule("tsdb", tsdb.Loader)
	L.PreloadModule("mq", mq.Loader)

	if filename == "" {
		doREPL(L)
		return
	}

	if err := L.DoFile(filename); err != nil {
		log.Errorf("exec lua script '%s' error: %s", filename, err.Error())
		return
	}

	log.Infof("exec lua script '%s' success", filename)
}
