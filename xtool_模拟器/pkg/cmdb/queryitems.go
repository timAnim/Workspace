package cmdb

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

// QueryItems 获取单个CI项
func QueryItems(query *define.Query) (*Items, error) {
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(query.String()))
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
	items := &Items{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), &items)
	if err != nil {
		return nil, err
	}
	return items, nil
}

// QueryItemsByPrefix 前缀匹配查询
func QueryItemsByPrefix(prefix string) (*Items, error) {
	q := &define.Query{
		Where: []*define.Cond{
			&define.Cond{
				Terms: []*define.Term{
					&define.Term{
						Field:    "resource_id",
						Operator: "like",
						Value:    prefix + "%",
					},
				},
			},
		},
	}
	return QueryItems(q)
}
