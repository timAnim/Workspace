package north

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

// Addr 服务器地址
var Addr string

func init() {
	Addr = "127.0.0.1"
}

// ValueDontPush 数据推送类型
const (
	ValueDontPush     = 0  // 不推送实时数据
	ValueRealTimePush = 1  // 实时推送
	ValuePeriodPush5  = 5  // 5分钟周期推送
	ValuePeriodPush10 = 10 // 10分钟周期推送
	ValuePeriodPush15 = 15 // 15分钟周期推送
	ValuePeriodPush20 = 20 // 20分钟周期推送
	ValuePeriodPush30 = 30 // 30分钟周期推送

	AggregatedDontPush = 0
	AggregatedPush     = 1

	SysTypeV6 = 1
	SysTypeAU = 2
)

// Param V3R3版本北向配置参数
type Param struct {
	GUID               string `json:"guid"`
	Host               string `json:"host"`
	SysSign            string `json:"sys_sign"`
	SysName            string `json:"sys_name"`
	SysType            int    `json:"sys_type"`
	CmdbMaxVersion     int    `json:"cmdb_max_version"`
	NorthPort          string `json:"north_port"`
	SouthPort          string `json:"south_port"`
	ValuePushType      int    `json:"value_push_type"`
	AggregatedPushType int    `json:"aggregated_push_type"`
	Status             int    `json:"status"`
}

// GetNorthConfig 获取北向配置
func GetNorthConfig() ([]*Param, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/system/north_interface", auth.GetAddr()), nil)
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
	//fmt.Println(gjson.Get(string(body), "data.interfaces"), err)
	params := []struct {
		Param *Param `json:"param"`
	}{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.interfaces").String()), &params)
	if err != nil {
		return nil, err
	}
	ps := []*Param{}
	for _, p := range params {
		ps = append(ps, p.Param)
	}
	return ps, nil
}

// GetNorthConfigBySysType 获取北向配置
func GetNorthConfigBySysType(sysType int) ([]*Param, error) {
	all, err := GetNorthConfig()
	if err != nil {
		return nil, err
	}
	ps := []*Param{}
	for _, p := range all {
		if p.SysType == sysType {
			ps = append(ps, p)
		}
	}
	return ps, nil
}

// GetNorthConfigByGUID 获取北向配置
func GetNorthConfigByGUID(guid string) (*Param, error) {
	all, err := GetNorthConfig()
	if err != nil {
		return nil, err
	}
	for _, p := range all {
		if p.GUID == guid {
			return p, nil
		}
	}
	return nil, fmt.Errorf("no such north config: %s", guid)
}

// GetNorthConfigByHost 获取北向配置
func GetNorthConfigByHost(host string) (*Param, error) {
	all, err := GetNorthConfig()
	if err != nil {
		return nil, err
	}
	for _, p := range all {
		if p.Host == host {
			return p, nil
		}
	}
	return nil, fmt.Errorf("no such north config: %s", host)
}

// New 新增北向配置
func New(p *Param) error {
	b, err := json.Marshal(define.M{
		"method":  "1",
		"param":   p,
		"version": "1.0.0.0",
	})

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/system/north_interface/new", auth.GetAddr()), strings.NewReader(string(b)))
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
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("%d: %s", resp.StatusCode, string(body))
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	return nil
}

// Modify 修改北向配置
func Modify(p *Param) error {
	b, err := json.Marshal(define.M{
		"param":   p,
		"version": "1.0.0.0",
	})

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/system/north_interface/modify", auth.GetAddr()), strings.NewReader(string(b)))
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

// Reset 重置北向配置
func Reset(p *Param) error {
	p.CmdbMaxVersion = -1
	b, err := json.Marshal(define.M{
		"param":   p,
		"version": "1.0.0.0",
	})

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/system/north_interface/reset", auth.GetAddr()), strings.NewReader(string(b)))
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
