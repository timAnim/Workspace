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

// GetRelated 获取关联节点
func GetRelated(resourceID string, relationCode int, reverse int, deleted int, output []string) ([]*Resource, error) {
	q := define.M{
		"resource_id":   resourceID,
		"relation_code": relationCode,
		"reverse":       reverse,
	}
	if deleted == 1 {
		q["deleted"] = "both"
	}
	if output != nil && len(output) != 0 {
		q["output"] = output
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/relations", auth.GetAddr()), strings.NewReader(string(b)))
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
	//fmt.Println(string(body), err)
	res := []*Resource{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

// GetChildren 查找子节点
func GetChildren(resourceID string, deleted int, output []string) ([]*Resource, error) {
	return GetRelated(resourceID, 5, 0, deleted, output)
}

// GetParent 查找父节点
func GetParent(resourceID string, deleted int, output []string) ([]*Resource, error) {
	return GetRelated(resourceID, 5, 1, deleted, output)
}

// GetMultiRelated 获取关联节点
func GetMultiRelated(resourceIDs []string, relationCode int, reverse int, deleted int, output []string) ([]*Resource, error) {
	if len(resourceIDs) == 0 {
		return []*Resource{}, nil
	}

	q := define.M{
		"resource_id1":  resourceIDs,
		"relation_code": relationCode,
		"reverse":       reverse,
	}
	if deleted == 1 {
		q["deleted"] = "both"
	}
	if output != nil && len(output) != 0 {
		q["output"] = output
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/multi_relations", auth.GetAddr()), strings.NewReader(string(b)))
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
	//fmt.Println(string(body), err)
	res := []*Resource{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.relations").String()), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}
