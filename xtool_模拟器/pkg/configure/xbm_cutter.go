package configure

import (
	"fmt"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "xbm_cutter", XBMCutter, "V3R4 XBM-G3000 蓄电池驱动裁剪", `xbm_cutter <filename> <groupCount> <batCount>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "V3R4 XBM-G3000 蓄电池驱动文件"},
		&reg.Param{Name: "groupCount", Type: "int", Necessity: true, Desc: "电池组数量，默认 4"},
		&reg.Param{Name: "batCount", Type: "int", Necessity: true, Desc: "每组电池数量，默认 40"},
	})
}

// XBMCutter XBM-G3000 蓄电池驱动裁剪
func XBMCutter(filename string, groupCount string, batCount string) {
	gCount, err := strconv.Atoi(groupCount)
	if err != nil {
		gCount = 4
	}
	bCount, err := strconv.Atoi(batCount)
	if err != nil {
		bCount = 40
	}

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
	//fmt.Println(brdInfo)
	rSpots, err := utils.GenMFromSheet(fp, "测点表_读")
	if err != nil {
		log.Errorf("utils.GenMFromSheet %s.'测点表_读'", filename)
		return
	}
	wSpots, err := utils.GenMFromSheet(fp, "测点表_写")
	if err != nil {
		log.Errorf("utils.GenMFromSheet %s.'测点表_写'", filename)
		return
	}
	cmds, err := utils.GenMFromSheet(fp, "命令表")
	if err != nil {
		log.Errorf("utils.GenMFromSheet %s.'命令表'", filename)
		return
	}

	crSpots, err := pickBatSpots(rSpots, gCount, bCount)
	if err != nil {
		log.Errorf("pickBatSpots pick read spots error: %s", err.Error())
		return
	}

	cwSpots, err := pickBatSpots(wSpots, gCount, bCount)
	if err != nil {
		log.Errorf("pickBatSpots pick read spots error: %s", err.Error())
		return
	}

	ext := filepath.Ext(filename)
	newFile := strings.TrimSuffix(filepath.Base(filename), ext) + fmt.Sprintf("-cutted-%d-%d", gCount, bCount) + ext
	if err := genV3R4xlsx(newFile, brdInfo, crSpots, cwSpots, cmds); err != nil {
		log.Errorf("genV3R4xlsx %s error: %s", newFile, err.Error())
		return
	}
	log.Infof("xbm_cutter '%s', group count: %d, bat count %d to '%s'", filename, gCount, bCount, newFile)
	//// =====================================================================
	//boardType := strings.ReplaceAll(brdInfo.MustString("board_type"), "_", ".")
	//dev, err := driver.GetDev(boardType)
	//if err != nil {
	//	log.Warnf("driver.GetDev '%s' error: %s", boardType, err.Error())
	//	dev = mkDefaultDev(boardType)
	//}
	//brd, err := driver.GetBrd(boardType)
	//if err != nil {
	//	log.Warnf("driver.GetBrd '%s' error: %s", boardType, err.Error())
	//	brd = mkDefaultBrd(boardType)
	//}
	//// =====================================================================
	//rSpots, err := utils.GenMFromSheet(fp, "测点表_读")
	//if err != nil {
	//	log.Errorf("utils.GenMFromSheet %s.'测点表_读'", filename)
	//	return
	//}
	//rsMap := map[string]define.M{}
	//for _, r := range rSpots {
	//	rsMap[r.MustString("序号")] = r
	//}

	//wSpots, err := utils.GenMFromSheet(fp, "测点表_写")
	//if err != nil {
	//	log.Errorf("utils.GenMFromSheet %s.'测点表_写'", filename)
	//	return
	//}
	//wsMap := map[string]define.M{}
	//for _, w := range wSpots {
	//	wsMap[w.MustString("序号")] = w
	//}
	//// =====================================================================
	//{
	//	//sMap := map[string]define.M{}
	//	spots := make([]define.M, 0, len(rSpots)+len(wSpots))
	//	for _, r := range rSpots {
	//		stdID := r.MustString("标准化ID")
	//		if stdID == "" {
	//			continue
	//		}
	//		id := r.MustString("序号")
	//		access := "r"
	//		if w, ok := wsMap[id]; ok {
	//			access = "rw"
	//			w["used"] = true
	//		}
	//		spotType := strings.Split(stdID, "_")[0]

	//		s := mkDefaultDSpot(
	//			withKV("id", stdID),
	//			withKV("access", access),
	//			withKV("name", r.MustString("标准测点名称")),
	//			withKV("mapper", r.MustString("状态映射")),
	//			withKV("unit", r.MustString("单位")),
	//			withKV("value_type", r.MustString("数据类型")),
	//			withKV("spot_type", spotType),
	//		)
	//		spots = append(spots, s)
	//		//sMap[stdID] = s
	//	}
	//	for _, w := range wSpots {
	//		stdID := w.MustString("标准化ID")
	//		if stdID == "" {
	//			continue
	//		}
	//		if _, ok := w["used"]; ok {
	//			continue
	//		}
	//		access := "w"
	//		spotType := strings.Split(stdID, "_")[0]
	//		s := mkDefaultDSpot(
	//			withKV("id", stdID),
	//			withKV("access", access),
	//			withKV("name", w.MustString("标准测点名称")),
	//			withKV("mapper", w.MustString("状态映射")),
	//			withKV("unit", w.MustString("单位")),
	//			withKV("value_type", w.MustString("数据类型")),
	//			withKV("spot_type", spotType),
	//		)
	//		spots = append(spots, s)
	//		//sMap[stdID] = s
	//	}
	//	// TODO: 加上已经存在的资产点
	//	for _, s := range dev.Spots {
	//		if s.MustString("spot_type") == "5" {
	//			spots = append(spots, s)
	//		}
	//	}
	//	dev.Spots = spots
	//}
	//// =====================================================================
	//{
	//	//sMap := map[string]define.M{}
	//	spots := make([]define.M, 0, len(rSpots)+len(wSpots))
	//	for _, r := range rSpots {
	//		stdID := r.MustString("标准化ID")
	//		if stdID == "" {
	//			continue
	//		}
	//		id := r.MustString("序号")
	//		access := "r"
	//		if w, ok := wsMap[id]; ok {
	//			access = "rw"
	//			w["used"] = true
	//		}

	//		s := mkDefaultBSpot(
	//			withKV("id", id),
	//			withKV("map_ids", stdID),
	//			withKV("access", access),
	//			withKV("name", r.MustString("协议测点名称")),
	//			withKV("unit", r.MustString("单位")),
	//			withKV("value_type", r.MustString("数据类型")),
	//		)
	//		spots = append(spots, s)
	//		//sMap[stdID] = s
	//	}
	//	for _, w := range wSpots {
	//		stdID := w.MustString("标准化ID")
	//		if stdID == "" {
	//			continue
	//		}
	//		if _, ok := w["used"]; ok {
	//			continue
	//		}
	//		access := "w"
	//		s := mkDefaultBSpot(
	//			withKV("id", stdID),
	//			withKV("access", access),
	//			withKV("name", w.MustString("协议测点名称")),
	//			withKV("unit", w.MustString("单位")),
	//			withKV("value_type", w.MustString("数据类型")),
	//		)
	//		spots = append(spots, s)
	//		//sMap[stdID] = s
	//	}
	//	for _, s := range dev.Spots {
	//		if s.MustString("spot_type") == "5" {
	//			spots = append(spots, s)
	//		}
	//	}
	//	brd.Spots = spots
	//}
	//// =====================================================================
	//// 合并 groups_dev.json
	//{
	//	if err := mergeGroups(boardType, brdInfo.MustString("group")); err != nil {
	//		log.Errorf("mergeGroups error: %s", err.Error())
	//		return
	//	}
	//}
	//// =====================================================================
	//baseName := strings.ReplaceAll(boardType, ".", "_")
	//// 生成 dev 文件
	//devFile := baseName + ".dev"
	//{
	//	dev.Device["name"] = brdInfo.MustString("type") + "-" + brdInfo.MustString("model")
	//	if err := utils.DumpWithIndent(devFile, dev, "", "  "); err != nil {
	//		log.Errorf("utils.DumpWithIndent %s error: %s", devFile, err.Error())
	//		return
	//	}
	//}
	//// =====================================================================
	//// 生成 brd 文件
	//brdFile := baseName + ".brd"
	//{
	//	brd.Board["name"] = brdInfo.MustString("type") + "-" + brdInfo.MustString("model")
	//	if err := utils.DumpWithIndent(brdFile, brd, "", "  "); err != nil {
	//		log.Errorf("utils.DumpWithIndent %s error: %s", brdFile, err.Error())
	//		return
	//	}
	//}
	//// =====================================================================

	//log.Infof("xlsx_to_dev_brd to '%s' success, use the following commands to apply:", filename)
	//fmt.Printf("connect root <passwd> %s\n", auth.GetHost())
	//fmt.Printf("done\n")
	//fmt.Printf("put %s /opt/xbrother/xtemplates/drivers\n", devFile)
	//fmt.Printf("put %s /opt/xbrother/xtemplates/drivers\n", brdFile)
	//fmt.Printf("put groups_dev.json /opt/xbrother/xtemplates\n")
}

func genV3R4xlsx(filename string, brdInfo define.M, rSpots []define.M, wSpots []define.M, cmds []define.M) error {
	fp := excelize.NewFile()

	overview := "设备信息表"
	fp.SetSheetName("Sheet1", overview)

	fp.SetCellValue(overview, cell(0, 0), "分组")
	fp.SetCellValue(overview, cell(0, 1), "name")
	fp.SetCellValue(overview, cell(0, 2), "value")
	fp.SetCellValue(overview, cell(0, 3), "描述")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(1, 0), cell(5, 0))
	fp.SetCellValue(overview, cell(1, 0), "设备信息")

	fp.SetCellValue(overview, cell(1, 1), "company")
	fp.SetCellValue(overview, cell(2, 1), "model")
	fp.SetCellValue(overview, cell(3, 1), "type")
	fp.SetCellValue(overview, cell(4, 1), "board_type")
	fp.SetCellValue(overview, cell(5, 1), "auth_code")

	fp.SetCellValue(overview, cell(1, 2), brdInfo.MustString("company"))
	fp.SetCellValue(overview, cell(2, 2), brdInfo.MustString("model"))
	fp.SetCellValue(overview, cell(3, 2), brdInfo.MustString("type"))
	fp.SetCellValue(overview, cell(4, 2), brdInfo.MustString("board_type"))
	fp.SetCellValue(overview, cell(5, 2), "")

	fp.SetCellValue(overview, cell(1, 3), "厂家")
	fp.SetCellValue(overview, cell(2, 3), "设备型号")
	fp.SetCellValue(overview, cell(3, 3), "分类(ups、空调、电量仪等）")
	fp.SetCellValue(overview, cell(4, 3), "设备7层结构")
	fp.SetCellValue(overview, cell(5, 3), "授权码")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(6, 0), cell(7, 0))
	fp.SetCellValue(overview, cell(6, 0), "协议信息")

	fp.SetCellValue(overview, cell(6, 1), "procotol_filename")
	fp.SetCellValue(overview, cell(7, 1), "procotol_caption")

	fp.SetCellValue(overview, cell(6, 2), brdInfo.MustString("procotol_filename"))
	fp.SetCellValue(overview, cell(7, 2), brdInfo.MustString("procotol_caption"))

	fp.SetCellValue(overview, cell(6, 3), "协议文档名称")
	fp.SetCellValue(overview, cell(7, 3), "协议内容标题")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(8, 0), cell(9, 0))
	fp.SetCellValue(overview, cell(8, 0), "维护信息")

	fp.SetCellValue(overview, cell(8, 1), "author")
	fp.SetCellValue(overview, cell(9, 1), "create_time")

	fp.SetCellValue(overview, cell(8, 2), brdInfo.MustString("author"))
	fp.SetCellValue(overview, cell(9, 2), time.Now().Format("2006/01/02"))

	fp.SetCellValue(overview, cell(8, 3), "创建人")
	fp.SetCellValue(overview, cell(9, 3), "创建时间")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(10, 0), cell(14, 0))
	fp.SetCellValue(overview, cell(10, 0), "协议特性")

	fp.SetCellValue(overview, cell(10, 1), "procotol_type")
	fp.SetCellValue(overview, cell(11, 1), "limit_interval")
	fp.SetCellValue(overview, cell(12, 1), "standard_model")
	fp.SetCellValue(overview, cell(13, 1), "command_max_register")
	fp.SetCellValue(overview, cell(14, 1), "protocol")

	fp.SetCellValue(overview, cell(10, 2), brdInfo.MustString("procotol_type"))
	fp.SetCellValue(overview, cell(11, 2), brdInfo.MustString("limit_interval"))
	fp.SetCellValue(overview, cell(12, 2), brdInfo.MustString("standard_model"))
	fp.SetCellValue(overview, cell(13, 2), brdInfo.MustString("command_max_register"))
	fp.SetCellValue(overview, cell(14, 2), brdInfo.MustString("protocol"))

	fp.SetCellValue(overview, cell(10, 3), "协议类型")
	fp.SetCellValue(overview, cell(11, 3), "命令间隔（单位ms）")
	fp.SetCellValue(overview, cell(12, 3), "标准化模板表")
	fp.SetCellValue(overview, cell(13, 3), "命令最大连续地址数")
	fp.SetCellValue(overview, cell(14, 3), "协议")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(15, 0), cell(17, 0))
	fp.SetCellValue(overview, cell(15, 0), "模板信息")

	fp.SetCellValue(overview, cell(15, 1), "template_name")
	fp.SetCellValue(overview, cell(16, 1), "version")
	fp.SetCellValue(overview, cell(17, 1), "group")

	fp.SetCellValue(overview, cell(15, 2), brdInfo.MustString("template_name"))
	fp.SetCellValue(overview, cell(16, 2), brdInfo.MustString("version"))
	fp.SetCellValue(overview, cell(17, 2), brdInfo.MustString("group"))

	fp.SetCellValue(overview, cell(15, 3), "模板名称")
	fp.SetCellValue(overview, cell(16, 3), "模板版本号")
	fp.SetCellValue(overview, cell(17, 3), "设备路径")

	// ============================================================

	{
		readSheet := "测点表_读"
		fp.NewSheet(readSheet)
		fp.SetCellValue(readSheet, cell(0, 0), "序号")
		fp.SetCellValue(readSheet, cell(0, 1), "协议测点名称")
		fp.SetCellValue(readSheet, cell(0, 2), "标准测点名称")
		fp.SetCellValue(readSheet, cell(0, 3), "变比(乘法)")
		fp.SetCellValue(readSheet, cell(0, 4), "解析函数")
		fp.SetCellValue(readSheet, cell(0, 5), "转换函数")
		fp.SetCellValue(readSheet, cell(0, 6), "状态映射")
		fp.SetCellValue(readSheet, cell(0, 7), "功能码")
		fp.SetCellValue(readSheet, cell(0, 8), "寄存器号")
		fp.SetCellValue(readSheet, cell(0, 9), "寄存器别名")
		fp.SetCellValue(readSheet, cell(0, 10), "bit位")
		fp.SetCellValue(readSheet, cell(0, 11), "标准化ID")
		fp.SetCellValue(readSheet, cell(0, 12), "单位")
		fp.SetCellValue(readSheet, cell(0, 13), "数据类型")
		fp.SetCellValue(readSheet, cell(0, 14), "是否展示")
		fp.SetCellValue(readSheet, cell(0, 15), "优先级")

		i := 0
		for _, s := range rSpots {
			fp.SetCellValue(readSheet, cell(i+1, 0), s["序号"])
			fp.SetCellValue(readSheet, cell(i+1, 1), s["协议测点名称"])
			fp.SetCellValue(readSheet, cell(i+1, 2), s["标准测点名称"])
			fp.SetCellValue(readSheet, cell(i+1, 3), s["变比(乘法)"])
			fp.SetCellValue(readSheet, cell(i+1, 4), s["解析函数"])
			fp.SetCellValue(readSheet, cell(i+1, 5), s["转换函数"])
			fp.SetCellValue(readSheet, cell(i+1, 6), s["状态映射"])
			fp.SetCellValue(readSheet, cell(i+1, 7), s["功能码"])
			fp.SetCellValue(readSheet, cell(i+1, 8), s["寄存器号"])
			fp.SetCellValue(readSheet, cell(i+1, 9), s["寄存器别名"])
			fp.SetCellValue(readSheet, cell(i+1, 10), s["bit位"])
			fp.SetCellValue(readSheet, cell(i+1, 11), s["标准化ID"])
			fp.SetCellValue(readSheet, cell(i+1, 12), s["单位"])
			fp.SetCellValue(readSheet, cell(i+1, 13), s["数据类型"])
			fp.SetCellValue(readSheet, cell(i+1, 14), s["是否展示"])
			fp.SetCellValue(readSheet, cell(i+1, 15), s["优先级"])
			i++
		}
	}
	// ============================================================
	{
		writeSheet := "测点表_写"
		fp.NewSheet(writeSheet)
		fp.SetCellValue(writeSheet, cell(0, 0), "序号")
		fp.SetCellValue(writeSheet, cell(0, 1), "协议测点名称")
		fp.SetCellValue(writeSheet, cell(0, 2), "标准测点名称")
		fp.SetCellValue(writeSheet, cell(0, 3), "变比(乘法)")
		fp.SetCellValue(writeSheet, cell(0, 4), "解析函数")
		fp.SetCellValue(writeSheet, cell(0, 5), "转换函数")
		fp.SetCellValue(writeSheet, cell(0, 6), "状态映射")
		fp.SetCellValue(writeSheet, cell(0, 7), "功能码")
		fp.SetCellValue(writeSheet, cell(0, 8), "寄存器号")
		fp.SetCellValue(writeSheet, cell(0, 9), "bit位")
		fp.SetCellValue(writeSheet, cell(0, 10), "标准化ID")
		fp.SetCellValue(writeSheet, cell(0, 11), "单位")
		fp.SetCellValue(writeSheet, cell(0, 12), "数据类型")
		fp.SetCellValue(writeSheet, cell(0, 13), "设置建议")
		fp.SetCellValue(writeSheet, cell(0, 14), "设置建议")
		fp.SetCellValue(writeSheet, cell(0, 15), "设置提示")

		i := 0
		for _, s := range wSpots {
			fp.SetCellValue(writeSheet, cell(i+1, 0), s["序号"])
			fp.SetCellValue(writeSheet, cell(i+1, 1), s["协议测点名称"])
			fp.SetCellValue(writeSheet, cell(i+1, 2), s["标准测点名称"])
			fp.SetCellValue(writeSheet, cell(i+1, 3), s["变比(乘法)"])
			fp.SetCellValue(writeSheet, cell(i+1, 4), s["解析函数"])
			fp.SetCellValue(writeSheet, cell(i+1, 5), s["转换函数"])
			fp.SetCellValue(writeSheet, cell(i+1, 6), s["状态映射"])
			fp.SetCellValue(writeSheet, cell(i+1, 7), s["功能码"])
			fp.SetCellValue(writeSheet, cell(i+1, 8), s["寄存器号"])
			fp.SetCellValue(writeSheet, cell(i+1, 9), s["bit位"])
			fp.SetCellValue(writeSheet, cell(i+1, 10), s["标准化ID"])
			fp.SetCellValue(writeSheet, cell(i+1, 11), s["单位"])
			fp.SetCellValue(writeSheet, cell(i+1, 12), s["数据类型"])
			fp.SetCellValue(writeSheet, cell(i+1, 13), s["设置建议"])
			fp.SetCellValue(writeSheet, cell(i+1, 14), s["设置建议"])
			fp.SetCellValue(writeSheet, cell(i+1, 15), s["设置提示"])
			i++
		}
	}
	// ============================================================
	{
		cmdSheet := "命令表"
		fp.NewSheet(cmdSheet)
		fp.SetCellValue(cmdSheet, cell(0, 0), "CMD")
		fp.SetCellValue(cmdSheet, cell(0, 1), "START_ADDR")
		fp.SetCellValue(cmdSheet, cell(0, 2), "END_ADDR")

		i := 0
		for _, c := range cmds {
			fp.SetCellValue(cmdSheet, cell(i+1, 0), c["CMD"])
			fp.SetCellValue(cmdSheet, cell(i+1, 1), c["START_ADDR"])
			fp.SetCellValue(cmdSheet, cell(i+1, 2), c["END_ADDR"])
			i++
		}
	}
	return fp.SaveAs(filename)
}

func pickBatSpots(spots []define.M, gCount int, bCount int) ([]define.M, error) {
	ptn, err := regexp.Compile(`(^([\p{Han}]+)(\d+)(([\p{Han}]+)|(\w+))$)|(^([\p{Han}]+)(\d+)([\p{Han}]+)(\d+)([\p{Han}]+)$)`)
	if err != nil {
		return nil, err
	}
	groupPtn, err := regexp.Compile(`^([\p{Han}]+)(\d+)(([\p{Han}]+)|(\w+))$`)
	if err != nil {
		return nil, err
	}
	batPtn, err := regexp.Compile(`^([\p{Han}]+)(\d+)([\p{Han}]+)(\d+)([\p{Han}]+)$`)
	if err != nil {
		return nil, err
	}

	cSpots := make([]define.M, 0, gCount*bCount+6)
	for _, s := range spots {
		name := s.MustString("协议测点名称")
		//fmt.Println(name, ptn.MatchString(name), groupPtn.MatchString(name), batPtn.MatchString(name))
		if !ptn.MatchString(name) {
			cSpots = append(cSpots, s)
			continue
		}
		if groupPtn.MatchString(name) {
			// 匹配 组1电压 结果为 [组1电压 组 1 电压 电压], 其中组号下标为 2
			//fmt.Println(name, groupPtn.FindStringSubmatch(name))
			gID := groupPtn.FindStringSubmatch(name)[2]
			g, _ := strconv.Atoi(gID)
			if g > gCount {
				continue
			}
			cSpots = append(cSpots, s)
			continue
		}
		if batPtn.MatchString(name) {
			// 匹配 组16第1节电压 结果为 [组1第1节电压 组 1 第 1 节电压], 其中组号下标为 2, 电池序号下标为 4
			//fmt.Println(name, batPtn.FindStringSubmatch(name))
			subStrs := batPtn.FindStringSubmatch(name)
			gID := subStrs[2]
			bID := subStrs[4]
			g, _ := strconv.Atoi(gID)
			if g > gCount {
				continue
			}
			b, _ := strconv.Atoi(bID)
			if b > bCount {
				continue
			}
			cSpots = append(cSpots, s)
			continue
		}
	}
	return cSpots, nil
}
