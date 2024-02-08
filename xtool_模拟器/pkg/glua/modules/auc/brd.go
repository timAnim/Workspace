package auc

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"xtool/pkg/types"
)

// Brd 板卡模板
type Brd struct {
	Board types.M   `json:"board"`
	Spots BSpotList `json:"spots"`
}

// GetBrd 获取板卡模板
func (c *Client) GetBrd(boardType string) (*Brd, error) {
	brdName := fmt.Sprintf("%s.brd", strings.Replace(boardType, ".", "_", -1))
	tStr, err := c.GetTemplate(brdName)
	if err != nil {
		return nil, err
	}
	brd := Brd{}
	err = json.Unmarshal(tStr, &brd)
	if err != nil {
		return nil, err
	}
	return &brd, nil
}

// BSpotList 板卡测点列表
type BSpotList []types.M

// Less 小于
func (l BSpotList) Less(i, j int) bool {
	xi, xj := l[i].MustInt64("id"), l[j].MustInt64("id")
	return xi < xj
}

// Swap 交换
func (l BSpotList) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}

// Len 长度
func (l BSpotList) Len() int {
	return len(l)
}

// Sort 排序
func (l BSpotList) Sort() BSpotList {
	sort.Sort(l)
	return l
}
