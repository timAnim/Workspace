package configure

import (
	"fmt"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/auth"
	"xtool/pkg/define"
	"xtool/pkg/driver"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "xlsx_to_dev_brd", XlsxToDevBrd, "从V3R4点表生成 dev 与 brd 文件", `xlsx_to_dev_brd <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "文件名"},
	})
}

// XlsxToDevBrd 从 excel 点表生成 dev 与 brd 文件
// 1. 生成 dev 与 brd 文件
// 2. 将类型路径合并至 groups_dev.json
func XlsxToDevBrd(filename string) {
	fp, err := excelize.OpenFile(filename)
	if err != nil {
		log.Errorf("excelize.OpenFile '%s' error: %s", filename, err.Error())
		return
	}
	// =====================================================================
	//devInfo := types.M{}
	brdInfo := define.M{}
	{
		deviceInfo, err := fp.GetRows("设备信息表")
		if err != nil {
			log.Errorf("fp.GetRows '设备信息表' error: %s", err.Error())
			return
		}

		if len(deviceInfo) < 2 {
			log.Errorf("'%s' device info is illegal", filename)
			return
		}
		for i, row := range deviceInfo[1:] {
			if len(deviceInfo) < 4 {
				log.Errorf("'%s' device info row %d is illegal", filename, i)
				return
			}
			brdInfo[row[1]] = row[2]
		}
	}
	// =====================================================================
	boardType := strings.ReplaceAll(brdInfo.MustString("board_type"), "_", ".")
	dev, err := driver.GetDev(boardType)
	if err != nil {
		log.Warnf("driver.GetDev '%s' error: %s", boardType, err.Error())
		dev = mkDefaultDev(boardType)
	}
	brd, err := driver.GetBrd(boardType)
	if err != nil {
		log.Warnf("driver.GetBrd '%s' error: %s", boardType, err.Error())
		brd = mkDefaultBrd(boardType)
	}
	// =====================================================================
	rSpots, err := utils.GenMFromSheet(fp, "测点表_读")
	if err != nil {
		log.Errorf("utils.GenMFromSheet %s.'测点表_读'", filename)
		return
	}
	rsMap := map[string]define.M{}
	for _, r := range rSpots {
		rsMap[r.MustString("序号")] = r
	}

	wSpots, err := utils.GenMFromSheet(fp, "测点表_写")
	if err != nil {
		log.Errorf("utils.GenMFromSheet %s.'测点表_写'", filename)
		return
	}
	wsMap := map[string]define.M{}
	for _, w := range wSpots {
		wsMap[w.MustString("序号")] = w
	}
	// =====================================================================
	{
		//sMap := map[string]define.M{}
		spots := make([]define.M, 0, len(rSpots)+len(wSpots))
		for _, r := range rSpots {
			stdID := r.MustString("标准化ID")
			if stdID == "" {
				continue
			}
			id := r.MustString("序号")
			access := "r"
			if w, ok := wsMap[id]; ok {
				access = "rw"
				w["used"] = true
			}
			spotType := strings.Split(stdID, "_")[0]

			s := mkDefaultDSpot(
				withKV("id", stdID),
				withKV("access", access),
				withKV("name", r.MustString("标准测点名称")),
				withKV("mapper", r.MustString("状态映射")),
				withKV("unit", r.MustString("单位")),
				withKV("value_type", r.MustString("数据类型")),
				withKV("spot_type", spotType),
			)
			spots = append(spots, s)
			//sMap[stdID] = s
		}
		for _, w := range wSpots {
			stdID := w.MustString("标准化ID")
			if stdID == "" {
				continue
			}
			if _, ok := w["used"]; ok {
				continue
			}
			access := "w"
			spotType := strings.Split(stdID, "_")[0]
			s := mkDefaultDSpot(
				withKV("id", stdID),
				withKV("access", access),
				withKV("name", w.MustString("标准测点名称")),
				withKV("mapper", w.MustString("状态映射")),
				withKV("unit", w.MustString("单位")),
				withKV("value_type", w.MustString("数据类型")),
				withKV("spot_type", spotType),
			)
			spots = append(spots, s)
			//sMap[stdID] = s
		}
		// TODO: 加上已经存在的资产点
		for _, s := range dev.Spots {
			if s.MustString("spot_type") == "5" {
				spots = append(spots, s)
			}
		}
		dev.Spots = spots
	}
	// =====================================================================
	{
		//sMap := map[string]define.M{}
		spots := make([]define.M, 0, len(rSpots)+len(wSpots))
		for _, r := range rSpots {
			stdID := r.MustString("标准化ID")
			if stdID == "" {
				continue
			}
			id := r.MustString("序号")
			access := "r"
			if w, ok := wsMap[id]; ok {
				access = "rw"
				w["used"] = true
			}

			s := mkDefaultBSpot(
				withKV("id", id),
				withKV("map_ids", stdID),
				withKV("access", access),
				withKV("name", r.MustString("协议测点名称")),
				withKV("unit", r.MustString("单位")),
				withKV("value_type", r.MustString("数据类型")),
			)
			spots = append(spots, s)
			//sMap[stdID] = s
		}
		for _, w := range wSpots {
			stdID := w.MustString("标准化ID")
			if stdID == "" {
				continue
			}
			if _, ok := w["used"]; ok {
				continue
			}
			access := "w"
			s := mkDefaultBSpot(
				withKV("id", stdID),
				withKV("access", access),
				withKV("name", w.MustString("协议测点名称")),
				withKV("unit", w.MustString("单位")),
				withKV("value_type", w.MustString("数据类型")),
			)
			spots = append(spots, s)
			//sMap[stdID] = s
		}
		for _, s := range dev.Spots {
			if s.MustString("spot_type") == "5" {
				spots = append(spots, s)
			}
		}
		brd.Spots = spots
	}
	// =====================================================================
	// 合并 groups_dev.json
	{
		if err := mergeGroups(boardType, brdInfo.MustString("group")); err != nil {
			log.Errorf("mergeGroups error: %s", err.Error())
			return
		}
	}
	// =====================================================================
	baseName := strings.ReplaceAll(boardType, ".", "_")
	// 生成 dev 文件
	devFile := baseName + ".dev"
	{
		dev.Device["name"] = brdInfo.MustString("type") + "-" + brdInfo.MustString("model")
		if err := utils.DumpWithIndent(devFile, dev, "", "  "); err != nil {
			log.Errorf("utils.DumpWithIndent %s error: %s", devFile, err.Error())
			return
		}
	}
	// =====================================================================
	// 生成 brd 文件
	brdFile := baseName + ".brd"
	{
		brd.Board["name"] = brdInfo.MustString("type") + "-" + brdInfo.MustString("model")
		if err := utils.DumpWithIndent(brdFile, brd, "", "  "); err != nil {
			log.Errorf("utils.DumpWithIndent %s error: %s", brdFile, err.Error())
			return
		}
	}
	// =====================================================================

	log.Infof("xlsx_to_dev_brd to '%s' success, use the following commands to apply:", filename)
	fmt.Printf("connect root <passwd> %s\n", auth.GetHost())
	fmt.Printf("done\n")
	fmt.Printf("put %s /opt/xbrother/xtemplates/drivers\n", devFile)
	fmt.Printf("put %s /opt/xbrother/xtemplates/drivers\n", brdFile)
	fmt.Printf("put groups_dev.json /opt/xbrother/xtemplates\n")
}

func mkDefaultDev(deviceType string) *driver.Dev {
	return &driver.Dev{
		Device: define.M{
			"alarm_masking": []string{},
			"board_id":      []string{},
			"board_options": []string{
				deviceType,
			},
			"board_template": []string{
				deviceType,
			},
			"ci_type":      "2",
			"ci_version":   "1",
			"create_date":  time.Now().Format("2006-01-02"),
			"creater_name": "cli",
			"department":   define.M{},
			"description":  "",
			"device_info":  strings.Join(strings.Split(deviceType, ".")[0:3], "."),
			"device_num":   "",
			"device_type":  deviceType,
			"event_rules": []string{
				"id=1;event_generator=DeviceEventGenerator",
			},

			"image_model": define.M{
				"back":  "",
				"front": "",
			},
			"import_type":    "0",
			"is_common":      "0",
			"location":       "",
			"metalfile":      "1",
			"name":           "",
			"open_space":     "0",
			"operate_record": "",
			"owner":          define.M{},
			"parent_id":      "",
			"position_types": []string{},
			"resource_id":    "",
			"serial_num":     "",
			"standard_model": "2",
			"status":         "0",
			"template_page": define.M{
				"equipType":    "",
				"templateType": "1_1_1_1_1_1",
			},
			"vendor_info": strings.Join(strings.Split(deviceType, ".")[3:7], "."),
			"version":     "2.0.0.1",
		},
		Group: []define.M{
			define.M{
				"desc": "默认分组",
				"id":   "1",
				"name": "",
			},
		},
		Spots: []define.M{},
	}
}

func mkDefaultBrd(boardType string) *driver.Brd {
	return &driver.Brd{
		Board: define.M{
			"board_type": boardType,
			"ci_type":    "7",
			"ci_version": "2.0.0.1",
			"controller": "controller=CommController",
			"desc":       "",
			"event_rules": []string{
				"id=1;event_generator=BoardEventGenerator;times=3;level=1;content=通信中断;suggest=",
			},
			"limit_interval": "50",
			"name":           "",
			"packer":         "packer=CommonPacker;check=Default",
			"transfer":       "ComTransfer,TcpTransfer",
			"version":        "2.0.0.1",
		},
		Commands: []define.M{},
		Spots:    []define.M{},
	}
}

func mkDefaultDSpot(opts ...optFunc) define.M {
	m := define.M{
		"access":            "r",
		"aggregator":        "0",
		"ci_type":           "3",
		"codec":             "",
		"codecex":           "",
		"compressor":        "compressor=DefCompressor;type=value;param=0.5;interval=60",
		"data_source":       "0",
		"default":           "",
		"event_rules":       []string{},
		"filter":            "filter=DefFilter;max=900000000;min=-900000000;times=2",
		"group":             "1",
		"id":                "1_600_0",
		"input_params":      []string{},
		"mapper":            "",
		"name":              "",
		"precision":         "2",
		"privilege":         "1",
		"professional_type": "",
		"spot_type":         "1",
		"unit":              "",
		"value_type":        "float",
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

func mkDefaultBSpot(opts ...optFunc) define.M {
	m := define.M{
		"access":       "r",
		"ci_type":      "3",
		"command":      "read=1",
		"converter":    "converter=DefConverter",
		"id":           "",
		"input_params": []string{},
		"map_ids":      "",
		"name":         "",
		"precision":    "0",
		"tolerance":    "0",
		"value_type":   "",
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

type optFunc func(define.M)

func withKV(k string, v interface{}) optFunc {
	return func(m define.M) {
		m[k] = v
	}
}

func mergeGroups(boardType string, group string) error {
	ids := strings.Split(boardType, ".")
	if len(ids) != 7 {
		return fmt.Errorf("illegal boardType: '%s'", boardType)
	}
	gs := strings.Split(group, "/")
	if len(gs) != 7 {
		return fmt.Errorf("illegal group: '%s'", group)
	}

	gd, err := driver.GetGroupDev()
	if err != nil {
		return err
	}
	gdMap := map[string]*driver.GroupDevItem{}
	for _, g := range gd {
		gdMap[g.ID] = g
	}
	for i := 1; i <= 7; i++ {
		id := getLevelID(ids, i)
		if _, ok := gdMap[id]; ok {
			continue
		}
		name := getGroupValue(gs, i)
		gd = append(gd, &driver.GroupDevItem{
			ID:       id,
			ParentID: getLevelID(ids, i-1),
			Name:     getGroupName(i),
			Value:    name,
			Level:    strconv.Itoa(i),
		})
	}
	return utils.DumpWithIndent("groups_dev.json", gd, "", "  ")
}

func getLevelID(ids []string, lvl int) string {
	return strings.Join(ids[0:lvl], ".")
}

func getGroupName(lvl int) string {
	h := []string{"系统", "功用", "类型", "厂家", "品牌", "系列", "型号"}
	return h[lvl-1]
}

func getGroupValue(gs []string, lvl int) string {
	return gs[lvl-1]
}
