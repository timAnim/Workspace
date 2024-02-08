package sqladapter

import (
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/define/xfield"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("sql", "import", Import, "从excel文件(.xlsx)导入数据", `import <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "导入文件名"},
	})
}

var keepMap = map[string]bool{
	"index":       true,
	"resource_id": true,
	"ci_type":     true,
	"deleted":     true,
	"version":     true,
}

// Import 资源导入
func Import(filename string) {
	rs, err := utils.GenMapFromXlsx(filename)
	if err != nil {
		log.Errorf("utils.GenMapFromXlsx error: %s", err.Error())
		return
	}

	items := &cmdb.Items{
		DumpData:  "yes",
		Resources: make([]*cmdb.Resource, 0, 1000),
	}

	for _, r := range rs {
		rid := r.MustString("resource_id")

		if rid == "" {
			log.Warnf("resource_id get null string")
			continue
		}

		m := define.M{}

		for k := range r {
			if _, ok := keepMap[k]; ok {
				// 不支持修改的字段
				continue
			}
			v := r.MustString(k)
			rv, err := xfield.CheckField(k, v)
			if err != nil {
				log.Warnf("field parse error: %s", err.Error())
				continue
			}

			m[k] = rv
		}

		if len(m) == 0 {
			continue
		}

		res := &cmdb.Resource{
			ResourceID: rid,
			Attributes: m,
		}

		items.Resources = append(items.Resources, res)

		if len(items.Resources) >= 1000 {
			err = cmdb.UpsertItems(items)
			if err != nil {
				log.Warnf("update cmdb error: %s", err.Error())
				continue
			}

			log.Infof("updated %d resources", len(items.Resources))

			items.Resources = make([]*cmdb.Resource, 0, 1000)
		}
	}

	if len(items.Resources) != 0 {
		err = cmdb.UpsertItems(items)
		if err != nil {
			log.Warnf("update cmdb error: %s", err.Error())
			return
		}

		log.Infof("updated %d resources", len(items.Resources))
	}
}
