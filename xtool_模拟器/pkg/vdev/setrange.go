package vdev

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"
)

/*
{"resource_id":"0_101","operate":"set_range","set_range":{"enable":true,"id":"1_1_0","lower_limit":90,"upper_limit":100}}
{"resource_id":"0_101","operate":"reset_spot","id":"1_1_0"}
*/

// SetRange 设置虚拟设备的模拟量上下限
func SetRange(deviceID string, id string, lower float64, upper float64) error {
	q := define.M{
		"resource_id": deviceID,
		"operate":     "set_range",
		"set_range": define.M{
			"id":          id,
			"enable":      true,
			"lower_limit": lower,
			"upper_limit": upper,
		},
	}
	b, err := json.Marshal(q)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/device/private", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	return nil
}

// ResetSpot 重置测点
func ResetSpot(deviceID string, id string) error {
	q := define.M{
		"resource_id": deviceID,
		"operate":     "reset_spot",
		"id":          id,
	}
	b, err := json.Marshal(q)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/device/private", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	return nil
}
