package configure

import (
	"strconv"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"
	"xtool/pkg/vdev"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("virtual", "set_analog_range", SetAnalogRange, "修改所有模拟量取值范围", `set_analog_range <deviceID> <lower> <upper>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "lower", Type: "float", Necessity: false, Desc: "下限 默认 90.0"},
		&reg.Param{Name: "upper", Type: "float", Necessity: false, Desc: "上限 默认 110.0"},
	})
	reg.Regist("virtual", "set_digit_range", SetDigitRange, "修改所有状态量取值范围", `set_digit_range <deviceID> <lower> <upper>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "lower", Type: "int", Necessity: false, Desc: "下限 默认 0"},
		&reg.Param{Name: "upper", Type: "int", Necessity: false, Desc: "上限 默认 4"},
	})
	reg.Regist("virtual", "set_communication_err", SetCommunicationError, "将设备置为通信中断", `set_communication_err <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("virtual", "set_communication_recover", SetCommunicationRecover, "将设备置为通信恢复(重置所有测点)", `set_communication_recover <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
}

// SetAnalogRange 修改虚拟设备取值范围
func SetAnalogRange(deviceID string, lower string, upper string) {
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
		if spotType, ok := c.Attributes["spot_type"]; ok {
			if spotType.(string) != "1" {
				continue
			}
			vdev.SetRange(device.ResourceID, c.Attributes["id"].(string), l, u)
		}
	}
	log.Infof("set analog range %f~%f for device '%s' success", l, u, deviceID)
}

// SetDigitRange 修改虚拟设备取值范围
func SetDigitRange(deviceID string, lower string, upper string) {
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
		if spotType, ok := c.Attributes["spot_type"]; ok {
			if spotType.(string) != "2" {
				continue
			}
			if valueType, y := c.Attributes["value_type"]; y {
				if valueType.(string) != "int" {
					continue
				}
				vdev.SetRange(device.ResourceID, c.Attributes["id"].(string), float64(l), float64(u))
			}
		}
	}
	log.Infof("set digit range %d~%d for device '%s' success", l, u, deviceID)
}

// SetCommunicationError 设置虚拟设备通信中断
func SetCommunicationError(deviceID string) {
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
	for _, c := range dChildren {
		if spotType, ok := c.Attributes["spot_type"]; ok {
			if spotType.(string) != "2" {
				continue
			}
			if valueType, y := c.Attributes["value_type"]; y {
				if valueType.(string) != "string" {
					continue
				}
				vdev.SetRange(device.ResourceID, c.Attributes["id"].(string), 0, 1)
			}
		}
	}
	log.Infof("set device '%s' communication error success", deviceID)
}

// SetCommunicationRecover 设置虚拟设备通信恢复
func SetCommunicationRecover(deviceID string) {
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
	for _, c := range dChildren {
		if ct, ok := c.Attributes["ci_type"]; ok {
			if ct.(string) == "3" {
				vdev.ResetSpot(device.ResourceID, c.Attributes["id"].(string))
			}
		}
	}
	log.Infof("set device '%s' communication recover success", deviceID)
}
