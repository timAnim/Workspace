package configure

import (
	"fmt"
	"strings"
	"time"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "brd_to_xlsx", BrdToXlsx, "从.brd生成excel点表", `brd_to_xlsx <boardType>`, []*reg.Param{
		&reg.Param{Name: "boardType", Type: "string", Necessity: true, Desc: "板卡类型，可以'.'或'_'分隔"},
	})
}

func getGroupLoc(boardType string) (string, error) {
	boardType = strings.ReplaceAll(boardType, "_", ".")
	gd, err := driver.GetGroupDev()
	if err != nil {
		return "", err
	}
	gdMap := map[string]*driver.GroupDevItem{}
	for _, g := range gd {
		gdMap[g.ID] = g
	}
	if _, ok := gdMap[boardType]; !ok {
		return "", fmt.Errorf("board_type '%s' not found", boardType)
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
	return transLoc(boardType), nil
}

// BrdToXlsx 从.brd文件生成excel点表
func BrdToXlsx(boardType string) {
	boardType = strings.ReplaceAll(boardType, ".", "_")

	vs := strings.Split(boardType, "_")
	if len(vs) != 7 {
		log.Errorf("boardType '%s' is illegal", boardType)
		return
	}
	brd, err := driver.GetBrd(boardType)
	if err != nil {
		log.Errorf("driver.GetBrd '%s' error: %s", boardType, err.Error())
		return
	}

	loc, err := getGroupLoc(boardType)
	if err != nil {
		log.Warnf("getGroupLoc error: %s", err.Error())
		loc = ""
	}

	fp := excelize.NewFile()

	overview := "设备信息表"
	if fp.GetSheetIndex("Sheet1") != 0 {
		fp.SetSheetName("Sheet1", overview)
	} else {
		fp.NewSheet(overview)
	}

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

	fp.SetCellValue(overview, cell(1, 2), "")
	fp.SetCellValue(overview, cell(2, 2), "")
	fp.SetCellValue(overview, cell(3, 2), "")
	fp.SetCellValue(overview, cell(4, 2), brd.Board.MustString("board_type"))
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

	fp.SetCellValue(overview, cell(6, 2), "")
	fp.SetCellValue(overview, cell(7, 2), "")

	fp.SetCellValue(overview, cell(6, 3), "协议文档名称")
	fp.SetCellValue(overview, cell(7, 3), "协议内容标题")

	// ------------------------------------------------------------
	fp.MergeCell(overview, cell(8, 0), cell(9, 0))
	fp.SetCellValue(overview, cell(8, 0), "维护信息")

	fp.SetCellValue(overview, cell(8, 1), "author")
	fp.SetCellValue(overview, cell(9, 1), "create_time")

	fp.SetCellValue(overview, cell(8, 2), "cli")
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

	fp.SetCellValue(overview, cell(10, 2), "")
	fp.SetCellValue(overview, cell(11, 2), brd.Board.MustString("limit_interval"))
	fp.SetCellValue(overview, cell(12, 2), "0")
	fp.SetCellValue(overview, cell(13, 2), "128")
	fp.SetCellValue(overview, cell(14, 2), "")

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

	fp.SetCellValue(overview, cell(15, 2), "")
	fp.SetCellValue(overview, cell(16, 2), "2")
	fp.SetCellValue(overview, cell(17, 2), loc)

	fp.SetCellValue(overview, cell(15, 3), "模板名称")
	fp.SetCellValue(overview, cell(16, 3), "模板版本号")
	fp.SetCellValue(overview, cell(17, 3), "设备路径")

	// ============================================================

	brd.Spots.Sort()

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
		for _, s := range brd.Spots {
			access := s.MustString("access")
			if !strings.Contains(access, "r") {
				continue
			}
			fp.SetCellValue(readSheet, cell(i+1, 0), s.MustString("id"))
			fp.SetCellValue(readSheet, cell(i+1, 1), s.MustString("name"))
			fp.SetCellValue(readSheet, cell(i+1, 2), s.MustString("name"))
			fp.SetCellValue(readSheet, cell(i+1, 3), "")
			fp.SetCellValue(readSheet, cell(i+1, 4), "")
			fp.SetCellValue(readSheet, cell(i+1, 5), "")
			fp.SetCellValue(readSheet, cell(i+1, 6), s.MustString("mapper"))
			fp.SetCellValue(readSheet, cell(i+1, 7), "")
			fp.SetCellValue(readSheet, cell(i+1, 8), "")
			fp.SetCellValue(readSheet, cell(i+1, 9), "")
			fp.SetCellValue(readSheet, cell(i+1, 10), "")
			fp.SetCellValue(readSheet, cell(i+1, 11), s.MustString("map_ids"))
			fp.SetCellValue(readSheet, cell(i+1, 12), s.MustString("unit"))
			fp.SetCellValue(readSheet, cell(i+1, 13), s.MustString("value_type"))
			fp.SetCellValue(readSheet, cell(i+1, 14), "")
			fp.SetCellValue(readSheet, cell(i+1, 15), "")
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
		for _, s := range brd.Spots {
			access := s.MustString("access")
			if !strings.Contains(access, "w") {
				continue
			}
			fp.SetCellValue(writeSheet, cell(i+1, 0), s.MustString("id"))
			fp.SetCellValue(writeSheet, cell(i+1, 1), s.MustString("name"))
			fp.SetCellValue(writeSheet, cell(i+1, 2), s.MustString("name"))
			fp.SetCellValue(writeSheet, cell(i+1, 3), "")
			fp.SetCellValue(writeSheet, cell(i+1, 4), "")
			fp.SetCellValue(writeSheet, cell(i+1, 5), "")
			fp.SetCellValue(writeSheet, cell(i+1, 6), s.MustString("mapper"))
			fp.SetCellValue(writeSheet, cell(i+1, 7), "")
			fp.SetCellValue(writeSheet, cell(i+1, 8), "")
			fp.SetCellValue(writeSheet, cell(i+1, 9), "")
			fp.SetCellValue(writeSheet, cell(i+1, 10), s.MustString("map_ids"))
			fp.SetCellValue(writeSheet, cell(i+1, 11), s.MustString("unit"))
			fp.SetCellValue(writeSheet, cell(i+1, 12), s.MustString("value_type"))
			fp.SetCellValue(writeSheet, cell(i+1, 13), "")
			fp.SetCellValue(writeSheet, cell(i+1, 14), "")
			fp.SetCellValue(writeSheet, cell(i+1, 15), "")
			i++
		}
	}

	// ============================================================
	filename := fmt.Sprintf("%s.xlsx", boardType)
	err = fp.SaveAs(filename)
	if err != nil {
		log.Errorf("brd_to_xlsx save as '%s' error: %s", filename, err.Error())
		return
	}
	log.Infof("brd_to_xlsx to '%s' success", filename)
}
