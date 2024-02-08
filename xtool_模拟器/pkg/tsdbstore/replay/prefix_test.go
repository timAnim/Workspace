package replay

import (
	"fmt"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestPrefix(t *testing.T) {
	Convey("test add prefix", t, func() {
		m := map[string]interface{}{
			"20190419:0_101_1_1_0:0000": 1,
			"20190419:0_101_1_1_0:0002": 1,
			"20190419:0_101_1_1_0:0003": 1,
		}

		fmt.Println(addPrefix(m, "12_"))
	})
}
