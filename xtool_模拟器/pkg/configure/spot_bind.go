package configure

import (
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "spot_bind", SpotBind, "测点绑定", `spot_bind <spotID> <srcID>`, []*reg.Param{
		&reg.Param{Name: "spotID", Type: "string", Necessity: true, Desc: "需要绑定的测点ID"},
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "数据源测点ID"},
	})
}

// SpotBind 测点绑定
func SpotBind(spotID string, srcID string) {
	if !strings.HasPrefix(spotID, "0_") {
		log.Errorf("do not support to bind local spot '%s' to any node", spotID)
		return
	}

	//if strings.HasPrefix(srcID, "0_") {
	//	log.Errorf("do not support to bind local spot '%s' to local node '%s'", spotID, srcID)
	//	return
	//}

	spot, err := cmdb.GetItem(spotID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", spotID, err.Error())
		return
	}

	if !spot.IsSpot() {
		log.Errorf("cannot bind none spot node '%s:%s'", spot.ResourceID, spot.MustName())
		return
	}

	parent, err := cmdb.GetItem(spot.MustParentID(), 0)
	if err != nil {
		log.Errorf("get parent node of '%s:%s' by resource_id '%s' error: %s", spot.ResourceID, spot.MustName(), spot.MustParentID(), err.Error())
		return
	}

	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", srcID, err.Error())
		return
	}

	if !src.IsSpot() {
		log.Errorf("cannot bind to none spot node '%s:%s'", src.ResourceID, src.MustName())
		return
	}

	// 检查测点绑定关系
	binds, err := cmdb.GetRelated(spot.ResourceID, 14, 0, 0, []string{"name", "ci_type"})
	if err != nil {
		log.Errorf("get binds of '%s:%s' error: %s", spot.ResourceID, spot.MustName(), err.Error())
		return
	}

	if len(binds) != 0 {
		log.Errorf("spot '%s:%s' is already bind to '%s:%s'", spot.ResourceID, spot.MustName(), binds[0].ResourceID, binds[0].MustName())
		return
	}

	// 统一添加一个board_options strategy 以便采集启动能加载设备或空间
	parent.AddBoardOption("strategy")

	// TODO: 测点类型检查？

	items := &cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 10),
		Relations: make([]*cmdb.Relation, 0, 10),
	}

	// 构造请求数据
	items.Resources = append(items.Resources, &cmdb.Resource{
		ResourceID: parent.ResourceID,
		Attributes: define.M{
			"board_options": parent.MustBoardOptions(),
		},
	})

	// 增加14号关系
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  spot.ResourceID,
		ResourceID2:  src.ResourceID,
		RelationCode: 14,
	})

	err = cmdb.UpsertItems(items)
	if err != nil {
		log.Errorf("spot_bind '%s:%s' --bind-to--> '%s:%s' upsert items error: %s", spot.ResourceID, spot.MustName(), src.ResourceID, src.MustName(), err.Error())
		return
	}

	log.Infof("spot_bind '%s:%s' --bind-to-> '%s:%s' success", spot.ResourceID, spot.MustName(), src.ResourceID, src.MustName())
}
