package configure

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "add_location", AddLocation, "刷location", `add_location <parentID> <resourceIDs>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "resourceIDs", Type: "string", Necessity: false, Desc: "目标节点ID, 以','隔开, 不填的话从parentID往下全刷"},
	})
	reg.Regist("configure", "repair_location", RepairLocation, "修复location", `repair_location <rootID>`, []*reg.Param{
		&reg.Param{Name: "rootID", Type: "string", Necessity: true, Desc: "待修复的根节点ID"},
	})
}

// AddLocation 移动
func AddLocation(parentID string, resourceIDs string) {
	ids := strings.Split(resourceIDs, ",")
	if resourceIDs == "" {
		items, err := cmdb.GetChildren(parentID, 0, []string{"ci_type", "location"})
		if err != nil {
			log.Errorf("add location for '%s' cmdb.GetChildren error: %s", parentID, err.Error())
			return
		}
		ids = []string{}
		for _, r := range items {
			ids = append(ids, r.ResourceID)
		}
	}
	err := cmdb.Bind(parentID, ids)
	if err != nil {
		log.Errorf("add location for '%s' to '%s' error: %s", strings.Join(ids, ","), parentID, err.Error())
		return
	}
	log.Infof("add location for '%s' to '%s' success", strings.Join(ids, ","), parentID)
}

// RepairLocation 修复location
func RepairLocation(rootID string) {
	root, err := cmdb.GetItem(rootID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", rootID, err.Error())
		return
	}
	if _, ok := root.Attributes["location"]; !ok {
		log.Errorf("root node '%s' has no field 'location'", rootID)
		return
	}
	recurseRepairLocation(root)
}

func recurseRepairLocation(root *cmdb.Resource) {
	children, err := cmdb.GetChildren(root.ResourceID, 0, []string{"ci_type", "location"})
	if err != nil {
		log.Errorf("get children of '%s' error: %s", root.ResourceID, err.Error())
		return
	}
	location := root.ResourceID
	if loc, ok := root.Attributes["location"]; ok {
		if loc.(string) != "" {
			location = fmt.Sprintf("%s/%s", loc, root.ResourceID)
		}
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	for _, c := range children {
		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: c.ResourceID,
			Attributes: define.M{
				"location":  location,
				"parent_id": root.ResourceID,
			},
		})
		c.Attributes["location"] = location
	}
	err = cmdb.UpsertItems(items)
	if err != nil {
		log.Errorf("update children of '%s' error: %s", root.ResourceID, err.Error())
		return
	}
	log.Infof("repair children of '%s' location as '%s' success", root.ResourceID, location)
	for _, c := range children {
		if isSpot(c) {
			continue
		}
		recurseRepairLocation(c)
	}
}

func isSpot(node *cmdb.Resource) bool {
	if ct, ok := node.Attributes["ci_type"]; ok {
		if ct.(string) == "3" {
			return true
		}
	}
	return false
}
