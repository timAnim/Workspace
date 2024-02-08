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
	reg.Regist("apply", "apply_to_id", ApplyDevToID, "应用源节点设备配置到目标设备，需指定目标ID", `apply_to_id <srcID> <dstIDs>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源设备ID"},
		&reg.Param{Name: "dstIDs", Type: "string", Necessity: true, Desc: "目标设备ID(以','将多个设备ID隔开, 以执行批量应用)"},
	})
	reg.Regist("apply", "apply_by_id", ApplyDevByID, "应用源节点设备配置到同类设备", `apply_by_id <srcID>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源设备ID"},
	})
	reg.Regist("apply", "apply_to_id_without_deleted", ApplyDevToIDWithoutDeleted, "应用源节点设备配置到目标设备，需指定目标ID(删除的测点不会应用)", `apply_to_id_without_deleted <srcID> <dstIDs>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源设备ID"},
		&reg.Param{Name: "dstIDs", Type: "string", Necessity: true, Desc: "目标设备ID(以','将多个设备ID隔开, 以执行批量应用)"},
	})
	reg.Regist("apply", "apply_by_id_without_deleted", ApplyDevByIDWithoutDeleted, "应用源节点设备配置到同类设备(删除的测点不会应用)", `apply_by_id_without_deleted <srcID>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源设备ID"},
	})
	reg.Regist("apply", "set_apply_keys", SetApplyKeys, "设置测点应用生效字段, 为防止不知情错误应用, 默认不会有字段生效", `set_apply_keys <keys>`, []*reg.Param{
		&reg.Param{Name: "keys", Type: "string", Necessity: true, Desc: "字段列表, 以','隔开, 使用field_info指令可以查看可用字段"},
	})
	reg.Regist("apply", "set_apply_resume_deleted", SetApplyResumeDeleted, "设置测点应用时将删除的测点恢复掉，默认不恢复", `set_apply_resume_deleted`, []*reg.Param{})
}

//var ak = []string{"name", "event_rules", "mapper", "compressor", "filter", "presition", "unit", "storage"}
var ak = []string{}

// SetApplyKeys 设置应用字段
func SetApplyKeys(keys string) {
	if keys == "" {
		log.Warnf("please assign keys for apply")
		ak = []string{}
		return
	}
	ak = strings.Split(keys, ",")
	log.Infoln("set apply keys:", ak)
}

var resumeDeleted = 0

// SetApplyResumeDeleted 设置应用时恢复删除测点的情况
func SetApplyResumeDeleted() {
	resumeDeleted = 1
	log.Infoln("set resume deleted:", resumeDeleted)
}

// ApplyDevToID 应用更改到同类设备, 指定ID
func ApplyDevToID(srcID string, dstIDs string) {
	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get source node '%s' error: %s", srcID, err.Error())
		return
	}
	//fmt.Println(src)
	ids := strings.Split(dstIDs, ",")
	dsts, err := cmdb.GetItemsWhereResourceIDIn(ids)
	if err != nil {
		log.Errorf("get target nodes '%s' error: %s", dstIDs, err.Error())
		return
	}

	var srcDeviceType string
	if t, ok := src.Attributes["device_type"]; ok {
		srcDeviceType = t.(string)
	} else {
		log.Errorf("src node '%s' has no attribute 'device_type'", srcID)
		return
	}
	// TODO: 目标节点应用内容: template_page
	templatePage := src.Attributes["template_page"]

	srcChildren, err := cmdb.GetChildren(srcID, 1, nil)
	if err != nil {
		log.Errorf("get source '%s' children with deleted error: %s", srcID, err.Error())
		return
	}
	for _, d := range dsts {
		items := cmdb.Items{
			Resources: []*cmdb.Resource{},
			Relations: []*cmdb.Relation{},
			DumpData:  "yes",
		}
		// TODO: 校验设备类型
		var dstDeviceType string
		if t, ok := d.Attributes["device_type"]; ok {
			dstDeviceType = t.(string)
			if dstDeviceType != srcDeviceType {
				log.Errorf("target node '%s' attribute 'device_type' does not match with source", d.ResourceID)
				return
			}
		} else {
			log.Errorf("target node '%s' has no attribute 'device_type'", d.ResourceID)
			return
		}
		// TODO: 校验测点导入方式创建的设备

		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: d.ResourceID,
			Attributes: define.M{
				"template_page": templatePage,
			},
			Deleted: d.Deleted,
		})
		// 根据源节点构造需要应用的信息
		dstChildren, err := cmdb.GetChildren(d.ResourceID, resumeDeleted, nil)
		if err != nil {
			log.Errorf("get dst '%s' children with deleted error: %s", d.ResourceID, err.Error())
			continue
		}
		dstMap := map[string]*cmdb.Resource{}
		for _, c := range dstChildren {
			dstMap[c.ResourceID] = c
		}
		dc := 0
		for _, child := range srcChildren {
			if ct, ok := child.Attributes["ci_type"]; ok {
				if ct.(string) != "3" {
					continue
				}
			} else {
				continue
			}
			attr := define.M{}
			for _, k := range ak {
				if m, ok := child.Attributes[k]; ok {
					attr[k] = m
				}
			}
			attr["ci_type"] = child.Attributes["ci_type"]
			spotID := ""
			if id, ok := child.Attributes["id"]; ok {
				spotID = fmt.Sprintf("%s_%s", d.ResourceID, id)
			} else if id, ok := child.Attributes["map_ids"]; ok {
				spotID = fmt.Sprintf("%s_%s", d.ResourceID, id)
			}
			if spotID == "" {
				log.Warnf("spot %s error: no id or map_ids", child.ResourceID)
				continue
			}
			dSpot, ok := dstMap[spotID]
			if !ok {
				continue
			}
			deleted := child.Deleted
			if resumeDeleted == 0 {
				deleted = dSpot.Deleted
			}

			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: attr,
				Deleted:    deleted,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  d.ResourceID,
				ResourceID2:  spotID,
				RelationCode: 5,
				Deleted:      deleted,
			})
			if deleted == 1 {
				dc++
			}
		}
		//fmt.Printf("prepare to apply to '%s:%s' deleted count: %d\n", d.ResourceID, d.Attributes["name"].(string), dc)
		err = cmdb.UpsertItems(&items)
		if err != nil {
			log.Errorf("apply change from '%s' to '%s' error: %s", srcID, d.ResourceID, err.Error())
			continue
		}
		log.Infof("apply change from '%s' to '%s' success", srcID, d.ResourceID)
	}
}

// ApplyDevByID 应用更改到同类设备
func ApplyDevByID(srcID string) {
	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get source node '%s' error: %s", srcID, err.Error())
		return
	}
	if t, ok := src.Attributes["device_type"]; ok {
		deviceType := t.(string)
		res, err := cmdb.GetItemsByDeviceType(deviceType)
		if err != nil {
			log.Errorf("get target nodes by device_type '%s' error: %s", deviceType, err.Error())
			return
		}
		ids := []string{}
		for _, r := range res {
			ids = append(ids, r.ResourceID)
		}
		dstIDs := strings.Join(ids, ",")
		ApplyDevToID(srcID, dstIDs)
		return
	}
	log.Errorf("apply change by id '%s' error: %s", srcID, err.Error())
}

// ApplyDevToIDWithoutDeleted 应用更改到同类设备, 指定ID, 不改变测点的删除状态
func ApplyDevToIDWithoutDeleted(srcID string, dstIDs string) {
	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get source node '%s' error: %s", srcID, err.Error())
		return
	}
	//fmt.Println(src)
	ids := strings.Split(dstIDs, ",")
	dsts, err := cmdb.GetItemsWhereResourceIDIn(ids)
	if err != nil {
		log.Errorf("get target nodes '%s' error: %s", dstIDs, err.Error())
		return
	}

	var srcDeviceType string
	if t, ok := src.Attributes["device_type"]; ok {
		srcDeviceType = t.(string)
	} else {
		log.Errorf("src node '%s' has no attribute 'device_type'", srcID)
		return
	}
	// TODO: 目标节点应用内容: template_page
	templatePage := src.Attributes["template_page"]

	srcChildren, err := cmdb.GetChildren(srcID, 1, nil)
	if err != nil {
		log.Errorf("get source '%s' children with deleted error: %s", srcID, err.Error())
		return
	}
	for _, d := range dsts {
		items := cmdb.Items{
			Resources: []*cmdb.Resource{},
			Relations: []*cmdb.Relation{},
			DumpData:  "yes",
		}
		dChildren, err := cmdb.GetChildren(d.ResourceID, 1, nil)
		if err != nil {
			log.Errorf("get source '%s' children with deleted error: %s", d.ResourceID, err.Error())
			return
		}
		dCMap := map[string]*cmdb.Resource{}
		for _, c := range dChildren {
			dCMap[c.ResourceID] = c
		}

		// TODO: 校验设备类型
		var dstDeviceType string
		if t, ok := d.Attributes["device_type"]; ok {
			dstDeviceType = t.(string)
			if dstDeviceType != srcDeviceType {
				log.Errorf("target node '%s' attribute 'device_type' does not match with source", d.ResourceID)
				return
			}
		} else {
			log.Errorf("target node '%s' has no attribute 'device_type'", d.ResourceID)
			return
		}
		// TODO: 校验测点导入方式创建的设备

		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: d.ResourceID,
			Attributes: define.M{
				"template_page": templatePage,
			},
		})
		// 根据源节点构造需要应用的信息
		dc := 0
		for _, child := range srcChildren {
			if ct, ok := child.Attributes["ci_type"]; ok {
				if ct.(string) != "3" {
					continue
				}
			} else {
				continue
			}
			spotID := fmt.Sprintf("%s_%s", d.ResourceID, child.Attributes["id"].(string))
			deleted := child.Deleted
			if c, ok := dCMap[spotID]; ok {
				deleted = c.Deleted
			}
			attr := define.M{}
			//ak := []string{"name", "event_rules", "mapper", "compressor", "filter", "presition", "unit", "storage"}
			for _, k := range ak {
				if m, ok := child.Attributes[k]; ok {
					attr[k] = m
				}
			}
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: attr,
				Deleted:    deleted,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  d.ResourceID,
				ResourceID2:  spotID,
				RelationCode: 5,
				Deleted:      deleted,
			})
			if deleted == 1 {
				dc++
			}
		}
		//fmt.Printf("prepare to apply to '%s:%s' deleted count: %d\n", d.ResourceID, d.Attributes["name"].(string), dc)
		err = cmdb.UpsertItems(&items)
		if err != nil {
			log.Errorf("apply change from '%s' to '%s' error: %s", srcID, d.ResourceID, err.Error())
			continue
		}
		log.Infof("apply change from '%s' to '%s' success", srcID, d.ResourceID)
	}
}

// ApplyDevByIDWithoutDeleted 应用更改到同类设备
func ApplyDevByIDWithoutDeleted(srcID string) {
	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get source node '%s' error: %s", srcID, err.Error())
		return
	}
	if t, ok := src.Attributes["device_type"]; ok {
		deviceType := t.(string)
		res, err := cmdb.GetItemsByDeviceType(deviceType)
		if err != nil {
			log.Errorf("get target nodes by device_type '%s' error: %s", deviceType, err.Error())
			return
		}
		ids := []string{}
		for _, r := range res {
			ids = append(ids, r.ResourceID)
		}
		dstIDs := strings.Join(ids, ",")
		ApplyDevToIDWithoutDeleted(srcID, dstIDs)
		return
	}
	log.Errorf("apply change by id '%s' error: %s", srcID, err.Error())
}
