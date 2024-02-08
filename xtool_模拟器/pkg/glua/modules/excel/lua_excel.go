package excel

import (
	"fmt"
	"xtool/pkg/glua/wrapper"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	lua "github.com/yuin/gopher-lua"
)

// EFile excel 文件封装
type EFile struct {
	Filename string `json:"filename"`
	excelize.File
}

// Open 打开文件
func (f *EFile) Open(filename string) error {
	if filename != "" {
		f.Filename = filename
	}
	fp, err := excelize.OpenFile(f.Filename)
	if err != nil {
		return err
	}
	f.File = *fp
	return nil
}

// Create 创建文件
func (f *EFile) Create() error {
	fp := excelize.NewFile()
	f.File = *fp
	return nil
}

// Cell 定位单元格
func (f *EFile) Cell(i, j int) string {
	return fmt.Sprintf("%s%d", utils.ToAlphaString(j), i+1)
}

// Preload 预加载
func Preload(L *lua.LState) {
	wrapper.WrapObj(L, "excel", &EFile{})
}
