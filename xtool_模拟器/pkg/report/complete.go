package report

import (
	"fmt"
	"path"
	"strconv"
	"strings"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("report", "complete", Complete, "数据报表补间", `complete <filename> <interType>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "待补间的文件"},
		&reg.Param{Name: "interType", Type: "string", Necessity: false, Desc: "插值方法，1:使用前一个值，2:平滑插值，默认1"},
	})
}

func getFilename(filename string) (string, string) {
	fullName := path.Base(filename)
	suffix := path.Ext(fullName)
	firstName := strings.TrimSuffix(fullName, suffix)
	return firstName, suffix
}

type preCell struct {
	preIndex int
	preValue string
}

// Complete 补全
func Complete(filename string, interType string) {
	orgFile, err := excelize.OpenFile(filename)
	if err != nil {
		log.Errorf("open '%s' failed, error : %s", filename, err.Error())
		return
	}
	sheetName := orgFile.GetSheetName(1)
	//fmt.Println(sheetName)
	rows, err := orgFile.GetRows(sheetName)
	if err != nil {
		log.Errorf("GetRows failed, error : %s", err.Error())
		return
	}
	preCells := []*preCell{}
	firstRow := rows[3]
	for _, cell := range firstRow[2 : len(firstRow)-1] {
		preValue := cell
		preCells = append(preCells, &preCell{
			preIndex: 0,
			preValue: preValue,
		})
	}
	for i, row := range rows[3 : len(rows)-1] {
		for j, cell := range row[2 : len(row)-1] {
			switch interType {
			case "2":
				// 平滑插值 pre + ((tmp-pre)/(tmpIndex-preIndex))*(index-preIndex)
				preCell := preCells[j]
				if cell == "" {
					continue
				} else {
					pre, _ := strconv.ParseFloat(preCell.preValue, 64)
					tmp, _ := strconv.ParseFloat(cell, 64)
					n := i - preCell.preIndex - 1
					if n != 0 {
						// 中间空了几格的情况
						x := (tmp - pre) / float64(n+1)
						for index := preCell.preIndex + 1; index < i; index++ {
							// 插值
							//fmt.Println(excelize.ToAlphaString(j+2), index+4, fmt.Sprintf("%.2f", pre+x*float64(index-preCell.preIndex)), n+1)
							orgFile.SetCellValue(sheetName, fmt.Sprintf("%s%d", utils.ToAlphaString(j+2), index+4), fmt.Sprintf("%.2f", pre+x*float64(index-preCell.preIndex)))
						}
					}
					preCell.preIndex = i
					preCell.preValue = cell
					orgFile.SetCellValue(sheetName, fmt.Sprintf("%s%d", utils.ToAlphaString(j+2), i+4), preCell.preValue)
				}
			default:
				preCell := preCells[j]
				//fmt.Println(excelize.ToAlphaString(j+2), i+4)
				if cell == "" {
					orgFile.SetCellValue(sheetName, fmt.Sprintf("%s%d", utils.ToAlphaString(j+2), i+4), preCell.preValue)
				} else {
					preCell.preIndex = i
					preCell.preValue = cell
					orgFile.SetCellValue(sheetName, fmt.Sprintf("%s%d", utils.ToAlphaString(j+2), i+4), preCell.preValue)
				}
			}
		}
	}
	fName, suffix := getFilename(filename)
	newFile := fmt.Sprintf("%s-completed%s", fName, suffix)
	err = orgFile.SaveAs(newFile)
	if err != nil {
		log.Errorf("complete save to '%s' error: %s", newFile, err.Error())
		return
	}
	log.Infof("complete '%s' to '%s' success", filename, newFile)
}
