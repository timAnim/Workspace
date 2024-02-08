package driver

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"xtool/pkg/define"
)

// Brd 板卡模板
type Brd struct {
	Board    define.M   `json:"board"`
	Commands []define.M `json:"commands"`
	Spots    SpotList   `json:"spots"`
}

func (brd *Brd) String() string {
	b, _ := json.Marshal(brd)
	return string(b)
}

// GetBrd 获取板卡模板
func GetBrd(boardType string) (*Brd, error) {
	brdName := fmt.Sprintf("%s.brd", strings.Replace(boardType, ".", "_", -1))
	tStr, err := GetTemplate(brdName)
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

// SpotList 测点列表
type SpotList []define.M

// Less 小于
func (l SpotList) Less(i, j int) bool {
	xi, xj := l[i].MustInt64("id"), l[j].MustInt64("id")
	return xi < xj
}

// Swap 交换
func (l SpotList) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}

func (l SpotList) Len() int {
	return len(l)
}

// Sort 排序
func (l SpotList) Sort() SpotList {
	sort.Sort(l)
	return l
}
