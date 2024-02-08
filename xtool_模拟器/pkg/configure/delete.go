package configure

import (
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("delete", "delete_ci", Delete, "删除指定节点", `delete_ci <resourceID> <relationCode> <depth>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "relationCode", Type: "int", Necessity: false, Desc: "关联关系，默认 5"},
		&reg.Param{Name: "depth", Type: "int", Necessity: false, Desc: "深度，默认 -1"},
	})
	reg.Regist("delete", "delete_rel", DeleteRel, "删除指定节点间的关系", `delete_rel <resourceID1> <resourceID2>`, []*reg.Param{
		&reg.Param{Name: "resourceID1", Type: "string", Necessity: true, Desc: "节点ID1"},
		&reg.Param{Name: "resourceID2", Type: "string", Necessity: true, Desc: "节点ID2"},
	})
	reg.Regist("delete", "delete_from_device", DeleteFromDevice, "删除设备的测点", `delete_from_device <deviceID> <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "测点ID，相对设备，以','隔开"},
	})
	reg.Regist("delete", "delete_by_device_id", DeleteByDeviceID, "按设备ID删除同类设备的测点", `delete_by_device_id <deviceID> <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "测点ID，相对设备，以','隔开"},
	})
	reg.Regist("delete", "delete_by_device_type", DeleteByDeviceType, "删除同类设备的测点", `delete_by_device_type <deviceType> <spotIDs>`, []*reg.Param{
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "spotIDs", Type: "string", Necessity: true, Desc: "测点ID，相对设备，以','隔开"},
	})
}

// Delete 删除节点
func Delete(resourceID string, relationCode string, depth string) {
	rel, err := strconv.Atoi(relationCode)
	if err != nil {
		rel = 5
	}
	d, err := strconv.Atoi(depth)
	if err != nil {
		d = -1
	}
	err = cmdb.Delete(resourceID, rel, d)
	if err != nil {
		log.Errorf("delete node '%s' error: %s", resourceID, err.Error())
		return
	}
	log.Infof("delete node '%s' success", resourceID)
}

// DeleteRel 删除节点关系
func DeleteRel(resourceID1 string, resourceID2 string) {
	err := cmdb.DeleteRel(resourceID1, resourceID2)
	if err != nil {
		log.Errorf("delete relation '%s'->'%s' error: %s", resourceID1, resourceID2, err.Error())
		return
	}
	log.Infof("delete relation '%s'->'%s' success", resourceID1, resourceID2)
}

// DeleteFromDevice 删除设备对应测点
func DeleteFromDevice(deviceID string, spotIDs string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	resourceIDs := []string{}
	for _, id := range strings.Split(spotIDs, ",") {
		resourceIDs = append(resourceIDs, strings.Join([]string{device.ResourceID, id}, "_"))
	}
	resourceID := strings.Join(resourceIDs, ",")
	Delete(resourceID, "5", "-1")
}

// DeleteByDeviceID 删除设备对应测点
func DeleteByDeviceID(deviceID string, spotIDs string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	if t, ok := device.Attributes["device_type"]; ok {
		deviceType := t.(string)
		DeleteByDeviceType(deviceType, spotIDs)
	}
}

// DeleteByDeviceType 按设备类型删除对应测点
func DeleteByDeviceType(deviceType string, spotIDs string) {
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
		DeleteFromDevice(r.ResourceID, spotIDs)
	}
}

func checkDeviceType(deviceType string) bool {
	ids := strings.Split(deviceType, ".")
	if len(ids) != 7 {
		return false
	}
	return true
}
