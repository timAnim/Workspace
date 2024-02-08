package tsdbstore

import (
	"fmt"
	"sort"
	"strconv"
	"time"
)

// ValueTime 时间测点值
type ValueTime struct {
	Time  string
	Value string
}

// Format 将值与ID格式化成 k-v
func (v *ValueTime) Format(resourceID string) (string, string, error) {
	ts, err := strconv.ParseInt(v.Time, 10, 64)
	if err != nil {
		return "", "", err
	}

	t := time.Unix(ts, 0)
	if err != nil {
		return "", "", err
	}

	key := fmt.Sprintf(ssdbKeyFmt, t.Year(), t.Month(), t.Day(), t.Hour(), resourceID, t.Minute()*60+t.Second())

	return key, v.Value, nil
}

// ValueTimeList 值列表排序规则：按时间排序（由小到大）
type ValueTimeList []*ValueTime

func (list ValueTimeList) Len() int {
	return len(list)
}

func (list ValueTimeList) Less(i, j int) bool {
	if list[i].Time < list[j].Time {
		return true
	}
	return false
}

func (list ValueTimeList) Swap(i, j int) {
	list[i], list[j] = list[j], list[i]
}

// IDValue ID与Value对
type IDValue struct {
	ResourceID string
	Value      string
}

// IDValueSet IDValue集合
type IDValueSet struct {
	vs []*IDValue
	vm map[string]*IDValue
}

// NewIDValueSet 新建IDValue集合
func NewIDValueSet() *IDValueSet {
	return &IDValueSet{
		vs: make([]*IDValue, 0, 100),
		vm: make(map[string]*IDValue),
	}
}

// Add 向集合新增
func (s *IDValueSet) Add(v *IDValue) {
	if _, ok := s.vm[v.ResourceID]; ok {
		return
	}
	s.vm[v.ResourceID] = v
	s.vs = append(s.vs, v)
}

// Get 从集合获取
func (s *IDValueSet) Get(resourceID string) (*IDValue, bool) {
	v, ok := s.vm[resourceID]

	return v, ok
}

// TVM 定义映射
type TVM map[int64]*IDValueSet

// OrderedTime 返回排序的时间列表
func (m TVM) OrderedTime() []int64 {
	ts := make([]int64, 0, len(m))

	for t := range m {
		ts = append(ts, t)
	}

	sort.Slice(ts, func(i, j int) bool {
		return ts[i] < ts[j]
	})

	return ts
}

// ArrangeValue 整理数据
func ArrangeValue(vm map[string]ValueTimeList) (TVM, error) {
	tvm := make(TVM)

	for id, vts := range vm {
		for _, vt := range vts {
			ts, err := strconv.ParseInt(vt.Time, 10, 64)
			if err != nil {
				return nil, err
			}

			if s, ok := tvm[ts]; ok {
				s.Add(&IDValue{
					ResourceID: id,
					Value:      vt.Value,
				})
				continue
			}

			s := NewIDValueSet()
			s.Add(&IDValue{
				ResourceID: id,
				Value:      vt.Value,
			})

			tvm[ts] = s
		}
	}

	return tvm, nil
}
