package utils

import (
	"fmt"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestCommand(t *testing.T) {
	Convey("test path exists", t, func() {
		x := IsExists("/opt")
		So(x, ShouldEqual, true)

		x = IsExists("/opt/xxxx")
		So(x, ShouldEqual, false)
	})

	Convey("test pwd", t, func() {
		o, err := GetShellOutput("pwd")
		So(err, ShouldBeNil)
		fmt.Println(o)
	})

	//Convey("test pipe exec commands", t, func() {
	//	err := PipeExecCommand([][]string{[]string{"ps", "-ef"}, []string{"grep", "gogs"}}, os.Stdout)
	//	So(err, ShouldBeNil)
	//})

	//Convey("test pipe exec command", t, func() {
	//	err := ExecCommand("ps -ef | grep gogs | grep -v grep | awk '{print $2}'", os.Stdout)
	//	So(err, ShouldBeNil)
	//})

	//Convey("test get output", t, func() {
	//	o, err := GetOutput("ps -ef | grep gogs | grep -v grep | awk '{print $2}'")
	//	fmt.Printf("%s+xxx", o)
	//	So(err, ShouldBeNil)
	//})

	//Convey("test get output", t, func() {
	//	o, err := GetShellOutput("ps -ef | grep gogs | grep -v grep | awk '{print $2}'")
	//	fmt.Printf("%s+xxx", o)
	//	So(err, ShouldBeNil)
	//})
}
