package utils

import (
	"fmt"
	"xtool/pkg/types"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
)

// Axis 定位Cell
func Axis(i, j int) string {
	return fmt.Sprintf("%s%d", ToAlphaString(j), i+1)
}

// GenXlsxFromMap 从map转到xlsx
func GenXlsxFromMap(filename string, data map[string][]types.M) error {
	fp := excelize.NewFile()

	for sheetName, sData := range data {
		if len(sData) == 0 {
			continue
		}
		fp.NewSheet(sheetName)
		headers := make([]string, 0, len(sData))

		for k := range sData[0] {
			fp.SetCellValue(sheetName, Axis(0, len(headers)), k)
			headers = append(headers, k)
		}

		for i, row := range sData {
			for j := 0; j < len(headers); j++ {
				fp.SetCellValue(sheetName, Axis(i+1, j), row[headers[j]])
			}
		}
	}

	return fp.SaveAs(filename)
}

// GenXlsx 生成xlsx
func GenXlsx(filename string, fn func(*excelize.File) error) error {
	fp := excelize.NewFile()
	if err := fn(fp); err != nil {
		return err
	}
	return fp.SaveAs(filename)
}
