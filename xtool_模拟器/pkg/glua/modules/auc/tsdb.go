package auc

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/types"

	"github.com/tidwall/gjson"
)

// MultiGet 获取测点实时值
func (c *Client) MultiGet(ids []string) ([]*types.ValueItem, error) {
	resources := []types.M{}
	for _, ID := range ids {
		resources = append(resources, types.M{
			"resource_id": ID,
		})
	}
	q := types.M{
		"resources": resources,
	}
	//fmt.Println(q.String())
	//fmt.Println(string(b))
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/tsdb/status/last", c.getAddr()), strings.NewReader(q.String()))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
	//fmt.Println(err)
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

	//fmt.Println(string(body))

	vs := []*types.ValueItem{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &vs)

	//fmt.Println(string(body), vs)
	if err != nil {
		return nil, err
	}
	return vs, nil
}

// Setting 设置值
func (c *Client) Setting(resourceID string, value string) error {
	q := types.M{
		"resource_id": resourceID,
		"value":       value,
	}
	data := q.String()
	//fmt.Println(data)
	check := md5.New()
	check.Write([]byte(data))
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/tsdb/setting", c.getAddr()), strings.NewReader(data))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("check", hex.EncodeToString(check.Sum(nil)))
	resp, err := c.newHTTPClient().Do(req)
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
	r := types.M{}
	r.FromString(string(body))
	if r.MustString("error_code") != "00" {
		return fmt.Errorf("error response: %s", string(body))
	}
	return nil
}
