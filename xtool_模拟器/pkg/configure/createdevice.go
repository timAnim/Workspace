package configure

import (
	"fmt"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "create_device", CreateDevice, "新建设备", `create_device <parentID> <deviceType> <count>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "count", Type: "int", Necessity: false, Desc: "数量, 默认1"},
	})
	reg.Regist("configure", "create_device_without_board", CreateDeviceWithoutBoard, "新建无板卡设备", `create_device_without_board <parentID> <deviceType> <count>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "count", Type: "int", Necessity: false, Desc: "数量, 默认1"},
	})
}

// CreateDevice 创建设备
func CreateDevice(parentID string, deviceType string, count string) {
	n, err := strconv.Atoi(count)
	if err != nil {
		n = 1
	}
	items, err := buildDevice(parentID, deviceType, n)
	if err != nil {
		log.Errorf("build device info error: %s", err.Error())
		return
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create device error: %s", err.Error())
		return
	}
	log.Infof("create device by device_type '%s' under '%s' success, res count: %d, rel count: %d", deviceType, parentID, len(items.Resources), len(items.Relations))
}

func buildDevice(parentID string, deviceType string, n int) (*cmdb.Items, error) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		return nil, err
	}
	dev, err := driver.GetDev(deviceType)
	if err != nil {
		return nil, err
	}
	var location string
	if pLoc, ok := parent.Attributes["location"]; ok {
		pLocStr := pLoc.(string)
		if pLocStr != "" {
			location = fmt.Sprintf("%s/%s", pLocStr, parent.ResourceID)
		} else {
			location = parentID
		}
	} else {
		location = parentID
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	for i := 0; i < n; i++ {
		ids, err := cmdb.NewID(1)
		if err != nil {
			return nil, err
		}
		deviceID := ids[0]
		log.Infof("create device '%s'", deviceID)
		tmpDev := dev.Copy()
		device := cmdb.Resource{
			ResourceID: deviceID,
			Attributes: tmpDev.Device,
		}
		device.Attributes["resource_id"] = deviceID
		device.Attributes["parent_id"] = parentID
		device.Attributes["location"] = location
		device.Attributes["create_date"] = int64(time.Now().UnixNano() / 1000)

		boardTypes := device.Attributes["board_options"].([]interface{})
		boards := []string{}
		for _, bt := range boardTypes {
			boardType := bt.(string)
			ids, err := cmdb.NewID(1)
			if err != nil {
				return nil, err
			}
			boardID := ids[0]
			boardItems, err := buildBoard(deviceID, boardID, boardType)
			if err != nil {
				return nil, err
			}
			items.Resources = append(items.Resources, boardItems.Resources...)
			items.Relations = append(items.Relations, boardItems.Relations...)
			boards = append(boards, boardID)
		}
		device.Attributes["board_options"] = boards
		device.Attributes["board_id"] = boards
		items.Resources = append(items.Resources, &device)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  parentID,
			ResourceID2:  deviceID,
			RelationCode: 5,
		})
		if len(boards) == 1 {
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  deviceID,
				ResourceID2:  boards[0],
				RelationCode: 14,
			})
		}
		for _, spot := range tmpDev.Spots {
			spotID := fmt.Sprintf("%s_%s", deviceID, spot["id"].(string))
			spot["resource_id"] = spotID
			spot["parent_id"] = deviceID
			spot["location"] = fmt.Sprintf("%s/%s", location, deviceID)
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: spot,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  deviceID,
				ResourceID2:  spotID,
				RelationCode: 5,
			})
		}
	}
	return &items, nil
}

func buildBoard(deviceID string, boardID string, boardType string) (*cmdb.Items, error) {
	brd, err := driver.GetBrd(boardType)
	if err != nil {
		return nil, err
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	board := cmdb.Resource{
		ResourceID: boardID,
		Attributes: brd.Board,
	}
	board.Attributes["subsystem_type"] = 0
	board.Attributes["is_collect"] = 1
	board.Attributes["parent_id"] = "link_root"
	board.Attributes["location"] = "link_root"
	transfer := fmt.Sprintf("transfer=%s", strings.Split(board.Attributes["transfer"].(string), ",")[0])
	board.Attributes["transfer"] = transfer

	items.Resources = append(items.Resources, &board)
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  "link_root",
		ResourceID2:  boardID,
		RelationCode: 5,
	})
	for _, spot := range brd.Spots {
		spotID := fmt.Sprintf("%s_%s", boardID, spot["id"].(string))
		spot["resource_id"] = spotID
		spot["parent_id"] = boardID
		spot["location"] = strings.Join([]string{board.MustLocation(), boardID}, "/")
		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: spotID,
			Attributes: spot,
		})
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  boardID,
			ResourceID2:  spotID,
			RelationCode: 5,
		})
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  fmt.Sprintf("%s_%s", deviceID, spot["map_ids"].(string)),
			ResourceID2:  spotID,
			RelationCode: 14,
		})
	}
	return &items, nil
}

// CreateDeviceWithoutBoard 创建无板卡设备
func CreateDeviceWithoutBoard(parentID string, deviceType string, count string) {
	n, err := strconv.Atoi(count)
	if err != nil {
		n = 1
	}
	items, err := buildDeviceWithoutBoard(parentID, deviceType, n)
	if err != nil {
		log.Errorf("build device info error: %s", err.Error())
		return
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create device without board error: %s", err.Error())
		return
	}
	log.Infof("create device without board by device_type '%s' under '%s' success, res count: %d, rel count: %d", deviceType, parentID, len(items.Resources), len(items.Relations))
}

func buildDeviceWithoutBoard(parentID string, deviceType string, n int) (*cmdb.Items, error) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		return nil, err
	}
	dev, err := driver.GetDev(deviceType)
	if err != nil {
		return nil, err
	}
	var location string
	if pLoc, ok := parent.Attributes["location"]; ok {
		pLocStr := pLoc.(string)
		if pLocStr != "" {
			location = fmt.Sprintf("%s/%s", pLocStr, parent.ResourceID)
		} else {
			location = parentID
		}
	} else {
		location = parentID
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	for i := 0; i < n; i++ {
		ids, err := cmdb.NewID(1)
		if err != nil {
			return nil, err
		}
		deviceID := ids[0]
		log.Infof("create device '%s'", deviceID)
		tmpDev := dev.Copy()
		device := cmdb.Resource{
			ResourceID: deviceID,
			Attributes: tmpDev.Device,
		}
		device.Attributes["resource_id"] = deviceID
		device.Attributes["parent_id"] = parentID
		device.Attributes["location"] = location
		device.Attributes["create_date"] = int64(time.Now().UnixNano() / 1000)

		device.Attributes["board_options"] = []string{}
		device.Attributes["board_id"] = []string{}
		items.Resources = append(items.Resources, &device)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  parentID,
			ResourceID2:  deviceID,
			RelationCode: 5,
		})

		for _, spot := range tmpDev.Spots {
			spotID := fmt.Sprintf("%s_%s", deviceID, spot["id"].(string))
			spot["resource_id"] = spotID
			spot["parent_id"] = deviceID
			spot["location"] = fmt.Sprintf("%s/%s", location, deviceID)
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: spot,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  deviceID,
				ResourceID2:  spotID,
				RelationCode: 5,
			})
		}
	}
	return &items, nil
}
