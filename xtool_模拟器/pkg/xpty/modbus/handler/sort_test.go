package handler

import (
	"regexp"
	"sort"
	"strconv"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestSort(t *testing.T) {
	Convey("test UBInt16", t, func() {
		files := []string{
			"ttymxc1",
			"ttymxc10",
			"ttymxc11",
			"ttymxc12",
			"ttymxc13",
			"ttymxc14",
			"ttymxc15",
			"ttymxc16",
			"ttymxc2",
			"ttymxc3",
			"ttymxc4",
			"ttymxc5",
			"ttymxc6",
			"ttymxc7",
			"ttymxc8",
			"ttymxc9",
		}
		r := regexp.MustCompile(`\d+`)
		indexFunc := func(in string) int {
			out := r.FindString(in)
			v, _ := strconv.Atoi(out)
			return v
		}
		sort.Slice(files, func(i, j int) bool {
			x := indexFunc(files[i])
			y := indexFunc(files[j])
			return x < y
		})
		So(files[0], ShouldEqual, "ttymxc1")
		So(files[1], ShouldEqual, "ttymxc2")
		So(files[2], ShouldEqual, "ttymxc3")
		So(files[3], ShouldEqual, "ttymxc4")
		So(files[4], ShouldEqual, "ttymxc5")
		So(files[5], ShouldEqual, "ttymxc6")
		So(files[6], ShouldEqual, "ttymxc7")
		So(files[7], ShouldEqual, "ttymxc8")
		So(files[8], ShouldEqual, "ttymxc9")
		So(files[9], ShouldEqual, "ttymxc10")
		So(files[10], ShouldEqual, "ttymxc11")
		So(files[11], ShouldEqual, "ttymxc12")
		So(files[12], ShouldEqual, "ttymxc13")
		So(files[13], ShouldEqual, "ttymxc14")
		So(files[14], ShouldEqual, "ttymxc15")
		So(files[15], ShouldEqual, "ttymxc16")
	})
}
