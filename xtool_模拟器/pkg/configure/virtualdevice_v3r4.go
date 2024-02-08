package configure

import (
	"fmt"
	"strconv"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"
	"xtool/pkg/vdev"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("virtual_v3r4", "v3r4_set_analog_range", V3R4SetAnalogRange, "修改所有模拟量取值范围", `v3r4_set_analog_range <deviceID> <lower> <upper>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "lower", Type: "float", Necessity: false, Desc: "下限 默认 90.0"},
		&reg.Param{Name: "upper", Type: "float", Necessity: false, Desc: "上限 默认 110.0"},
	})
	reg.Regist("virtual_v3r4", "v3r4_set_digit_range", V3R4SetDigitRange, "修改所有状态量取值范围", `v3r4_set_digit_range <deviceID> <lower> <upper>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "lower", Type: "int", Necessity: false, Desc: "下限 默认 0"},
		&reg.Param{Name: "upper", Type: "int", Necessity: false, Desc: "上限 默认 4"},
	})
	reg.Regist("virtual_v3r4", "v3r4_set_communication_err", V3R4SetCommunicationError, "将设备置为通信中断", `v3r4_set_communication_err <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("virtual_v3r4", "v3r4_set_communication_recover", V3R4SetCommunicationRecover, "将设备置为通信恢复(重置所有测点)", `v3r4_set_communication_recover <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
}

// V3R4SetAnalogRange 修改虚拟设备取值范围
func V3R4SetAnalogRange(deviceID string, lower string, upper string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	dChildren, err := cmdb.GetChildren(device.ResourceID, 0, nil)
	if err != nil {
		log.Errorf("get device '%s' children error: %s", device.ResourceID, err.Error())
		return
	}
	l, err := strconv.ParseFloat(lower, 64)
	if err != nil {
		l = 90.0
	}
	u, err := strconv.ParseFloat(upper, 64)
	if err != nil {
		u = 110.0
	}
	for _, c := range dChildren {
		//fmt.Println(c.String())
		if c.Attributes.MustString("value_type") != "float" {
			continue
		}
		spotID := fmt.Sprintf("%s_%s", deviceID, c.Attributes.MustString("map_ids"))
		vdev.SetRangeV3(device.ResourceID, spotID, float64(l), float64(u))
	}
	log.Infof("set analog range %f~%f for device '%s' success", l, u, deviceID)
}

// V3R4SetDigitRange 修改虚拟设备取值范围
func V3R4SetDigitRange(deviceID string, lower string, upper string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	dChildren, err := cmdb.GetChildren(device.ResourceID, 0, nil)
	if err != nil {
		log.Errorf("get device '%s' children error: %s", device.ResourceID, err.Error())
		return
	}
	l, err := strconv.Atoi(lower)
	if err != nil {
		l = 0
	}
	u, err := strconv.Atoi(upper)
	if err != nil {
		u = 4
	}
	for _, c := range dChildren {
		//fmt.Println(c.String())
		if c.Attributes.MustString("value_type") != "int" {
			continue
		}
		spotID := fmt.Sprintf("%s_%s", deviceID, c.Attributes.MustString("map_ids"))
		vdev.SetRangeV3(device.ResourceID, spotID, float64(l), float64(u))
	}
	log.Infof("set digit range %d~%d for device '%s' success", l, u, deviceID)
}

// V3R4SetCommunicationError 设置虚拟设备通信中断
func V3R4SetCommunicationError(deviceID string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	if err := vdev.CommunicationV3(device.ResourceID, 0); err != nil {
		log.Errorf("vdev.CommunicationV3 '%s' error: %s", deviceID, err.Error())
		return
	}
	log.Infof("set device '%s' communication error success", deviceID)
}

// V3R4SetCommunicationRecover 设置虚拟设备通信恢复
func V3R4SetCommunicationRecover(deviceID string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}
	if err := vdev.CommunicationV3(device.ResourceID, 1); err != nil {
		log.Errorf("vdev.CommunicationV3 '%s' error: %s", deviceID, err.Error())
		return
	}
	log.Infof("set device '%s' communication recover success", deviceID)
}
