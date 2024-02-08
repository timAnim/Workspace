package wrapper

import (
	"fmt"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	libs "github.com/vadv/gopher-lua-libs"
	lua "github.com/yuin/gopher-lua"
)

type Demo struct {
	Name string `json:"name"`
}

func (d *Demo) Hello(arg string) (int, error) {
	fmt.Println(arg, d.Name)
	return 0, nil
}

func TestWrapper(t *testing.T) {
	Convey("test wrapper", t, func() {
		L := lua.NewState()

		libs.Preload(L)

		WrapObj(L, "demo", &Demo{})
		err := L.DoString(`
json = require("json")

d = demo.new({name = "demo struct"})
print("d:", d)
if not d then
	return
end
d:hello("hahahahahahhahahah world")

c = demo.new({name = "xxxxxxxxxxxxxxxxxxxxx"})
c:hello("aaaaaaa")

d:hello("xxxxxxx")
		`)
		So(err, ShouldBeNil)
	})
}
