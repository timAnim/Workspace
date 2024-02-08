package configure

import (
	"fmt"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "addspot", AddSpot, "添加测点", `addspot <parentID> <name> <spotType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "name", Type: "string", Necessity: true, Desc: "测点名"},
		&reg.Param{Name: "spotType", Type: "int", Necessity: true, Desc: "测点类型(1:参数,2:状态)"},
	})
}

// AddSpot 添加关系
func AddSpot(parentID string, name string, spotType string) {
	p, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", parentID, err.Error())
		return
	}
	ids, err := cmdb.NewVersionFor("spot", 1)
	if err != nil {
		log.Errorf("new version for spot error: %s", err.Error())
		return
	}
	if (spotType != "1") && (spotType != "2") {
		log.Errorf("spot_type '%s' not support", spotType)
		return
	}
	valueType := "int"
	if spotType == "1" {
		valueType = "float"
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	vParentID := parentID
	if parentID == "project_root" {
		vParentID = "0_0"
	}
	location := parentID
	if pLoc, ok := p.Attributes["location"]; ok {
		location = fmt.Sprintf("%s/%s", pLoc.(string), parentID)
	}
	for _, id := range ids {
		ID := fmt.Sprintf("%s_%d_0", spotType, id)
		spotID := fmt.Sprintf("%s_%s", vParentID, ID)
		res := cmdb.Resource{
			ResourceID: spotID,
			Attributes: define.M{
				"id":          ID,
				"resource_id": spotID,
				"parent_id":   parentID,
				"location":    location,
				"input_param": "",
				"name":        name,
				"value_type":  valueType,
				"spot_type":   spotType,
				"unit":        " ",
				"precision":   "",
				"codec":       "",
				"codecex":     "",
				"filter":      "",
				"compressor":  "",
				"mapper":      "",
				"converter":   "",
				"storage":     "",
				"alias":       "",
				"ci_type":     "3",
				"group":       "",
				"data_source": "0",
				"default":     "",
				"access":      "r",
				"privilege":   "1",
				"aggregator":  "0",
				"ci_version":  "1.0",
				"event_rules": []string{},
			},
		}
		rel := cmdb.Relation{
			ResourceID1:  parentID,
			ResourceID2:  spotID,
			RelationCode: 5,
		}
		items.Resources = append(items.Resources, &res)
		items.Relations = append(items.Relations, &rel)
	}
	err = cmdb.AddItems(&items)
	if err != nil {
		log.Errorf("addspot error: %s", err.Error())
		return
	}
	log.Infof("addspot success")
}
