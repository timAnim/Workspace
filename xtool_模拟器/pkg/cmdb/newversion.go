package cmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"

	"github.com/tidwall/gjson"
)

// NewVersionFor 申请新版本
func NewVersionFor(ruleName string, count int) ([]int, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/cmdb/resources/new_id?rule_name=%s&count=%d", auth.GetAddr(), ruleName, count), nil)
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
	ids := []int{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.new_id").String()), &ids)
	if err != nil {
		return nil, err
	}
	return ids, nil
}

// NewID 申请新的设备ID
func NewID(count int) ([]string, error) {
	if count == 0 {
		count = 1
	}
	vs, err := NewVersionFor("device", count)
	if err != nil {
		return nil, err
	}
	ids := []string{}
	for _, v := range vs {
		ids = append(ids, fmt.Sprintf("0_%d", v))
	}
	return ids, nil
}
