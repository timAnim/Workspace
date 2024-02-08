package cmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"
	"xtool/pkg/define"
)

// BizSpot 业务模板
type BizSpot struct {
	Device           define.M   `json:"device"`            // 设备
	Available        *SpotGroup `json:"available"`         // 可用性
	Capacity         *SpotGroup `json:"capacity"`          // 容量
	EnergyEfficiency *SpotGroup `json:"energy_efficiency"` // 能效
}

// SpotGroup 测电阻
type SpotGroup struct {
	Spots []define.M `json:"spots"`
}

// GetBizSpot 获取业务模板测点
func GetBizSpot() (*BizSpot, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/device_template/drivers/spots.dev", auth.GetAddr()), nil)
	if err != nil {
		return nil, err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}

	bs := &BizSpot{}
	err = json.Unmarshal(body, bs)
	if err != nil {
		return nil, err
	}

	return bs, nil
}
