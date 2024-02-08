package report

import (
	"fmt"
	"reflect"
	"xtool/pkg/cmdb"
	"xtool/pkg/tsdb"

	log "github.com/sirupsen/logrus"
	"github.com/tealeg/xlsx"
)

// GenReportByDeviceType 按照设备类型生成报表
func GenReportByDeviceType(deviceType string) {
	res, err := cmdb.GetItemsByDeviceType(deviceType)
	if err != nil {
		log.Errorf("get target nodes by device_type '%s' error: %s", deviceType, err.Error())
		return
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("sheet1")
	if err != nil {
		fmt.Printf("add sheet fail , error : %s", err.Error())
		return
	}
	once := false
	posMap := map[string][2]int{}
	ids := []string{}
	for i, d := range res {
		sheet.Cell(0, i+1).SetString(d.Attributes["name"].(string))
		dChildren, err := cmdb.GetChildren(d.ResourceID, 1, nil)
		if err != nil {
			log.Errorf("get source '%s' children with deleted error: %s", d.ResourceID, err.Error())
			return
		}
		if once != true {
			for j, c := range dChildren {
				sheet.Cell(j+1, 0).SetString(c.Attributes["name"].(string))
			}
			once = true
		}
		for j, c := range dChildren {
			sheet.Cell(j+1, i+1).SetString(c.ResourceID)
			posMap[c.ResourceID] = [2]int{j + 1, i + 1}
			ids = append(ids, c.ResourceID)
		}
		if i > 10 {
			// 只导出10个
			break
		}
	}
	vs, err := tsdb.GetSnapshot(ids)
	if err != nil {
		fmt.Printf("get snapvalue failed, error : %s", err.Error())
		return
	}

	for _, v := range vs {
		if pos, ok := posMap[v.ResourceID]; ok {
			vv := reflect.ValueOf(v.RealValue)
			t := vv.Type()
			switch t.Kind() {
			case reflect.String:
				sheet.Cell(pos[0], pos[1]).SetString(vv.String())
			case reflect.Float64:
				sheet.Cell(pos[0], pos[1]).SetFloat(vv.Float())
			}
		}
	}

	err = xlsxFile.Save("test.xlsx")
	if err != nil {
		fmt.Printf("save xlsx file fail , error : %s", err.Error())
		return
	}
}

// GenDeviceStatusReport 按照设备类型生成报表
func GenDeviceStatusReport() {
	res, err := cmdb.GetItemsByCiType("2")
	if err != nil {
		log.Errorf("get target nodes by ci_type '2' error: %s", err.Error())
		return
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("sheet1")
	if err != nil {
		fmt.Printf("add sheet fail , error : %s", err.Error())
		return
	}
	sheet.Cell(0, 0).SetString("ID")
	sheet.Cell(0, 1).SetString("位置")
	sheet.Cell(0, 2).SetString("设备名")
	sheet.Cell(0, 3).SetString("设备类型")
	sheet.Cell(0, 4).SetString("状态")
	sheet.Cell(0, 5).SetString("A相电流")
	sheet.Cell(0, 6).SetString("B相电流")
	sheet.Cell(0, 7).SetString("C相电流")
	sheet.Cell(0, 8).SetString("有功功率")
	sheet.Cell(0, 9).SetString("有功电度")
	posMap := map[string][2]int{}
	ids := []string{}
	for i, d := range res {
		fmt.Println(d.ResourceID, d.Attributes["_location_translated"])
		sheet.Cell(i+1, 0).SetString(d.ResourceID)
		if location, ok := d.Attributes["_location_translated"]; ok {
			sheet.Cell(i+1, 1).SetString(location.(string))
		} else {
			sheet.Cell(i+1, 1).SetString("")
		}
		sheet.Cell(i+1, 2).SetString(d.Attributes["name"].(string))
		if deviceType, ok := d.Attributes["device_type"]; ok {
			sheet.Cell(i+1, 3).SetString(deviceType.(string))
		} else {
			sheet.Cell(i+1, 3).SetString("")
		}
		//sheet.Cell(i+1, 3).SetString()
		ids = append(ids, d.ResourceID)
		posMap[d.ResourceID] = [2]int{i + 1, 4}
	}
	vs, err := tsdb.GetSnapshot(ids)
	if err != nil {
		fmt.Printf("get snapvalue failed, error : %s", err.Error())
		return
	}

	for _, v := range vs {
		if pos, ok := posMap[v.ResourceID]; ok {
			vv := reflect.ValueOf(v.RealValue)
			t := vv.Type()
			switch t.Kind() {
			case reflect.String:
				sheet.Cell(pos[0], pos[1]).SetString(vv.String())
			case reflect.Float64:
				sheet.Cell(pos[0], pos[1]).SetFloat(vv.Float())
			}
		}
	}

	err = xlsxFile.Save("test.xlsx")
	if err != nil {
		fmt.Printf("save xlsx file fail , error : %s", err.Error())
		return
	}
}
