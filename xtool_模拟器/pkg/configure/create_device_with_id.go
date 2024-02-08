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
	reg.Regist("configure", "set_max_device_id", SetMaxDeviceID, "设定ID的起始值", `set_max_device_id <maxID>`, []*reg.Param{
		&reg.Param{Name: "maxID", Type: "string", Necessity: true, Desc: "起始ID"},
	})

	reg.Regist("configure", "create_device_with_id", CreateDeviceWithID, "用已知ID新建设备，包含创建板卡，\033[33m请注意: 由于设备ID是已知的，而板卡ID是实时生成的，需使用set_max_device_id指令设置板卡的起始ID，防止与设备的ID范围重复\033[0m", `create_device_with_id <parentID> <deviceID> <deviceType> <name>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "name", Type: "string", Necessity: false, Desc: "设备名称"},
	})
	reg.Regist("configure", "create_no_board_device_with_id", CreateNoBoardDeviceWithID, "用已知ID新建设备，不创建板卡", `create_no_board_device_with_id <parentID> <deviceID> <deviceType> <name>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "name", Type: "string", Necessity: false, Desc: "设备名称"},
	})
}

// SetMaxDeviceID 设定ID的起始值
func SetMaxDeviceID(maxID string) {
	v, err := strconv.Atoi(maxID)
	if err != nil {
		log.Errorf("set_max_device_id to %s error: %s", maxID, err.Error())
		return
	}
	for {
		ids, err := cmdb.NewVersionFor("device", 1)
		if err != nil {
			log.Errorf("set_max_device_id to %s cmdb.NewVersionFor device error: %s", maxID, err.Error())
			return
		}
		if ids[0] >= v {
			log.Infof("set_max_device_id to %s success", maxID)
			return
		}
	}
}

// CreateDeviceWithID 使用已有ID创建设备
func CreateDeviceWithID(parentID string, deviceID string, deviceType string, name string) {
	dIDs := strings.Split(deviceID, "_")
	if len(dIDs) != 2 {
		log.Errorf("create_device_with_id error: invalid deviceID: '%s'", deviceID)
		return
	}

	if dIDs[0] != "0" {
		log.Errorf("create_device_with_id error: invalid deviceID: '%s', should start with '0_'", deviceID)
		return
	}

	items, err := buildDeviceWithID(parentID, deviceID, deviceType, name, true)
	if err != nil {
		log.Errorf("build device info error: %s", err.Error())
		return
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create device error: %s", err.Error())
		return
	}
	log.Infof("create device '%s' under '%s' success, res count: %d, rel count: %d", deviceID, parentID, len(items.Resources), len(items.Relations))
}

// CreateNoBoardDeviceWithID 使用已有ID创建设备
func CreateNoBoardDeviceWithID(parentID string, deviceID string, deviceType string, name string) {
	dIDs := strings.Split(deviceID, "_")
	if len(dIDs) != 2 {
		log.Errorf("create_no_board_device_with_id error: invalid deviceID: '%s'", deviceID)
		return
	}

	if dIDs[0] != "0" {
		log.Errorf("create_no_board_device_with_id error: invalid deviceID: '%s', should start with '0_'", deviceID)
		return
	}

	items, err := buildDeviceWithID(parentID, deviceID, deviceType, name, false)
	if err != nil {
		log.Errorf("build device info error: %s", err.Error())
		return
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create device error: %s", err.Error())
		return
	}
	log.Infof("create device '%s' under '%s' success, res count: %d, rel count: %d", deviceID, parentID, len(items.Resources), len(items.Relations))
}

func buildDeviceWithID(parentID string, deviceID string, deviceType string, name string, withBoard bool) (*cmdb.Items, error) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		return nil, err
	}

	if _, err := cmdb.GetItem(deviceID, 0); err == nil {
		return nil, fmt.Errorf("node '%s' is exists", deviceID)
	}

	dev, err := driver.GetDev(deviceType)
	if err != nil {
		return nil, err
	}

	var location string
	pLoc := parent.MustLocation()
	if pLoc != "" {
		location = fmt.Sprintf("%s/%s", pLoc, parent.ResourceID)
	} else {
		location = parentID
	}

	items := cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 2*len(dev.Spots)+2),
		Relations: make([]*cmdb.Relation, 0, 3*len(dev.Spots)+3),
	}

	tmpDev := dev.Copy()

	device := cmdb.Resource{
		ResourceID: deviceID,
		Attributes: tmpDev.Device,
	}

	device.Attributes["name"] = name
	device.Attributes["resource_id"] = deviceID
	device.Attributes["parent_id"] = parentID
	device.Attributes["location"] = location
	device.Attributes["create_date"] = int64(time.Now().UnixNano() / 1000)

	boardTypes := device.MustBoardOptions()
	boards := []string{}
	if withBoard {
		for _, boardType := range boardTypes {
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
	}

	device.Attributes["board_options"] = boards
	device.Attributes["board_id"] = boards

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
	return &items, nil
}
