package tsdbstore

import (
	"fmt"
	"testing"
)

func TestGet(t *testing.T) {
	db := NewTsdb("127.0.0.1", 8888, 10, 5)
	err := db.Init()
	if err != nil {
		t.Error(err)
	}

	vm, err := db.GetHistoryValue([]string{"0_344_3_3_0"}, 1548070725, 1548071725, "")
	if err != nil {
		t.Error(err)
	}

	for id, vs := range vm {
		for _, v := range vs {
			fmt.Println(id, v)
		}
	}

	m := TVM{}

	m[1] = nil
	m[1312] = nil
	m[2] = nil
	m[11111112] = nil

	fmt.Println(m.OrderedTime())
}

func TestParseKey(*testing.T) {
	t0, id, err := ParseKey("2019062015:0_102:1000")
	fmt.Println(t0, id, err)

	t0, id, err = ParseKey("201906201:0_102:10000")
	fmt.Println(t0, id, err)
}
