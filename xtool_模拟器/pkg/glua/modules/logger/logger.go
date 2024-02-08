package logger

import (
	log "github.com/sirupsen/logrus"
	lua "github.com/yuin/gopher-lua"
)

// Preload 预加载
func Preload(L *lua.LState) {
	L.PreloadModule("logger", Loader)
}

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("logger module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = map[string]lua.LGFunction{
	"debug":  Debug,
	"info":   Info,
	"warn":   Warn,
	"error":  Error,
	"debugf": Debugf,
	"infof":  Infof,
	"warnf":  Warnf,
	"errorf": Errorf,
}

func checkMsg(L *lua.LState) []interface{} {
	v := make([]interface{}, 0, L.GetTop())
	for i := 1; i < L.GetTop()+1; i++ {
		v = append(v, L.CheckAny(i))
	}
	return v
}

// Debug DEBUG 日志
func Debug(L *lua.LState) int {
	v := checkMsg(L)
	log.Debug(v...)
	return 0
}

// Info INFO 日志
func Info(L *lua.LState) int {
	v := checkMsg(L)
	log.Info(v...)
	return 0
}

// Warn WARN 日志
func Warn(L *lua.LState) int {
	v := checkMsg(L)
	log.Warn(v...)
	return 0
}

// Error ERROR 日志
func Error(L *lua.LState) int {
	v := checkMsg(L)
	log.Error(v...)
	return 0
}

func checkMsgF(L *lua.LState) (string, []interface{}) {
	v := make([]interface{}, 0, L.GetTop())
	f := L.CheckString(1)
	for i := 2; i < L.GetTop()+1; i++ {
		v = append(v, L.CheckAny(i))
	}
	return f, v
}

// Debugf DEBUG 日志
func Debugf(L *lua.LState) int {
	f, v := checkMsgF(L)
	log.Debugf(f, v...)
	return 0
}

// Infof INFO 日志
func Infof(L *lua.LState) int {
	f, v := checkMsgF(L)
	log.Infof(f, v...)
	return 0
}

// Warnf WARN 日志
func Warnf(L *lua.LState) int {
	f, v := checkMsgF(L)
	log.Warnf(f, v...)
	return 0
}

// Errorf ERROR 日志
func Errorf(L *lua.LState) int {
	f, v := checkMsgF(L)
	log.Errorf(f, v...)
	return 0
}
