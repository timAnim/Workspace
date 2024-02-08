package xpty

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestConvert(t *testing.T) {
	Convey("test formatBytes", t, func() {
		{
			v := formatBytes([]byte{0x01, 0x04, 0x00, 0x00, 0x00, 0x02, 0x71, 0xCB})
			So(v, ShouldEqual, "01 04 00 00 00 02 71 CB")
		}
	})
	Convey("test hexStrToBytes", t, func() {
		{
			v, err := hexStrToBytes("01 04 00 00 00 02 71 CB")
			So(err, ShouldBeNil)
			So(string(v), ShouldEqual, string([]byte{0x01, 0x04, 0x00, 0x00, 0x00, 0x02, 0x71, 0xCB}))
		}
	})
}
