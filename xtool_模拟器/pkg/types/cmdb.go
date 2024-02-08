package types

import (
	"encoding/json"
)

// Resource CI项定义
type Resource struct {
	XID        string      `json:"_id,omitempty" bson:"_id"`
	ResourceID string      `json:"resource_id" bson:"resource_id"`
	Attributes M           `json:"attributes" bson:"attributes"`
	Version    interface{} `json:"version" bson:"version"`
	Deleted    int         `json:"deleted" bson:"deleted"`

	ResourceID1  string `json:"resource_id1,omitempty" bson:"resource_id1,omitempty"`
	ResourceID2  string `json:"resource_id2,omitempty" bson:"resource_id2,omitempty"`
	RelationCode int    `json:"relation_code,omitempty" bson:"relation_code,omitempty"`
}

// String CI项转成json字符串
func (r *Resource) String() string {
	b, _ := json.Marshal(r)
	return string(b)
}

// Relation 关系项定义
type Relation struct {
	XID          string      `json:"_id,omitempty" bson:"_id"`
	ResourceID1  string      `json:"resource_id1" bson:"resource_id1"`
	ResourceID2  string      `json:"resource_id2" bson:"resource_id2"`
	RelationCode int         `json:"relation_code" bson:"relation_code"`
	Version      interface{} `json:"version" bson:"version"`
	Deleted      int         `json:"deleted" bson:"deleted"`
}

// Items 通用数据添加结构
type Items struct {
	Resources     []*Resource `json:"resources"`
	Relations     []*Relation `json:"relations"`
	ResourceCount int         `json:"resource_count,omitempty"`
	RelationCount int         `json:"relation_count,omitempty"`
	TotalCount    int         `json:"total_count,omitempty"`
	DumpData      string      `json:"dump_data,omitempty"`
}

// GetIDs 获取ID列表
func (items *Items) GetIDs() []string {
	ids := make([]string, 0, len(items.Resources))

	for _, r := range items.Resources {
		ids = append(ids, r.ResourceID)
	}

	return ids
}

// String 序列化
func (items *Items) String() string {
	b, _ := json.Marshal(items)
	return string(b)
}
