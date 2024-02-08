package handler

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestEncoding(t *testing.T) {
	Convey("test UBInt16", t, func() {
		{
			x := UBInt16Encode(0x1234)
			So(x[0], ShouldEqual, 0x12)
			So(x[1], ShouldEqual, 0x34)
		}
		{
			x := UBInt16Decode([]byte{0x12, 0x34})
			So(x, ShouldEqual, 0x1234)
		}
	})
	Convey("test ULInt16", t, func() {
		{
			x := ULInt16Encode(0x1234)
			So(x[0], ShouldEqual, 0x34)
			So(x[1], ShouldEqual, 0x12)
		}
		{
			x := ULInt16Decode([]byte{0x12, 0x34})
			So(x, ShouldEqual, 0x3412)
		}
	})

	Convey("test SBInt16", t, func() {
		{
			x := SBInt16Encode(0x1234)
			So(x[0], ShouldEqual, 0x12)
			So(x[1], ShouldEqual, 0x34)
		}
		{
			x := SBInt16Decode([]byte{0x12, 0x34})
			So(x, ShouldEqual, 0x1234)
		}

		{
			x := SBInt16Encode(-0x1234)
			So(x[0], ShouldEqual, 0xED)
			So(x[1], ShouldEqual, 0xCC)
		}
		{
			x := SBInt16Decode([]byte{0xED, 0xCC})
			So(x, ShouldEqual, -0x1234)
		}
	})
	Convey("test SLInt16", t, func() {
		{
			x := SLInt16Encode(0x1234)
			So(x[0], ShouldEqual, 0x34)
			So(x[1], ShouldEqual, 0x12)
		}
		{
			x := SLInt16Decode([]byte{0x12, 0x34})
			So(x, ShouldEqual, 0x3412)
		}
		{
			x := SLInt16Encode(-0x1234)
			So(x[0], ShouldEqual, 0xCC)
			So(x[1], ShouldEqual, 0xED)
		}
		{
			x := SLInt16Decode([]byte{0xCC, 0xED})
			So(x, ShouldEqual, -0x1234)
		}
	})
	Convey("test SwapUBytes", t, func() {
		{
			x := SwapUBytes(0x1234)
			So(x, ShouldEqual, 0x3412)
		}
	})
	Convey("test SwapSBytes", t, func() {
		{
			x := SwapSBytes(-0x1234)
			So(x, ShouldEqual, -13075)
		}
	})
	Convey("test Uint16toSint16", t, func() {
		{
			x := Uint16toSint16(0xEDCC)
			So(x, ShouldEqual, -0x1234)
		}
	})
	Convey("test Sint16toUint16", t, func() {
		{
			x := Sint16toUint16(-0x1234)
			So(x, ShouldEqual, 0xEDCC)
		}
	})
}
