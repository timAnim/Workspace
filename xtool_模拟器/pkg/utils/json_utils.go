package utils

import (
	"encoding/json"
	"io"
	"os"
)

// Load 从 文件 加载json
func Load(filename string, v interface{}) error {
	fp, err := os.Open(filename)
	if err != nil {
		return err
	}
	defer fp.Close()

	return LoadReader(fp, v)
}

// LoadReader 从 io.Reader 加载json
func LoadReader(r io.Reader, v interface{}) error {
	return json.NewDecoder(r).Decode(v)
}

// Dump 将json写到文件
func Dump(filename string, v interface{}) error {
	fp, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer fp.Close()

	return json.NewEncoder(fp).Encode(v)
}

// DumpWithIndent 将json带缩进写到文件
func DumpWithIndent(filename string, v interface{}, prefix string, indent string) error {
	fp, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer fp.Close()

	e := json.NewEncoder(fp)
	e.SetIndent(prefix, indent)

	return e.Encode(v)
}
