package configure

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "export_bind", ExportBind, "导出绑定关系", `export_bind <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "导出设备测点绑定关系"},
	})
}

func cell(i, j int) string {
	return fmt.Sprintf("%s%d", utils.ToAlphaString(j), i+1)
}

// ExportBind 导出绑定测点
func ExportBind(deviceID string) {
	if strings.Index(deviceID, "0_") != 0 {
		log.Errorf("illegal local device_id '%s', must startswith '0_'", deviceID)
		return
	}
	d, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}

	spots, err := cmdb.GetChildren(deviceID, 0, []string{"ci_type", "name"})
	if err != nil {
		log.Errorf("get spots of '%s:%s' error: %s", deviceID, d.MustName(), err.Error())
		return
	}
	ids := make([]string, 0, len(spots))

	for _, spot := range spots {
		if !spot.IsSpot() {
			continue
		}
		ids = append(ids, spot.ResourceID)
	}

	bindSpots, err := cmdb.GetMultiRelated(ids, 14, 0, 0, []string{"ci_type", "name"})
	if err != nil {
		log.Errorf("get bind spots error: %s", err.Error())
		return
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

	fp := excelize.NewFile()
	resSheet := fp.GetSheetName(1)
	fp.SetCellValue(resSheet, cell(0, 0), "index")
	fp.SetCellValue(resSheet, cell(0, 1), "resource_id")
	fp.SetCellValue(resSheet, cell(0, 2), "name")
	fp.SetCellValue(resSheet, cell(0, 3), "bind_ids")
	fp.SetCellValue(resSheet, cell(0, 4), "bind_names")

	for i, r := range spots {
		fp.SetCellValue(resSheet, cell(i+1, 0), i+1)
		fp.SetCellValue(resSheet, cell(i+1, 1), r.ResourceID)
		fp.SetCellValue(resSheet, cell(i+1, 2), r.MustName())
		if binds, ok := bindMap[r.ResourceID]; ok {
			bindIDs := make([]string, 0, len(binds))
			bindNames := make([]string, 0, len(binds))
			for _, bind := range binds {
				bindIDs = append(bindIDs, bind.ResourceID2)
				bindNames = append(bindNames, bind.MustName())
			}
			fp.SetCellValue(resSheet, cell(i+1, 3), strings.Join(bindIDs, ","))
			fp.SetCellValue(resSheet, cell(i+1, 4), strings.Join(bindNames, ","))
		}
	}
	fileName := fmt.Sprintf("binding-%s.xlsx", deviceID)
	err = fp.SaveAs(fileName)
	if err != nil {
		log.Errorf("export_bind save as '%s' error: %s", fileName, err.Error())
		return
	}
	log.Infof("export_bind to '%s' success", fileName)

}
