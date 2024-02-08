package auc

import (
	"encoding/json"
	"fmt"
	"strings"
	"xtool/pkg/types"
)

// Dev 设备模板
type Dev struct {
	Device types.M   `json:"device"`
	Spots  []types.M `json:"spots"`
}

// Copy 深拷贝设备模板
func (dev *Dev) Copy() *Dev {
	newDev := Dev{}
	devStr, _ := json.Marshal(dev)
	json.Unmarshal(devStr, &newDev)
	return &newDev
}

// GetDev 获取设备模板
func (c *Client) GetDev(deviceType string) (*Dev, error) {
	devName := fmt.Sprintf("%s.dev", strings.Replace(deviceType, ".", "_", -1))
	tStr, err := c.GetTemplate(devName)
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
