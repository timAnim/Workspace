package configure

import (
	"fmt"
	"sort"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
	"github.com/tealeg/xlsx"
)

func init() {
	reg.Regist("list", "list_device", ListDevice, "输出设备列表", `list_device <prefix>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: true, Desc: "按设备类型前缀列出设备"},
	})
	reg.Regist("list", "export_device", ExportDevice, "导出设备列表", `export_device <prefix>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: false, Desc: "按设备类型前缀列出设备，默认全部"},
	})
	reg.Regist("list", "export_device_by_location", ExportDeviceByLocation, "导出设备列表, 注意，因为是通过location查询，所以location必须正确", `export_device <spaceID> <prefix>`, []*reg.Param{
		&reg.Param{Name: "spaceID", Type: "string", Necessity: false, Desc: "设备所在空间，默认project_root"},
		&reg.Param{Name: "prefix", Type: "string", Necessity: false, Desc: "按设备类型前缀列出设备，默认全部"},
	})
	reg.Regist("list", "export_groups", ExportGroups, "导出设备类型列表", `export_groups`, []*reg.Param{})
	reg.Regist("list", "set_export_keys", SetExportKeys, "设置设备导出字段, resource_id,name,_location_translated字段已默认导出，不需额外设置", `set_export_keys <keys>`, []*reg.Param{
		&reg.Param{Name: "keys", Type: "string", Necessity: true, Desc: "字段列表, 以','隔开"},
	})
	reg.Regist("list", "export_device_spots", ExportDeviceSpots, "导出设备测点列表，按设备分表，测点会导出resource_id和name，事件规则以上下限形式导出", `export_device_spots <prefix>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: true, Desc: "按设备类型前缀列出设备"},
	})
	reg.Regist("list", "import_device_spots", ImportDeviceSpots, "使用此指令，将使用export_device_spots导出的表经过修改之后再次导入，实现上下限修改", `import_device_spots <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "导入文件名"},
	})
}

var extra = []string{"device_type", "location"}

// SetExportKeys 设置导出字段
func SetExportKeys(keys string) {
	if keys == "" {
		log.Warnf("please assign keys for export")
		return
	}
	extra = strings.Split(keys, ",")
	log.Infoln("set extra export keys:", extra)
}

// ListDevice 列出设备
func ListDevice(prefix string) {
	devices, err := cmdb.GetDevices(prefix, 1)
	if err != nil {
		log.Errorf("get devices of '%s' error: %s", prefix, err.Error())
		return
	}
	for _, d := range devices {
		fmt.Printf("%-20s %d %-20s %-40s %s\n", d.ResourceID, d.Deleted, d.Attributes["device_type"], d.Attributes["name"], d.Attributes["_location_translated"])
	}
}

// ExportDevice 导出设备列表, 生成excel: device-prefix+x
func ExportDevice(prefix string) {
	devices, err := cmdb.GetDevices(prefix, 0)
	if err != nil {
		log.Errorf("get devices of '%s' error: %s", prefix, err.Error())
		return
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("devices")
	if err != nil {
		log.Errorf("add sheet fail, error: %s", err.Error())
		return
	}

	headers := []string{"resource_id", "name", "_location_translated"}
	headers = append(headers, extra...)
	for j, h := range headers {
		sheet.Cell(0, j).SetString(fmt.Sprintf("%v", h))
	}
	for i, d := range devices {
		for j, h := range headers {
			sheet.Cell(i+1, j).SetString(fmt.Sprintf("%v", d.Attributes[h]))
		}
	}

	filename := fmt.Sprintf("device-%sx.xlsx", prefix)
	err = xlsxFile.Save(filename)
	if err != nil {
		log.Errorf("save xlsx file failed, error: %s", err.Error())
		return
	}
	log.Infof("export devices like '%sx' to '%s' success", prefix, filename)
}

// ExportDeviceByLocation 导出设备列表, 生成excel: device-prefix+x
func ExportDeviceByLocation(spaceID string, prefix string) {
	if spaceID == "" {
		spaceID = "project_root"
	}
	devices, err := cmdb.GetDevicesUnder(spaceID, prefix)
	if err != nil {
		log.Errorf("get devices of '%s' error: %s", prefix, err.Error())
		return
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("devices")
	if err != nil {
		log.Errorf("add sheet fail, error: %s", err.Error())
		return
	}

	headers := []string{"resource_id", "name", "_location_translated"}
	headers = append(headers, extra...)
	for j, h := range headers {
		sheet.Cell(0, j).SetString(fmt.Sprintf("%v", h))
	}
	for i, d := range devices {
		for j, h := range headers {
			sheet.Cell(i+1, j).SetString(fmt.Sprintf("%v", d.Attributes[h]))
		}
	}

	filename := fmt.Sprintf("device-%sx.xlsx", prefix)
	err = xlsxFile.Save(filename)
	if err != nil {
		log.Errorf("save xlsx file failed, error: %s", err.Error())
		return
	}
	log.Infof("export devices like '%sx' to '%s' success", prefix, filename)
}

// ExportDeviceSpots 导出设备测点列表, 生成excel: device-prefix+x
func ExportDeviceSpots(prefix string) {
	devices, err := cmdb.GetDevices(prefix, 0)
	if err != nil {
		log.Errorf("get devices of '%s' error: %s", prefix, err.Error())
		return
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("devices")
	if err != nil {
		log.Errorf("add sheet failed, error: %s", err.Error())
		return
	}

	headers := []string{"resource_id", "name", "_location_translated"}
	headers = append(headers, extra...)
	for j, h := range headers {
		sheet.Cell(0, j).SetString(fmt.Sprintf("%v", h))
	}
	for i, d := range devices {
		for j, h := range headers {
			sheet.Cell(i+1, j).SetString(fmt.Sprintf("%v", d.Attributes[h]))
		}
		spots, err := cmdb.GetChildren(d.ResourceID, 0, nil)
		if err != nil {
			log.Errorf("get children of '%s' failed, error: %s", d.ResourceID, err.Error())
			return
		}
		//spotSheet, err := xlsxFile.AddSheet(fmt.Sprintf("%s-%v", d.ResourceID, d.Attributes["name"]))
		// 因 sheet长度不能超过31字节，只用resource_id做表名
		spotSheet, err := xlsxFile.AddSheet(d.ResourceID)
		if err != nil {
			log.Errorf("add sheet failed, error: %s", err.Error())
			return
		}
		spotSheet.Cell(0, 0).SetString("测点ID")
		spotSheet.Cell(0, 1).SetString("测点名")
		spotSheet.Cell(0, 2).SetString("测点类型")
		spotSheet.Cell(0, 3).SetString("下限|异常值")
		spotSheet.Cell(0, 4).SetString("下限恢复|正常值")
		spotSheet.Cell(0, 5).SetString("下限告警等级|告警等级")
		spotSheet.Cell(0, 6).SetString("下限告警内容|告警内容")
		spotSheet.Cell(0, 7).SetString("上限恢复值")
		spotSheet.Cell(0, 8).SetString("上限告警值")
		spotSheet.Cell(0, 9).SetString("上限告警等级")
		spotSheet.Cell(0, 10).SetString("上限告警内容")
		for k, spot := range spots {
			if ct, ok := spot.Attributes["ci_type"]; ok {
				if ct.(string) != "3" {
					continue
				}
			} else {
				continue
			}
			spotSheet.Cell(k+1, 0).SetString(spot.ResourceID)
			spotSheet.Cell(k+1, 1).SetString(fmt.Sprintf("%v", spot.Attributes["name"]))
			if st, ok := spot.Attributes["spot_type"]; ok {
				spotType := fmt.Sprintf("%v", st)
				switch spotType {
				case "1":
					spotSheet.Cell(k+1, 2).SetString("参数")
					lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent := parseEventRules(spot)
					spotSheet.Cell(k+1, 3).SetString(lowAlarm)
					spotSheet.Cell(k+1, 4).SetString(lowRecover)
					spotSheet.Cell(k+1, 5).SetString(lowLevel)
					spotSheet.Cell(k+1, 6).SetString(lowContent)
					spotSheet.Cell(k+1, 7).SetString(upRecover)
					spotSheet.Cell(k+1, 8).SetString(upAlarm)
					spotSheet.Cell(k+1, 9).SetString(upLevel)
					spotSheet.Cell(k+1, 10).SetString(upContent)
				case "2":
					spotSheet.Cell(k+1, 2).SetString("状态")
					alarm, recover, level, content, _, _, _, _ := parseEventRules(spot)
					spotSheet.Cell(k+1, 3).SetString(alarm)
					spotSheet.Cell(k+1, 4).SetString(recover)
					spotSheet.Cell(k+1, 5).SetString(level)
					spotSheet.Cell(k+1, 6).SetString(content)
				case "3":
					spotSheet.Cell(k+1, 2).SetString("控制")
				default:
					spotSheet.Cell(k+1, 2).SetString("-")
				}
			}
		}
		log.Infof("device '%s:%v' export success", d.ResourceID, d.Attributes["name"])
	}

	filename := fmt.Sprintf("device-%s-%sx.xlsx", auth.GetHost(), prefix)
	err = xlsxFile.Save(filename)
	if err != nil {
		log.Errorf("save xlsx file fail , error : %s", err.Error())
		return
	}
	log.Infof("export devices like '%sx' to '%s' success", prefix, filename)
}

func parseEventRules(item *cmdb.Resource) (lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent string) {
	lowAlarm = "-"
	lowRecover = "-"
	lowLevel = "-"
	lowContent = "-"

	upRecover = "-"
	upAlarm = "-"
	upLevel = "-"
	upContent = "-"

	rules := item.Attributes.MustStringSlice("event_rules")
	for _, r := range rules {
		//fmt.Println(r)
		rule := strToMap(r)
		switch rule["alarm_type"] {
		case "2":
			// 过高告警
			switch rule["operator"] {
			case ">", ">=":
				// 大于此值告警，说明是告警上限
				upAlarm = rule["operand"]
			}
			switch rule["restore_operator"] {
			case "<", "<=":
				// 小于此值恢复，说明是恢复上限
				upRecover = rule["restore_operand"]
			}
			upLevel = rule["level"]
			upContent = rule["content"]

		case "4":
			// 过低告警
			switch rule["operator"] {
			case "<", "<=":
				// 小于此值告警，说明是告警下限
				lowAlarm = rule["operand"]
			}
			switch rule["restore_operator"] {
			case ">", ">=":
				// 小于此值恢复，说明是恢复下限
				lowRecover = rule["restore_operand"]
			}
			lowLevel = rule["level"]
			lowContent = rule["content"]

		case "3":
			// 异常告警
			switch rule["operator"] {
			case "==":
				// 等于此值告警，说明是异常告警值
				lowAlarm = rule["operand"]
			}
			switch rule["restore_operator"] {
			case "==":
				// 等于此值恢复，说明是恢复下限
				lowRecover = rule["restore_operand"]
			}
			lowLevel = rule["level"]
			lowContent = rule["content"]

		}
	}
	//fmt.Println(lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent)
	return lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent
}

func strToMap(r string) map[string]string {
	kvMap := map[string]string{}
	kvs := strings.Split(r, ";")
	for _, kv := range kvs {
		vs := strings.SplitN(kv, "=", 2)
		if len(vs) != 2 {
			continue
		}
		k := vs[0]
		v := vs[1]
		kvMap[k] = v
	}
	return kvMap
}

// ImportDeviceSpots 导入设备测点表
func ImportDeviceSpots(filename string) {
	//f, err := xlsx.OpenFile(filename)
	f, err := excelize.OpenFile(filename)
	if err != nil {
		log.Errorf("open file '%s' error: %s", filename, err.Error())
		return
	}

	devices, err := f.GetRows("devices")
	if err != nil {
		log.Errorf("GetRows 'devices' error: %s", err.Error())
		return
	}

	for _, device := range devices[1:] {
		deviceID := device[0]
		deviceName := device[1]
		Rename(deviceID, deviceName)
		rows, err := f.GetRows(deviceID)
		if err != nil {
			log.Errorf("GetRows '%s' error: %s", deviceID, err.Error())
			return
		}
		for _, row := range rows {
			resourceID := row[0]

			name := row[1]
			Rename(resourceID, name)

			switch row[2] {
			case "参数":
				lowAlarm := row[3]
				lowRecover := row[4]
				lowLevel := row[5]
				lowContent := row[6]

				upRecover := row[7]
				upAlarm := row[8]
				upLevel := row[9]
				upContent := row[10]

				ModifyAnalogThreshold(resourceID, lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent)
			case "状态":
				alarm := row[3]
				recover := row[4]
				level := row[5]
				content := row[6]
				ModifyDigitThreshold(resourceID, alarm, recover, level, content)
			}
		}
	}
	log.Infof("import_device_spots from '%s' success", filename)
}

// ExportGroups 导出设备类型列表
func ExportGroups() {
	gd, err := driver.GetGroupDev()
	if err != nil {
		log.Errorf("get groups_dev error: %s", err.Error())
		return
	}
	//gd := driver.GroupDevList{}
	//b, _ := ioutil.ReadFile("groups_dev.json")
	//json.Unmarshal(b, &gd)
	//fmt.Println(gd)
	gdMap := map[string]*driver.GroupDevItem{}
	deviceTypes := driver.GroupDevList{}
	for _, g := range gd {
		//fmt.Println(g.ID, g.Value, g.Level)
		gdMap[g.ID] = g
		if g.Level == "7" {
			deviceTypes = append(deviceTypes, g)
		}
	}
	transLoc := func(loc string) string {
		ids := strings.Split(loc, ".")
		locID := ""
		//locIDs := []string{}
		locNames := []string{}
		for _, id := range ids {
			if locID == "" {
				locID = id
			} else {
				locID = strings.Join([]string{locID, id}, ".")
			}
			if g, ok := gdMap[locID]; ok {
				locNames = append(locNames, g.Value)
			} else {
				locNames = append(locNames, "Unkown")
			}
		}
		return strings.Join(locNames, "/")
	}

	sort.Sort(deviceTypes)
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("groups_dev")
	if err != nil {
		log.Errorf("add sheet failed: %s", err.Error())
		return
	}
	sheet.Cell(0, 0).SetString("设备类型ID")
	sheet.Cell(0, 1).SetString("系统")
	sheet.Cell(0, 2).SetString("功用")
	sheet.Cell(0, 3).SetString("类型")
	sheet.Cell(0, 4).SetString("厂家")
	sheet.Cell(0, 5).SetString("品牌")
	sheet.Cell(0, 6).SetString("系列")
	sheet.Cell(0, 7).SetString("型号")
	sheet.Cell(0, 8).SetString("类型全路径")
	for i, d := range deviceTypes {
		loc := transLoc(d.ID)
		fmt.Println(d.ID, loc)
		names := strings.Split(loc, "/")
		sheet.Cell(i+1, 0).SetString(d.ID)
		sheet.Cell(i+1, 1).SetString(names[0])
		sheet.Cell(i+1, 2).SetString(names[1])
		sheet.Cell(i+1, 3).SetString(names[2])
		sheet.Cell(i+1, 4).SetString(names[3])
		sheet.Cell(i+1, 5).SetString(names[4])
		sheet.Cell(i+1, 6).SetString(names[5])
		sheet.Cell(i+1, 7).SetString(names[6])
		sheet.Cell(i+1, 8).SetString(loc)
	}
	xlsxFile.Save("groups_dev.xlsx")
	log.Infof("exported groups_dev to 'groups_dev.xlsx' success")
}
