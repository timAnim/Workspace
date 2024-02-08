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
	reg.Regist("configure", "ke_device_import", KEDeviceImport, "AU/GU/KE 设备导入", `ke_device_import <parentID> <deviceID>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "目标父节点ID"},
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("configure", "third_party_device_import", ThirdPartyDeviceImport, "V6及第三方设备导入, 因为此类设备通常不具备设备类型, 需要在导入过程中补充设备类型", `third_party_device_import <parentID> <deviceID> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
	})

	reg.Regist("configure", "remove_import", RemoveImport, "解除导入状态", `remove_import <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
}

// KEDeviceImport 设备导入
func KEDeviceImport(parentID string, deviceID string) {
	if !(strings.HasPrefix(parentID, "0_") || parentID == "project_root") {
		log.Errorf("do not support to import device to none local node '%s'", parentID)
		return
	}

	if strings.HasPrefix(deviceID, "0_") {
		log.Errorf("do not support to import local device '%s' to local node", deviceID)
		return
	}

	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent node '%s' error: %s", parentID, err.Error())
		return
	}

	if !(parent.IsSpace() || parent.IsDevice() || parent.IsProject()) {
		// 非空间与设备类节点不允许设备导入
		log.Errorf("cannot import device to node '%s:%s' because it is not a space, device or project_root node", parent.ResourceID, parent.MustName())
		return
	}

	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}

	if !device.IsDevice() {
		log.Errorf("this operation cannot import none device node '%s:%s'", device.ResourceID, device.MustName())
		return
	}

	if device.MustHasAdd() {
		log.Errorf("device '%s:%s' had been imported, do not support multi import", device.ResourceID, device.MustName())
		return
	}

	deviceType := device.MustDeviceType()
	if len(strings.Split(deviceType, ".")) != 7 {
		log.Errorf("device '%s:%s' has unexpected device_type: '%s', please check if it is a third party device", device.ResourceID, device.MustName(), deviceType)
		return
	}
	// TODO: check device spots import

	items := &cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 10),
		Relations: make([]*cmdb.Relation, 0, 10),
	}

	// 构造请求数据
	// 标记设备已导入
	items.Resources = append(items.Resources, &cmdb.Resource{
		ResourceID: device.ResourceID,
		Attributes: define.M{
			"hasAdd":    true,
			"parent_id": parentID,
			// import_type 与 system_type 同步， ke 子系统用 2
			"import_type": "2",
		},
	})

	// 增加5号关系
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  parent.ResourceID,
		ResourceID2:  device.ResourceID,
		RelationCode: 5,
	})

	err = cmdb.UpsertItems(items)
	if err != nil {
		log.Errorf("ke_device_import '%s:%s' to '%s:%s' upsert items error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	err = cmdb.Bind(parent.ResourceID, []string{device.ResourceID})
	if err != nil {
		log.Errorf("ke_device_import '%s:%s' to '%s:%s' bind error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	log.Infof("ke_device_import '%s:%s' to '%s:%s' success", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName())
}

// ThirdPartyDeviceImport 设备导入
func ThirdPartyDeviceImport(parentID string, deviceID string, deviceType string) {
	if !(strings.HasPrefix(parentID, "0_") || parentID == "project_root") {
		log.Errorf("do not support to import device to none local node '%s'", parentID)
		return
	}

	if strings.HasPrefix(deviceID, "0_") {
		log.Errorf("do not support to import local device '%s' to local node", deviceID)
		return
	}

	dtSplit := strings.Split(deviceType, ".")
	if len(dtSplit) != 7 {
		log.Errorf("error device_type '%s', should be 7 levels", deviceType)
		return
	}

	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent node '%s' error: %s", parentID, err.Error())
		return
	}

	if !(parent.IsSpace() || parent.IsDevice() || parent.IsProject()) {
		// 非空间与设备类节点不允许设备导入
		log.Errorf("cannot import device to node '%s:%s' because it is not a space, device or project_root node", parent.ResourceID, parent.MustName())
		return
	}

	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}

	_, err = driver.GetDev(deviceType)
	if err != nil {
		log.Errorf("get device template '%s' error: %s", deviceType, err.Error())
		return
	}

	if !device.IsDevice() {
		log.Errorf("this operation cannot import none device node '%s:%s'", device.ResourceID, device.MustName())
		return
	}

	if device.MustHasAdd() {
		log.Errorf("device '%s:%s' had been imported, do not support multi import", device.ResourceID, device.MustName())
		return
	}

	dt := device.MustDeviceType()
	if dt != "" {
		log.Errorf("device '%s:%s' has unexpected device_type: '%s', please check if it is a ke serial device", device.ResourceID, device.MustName(), dt)
		return
	}
	// TODO: check device spots import

	items := &cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 10),
		Relations: make([]*cmdb.Relation, 0, 10),
	}

	// 构造请求数据
	// 标记设备已导入
	items.Resources = append(items.Resources, &cmdb.Resource{
		ResourceID: device.ResourceID,
		Attributes: define.M{
			"hasAdd":         true,
			"parent_id":      parentID,
			"device_type":    deviceType,
			"device_info":    strings.Join(dtSplit[0:3], "."),
			"vendor_info":    strings.Join(dtSplit[3:7], "."),
			"board_template": []string{deviceType},
			// import_type 与 system_type 同步，V6及第三方子系统都使用 1
			"import_type": "1",
			"template_page": define.M{
				"equipType":    "",
				"templateType": "0_0_1_1_1_1",
			},
		},
	})

	// 增加5号关系
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  parent.ResourceID,
		ResourceID2:  device.ResourceID,
		RelationCode: 5,
	})

	err = cmdb.UpsertItems(items)
	if err != nil {
		log.Errorf("third_party_device_import '%s:%s' to '%s:%s' upsert items error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	err = cmdb.Bind(parent.ResourceID, []string{device.ResourceID})
	if err != nil {
		log.Errorf("third_party_device_import '%s:%s' to '%s:%s' bind error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	log.Infof("third_party_device_import '%s:%s' to '%s:%s' success", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName())
}

// RemoveImport 删除设备导入关系
func RemoveImport(deviceID string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get devcie node '%s' error: %s", deviceID, err.Error())
		return
	}

	if !device.IsDevice() {
		log.Errorf("this operation cannot support none device node '%s:%s'", device.ResourceID, device.MustName())
		return
	}

	if !device.MustHasAdd() {
		log.Errorf("device '%s:%s' is not imported, do not support remove_import", device.ResourceID, device.MustName())
		return
	}

	parentID := device.MustParentID()
	if !strings.HasPrefix(parentID, "0_") {
		log.Errorf("device '%s:%s' parent_id is local id '%s', do not support remove_import", device.ResourceID, device.MustName(), parentID)
		return
	}

	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent node '%s' error: %s", parentID, err.Error())
		return
	}

	importType := device.Attributes.MustString("import_type")
	switch importType {
	case "2":
		// KE导入
		items := &cmdb.Items{
			DumpData:  "yes",
			Resources: make([]*cmdb.Resource, 0, 10),
			Relations: make([]*cmdb.Relation, 0, 10),
		}

		// 构造请求数据
		// 标记设备已导入
		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: device.ResourceID,
			Attributes: define.M{
				"hasAdd":    false,
				"parent_id": parentID,
				// import_type 与 system_type 同步， ke 子系统用 2
				"import_type": "2",
				"location":    "",
			},
		})

		// 删除5号关系
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  parent.ResourceID,
			ResourceID2:  device.ResourceID,
			RelationCode: 5,
			Deleted:      1,
		})

		err = cmdb.UpsertItems(items)
		if err != nil {
			log.Errorf("remove ke imported device '%s:%s' from '%s:%s' upsert items error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
			return
		}
		log.Infof("removed ke imported devcie '%s:%s' from '%s:%s' success", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName())
	case "", "0":
		// 本层
		log.Warnf("local device does not support remove_import")
	case "1":
		// 第三方导入
		items := &cmdb.Items{
			DumpData:  "yes",
			Resources: make([]*cmdb.Resource, 0, 10),
			Relations: make([]*cmdb.Relation, 0, 10),
		}

		// 构造请求数据
		// 标记设备已导入
		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: device.ResourceID,
			Attributes: define.M{
				"hasAdd":         false,
				"device_type":    "",
				"device_info":    "",
				"vendor_info":    "",
				"board_template": []string{},
				// import_type 与 system_type 同步，V6及第三方子系统都使用 1
				"import_type": "1",
				"template_page": define.M{
					"equipType":    "",
					"templateType": "0_0_1_1_1_1",
				},
			},
		})

		// 增加5号关系
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  parent.ResourceID,
			ResourceID2:  device.ResourceID,
			RelationCode: 5,
			Deleted:      1,
		})

		err = cmdb.UpsertItems(items)
		if err != nil {
			log.Errorf("remove third_party_device_import device '%s:%s' from '%s:%s' upsert items error: %s", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
			return
		}
		log.Infof("removed third_party_device_imported devcie '%s:%s' from '%s:%s' success", device.ResourceID, device.MustName(), parent.ResourceID, parent.MustName())
	}
}
