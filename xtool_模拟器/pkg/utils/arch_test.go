package utils

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestArch(t *testing.T) {
	Convey("test get arch", t, func() {
		{
			arch, err := GetFileArch("/root/DRIVER-DEBUGGER/x86/app/xtemplate/plugins/libbase.so")
			So(err, ShouldBeNil)
			So(arch, ShouldEqual, "x86")
		}
		{
			arch, err := GetFileArch("/root/DRIVER-DEBUGGER/armv5tejl/xtemplate/plugins/libbase.so")
			So(err, ShouldBeNil)
			So(arch, ShouldEqual, "armv5tejl")
		}
		{
			arch, err := GetFileArch("/root/DRIVER-DEBUGGER/armv7l/app/xtemplate/plugins/libbase.so")
			So(err, ShouldBeNil)
			So(arch, ShouldEqual, "armv7l")
		}
	})
}
