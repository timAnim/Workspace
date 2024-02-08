package cmdb

import (
	"sort"
	"strconv"
)

// ResList CI项列表
type ResList []*Resource

func (l ResList) Less(i, j int) bool {
	xi, yi, zi := value(l[i])
	xj, yj, zj := value(l[j])
	if xi != xj {
		if (xi == 2 || xi == 3) && (xj == 2 || xj == 3) {
			return xi < xj
		}
		return xi > xj
	}
	if yi == 0 || yj == 0 {
		if yi == 0 {
			return false
		}
		return true
	}
	if yi != yj {
		return yi < yj
	}
	return zi < zj
}

func (l ResList) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}

func (l ResList) Len() int {
	return len(l)
}

// Sort CI项排序
func Sort(res []*Resource) []*Resource {
	rs := ResList{}
	rs = append(rs, res...)
	sort.Sort(rs)
	newRes := []*Resource{}
	newRes = append(newRes, rs...)
	return newRes
}

func value(r *Resource) (int32, int32, int32) {
	ciType := int32(0)
	if v, ok := r.Attributes["ci_type"]; ok {
		switch x := v.(type) {
		case string:
			ct, err := strconv.ParseInt(x, 10, 64)
			if err == nil {
				ciType = int32(ct)
			}
		case int:
			ciType = int32(x)
		case float64:
			ciType = int32(x)
		}
	}
	orderNum := int32(0)
	if v, ok := r.Attributes["order_num"]; ok {
		switch x := v.(type) {
		case string:
			on, err := strconv.ParseInt(x, 10, 64)
			if err == nil {
				orderNum = int32(on)
			}
		case int:
			orderNum = int32(x)
		case float64:
			orderNum = int32(x)
		}
	}
	createDate := int32(0)
	if v, ok := r.Attributes["create_date"]; ok {
		switch x := v.(type) {
		case string:
			cd, err := strconv.ParseInt(x, 10, 64)
			if err == nil {
				createDate = int32(cd)
			}
		case int:
			createDate = int32(x)
		case float64:
			createDate = int32(x)
		}
	}
	return ciType, orderNum, createDate
}
