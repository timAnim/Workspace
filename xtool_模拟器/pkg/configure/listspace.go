package configure

import (
	"fmt"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	"github.com/tealeg/xlsx"
)

func init() {
	reg.Regist("list", "list_space", ListSpace, "输出空间列表", `list_space`, []*reg.Param{})
	reg.Regist("list", "export_space", ExportSpace, "导出空间列表", `export_space`, []*reg.Param{})
}

// ListSpace 列出空间
func ListSpace() {
	spaces, err := cmdb.GetSpaces()
	if err != nil {
		log.Errorf("get spaces error: %s", err.Error())
		return
	}
	for _, space := range spaces {
		fmt.Println(space.ResourceID, space.Attributes["name"])
	}
}

// ExportSpace 导出设备列表, 生成excel: device-prefix+x
func ExportSpace() {
	spaces, err := cmdb.GetSpaces()
	if err != nil {
		log.Errorf("get spaces error: %s", err.Error())
		return
	}
	for _, space := range spaces {
		fmt.Println(space.ResourceID, space.Attributes["name"])
	}
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("spaces")
	if err != nil {
		log.Errorf("add sheet fail, error: %s", err.Error())
		return
	}

	headers := []string{"resource_id", "name", "space_type", "_location_translated"}
	for j, h := range headers {
		sheet.Cell(0, j).SetString(fmt.Sprintf("%v", h))
	}
	for i, s := range spaces {
		for j, h := range headers {
			sheet.Cell(i+1, j).SetString(fmt.Sprintf("%v", s.Attributes[h]))
		}
	}

	filename := fmt.Sprintf("spaces-%s.xlsx", auth.GetHost())
	err = xlsxFile.Save(filename)
	if err != nil {
		log.Errorf("save xlsx file failed, error: %s", err.Error())
		return
	}
	log.Infof("export spaces to '%s' success", filename)
}
