package configure

import (
	"fmt"
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "create_local_spot", CreateLocalSpot, "为子系统设备添加本层虚拟测点", `create_local_spot <parentID> <name> <spotType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "name", Type: "string", Necessity: true, Desc: "测点名"},
		&reg.Param{Name: "spotType", Type: "int", Necessity: true, Desc: "测点类型(1:参数,2:状态)"},
	})

	reg.RegistFunc(
		reg.WithGroup("configure"),
		reg.WithName("create_local_spot_with_id"),
		reg.WithCallback(CreateLocalSpotWithID),
		reg.WithHelp("新建本地测点，对于子系统设备ID的情况，且可指定测点id，将下划线去掉，如: 5_0_102 10000 -> 0_50102_1_10000_0"),
		reg.WithUsage("create_local_spot_with_id <parentID> <id> <name> <spotType>"),
		reg.WithParams([]*reg.Param{
			&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
			&reg.Param{Name: "id", Type: "string", Necessity: true, Desc: "指定测点id"},
			&reg.Param{Name: "name", Type: "string", Necessity: true, Desc: "测点名"},
			&reg.Param{Name: "spotType", Type: "int", Necessity: true, Desc: "测点类型(1:参数,2:状态)"},
		}),
		reg.WithRetVars([]*reg.Param{
			&reg.Param{Name: "spotID", Type: "string", Desc: "新建的测点ID"},
		}),
	)
}

// CreateLocalSpot 为子系统设备添加本层虚拟测点
func CreateLocalSpot(parentID string, name string, spotType string) {
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

	if !strings.HasPrefix(parentID, "0_") {
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
				"unit":        "",
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
		log.Errorf("create_local_spot error: %s", err.Error())
		return
	}
	log.Infof("create_local_spot success")
}

// CreateLocalSpotWithID 添加指定ID的虚拟测点
func CreateLocalSpotWithID(parentID string, id string, name string, spotType string) string {
	p, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", parentID, err.Error())
		return ""
	}

	x, err := strconv.Atoi(id)
	if err != nil {
		log.Errorf("unexpected id error: %s", err.Error())
		return ""
	}

	if x < 10000 {
		log.Errorf("spot id must be equal or greater than 10000")
		return ""
	}

	if (spotType != "1") && (spotType != "2") {
		log.Errorf("spot_type '%s' not support", spotType)
		return ""
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

	if !strings.HasPrefix(parentID, "0_") {
		vParentID = fmt.Sprintf("0_%s", strings.ReplaceAll(parentID, "_", ""))
	}

	location := parentID
	if pLoc, ok := p.Attributes["location"]; ok {
		location = fmt.Sprintf("%s/%s", pLoc.(string), parentID)
	}

	ID := fmt.Sprintf("%s_%d_0", spotType, x)
	spotID := fmt.Sprintf("%s_%s", vParentID, ID)
	ex, err := cmdb.GetItem(spotID, 0)
	if ex != nil {
		log.Warnf("spot '%s:%s' with resource_id '%s' is already existed", ex.ResourceID, ex.MustName(), ex.ResourceID)
	}
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
			"unit":        "",
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

	err = cmdb.AddItems(&items)
	if err != nil {
		log.Errorf("create_local_spot '%s:%s' error: %s", res.ResourceID, res.MustName(), err.Error())
		return ""
	}
	log.Infof("create_local_spot '%s:%s' success", res.ResourceID, res.MustName())
	return res.ResourceID
}
