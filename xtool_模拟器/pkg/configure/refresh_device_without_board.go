package configure

import (
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("refresh", "refresh_device_without_board", RefreshDeviceWithoutBoard, "用于子系统设备绑定更新模板dev文件的情况下的设备模板重刷更新", `refresh_device_without_board <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("refresh", "refresh_device_by_id", RefreshDevByDeviceID, "按ID从模板刷新同类设备测点(只支持刷本层原始设备)，不包含对应板卡测点更新", `refresh_device_by_id <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("refresh", "refresh_device_by_device_type", RefreshDevByDeviceType, "按ID从模板刷新同类设备测点(只支持刷本层原始设备)，不包含对应板卡测点更新", `refresh_device_by_device_type <deviceType>`, []*reg.Param{
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
	})
}

// RefreshDeviceWithoutBoard 按ID从模板刷新设备相关CI项
func RefreshDeviceWithoutBoard(deviceID string) {
	if strings.Index(deviceID, "0_") != 0 {
		log.Errorf("illegal local device_id '%s', must startswith '0_'", deviceID)
		return
	}
	d, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	delDSpotCount := 0
	newDSpotCount := 0
	if deviceType := d.Attributes.MustString("device_type"); deviceType != "" {
		dev, err := driver.GetDev(deviceType)
		if err != nil {
			log.Errorf("get device '%s' template '%s' error: %s", deviceID, deviceType, err.Error())
			return
		}
		// 删除原有设备测点
		dChildren, err := cmdb.GetChildren(deviceID, 1, nil)
		if err != nil {
			log.Errorf("get device '%s' children with deleted error: %s", deviceID, err.Error())
			return
		}
		items := cmdb.Items{
			Resources: []*cmdb.Resource{},
			Relations: []*cmdb.Relation{},
			DumpData:  "yes",
		}
		childMap := map[string]*cmdb.Resource{}
		spotIDs := make([]string, 0, len(dChildren))
		for _, c := range dChildren {
			spotIDs = append(spotIDs, c.ResourceID)

			if c.Attributes.MustString("ci_type") != "3" {
				continue
			}

			childMap[c.ResourceID] = c
			// 先删除原测点
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: c.ResourceID,
				Attributes: define.M{},
				Deleted:    1,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  d.ResourceID,
				ResourceID2:  c.ResourceID,
				RelationCode: 5,
				Deleted:      1,
			})
			delDSpotCount++
		}
		//bindSpots, err := cmdb.GetMultiRelated(spotIDs, 14, 0, 0, []string{"name", "ci_type"})
		//if err != nil {
		//	log.Errorf("get multi bind error: %s", err.Error())
		//	return
		//}

		//for _, spot := range bindSpots {
		//	if !strings.HasPrefix(spot.ResourceID2, "0_") {
		//		// 绑子系统的情况，不删绑定关系
		//		continue
		//	}
		//	items.Relations = append(items.Relations, &cmdb.Relation{
		//		ResourceID1:  spot.ResourceID1,
		//		ResourceID2:  spot.ResourceID2,
		//		RelationCode: 14,
		//		Deleted:      1,
		//	})
		//	delBindRelCount++
		//}

		//// 删除原有板卡测点
		////if boardOptions, ok := d.Attributes["board_options"]; ok {
		//boardOptions := d.MustBoardOptions()
		////for _, bid := range boardOptions.([]interface{}) {
		//for _, boardID := range boardOptions {
		//	if boardID == "strategy" {
		//		// 忽略策略板卡的更新
		//		continue
		//	}
		//	//fmt.Println(boardID)
		//	b, err := cmdb.GetItem(boardID, 0)
		//	if err != nil {
		//		log.Errorf("get board node '%s' error: %s", boardID, err.Error())
		//		return
		//	}
		//	boardType := b.Attributes.MustString("board_type")
		//	brd, err := driver.GetBrd(boardType)
		//	if err != nil {
		//		log.Errorf("get board '%s' template '%s' error: %s", boardID, boardType, err.Error())
		//		return
		//	}
		//	bChildren, err := cmdb.GetChildren(boardID, 1, nil)
		//	if err != nil {
		//		log.Errorf("get boardID '%s' children with deleted error: %s", boardID, err.Error())
		//		return
		//	}
		//	// 删除板卡测点
		//	for _, bc := range bChildren {
		//		//fmt.Println(bc.ResourceID)
		//		items.Resources = append(items.Resources, &cmdb.Resource{
		//			ResourceID: bc.ResourceID,
		//			Attributes: define.M{},
		//			Deleted:    1,
		//		})
		//		items.Relations = append(items.Relations, &cmdb.Relation{
		//			ResourceID1:  b.ResourceID,
		//			ResourceID2:  bc.ResourceID,
		//			RelationCode: 5,
		//			Deleted:      1,
		//		})
		//		//if mapIDs, ok := bc.Attributes["map_ids"]; ok {
		//		//	dSpotID := strings.Join([]string{deviceID, mapIDs.(string)}, "_")
		//		//	items.Relations = append(items.Relations, &cmdb.Relation{
		//		//		ResourceID1:  dSpotID,
		//		//		ResourceID2:  bc.ResourceID,
		//		//		RelationCode: 14,
		//		//		Deleted:      1,
		//		//	})
		//		//	delBindRelCount++
		//		//}
		//		delBSpotCount++
		//	}
		//	// 添加新的板卡测点
		//	for _, spot := range brd.Spots {
		//		spotID := strings.Join([]string{boardID, spot.MustString("id")}, "_")
		//		dSpotID := strings.Join([]string{deviceID, spot.MustString("map_ids")}, "_")
		//		spot["resource_id"] = spotID
		//		spot["parent_id"] = boardID
		//		items.Resources = append(items.Resources, &cmdb.Resource{
		//			ResourceID: spotID,
		//			Attributes: spot,
		//			Deleted:    0,
		//		})
		//		items.Relations = append(items.Relations, &cmdb.Relation{
		//			ResourceID1:  boardID,
		//			ResourceID2:  spotID,
		//			RelationCode: 5,
		//			Deleted:      0,
		//		})
		//		items.Relations = append(items.Relations, &cmdb.Relation{
		//			ResourceID1:  dSpotID,
		//			ResourceID2:  spotID,
		//			RelationCode: 14,
		//			Deleted:      0,
		//		})
		//		newBSpotCount++
		//		newBindRelCount++
		//	}
		//}
		//}
		// 添加新的设备测点
		location := strings.Join([]string{d.Attributes.MustString("location"), d.ResourceID}, "/")
		for _, spot := range dev.Spots {
			spotID := strings.Join([]string{deviceID, spot.MustString("id")}, "_")
			spot["resource_id"] = spotID
			spot["parent_id"] = deviceID
			spot["location"] = location
			if oldSpot, ok := childMap[spotID]; ok {
				for _, k := range keepKeys {
					if v, ok := oldSpot.Attributes[k]; ok {
						spot[k] = v
					}
				}
			}
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: spot,
				Deleted:    0,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  deviceID,
				ResourceID2:  spotID,
				RelationCode: 5,
				Deleted:      0,
			})
			newDSpotCount++
		}
		err = cmdb.UpsertItems(&items)
		if err != nil {
			log.Errorf("refresh device '%s' spots error: %s", deviceID, err.Error())
			return
		}
		log.Infof("refresh device without board '%s', del dspots: %d, new dspots: %d", deviceID, delDSpotCount, newDSpotCount)
	} else {
		log.Errorf("target node '%s' has no attribute 'device_type'", d.ResourceID)
		return
	}
}

// RefreshDevByDeviceID 按设备ID刷新同类设备
func RefreshDevByDeviceID(deviceID string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	if deviceType := device.Attributes.MustString("device_type"); deviceType != "" {
		RefreshDevByDeviceType(deviceType)
	}
}

// RefreshDevByDeviceType 按设备类型刷新所有同类设备
func RefreshDevByDeviceType(deviceType string) {
	if !checkDeviceType(deviceType) {
		log.Errorf("get an error device_type: '%s'", deviceType)
		return
	}
	res, err := cmdb.GetItemsByDeviceType(deviceType)
	if err != nil {
		log.Errorf("get target nodes by device_type '%s' error: %s", deviceType, err.Error())
		return
	}
	for _, r := range res {
		RefreshDeviceWithoutBoard(r.ResourceID)
	}
}
