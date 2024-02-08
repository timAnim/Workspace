package cmdb

import "encoding/json"

// 定义ci_type常量取值
const (
	CiTypeProject      = "1"
	CiTypeDevice       = "2"
	CiTypeSpot         = "3"
	CiTypeSpace        = "5"
	CiTypePage         = "6"
	CiTypeBoard        = "7"
	CiTypeTemplatePage = "8"
	CiTypePicture      = "9"
)

// IsProject 判断是否为工程根
func (r *Resource) IsProject() bool {
	return r.MustCiType() == CiTypeProject
}

// IsSpace 判断是否为空间
func (r *Resource) IsSpace() bool {
	return r.MustCiType() == CiTypeSpace
}

// IsDevice 判断是否为测点
func (r *Resource) IsDevice() bool {
	return r.MustCiType() == CiTypeDevice
}

// IsSpot 判断是否为测点
func (r *Resource) IsSpot() bool {
	return r.MustCiType() == CiTypeSpot
}

// IsPage 判断是否为测点
func (r *Resource) IsPage() bool {
	return r.MustCiType() == CiTypePage
}

// IsBoard 判断是否为板卡
func (r *Resource) IsBoard() bool {
	return r.MustCiType() == CiTypeBoard
}

// IsPicture 判断是否为测点
func (r *Resource) IsPicture() bool {
	return r.MustCiType() == CiTypePicture
}

// Copy 复制节点
func (r *Resource) Copy() *Resource {
	c := &Resource{}
	b, _ := json.Marshal(r)
	json.Unmarshal(b, c)
	return c
}
