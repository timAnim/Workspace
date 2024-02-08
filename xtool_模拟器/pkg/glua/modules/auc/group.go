package auc

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

// GroupDevItem 设备分组节点
type GroupDevItem struct {
	ID       string `json:"id"`
	ParentID string `json:"parent_id"`
	Name     string `json:"name"`
	Value    string `json:"value"`
	Level    string `json:"level"`
}

// GroupDevList 设备分组列表
type GroupDevList []*GroupDevItem

// Swap GroupDevList 排序交换
func (l GroupDevList) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}

// Less 比较
func (l GroupDevList) Less(i, j int) bool {
	x := l[i]
	y := l[j]
	idx := strings.Split(x.ID, ".")
	idy := strings.Split(y.ID, ".")
	if len(idx) != len(idy) {
		return len(idx) <= len(idy)
	}
	for k := 0; k < len(idx); k++ {
		ax, _ := strconv.Atoi(idx[k])
		ay, _ := strconv.Atoi(idy[k])
		if ax != ay {
			return ax <= ay
		}
	}
	return true
}

// Len 长度
func (l GroupDevList) Len() int {
	return len(l)
}

// GetGroupDev 获取group_dev.json
func (c *Client) GetGroupDev() (GroupDevList, error) {

	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/device_template/groups_dev.json", c.getAddr()), nil)
	if err != nil {
		return nil, err
	}
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	gd := []*GroupDevItem{}
	err = json.Unmarshal(body, &gd)
	if err != nil {
		return nil, err
	}
	return gd, nil
}
