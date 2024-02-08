package auc

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	libs "github.com/vadv/gopher-lua-libs"
	lua "github.com/yuin/gopher-lua"
)

func TestLuaAuc(t *testing.T) {
	Convey("test login", t, func() {
		L := lua.NewState()
		defer L.Close()

		libs.Preload(L)

		Preload(L)

		err := L.DoString(`
json = require("json")
c = auc.new({
	addr = "127.0.0.1",
	account = "admin",
	password = "123456"
})

print(c)
if not c then
	return
end

c:login()

vs, err = c:multi_get({"0_247", "0_248"})
print("error:", err)
print("vs:", json.encode(vs))
err = c:setting("0_375_3_1_0", "25")
print(err)

r, err = c:get_item("0_375_3_1_0")
print(err)
print(json.encode(r))

mqc = mq.new({
	addr = "192.168.29.116:5672",
	user = "gj",
	passwd = "xbrother",

	exchange = "fss_inner_exchange",
	topic = "fss.inner.value.#"
})

print(mqc)
mqc:connect()

data = {
	value_source = "strategy",
	values = {
		{
			resource_id = "0_374_1_10003_0",
			value = "12"
		}
	}
}

mqc:publish(json.encode(data))
		`)
		So(err, ShouldBeNil)
	})
}
