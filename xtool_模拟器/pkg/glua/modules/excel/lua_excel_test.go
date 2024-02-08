package excel

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	libs "github.com/vadv/gopher-lua-libs"
	lua "github.com/yuin/gopher-lua"
)

func TestLuaExcel(t *testing.T) {
	Convey("test login", t, func() {
		L := lua.NewState()
		defer L.Close()

		libs.Preload(L)

		Preload(L)

		err := L.DoString(`
json = require("json")
e = excel.new({
	filename = "demo.xlsx"
})

print(e)
if not e then
	return
end

print(e:open("demo.xlsx"))

print(e:get_sheet_name(0))
print(e:get_sheet_name(1))

x = excel.new({
	filename = "demo.xlsx"
})

print(x)
if not x then
	return
end

print(x:create())

print(x:get_sheet_name(0))
print(x:get_sheet_name(1))
x:save_as("x.xlsx")
		`)
		So(err, ShouldBeNil)
	})
}
