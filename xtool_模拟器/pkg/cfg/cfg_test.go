package cfg

import (
	"fmt"
	"testing"
)

type Demo struct {
	Host string `ini:"host"`
	Port int    `ini:"port"`
}
type Demo1 struct {
	Host string `ini:"host"`
	Port int    `ini:"port"`
}

func TestLoad(t *testing.T) {
	d := &Demo{
		Host: "127.0.0.1",
		Port: 6666,
	}
	d1 := &Demo1{
		Host: "127.0.0.1",
		Port: 8888,
	}
	RegistSection("demo", d, nil, nil)
	RegistSection("demo1", d1, nil, nil)
	err := Load("")
	if err != nil {
		t.Errorf("load config error: %s", err.Error())
	}
	fmt.Println(d)
	Save()
}
