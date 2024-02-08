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

// GetItemsByCiType 查询指定ci_type的节点
func GetItemsByCiType(ciType string) ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    ciType,
					},
				},
			},
		},
		//"deleted": "both",
		"translate": 1,
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetItemsWhereResourceIDIn 根据测点ID列表查询
func GetItemsWhereResourceIDIn(ids []string) ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "resource_id",
						"operator": "in",
						"value":    ids,
					},
				},
			},
		},
		"deleted": "both",
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetItem 获取单个CI项
func GetItem(resourceID string, deleted int) (*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "resource_id",
						"operator": "eq",
						"value":    resourceID,
					},
				},
			},
		},
	}
	if deleted == 1 {
		q["deleted"] = "both"
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

	if len(res) == 0 {
		return nil, fmt.Errorf("item not found: %s", resourceID)
	}
	return res[0], nil
}

// GetItemsByDeviceType 根据设备类型查询设备节点
func GetItemsByDeviceType(deviceType string) ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "device_type",
						"operator": "eq",
						"value":    deviceType,
					},
				},
			},
		},
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetDevices 查询设备节点
func GetDevices(prefix string, deleted int) ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    "2",
					},
					define.M{
						"field":    "device_type",
						"operator": "like",
						"value":    prefix + "%",
					},
				},
			},
		},
		"translate": 1,
	}
	if deleted == 1 {
		q["deleted"] = "both"
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetDevicesUnder 查询某空间下的设备节点
func GetDevicesUnder(spaceID string, prefix string) ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    "2",
					},
					define.M{
						"field":    "location",
						"operator": "like",
						"value":    "%" + spaceID,
					},
					define.M{
						"field":    "device_type",
						"operator": "like",
						"value":    prefix + "%",
					},
				},
			},
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    "2",
					},
					define.M{
						"field":    "location",
						"operator": "like",
						"value":    "%" + spaceID + "/%",
					},
					define.M{
						"field":    "device_type",
						"operator": "like",
						"value":    prefix + "%",
					},
				},
			},
		},
		"deleted":   "both",
		"translate": 1,
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetSpaces 查询空间
func GetSpaces() ([]*Resource, error) {
	q := define.M{
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "resource_id",
						"operator": "eq",
						"value":    "project_root",
					},
				},
			},
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    "5",
					},
					define.M{
						"field":    "space_type",
						"operator": "in",
						"value":    []string{"1", "2", "3", "4", "5"},
					},
				},
			},
		},
		"deleted":   "both",
		"translate": 1,
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
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

// GetPagesUnder 查询某空间下的页面节点
func GetPagesUnder(spaceID string, output []string) ([]*Resource, error) {
	q := define.M{
		"resource_id":   spaceID,
		"relation_code": 5,
		"output":        output,
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{
						"field":    "ci_type",
						"operator": "eq",
						"value":    "6",
					},
				},
			},
		},
		"deleted":   "both",
		"translate": 1,
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
