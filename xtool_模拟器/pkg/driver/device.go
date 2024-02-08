package driver

import (
	"encoding/json"
	"fmt"
	"strings"
	"xtool/pkg/define"
)

// Dev 设备模板
type Dev struct {
	Device define.M   `json:"device"`
	Group  []define.M `json:"group"`
	Spots  []define.M `json:"spots"`
}

func (dev *Dev) String() string {
	b, _ := json.Marshal(dev)
	return string(b)
}

// Copy 深拷贝设备模板
func (dev *Dev) Copy() *Dev {
	newDev := Dev{}
	devStr, _ := json.Marshal(dev)
	json.Unmarshal(devStr, &newDev)
	return &newDev
}

// GetDev 获取设备模板
func GetDev(deviceType string) (*Dev, error) {
	devName := fmt.Sprintf("%s.dev", strings.Replace(deviceType, ".", "_", -1))
	tStr, err := GetTemplate(devName)
	if err != nil {
		return nil, err
	}
	dev := Dev{}
	err = json.Unmarshal(tStr, &dev)
	if err != nil {
		return nil, err
	}
	return &dev, nil
}
