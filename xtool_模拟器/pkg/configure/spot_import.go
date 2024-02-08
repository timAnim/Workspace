package configure

import (
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "spot_import", SpotImport, "子系统测点导入", `spot_import <parentID> <spotID>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "目标设备ID"},
		&reg.Param{Name: "spotID", Type: "string", Necessity: true, Desc: "数据源测点ID"},
	})
}

// SpotImport 测点绑定
func SpotImport(parentID string, spotID string) {
	if strings.HasPrefix(spotID, "0_") {
		log.Errorf("do not support to import local spot '%s' to any node", spotID)
		return
	}

	if !strings.HasPrefix(parentID, "0_") {
		log.Errorf("do not support to import spot '%s' to none local node '%s'", spotID, parentID)
		return
	}

	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent node '%s' error: %s", parentID, err.Error())
		return
	}

	if !parent.IsDevice() {
		log.Errorf("parent node '%s:%s' is not device", parent.ResourceID, parent.MustName())
		return
	}

	spot, err := cmdb.GetItem(spotID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", spotID, err.Error())
		return
	}

	if !spot.IsSpot() {
		log.Errorf("cannot import none spot node '%s:%s'", spot.ResourceID, spot.MustName())
		return
	}

	if spot.MustHasAdd() {
		log.Errorf("spot '%s:%s' is already been import to '%s'", spot.ResourceID, spot.MustName(), spot.MustParentID())
		return
	}

	// 统一添加一个board_options strategy 以便采集启动能加载设备或空间
	parent.AddBoardOption("strategy")

	items := &cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 10),
		Relations: make([]*cmdb.Relation, 0, 10),
	}

	// 构造请求数据
	items.Resources = append(items.Resources, parent)

	location := "project_root"
	if parent.MustLocation() != "" {
		location = strings.Join([]string{parent.MustLocation(), parent.ResourceID}, "/")
	}

	spot.Attributes["hasAdd"] = true
	spot.Attributes["parent_id"] = parent.ResourceID
	spot.Attributes["location"] = location
	items.Resources = append(items.Resources, spot)

	// 增加14号关系
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  parent.ResourceID,
		ResourceID2:  spot.ResourceID,
		RelationCode: 5,
	})

	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("spot_import '%s:%s' --> '%s:%s' upsert items error: %s", spot.ResourceID, spot.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	log.Infof("spot_import '%s:%s' --> '%s:%s' success", spot.ResourceID, spot.MustName(), parent.ResourceID, parent.MustName())
}
