package configure

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("resume", "resume", Resume, "恢复节点, 仅恢复节点本身与其父节点的关系, 若要恢复设备本身，请配合refresh系列指令使用", `resume <deviceID> <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
	})
	//reg.Regist("resume", "resume_from_device", ResumeFromDevice, "从设备恢复被删除的测点", `resume_from_device <deviceID> <spotIDs>`, []*reg.Param{
	//	&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	//	&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "要恢复的测点ID列表, 以','隔开"},
	//})
}

// Resume 恢复删除的节点
func Resume(resourceID string) {
	node, err := cmdb.GetItem(resourceID, 1)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	parents, err := cmdb.GetParent(node.ResourceID, 1, nil)
	if err != nil {
		log.Errorf("get parents of '%s' error: %s", node.ResourceID, err.Error())
		return
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
		DumpData:  "yes",
	}
	node.Deleted = 0
	items.Resources = append(items.Resources, node)
	for _, p := range parents {
		if p.Deleted == 0 {
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  p.ResourceID,
				ResourceID2:  node.ResourceID,
				RelationCode: 5,
			})
		}
	}
	if len(items.Relations) > 1 {
		rels := []string{}
		for _, r := range items.Relations {
			rels = append(rels, fmt.Sprintf("%s-%d->%s", r.ResourceID1, r.RelationCode, r.ResourceID2))
		}
		log.Warnf("going to resume multi relations: %v, to repair, use command 'delete_rel'", rels)
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("resume node '%s' error: %s", node, err.Error())
		return
	}
	log.Infof("resume node '%s' success", resourceID)
	if isDevice(node) {
		if bds, ok := node.Attributes["board_options"]; ok {
			boards := bds.([]interface{})
			if len(boards) == 1 {
				Resume(boards[0].(string))
			}
		}
	}
}

// ResumeFromDevice 恢复删除的节点
func ResumeFromDevice(deviceID string, spotIDs string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	resourceIDs := []string{}
	for _, id := range strings.Split(spotIDs, ",") {
		resourceIDs = append(resourceIDs, strings.Join([]string{device.ResourceID, id}, "_"))
	}
	children, err := cmdb.GetChildren(device.ResourceID, 1, nil)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
		DumpData:  "yes",
	}
	for _, c := range children {
		if len(resourceIDs) != 0 {
			for _, id := range resourceIDs {
				if id == c.ResourceID {
					c.Deleted = 0
					items.Resources = append(items.Resources, c)
					items.Relations = append(items.Relations, &cmdb.Relation{
						ResourceID1:  device.ResourceID,
						ResourceID2:  c.ResourceID,
						RelationCode: 5,
					})
				}
			}
			continue
		}
		c.Deleted = 0
		items.Resources = append(items.Resources, c)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  device.ResourceID,
			ResourceID2:  c.ResourceID,
			RelationCode: 5,
		})
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("resume spots '%s' error: %s", spotIDs, err.Error())
		return
	}
	log.Infof("resume spots '%s' success", spotIDs)
}

func isDevice(node *cmdb.Resource) bool {
	if ct, ok := node.Attributes["ci_type"]; ok {
		if ct.(string) == "2" {
			return true
		}
	}
	return false
}
