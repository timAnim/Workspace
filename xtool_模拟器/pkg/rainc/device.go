package rainc

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"

	"github.com/tidwall/gjson"
)

// Device 彩虹C02设备节点定义
type Device struct {
	ResourceID    string `json:"resource_id,omiempty"`
	CiType        string `json:"ci_type,omiempty"`
	Name          string `json:"name"`
	IsCollect     int64  `json:"is_collect"`
	LimitInterval int64  `json:"limit_interval"`
	DeviceType    string `json:"device_type"`
	Protocol      string `json:"protocol"`
	Transfer      string `json:"transfer"`
}

// DeviceStatus 彩虹C02设备状态定义
type DeviceStatus struct {
	ResourceID string `json:"resource_id"`
	ErrorCode  int64  `json:"error_code"`
	IsCollect  int64  `json:"is_collect"`
	Name       string `json:"name"`
	Status     int64  `json:"status"`
}

// Spot 彩虹C02测点定义
type Spot struct {
	ResourceID string `json:"resource_id,omiempty"`
	ID         string `json:"id,omiempty"`
	MapIDs     string `json:"map_ids,omiempty"`
	Name       string `json:"name,omiempty"`
	CiType     string `json:"ci_type,omiempty"`
	SpotType   string `json:"spot_type,omiempty"`
	Mapper     string `json:"mapper,omiempty"`
}

var statusMap = map[int64]string{
	0:  "通信中断",
	1:  "正常",
	30: "停止采集",
	31: "加载失败",
}

// GetDeviceInfo 获取设备列表
func GetDeviceInfo(resourceID string) (*Device, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v3/project/device/info?resource_id=%s", auth.GetAddr(), resourceID), nil)
	if err != nil {
		return nil, err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	d := &Device{}
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data").String()), d)
	return d, err
}

// GetDeviceList 获取设备列表
func GetDeviceList() ([]*Device, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v3/project/device/list", auth.GetAddr()), nil)
	if err != nil {
		return nil, err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	ds := make([]*Device, 0, 10)
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data.devices").String()), &ds)
	return ds, err
}

// GetDeviceStatus 获取设备状态
func GetDeviceStatus(ids ...string) ([]*DeviceStatus, error) {
	resourceID := strings.Join(ids, ",")
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v3/project/device/status?resource_id=%s", auth.GetAddr(), resourceID), nil)
	if err != nil {
		return nil, err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	dss := make([]*DeviceStatus, 0, len(ids))
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data").String()), &dss)
	return dss, err
}

// NewDevices 新建设备
func NewDevices(ds []*Device) ([]*Device, error) {
	params := define.M{
		"devices": ds,
	}
	data, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v3/project/device/new", auth.GetAddr()), strings.NewReader(string(data)))
	if err != nil {
		return nil, err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	rds := make([]*Device, 0, len(ds))
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data.devices").String()), &rds)
	return rds, err
}

// UpdateDevices 新建设备
func UpdateDevices(ds []*Device) error {
	params := define.M{
		"devices": ds,
	}
	data, err := json.Marshal(params)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v3/project/device/update", auth.GetAddr()), strings.NewReader(string(data)))
	if err != nil {
		return err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	errCode := gjson.Get(string(b), "error_code").String()
	if errCode != "00" {
		return fmt.Errorf("UpdateDevices error: %s", gjson.Get(string(b), "error_msg").String())
	}
	return nil
}

// GetChildren 获取设备测点列表
func GetChildren(resourceID string) ([]*Spot, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v3/project/device/children?resource_id=%s", auth.GetAddr(), resourceID), nil)
	if err != nil {
		return nil, err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	spots := make([]*Spot, 0, 100)
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data").String()), &spots)
	return spots, err
}

// DeleteDevice 删除设备
func DeleteDevice(resourceID string) error {
	req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("%s/api/v3/project/device/delete?resource_id=%s", auth.GetAddr(), resourceID), nil)
	if err != nil {
		return err
	}
	resp, err := auth.NewHTTPClient().Do(req)
	if err != nil {
		return err
	}

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	errCode := gjson.Get(string(b), "error_code").String()
	if errCode != "00" {
		return fmt.Errorf("UpdateDevices error: %s", gjson.Get(string(b), "error_msg").String())
	}
	return err
}
