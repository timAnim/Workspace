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

// TemplateInfo 彩虹C02模板信息
type TemplateInfo struct {
	DeviceType    string   `json:"device_type"`
	Name          string   `json:"name"`
	Desc          string   `json:"desc"`
	LimitInterval int64    `json:"limit_interval"`
	Protocol      string   `json:"protocol"`
	Transfer      []string `json:"transfer"`
}

// DriverInfo 彩虹C02驱动信息
type DriverInfo struct {
	DeviceType string `json:"device_type"`
	BoardType  string `json:"board_type"`
	Name       string `json:"name"`
	DeviceInfo string `json:"device_info"`
	FileName   string `json:"file_name"`
	Protocol   string `json:"protocol"`
	UpTime     int64  `json:"up_time"`
}

// GetTemplateInfo 获取驱动模板信息
func GetTemplateInfo(deviceType string) (*TemplateInfo, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v3/driver/info?device_type=%s", auth.GetAddr(), deviceType), nil)
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

	ti := &TemplateInfo{}
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data").String()), ti)
	return ti, err
}

// GetTemplateList 获取驱动模板列表
func GetTemplateList(query string) ([]*DriverInfo, error) {
	params := define.M{
		"s_context": query,
		"page": define.M{
			"number": 1,
			"size":   1000,
		},
	}
	data, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/driver/query", auth.GetAddr()), strings.NewReader(string(data)))
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

	ts := make([]*DriverInfo, 0, 100)
	err = json.Unmarshal([]byte(gjson.Get(string(b), "data.drivers").String()), &ts)
	return ts, err
}
