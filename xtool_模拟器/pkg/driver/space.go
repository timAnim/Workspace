package driver

import (
	"encoding/json"
	"fmt"
	"xtool/pkg/define"
)

// Space 空间模板
type Space struct {
	Space  define.M   `json:"space"`
	Device define.M   `json:"device"`
	Spots  []define.M `json:"spots"`
}

// Copy 深拷贝设备模板
func (space *Space) Copy() *Space {
	newSpace := Space{}
	spaceStr, _ := json.Marshal(space)
	json.Unmarshal(spaceStr, &newSpace)
	return &newSpace
}

// GetSpace 获取空间模板
func GetSpace(spaceType string) (*Space, error) {
	name := fmt.Sprintf("%s.dev", spaceType)
	tStr, err := GetTemplate(name)
	if err != nil {
		return nil, err
	}
	space := Space{}
	err = json.Unmarshal(tStr, &space)
	if err != nil {
		return nil, err
	}
	if space.Space == nil && space.Device != nil {
		space.Space = space.Device
	}
	return &space, nil
}
