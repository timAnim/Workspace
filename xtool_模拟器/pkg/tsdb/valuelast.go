package tsdb

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

// GetSnapshot 获取未恢复事件
func GetSnapshot(ids []string) ([]*define.ValueItem, error) {
	resources := []define.M{}
	for _, ID := range ids {
		resources = append(resources, define.M{
			"resource_id": ID,
		})
	}
	q := define.M{
		"resources": resources,
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/tsdb/status/last", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
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

	vs := []*define.ValueItem{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &vs)
	if err != nil {
		return nil, err
	}
	return vs, nil
}
