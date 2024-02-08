package configure

import (
	"fmt"
	"strings"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("check", "count_event_rules", CountEventRules, "统计告警规则", `count_event_rules`, []*reg.Param{})
}

// CountEventRules 统计告警规则
func CountEventRules() {
	slMap := map[string]int{
		"1": 0,
		"2": 0,
		"3": 0,
		"4": 0,
		"5": 0,
		"6": 0,
		"7": 0,
		"8": 0,
		"9": 0,
	}

	deviceCount := 0
	deviceRuleCount := 0
	spotCount := 0
	spotRuleCount := 0

	devices, err := getDevices("project_root")
	if err != nil {
		log.Errorf("get devices error: %s", err.Error())
		return
	}

	for _, d := range devices {
		if !strings.HasPrefix(d.MustLocation(), "project_root") {
			continue
		}
		deviceCount++

		spots, err := cmdb.GetChildren(d.ResourceID, 0, []string{"name", "ci_type", "location", "spot_type", "value_type", "event_rules"})
		if err != nil {
			log.Errorf("get spots for '%s' error: %s", d.ResourceID, err.Error())
			return
		}

		hasRule := false

		for _, spot := range spots {
			if spot.MustCiType() != "3" {
				continue
			}

			spotCount++

			rs := extractRules(spot)
			if len(rs) != 0 {
				spotRuleCount++
				hasRule = true
			}

			for _, r := range rs {
				if lvl, ok := r["level"]; ok {
					// 可能存在重复统计
					slMap[lvl]++
				}
			}
		}

		if hasRule {
			deviceRuleCount++
		}
	}

	fp := excelize.NewFile()

	fp.SetCellValue("Sheet1", cell(0, 1), "紧急告警")
	fp.SetCellValue("Sheet1", cell(0, 2), "严重告警")
	fp.SetCellValue("Sheet1", cell(0, 3), "重要告警")
	fp.SetCellValue("Sheet1", cell(0, 4), "次要告警")
	fp.SetCellValue("Sheet1", cell(0, 5), "预警")
	fp.SetCellValue("Sheet1", cell(0, 6), "已绑定数量")
	fp.SetCellValue("Sheet1", cell(0, 7), "全部数量")
	fp.SetCellValue("Sheet1", cell(0, 8), "覆盖率")

	fp.SetCellValue("Sheet1", cell(1, 0), "测点数量")
	fp.SetCellValue("Sheet1", cell(1, 1), slMap["1"])
	fp.SetCellValue("Sheet1", cell(1, 2), slMap["2"])
	fp.SetCellValue("Sheet1", cell(1, 3), slMap["3"])
	fp.SetCellValue("Sheet1", cell(1, 4), slMap["4"])
	fp.SetCellValue("Sheet1", cell(1, 5), slMap["5"])
	fp.SetCellValue("Sheet1", cell(1, 6), spotRuleCount)
	fp.SetCellValue("Sheet1", cell(1, 7), spotCount)
	fp.SetCellValue("Sheet1", cell(1, 8), fmt.Sprintf("%.2f", float32(spotRuleCount)/float32(spotCount)*100.0)+"%")

	fp.SetCellValue("Sheet1", cell(2, 0), "设备数量")
	fp.SetCellValue("Sheet1", cell(2, 1), "-")
	fp.SetCellValue("Sheet1", cell(2, 2), "-")
	fp.SetCellValue("Sheet1", cell(2, 3), "-")
	fp.SetCellValue("Sheet1", cell(2, 4), "-")
	fp.SetCellValue("Sheet1", cell(2, 5), "-")
	fp.SetCellValue("Sheet1", cell(2, 6), deviceRuleCount)
	fp.SetCellValue("Sheet1", cell(2, 7), deviceCount)
	fp.SetCellValue("Sheet1", cell(2, 8), fmt.Sprintf("%.2f", float32(deviceRuleCount)/float32(deviceCount)*100.0)+"%")

	fmt.Printf("\t\t紧急告警\t严重告警\t重要告警\t次要告警\t预警\t已绑定数量\t全部数量\t覆盖率\n")
	fmt.Printf("测点数量\t%d\t\t%d\t\t%d\t\t%d\t\t%d\t%d\t\t%d\t\t%s\n", slMap["1"], slMap["2"], slMap["3"], slMap["4"], slMap["5"], spotRuleCount, spotCount, fmt.Sprintf("%.2f", float32(spotRuleCount)/float32(spotCount)*100.0)+"%")
	fmt.Printf("设备数量\t-\t\t-\t\t-\t\t-\t\t-\t%d\t\t%d\t\t%s\n", deviceRuleCount, deviceCount, fmt.Sprintf("%.2f", float32(deviceRuleCount)/float32(deviceCount)*100.0)+"%")

	filename := fmt.Sprintf("告警规则统计-%s", time.Now().Format("20060102_150405"))
	if err := fp.SaveAs(filename + ".xlsx"); err != nil {
		log.Errorf("save to '%s.xlsx' error: %s", filename, err.Error())
		return
	}
	log.Infof("export to '%s.xlsx' success", filename)
}

func buildBindMap(ids []string) (map[string][]*cmdb.Resource, error) {
	bindSpots, err := cmdb.GetMultiRelated(ids, 14, 0, 0, []string{"ci_type", "name"})
	if err != nil {
		return nil, err
	}

	bindMap := make(map[string][]*cmdb.Resource)
	for _, spot := range bindSpots {
		if binds, ok := bindMap[spot.ResourceID1]; ok {
			bindMap[spot.ResourceID1] = append(binds, spot)
			continue
		}
		binds := make([]*cmdb.Resource, 0, 1)
		binds = append(binds, spot)
		bindMap[spot.ResourceID1] = binds
	}

	return bindMap, nil
}
