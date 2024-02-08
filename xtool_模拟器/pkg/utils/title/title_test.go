package title

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestTitle(t *testing.T) {
	Convey("test title", t, func() {
		So(Marshal(""), ShouldEqual, "")
		So(Marshal("name"), ShouldEqual, "Name")
		So(Marshal("id"), ShouldEqual, "ID")
		So(Marshal("guid"), ShouldEqual, "GUID")
		So(Marshal("uuid"), ShouldEqual, "UUID")
		So(Marshal("ui"), ShouldEqual, "UI")
		So(Marshal("_uid"), ShouldEqual, "UID")
		So(Marshal("create_at"), ShouldEqual, "CreateAt")

		So(Unmarshal("UUID"), ShouldEqual, "uuid")
		So(Unmarshal("GUID"), ShouldEqual, "guid")
		So(Unmarshal("UID"), ShouldEqual, "uid")
		So(Unmarshal("ID"), ShouldEqual, "id")
		So(Unmarshal("Name"), ShouldEqual, "name")
		So(Unmarshal("CreateAt"), ShouldEqual, "create_at")
	})
}
