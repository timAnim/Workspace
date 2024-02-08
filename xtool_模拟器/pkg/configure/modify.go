package configure

import (
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/define/xfield"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("modify", "modify_device_type", ModifyDeviceType, "修改设备类型", `modify_device_type <deviceID> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "新的设备类型"},
	})
	reg.Regist("modify", "modify_device_type_from", ModifyDeviceTypeFrom, "将设备类型从源设备类型修改至目标设备类型", `modify_device_type_from <srcDeviceType> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "srcDeviceType", Type: "string", Necessity: true, Desc: "源设备类型"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "新的设备类型"},
	})
	reg.Regist("modify", "modify_device_type_by_id", ModifyDeviceTypeByID, "按ID修改同类设备类型", `modify_device_type_by_id <deviceID> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "新的设备类型"},
	})
	reg.Regist("modify", "modify_room_type", ModifyRoomType, "修改房间类型", `modify_room_type <roomID> <roomType>`, []*reg.Param{
		&reg.Param{Name: "roomID", Type: "string", Necessity: true, Desc: "房间ID"},
		&reg.Param{Name: "roomType", Type: "string", Necessity: true, Desc: "房间类型, 0:IT机房, 1:库房, 2:其他功能机房"},
	})
	reg.Regist("modify", "modify_field", ModifyField, "通用字段值修改", `modify_field <resourceID> <field> <value>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "房间ID"},
		&reg.Param{Name: "field", Type: "string", Necessity: true, Desc: "字段名, 使用help field 查看字段信息"},
		&reg.Param{Name: "value", Type: "string", Necessity: true, Desc: "字段值, 使用help field 查看字段值类型信息, 字段类型为list情况下使用,将各元素隔开(不使用[])"},
	})
}

// ModifyDeviceType 修改设备类型
func ModifyDeviceType(deviceID string, deviceType string) {
	if !strings.HasPrefix(deviceID, "0_") {
		log.Errorf("modify_device_type does not support for subsystem device: '%s'", deviceID)
		return
	}

	if !checkDeviceType(deviceType) {
		log.Errorf("get an error dst device_type: '%s'", deviceType)
		return
	}
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	// 取出设备模板
	dev, err := driver.GetDev(deviceType)
	if err != nil {
		log.Errorf("get template '%s' error: %s", deviceType, err.Error())
		return
	}

	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	device.Attributes["device_type"] = deviceType

	newBoardType := dev.Device["board_options"].([]interface{})[0].(string)
	device.Attributes["board_template"] = []string{newBoardType}

	if boardOptions, ok := device.Attributes["board_options"]; ok {
		boardIDs := boardOptions.([]interface{})
		if len(boardIDs) != 1 {
			// 不支持复数板卡
			log.Errorf("multi boards not support")
			return
		}
		boardID := boardIDs[0].(string)
		if boardID != "strategy" {
			board, err := cmdb.GetItem(boardID, 0)
			if err != nil {
				log.Errorf("get board node '%s' error: %s", deviceID, err.Error())
				return
			}
			board.Attributes["board_type"] = newBoardType
			items.Resources = append(items.Resources, board)
		}
	}
	deviceInfo := strings.Join(strings.Split(deviceType, ".")[0:3], ".")
	vendorInfo := strings.Join(strings.Split(deviceType, ".")[3:7], ".")
	device.Attributes["device_info"] = deviceInfo
	device.Attributes["vendor_info"] = vendorInfo
	items.Resources = append(items.Resources, device)
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("modify device_type '%s':'%s' error: %s", deviceID, deviceType, err.Error())
		return
	}
	log.Infof("modify device_type '%s':'%s' success", deviceID, deviceType)
}

// ModifyDeviceTypeFrom 修改同类设备类型
func ModifyDeviceTypeFrom(srcDeviceType string, deviceType string) {
	if !checkDeviceType(srcDeviceType) {
		log.Errorf("get an error src device_type: '%s'", srcDeviceType)
		return
	}
	if !checkDeviceType(deviceType) {
		log.Errorf("get an error dst device_type: '%s'", deviceType)
		return
	}
	res, err := cmdb.GetItemsByDeviceType(srcDeviceType)
	if err != nil {
		log.Errorf("get target nodes by device_type '%s' error: %s", deviceType, err.Error())
		return
	}
	for _, r := range res {
		ModifyDeviceType(r.ResourceID, deviceType)
	}
}

// ModifyDeviceTypeByID 按ID修改设备类型
func ModifyDeviceTypeByID(deviceID string, deviceType string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	if t, ok := device.Attributes["device_type"]; ok {
		srcDeviceType := t.(string)
		ModifyDeviceTypeFrom(srcDeviceType, deviceType)
	}
}

// ModifyRoomType 修改房间类型
func ModifyRoomType(roomID string, roomType string) {
	room, err := cmdb.GetItem(roomID, 0)
	if err != nil {
		log.Errorf("get room node '%s' error: %s", roomID, err.Error())
		return
	}
	if ct, ok := room.Attributes["ci_type"]; ok {
		if ct.(string) != "5" {
			log.Errorf("node '%s' is not space", roomID)
			return
		}
	}
	if st, ok := room.Attributes["space_type"]; ok {
		if st.(string) != "5" {
			log.Errorf("node '%s' is not room", roomID)
			return
		}
	}

	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	switch roomType {
	case "0", "1", "2":
	default:
		roomType = "0"
	}
	room.Attributes["purpose"] = roomType

	items.Resources = append(items.Resources, room)
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("modify room type '%s':'%s' error: %s", roomID, roomType, err.Error())
		return
	}
	log.Infof("modify room type '%s':'%s' success", roomID, roomType)
}

// ModifyField 通用字段修改, 需特定字段数据类型
func ModifyField(resourceID string, field string, value string) {
	node, err := cmdb.GetItem(resourceID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}

	// TODO: 增加字段校验逻辑
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	v, err := xfield.CheckField(field, value)
	if err != nil {
		log.Errorf("modify '%s'.'%s' from '%s' to '%s' error: %s", node.ResourceID, field, node.Attributes[field], value, err.Error())
		return
	}
	item := &cmdb.Resource{
		ResourceID: node.ResourceID,
		Attributes: define.M{
			field: v,
		},
	}
	if field == "device_type" {
		// 针对device_type联动修改
		ids := strings.Split(value, ".")
		if len(ids) != 7 {
			log.Errorf("device_type must be level 7")
			return
		}
		deviceInfo := strings.Join(ids[0:3], ".")
		vendorInfo := strings.Join(ids[3:7], ".")
		item.Attributes["device_info"] = deviceInfo
		item.Attributes["vendor_info"] = vendorInfo
	}
	items.Resources = append(items.Resources, item)
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("modify '%s'.'%s' from '%s' to '%s' error: %s", node.ResourceID, field, node.Attributes[field], value, err.Error())
		return
	}
	log.Infof("modify '%s'.'%s' from '%s' to '%v' success", node.ResourceID, field, node.Attributes[field], v)
}
