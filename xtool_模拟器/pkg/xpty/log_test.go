package xpty

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestLoadLogFile(t *testing.T) {
	Convey("test LoadLogFile", t, func() {
		{
			LoadLogFile("x.log")
		}
	})
}
