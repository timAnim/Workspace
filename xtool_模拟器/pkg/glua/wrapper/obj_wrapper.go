package wrapper

import (
	"encoding/json"
	"errors"
	"fmt"
	"reflect"
	"xtool/pkg/utils/title"

	ljson "github.com/vadv/gopher-lua-libs/json"
	lua "github.com/yuin/gopher-lua"
)

// WrapObj 将任意golang 结构体 封装成lua元类
func WrapObj(L *lua.LState, tname string, obj interface{}) {
	methods := map[string]lua.LGFunction{}
	methodMap := map[string]string{}

	ot := reflect.TypeOf(obj)
	switch ot.Kind() {
	case reflect.Struct:
		// 暂不支持结构体
	case reflect.Ptr:
		// 支持结构体指针
		for i := 0; i < ot.NumMethod(); i++ {
			md := ot.Method(i)
			fname := title.Unmarshal(md.Name)
			methods[fname] = WrapMethod(md)
			methodMap[fname] = md.Type.String()
		}
	}

	methods["help"] = func(L *lua.LState) int {
		i := 0
		for fname, ft := range methodMap {
			//fmt.Println(34 + (i % 2))
			fmt.Printf("\033[%dm%-30s %s\033[0m\n", 34+(i%2), fname, ft)
			i++
		}
		return 0
	}

	mt := L.NewTypeMetatable(tname)
	L.SetGlobal(tname, mt)
	// static attributes
	L.SetField(mt, "new", L.NewFunction(func(L *lua.LState) int {
		v := reflect.New(ot.Elem())
		ud := L.NewUserData()

		b, err := ljson.ValueEncode(L.ToTable(1))
		if err != nil {
			return 0
		}
		// 使用lua table 初始化结构体数据
		err = json.Unmarshal(b, v.Interface())
		if err != nil {
			return 0
		}
		ud.Value = v.Interface()
		L.SetMetatable(ud, L.GetTypeMetatable(tname))
		L.Push(ud)
		return 1
	}))
	// methods
	L.SetField(mt, "__index", L.SetFuncs(L.NewTable(), methods))

}

// WrapMethod 将任意golang 结构体 方法 封装成lua元类
func WrapMethod(md reflect.Method) lua.LGFunction {
	ft := md.Type
	return func(L *lua.LState) int {
		// 第一个参数是userdata
		//fmt.Println(ft.NumIn())
		in := make([]reflect.Value, 0, ft.NumIn())
		ud := L.CheckUserData(1)
		//fmt.Printf("%+v\n", ud.Value)
		in = append(in, reflect.ValueOf(ud.Value))

		for i := 1; i < ft.NumIn(); i++ {
			pt := ft.In(i)
			//fmt.Println(pt)
			switch pt.Kind() {
			case reflect.Bool:
				in = append(in, reflect.ValueOf(L.ToBool(i+1)))
			case reflect.Int:
				in = append(in, reflect.ValueOf(L.ToInt(i+1)))
			case reflect.Int8:
				in = append(in, reflect.ValueOf(int8(L.ToInt(i+1))))
			case reflect.Int16:
				in = append(in, reflect.ValueOf(int16(L.ToInt(i+1))))
			case reflect.Int32:
				in = append(in, reflect.ValueOf(int32(L.ToInt(i+1))))
			case reflect.Int64:
				in = append(in, reflect.ValueOf(L.ToInt64(i+1)))
			case reflect.Uint:
				in = append(in, reflect.ValueOf(uint(L.ToInt(i+1))))
			case reflect.Uint8:
				in = append(in, reflect.ValueOf(uint8(L.ToInt(i+1))))
			case reflect.Uint16:
				in = append(in, reflect.ValueOf(uint16(L.ToInt(i+1))))
			case reflect.Uint32:
				in = append(in, reflect.ValueOf(uint32(L.ToInt64(i+1))))
			case reflect.Uint64:
				in = append(in, reflect.ValueOf(uint64(L.ToInt64(i+1))))
			case reflect.Float32:
				in = append(in, reflect.ValueOf(float32(L.ToNumber(i+1))))
			case reflect.Float64:
				in = append(in, reflect.ValueOf(float64(L.ToNumber(i+1))))
			case reflect.String:
				in = append(in, reflect.ValueOf(L.ToString(i+1)))
			case reflect.Slice:
				if pt.Elem().Kind() == reflect.Uint8 {
					in = append(in, reflect.ValueOf([]byte(L.ToString(i+1))))
					continue
				}
				v := reflect.MakeSlice(pt, L.ToTable(i+1).Len(), L.ToTable(i+1).Len())
				b, err := ljson.ValueEncode(L.ToTable(i + 1))
				if err != nil {
					in = append(in, v)
					continue
				}
				y := reflect.New(v.Type())
				y.Elem().Set(v)
				//err = json.Unmarshal(b, v.Interface())
				err = json.Unmarshal(b, y.Interface())
				if err != nil {
					in = append(in, v)
					continue
				}
				in = append(in, v)
			case reflect.Map:
				v := reflect.MakeMap(pt)
				b, err := ljson.ValueEncode(L.ToTable(i + 1))
				if err != nil {
					in = append(in, v)
					continue
				}
				err = json.Unmarshal(b, v.Interface())
				if err != nil {
					in = append(in, v)
					continue
				}
				in = append(in, v)
			case reflect.Struct:
				v := reflect.New(pt)
				b, err := ljson.ValueEncode(L.ToTable(i + 1))
				if err != nil {
					in = append(in, v)
					continue
				}
				err = json.Unmarshal(b, v.Interface())
				if err != nil {
					in = append(in, v)
					continue
				}
				in = append(in, v)
			case reflect.Ptr:
				v := reflect.New(pt.Elem())
				b, err := ljson.ValueEncode(L.ToTable(i + 1))
				if err != nil {
					in = append(in, v)
					continue
				}
				err = json.Unmarshal(b, v.Interface())
				if err != nil {
					in = append(in, v)
					continue
				}
				in = append(in, v)
			//case reflect.Interface:
			//	v := reflect.New(pt)
			//	b, err := ljson.ValueEncode(L.ToTable(i + 1))
			//	if err != nil {
			//		in = append(in, v)
			//		continue
			//	}
			//	err = json.Unmarshal(b, v.Interface())
			//	if err != nil {
			//		in = append(in, v)
			//		continue
			//	}
			//	in = append(in, v)
			case reflect.Interface:
				v := L.CheckAny(i + 1)
				in = append(in, reflect.ValueOf(v))
			case reflect.Func:
				cb := L.ToFunction(i + 1)
				v := reflect.MakeFunc(pt, func(args []reflect.Value) []reflect.Value {
					params := make([]lua.LValue, 0, len(args))
					for _, a := range args {
						at := a.Type()
						switch at.Kind() {
						case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
							params = append(params, lua.LNumber(float64(a.Int())))
						case reflect.Float32, reflect.Float64:
							params = append(params, lua.LNumber(float64(a.Float())))
						case reflect.String:
							params = append(params, lua.LString(a.String()))
						case reflect.Bool:
							params = append(params, lua.LBool(a.Bool()))
						case reflect.Slice:
							if at.Elem().Kind() == reflect.Uint8 {
								params = append(params, lua.LString(string(a.Bytes())))
								continue
							}
							fallthrough
						case reflect.Struct, reflect.Ptr, reflect.Map, reflect.Interface:
							// TODO: to lua.LTable
							if a.IsNil() {
								params = append(params, lua.LNil)
								continue
							}
							b, err := json.Marshal(a.Interface())
							if err != nil {
								params = append(params, lua.LNil)
								continue
							}
							t, err := ljson.ValueDecode(L, b)
							if err != nil {
								params = append(params, lua.LNil)
								continue
							}
							params = append(params, t)
						}
					}

					ret := make([]reflect.Value, 0, pt.NumOut())

					err := L.CallByParam(lua.P{
						Fn:      cb,
						NRet:    pt.NumOut(),
						Protect: true,
					}, params...)
					if err != nil {
						// TODO: 将err放在返回值中
						return ret
					}

					for j := pt.NumOut() - 1; j >= 0; j-- {
						r := L.Get(-1)
						L.Pop(1)
						ot := pt.Out(j)
						switch ot.Kind() {
						case reflect.Bool:
							ret = append(ret, reflect.ValueOf(lua.LVAsBool(r)))
						case reflect.Int:
							ret = append(ret, reflect.ValueOf(int(lua.LVAsNumber(r))))
						case reflect.Int8:
							ret = append(ret, reflect.ValueOf(int8(lua.LVAsNumber(r))))
						case reflect.Int16:
							ret = append(ret, reflect.ValueOf(int16(lua.LVAsNumber(r))))
						case reflect.Int32:
							ret = append(ret, reflect.ValueOf(int32(lua.LVAsNumber(r))))
						case reflect.Int64:
							ret = append(ret, reflect.ValueOf(int64(lua.LVAsNumber(r))))
						case reflect.Uint:
							ret = append(ret, reflect.ValueOf(uint(lua.LVAsNumber(r))))
						case reflect.Uint8:
							ret = append(ret, reflect.ValueOf(uint8(lua.LVAsNumber(r))))
						case reflect.Uint16:
							ret = append(ret, reflect.ValueOf(uint16(lua.LVAsNumber(r))))
						case reflect.Uint32:
							ret = append(ret, reflect.ValueOf(uint32(lua.LVAsNumber(r))))
						case reflect.Uint64:
							ret = append(ret, reflect.ValueOf(uint64(lua.LVAsNumber(r))))
						case reflect.Float32:
							ret = append(ret, reflect.ValueOf(float32(lua.LVAsNumber(r))))
						case reflect.Float64:
							ret = append(ret, reflect.ValueOf(float64(lua.LVAsNumber(r))))
						case reflect.String:
							ret = append(ret, reflect.ValueOf(lua.LVAsString(r)))
						case reflect.Slice:
							if ot.Elem().Kind() == reflect.Uint8 {
								ret = append(ret, reflect.ValueOf([]byte(lua.LVAsString(r))))
								continue
							}
							v := reflect.MakeSlice(ot, 0, 10)
							b, err := ljson.ValueEncode(r)
							if err != nil {
								ret = append(ret, v)
								continue
							}
							err = json.Unmarshal(b, v.Interface())
							if err != nil {
								ret = append(ret, v)
								continue
							}
							ret = append(ret, v)
						case reflect.Map:
							v := reflect.MakeMap(ot)
							b, err := ljson.ValueEncode(r)
							if err != nil {
								ret = append(ret, v)
								continue
							}
							err = json.Unmarshal(b, v.Interface())
							if err != nil {
								ret = append(ret, v)
								continue
							}
							ret = append(ret, v)
						case reflect.Struct:
							v := reflect.New(ot)
							b, err := ljson.ValueEncode(r)
							if err != nil {
								ret = append(ret, v)
								continue
							}
							err = json.Unmarshal(b, v.Interface())
							if err != nil {
								ret = append(ret, v)
								continue
							}
							ret = append(ret, v)
						case reflect.Ptr:
							v := reflect.New(ot.Elem())
							b, err := ljson.ValueEncode(r)
							if err != nil {
								ret = append(ret, v)
								continue
							}
							err = json.Unmarshal(b, v.Interface())
							if err != nil {
								ret = append(ret, v)
								continue
							}
							ret = append(ret, v)
						case reflect.Interface:
							if _, hasMethod := ot.MethodByName("Error"); hasMethod {
								if r != lua.LNil {
									ret = append(ret, reflect.ValueOf(errors.New(r.String())))
									continue
								}
							}
							ret = append(ret, reflect.Zero(ot))
						}
					}
					for i, j := 0, len(ret)-1; i < j; i, j = i+1, j-1 {
						ret[i], ret[j] = ret[j], ret[i]
					}

					return ret
				})
				in = append(in, v)
			}
		}

		out := md.Func.Call(in)

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
			case reflect.Slice:
				if v.Type().Elem().Kind() == reflect.Uint8 {
					L.Push(lua.LString(string(v.Bytes())))
					count++
					continue
				}
				fallthrough
			case reflect.Struct, reflect.Ptr, reflect.Map:
				if v.IsNil() {
					L.Push(lua.LNil)
					count++
					continue
				}
				b, err := json.Marshal(v.Interface())
				if err != nil {
					L.Push(lua.LNil)
					count++
					continue
				}
				t, err := ljson.ValueDecode(L, b)
				if err != nil {
					L.Push(lua.LNil)
					count++
					continue
				}
				L.Push(t)
			case reflect.Interface:
				if v.IsNil() {
					L.Push(lua.LNil)
					count++
					continue
				}
				if _, ok := v.Type().MethodByName("Error"); ok {
					L.Push(lua.LString(v.Interface().(error).Error()))
					count++
					continue
				}
				L.Push(lua.LNil)
			}
			count++
		}

		return count
	}
}
