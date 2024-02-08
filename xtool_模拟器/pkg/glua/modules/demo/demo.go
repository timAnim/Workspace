package demo

import (
	"encoding/json"
	"fmt"
	"reflect"
	"xtool/pkg/cmdb"

	ljson "github.com/vadv/gopher-lua-libs/json"
	lua "github.com/yuin/gopher-lua"
)

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("demo module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = map[string]lua.LGFunction{
	"hello": hello,
	"x": wrapper(func(a string, b int) (int, int, int, int) {
		fmt.Println(a, b)
		return 0, 1, 2, 3
	}),
	"get_item":     wrapper(cmdb.GetItem),
	"get_children": wrapper(cmdb.GetChildren),
}

func hello(L *lua.LState) int {
	fmt.Println("hello")
	return 0
}

func wrapper(fn interface{}) lua.LGFunction {
	return func(L *lua.LState) int {
		ft := reflect.TypeOf(fn)
		in := make([]reflect.Value, 0, ft.NumIn())
		for i := 0; i < ft.NumIn(); i++ {
			pt := ft.In(i)
			switch pt.Kind() {
			case reflect.Int:
				in = append(in, reflect.ValueOf(L.ToInt(i+1)))
			case reflect.String:
				in = append(in, reflect.ValueOf(L.ToString(i+1)))
			case reflect.Slice:
				t := L.ToTable(i + 1)
				x := make([]string, 0, 10)
				t.ForEach(func(k lua.LValue, v lua.LValue) {
					x = append(x, v.String())
				})
				in = append(in, reflect.ValueOf(x))
			}
		}

		f := reflect.ValueOf(fn)

		out := f.Call(in)

		count := 0
		for _, v := range out {
			switch v.Type().Kind() {
			case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
				L.Push(lua.LNumber(float64(v.Int())))
			case reflect.Float32, reflect.Float64:
				L.Push(lua.LNumber(float64(v.Float())))
			case reflect.String:
				L.Push(lua.LString(v.String()))
			case reflect.Bool:
				L.Push(lua.LBool(v.Bool()))
			case reflect.Slice, reflect.Struct, reflect.Ptr, reflect.Interface:
				// TODO: to lua.LTable
				if v.IsNil() {
					continue
				}
				b, err := json.Marshal(v.Interface())
				if err != nil {
					continue
				}
				t, err := ljson.ValueDecode(L, b)
				if err != nil {
					continue
				}
				L.Push(t)
			}
			count++
		}

		return count
	}
}

func toLValue(in interface{}) lua.LValue {
	rt := reflect.TypeOf(in)
	switch rt.Kind() {
	case reflect.String:
		return lua.LString(in.(string))
	case reflect.Int:
		return lua.LNumber(float64(in.(int)))
	case reflect.Float32:
		return lua.LNumber(float64(in.(float32)))
	case reflect.Float64:
		return lua.LNumber(in.(float64))
	case reflect.Bool:
		return lua.LBool(in.(bool))
		//case reflect.Slice:
		//	return lua.LTable
	}
	return nil
}
