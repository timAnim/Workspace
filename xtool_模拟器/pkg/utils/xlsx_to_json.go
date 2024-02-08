package utils

import (
	"fmt"
	"xtool/pkg/define"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

// GenMapFromXlsx 从excel文件生成表
func GenMapFromXlsx(filename string) ([]define.M, error) {
	orgFile, err := excelize.OpenFile(filename)
	if err != nil {
		log.Errorf("open '%s' failed, error : %s", filename, err.Error())
		return nil, err
	}

	sheetName := orgFile.GetSheetName(1)
	return GenMFromSheet(orgFile, sheetName)
}

// GenMFromSheet 从excel表生成map
func GenMFromSheet(fp *excelize.File, sheet string) ([]define.M, error) {
	rows, err := fp.GetRows(sheet)
	if err != nil {
		return nil, err
	}
	if len(rows) < 1 {
		return nil, fmt.Errorf("sheet '%s' has no data", sheet)
	}
	headers := rows[0]

	items := make([]define.M, 0, len(rows))
	for _, row := range rows[1:len(rows)] {
		item := define.M{}
		for j, c := range row {
			if j >= len(headers) {
				break
			}
			if c == "" {
				continue
			}

			item[headers[j]] = c
		}
		if len(item) == 0 {
			continue
		}
		items = append(items, item)
	}

	return items, nil
}
