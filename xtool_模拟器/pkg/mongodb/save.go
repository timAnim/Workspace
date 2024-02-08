package mongodb

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"

	"github.com/globalsign/mgo"
)

func normalize(in interface{}, encode bool) {
	switch x := in.(type) {
	case define.M:
		ks := []string{}
		for k, v := range x {
			ks = append(ks, k)
			_ = v
		}
		for _, k := range ks {
			normalize(x[k], encode)
			newKey := ""
			if encode {
				if strings.Contains(k, ".") {
					newKey = strings.Replace(k, ".", "\\u002e", -1)
				}
			} else {
				if strings.Contains(k, "\\u002e") {
					newKey = strings.Replace(k, "\\u002e", ".", -1)
				}
			}
			if newKey != "" {
				x[newKey] = x[k]
				delete(x, k)
			}
		}
	case map[string]interface{}:
		ks := []string{}
		for k, v := range x {
			ks = append(ks, k)
			_ = v
		}
		for _, k := range ks {
			normalize(x[k], encode)
			newKey := ""
			if encode {
				//fmt.Println(strings.Index(k, "."))
				if strings.Contains(k, ".") {
					newKey = strings.Replace(k, ".", "\\u002e", -1)
				}
			} else {
				if strings.Contains(k, "\\u002e") {
					newKey = strings.Replace(k, "\\u002e", ".", -1)
				}
			}
			if newKey != "" {
				x[newKey] = x[k]
				delete(x, k)
			}
		}
	case []interface{}:
		for _, v := range in.([]interface{}) {
			normalize(v, encode)
		}
	default:
	}
}

func flattenResource(r *cmdb.Resource, version int32, dumpData bool) define.M {
	// 此处有问题，前端新增使用的是PUT接口的时候就会缺失deleted字段
	res := define.M{
		"_id":         r.ResourceID,
		"resource_id": r.ResourceID,
		"version":     version,
	}
	for k, v := range r.Attributes {
		res[fmt.Sprintf("attributes.%s", k)] = v
	}
	if dumpData {
		// 若是dump_data则带deleted字段
		res["deleted"] = r.Deleted
	}
	return res
}

// SaveResource 保存单个节点
func (e *MgoEngine) SaveResource(db *mgo.Database, r *cmdb.Resource) error {
	_, err := db.C("resources").UpsertId(r.ResourceID, r)
	return err
}

// SaveRelation 保存单个关系
func (e *MgoEngine) SaveRelation(db *mgo.Database, r *cmdb.Relation) error {
	_, err := db.C("relations").UpsertId(fmt.Sprintf("%s->%s", r.ResourceID1, r.ResourceID2), r)
	return err
}
