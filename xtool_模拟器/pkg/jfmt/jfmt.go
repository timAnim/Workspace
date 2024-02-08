package jfmt

import (
	"bytes"
	"encoding/json"
	"fmt"
)

// Format 转成json格式
func Format(obj interface{}) (string, error) {
	b, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}
	return Indent(b)
}

// Print 输出
func Print(obj interface{}) {
	s, err := Format(obj)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(s)
}

// Indent 加缩进
func Indent(b []byte) (string, error) {
	var out bytes.Buffer
	err := json.Indent(&out, b, "", "    ")
	if err != nil {
		return "", err
	}
	return out.String(), nil
}
