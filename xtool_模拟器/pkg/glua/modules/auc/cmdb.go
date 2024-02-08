package auc

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/types"

	"github.com/tidwall/gjson"
)

// QueryItems 获取单个CI项
func (c *Client) QueryItems(query *types.Query) (*types.Items, error) {
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", c.getAddr()), strings.NewReader(query.String()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
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
	items := &types.Items{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), items)
	if err != nil {
		return nil, err
	}
	return items, nil
}

// QueryRelatedItems 获取关联CI项
func (c *Client) QueryRelatedItems(query *types.Query) (*types.Items, error) {
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/relations", c.getAddr()), strings.NewReader(query.String()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
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
	items := &types.Items{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), items)
	if err != nil {
		return nil, err
	}
	return items, nil
}

// AddItems 新增CI项
func (c *Client) AddItems(items *types.Items) error {
	if items.Resources == nil {
		items.Resources = []*types.Resource{}
	}
	if items.Relations == nil {
		items.Relations = []*types.Relation{}
	}
	data, err := json.Marshal(items)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources", c.getAddr()), strings.NewReader(string(data)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return nil
}

// UpsertItems 新增或修改CI项
func (c *Client) UpsertItems(items *types.Items) error {
	if items.Resources == nil {
		items.Resources = []*types.Resource{}
	}
	if items.Relations == nil {
		items.Relations = []*types.Relation{}
	}
	data, err := json.Marshal(items)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("%s/api/v2/cmdb/resources", c.getAddr()), strings.NewReader(string(data)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	d := types.M{}
	err = json.Unmarshal(body, &d)
	if err != nil {
		return err
	}
	if c, ok := d["error_code"]; ok {
		if c.(string) != "00" {
			return fmt.Errorf("%s", d["error_msg"].(string))
		}
	} else {
		return fmt.Errorf("unknown error")
	}
	return nil
}

// Delete 节点删除
func (c *Client) Delete(resourceID string, relationCode int, depth int) error {
	req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("%s/api/v2/cmdb/resources?id=%s&relation_code=%d&depth=%d", c.getAddr(), resourceID, relationCode, depth), nil)
	if err != nil {
		return err
	}
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	data := types.M{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		return err
	}
	if c, ok := data["error_code"]; ok {
		if c.(string) != "00" {
			return fmt.Errorf("%s", data["error_msg"].(string))
		}
	} else {
		return fmt.Errorf("unknown error")
	}
	return nil
}

// DeleteRel 节点关系删除
func (c *Client) DeleteRel(resourceID1 string, resourceID2 string) error {
	req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("%s/api/v2/cmdb/resources/relations?id1=%s&id2=%s", c.getAddr(), resourceID1, resourceID2), nil)
	if err != nil {
		return err
	}
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	data := types.M{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		return err
	}
	if c, ok := data["error_code"]; ok {
		if c.(string) != "00" {
			return fmt.Errorf("%s", data["error_msg"].(string))
		}
	} else {
		return fmt.Errorf("unknown error")
	}
	return nil
}

// GetItemsByID 根据测点ID列表查询
func (c *Client) GetItemsByID(ids []string) ([]*types.Resource, error) {
	q := types.M{
		"where": []types.M{
			types.M{
				"terms": []types.M{
					types.M{
						"field":    "resource_id",
						"operator": "in",
						"value":    ids,
					},
				},
			},
		},
		"deleted": "both",
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", c.getAddr()), strings.NewReader(q.String()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
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
	res := make([]*types.Resource, 0, len(ids))
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &res)
	if err != nil {
		return nil, err
	}

	return res, nil
}

// GetItem 获取单个CI项
func (c *Client) GetItem(resourceID string, deleted int) (*types.Resource, error) {
	q := types.M{
		"where": []types.M{
			types.M{
				"terms": []types.M{
					types.M{
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

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", c.getAddr()), strings.NewReader(string(b)))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.newHTTPClient().Do(req)
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
	res := make([]*types.Resource, 0, 1)
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &res)
	if err != nil {
		return nil, err
	}

	if len(res) == 0 {
		return nil, fmt.Errorf("item not found: %s", resourceID)
	}
	return res[0], nil
}
