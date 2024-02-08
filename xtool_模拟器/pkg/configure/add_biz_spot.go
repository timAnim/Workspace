package configure

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "show_biz_spot", ShowBizSpot, "列举业务模板测点", `show_biz_spot`, []*reg.Param{})
	reg.Regist("configure", "add_biz_spot", AddBizSpot, "添加业务模板测点，详情使用show_biz_spot查看", `add_biz_spot <parentID> <name> <spotType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "ids", Type: "string", Necessity: true, Desc: "测点ID列表，使用','隔开，详情使用show_biz_spot查看"},
	})
}

// ShowBizSpot 添加业务模板测点
func ShowBizSpot() {
	bs, err := cmdb.GetBizSpot()
	if err != nil {
		log.Errorf("cmdb.GetBizSpot error: %s", err.Error())
		return
	}

	fmt.Println("可用性:")
	for _, s := range bs.Available.Spots {
		fmt.Println("\t", s.MustString("id"), s.MustString("name"))
	}

	fmt.Println("容量:")
	for _, s := range bs.Capacity.Spots {
		fmt.Println("\t", s.MustString("id"), s.MustString("name"))
	}

	fmt.Println("能效:")
	for _, s := range bs.EnergyEfficiency.Spots {
		fmt.Println("\t", s.MustString("id"), s.MustString("name"))
	}

	log.Infof("show_biz_spot success")
}

// AddBizSpot 添加业务模板测点
func AddBizSpot(parentID string, ids string) {
	if !strings.HasPrefix(parentID, "0_") {
		log.Errorf("do not support to add biz spot to none local space: '%s'", parentID)
		return
	}
	p, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", parentID, err.Error())
		return
	}
	if !p.IsSpace() && !p.IsDevice() {
		log.Errorf("do not support to add biz spot to none space or none device node: '%s:%s'", parentID, p.MustName())
		return
	}
	bs, err := cmdb.GetBizSpot()
	if err != nil {
		log.Errorf("cmdb.GetBizSpot error: %s", err.Error())
		return
	}

	idMap := make(map[string]define.M)

	for _, s := range bs.Available.Spots {
		idMap[s.MustString("id")] = s
	}

	for _, s := range bs.Capacity.Spots {
		idMap[s.MustString("id")] = s
	}

	for _, s := range bs.EnergyEfficiency.Spots {
		idMap[s.MustString("id")] = s
	}

	xids := strings.Split(ids, ",")

	items := cmdb.Items{
		Resources: make([]*cmdb.Resource, 0, len(xids)),
		Relations: make([]*cmdb.Relation, 0, len(xids)),
	}
	for _, id := range xids {
		attr, ok := idMap[id]
		if !ok {
			log.Warnf("no biz spot definition for id '%s'", id)
			continue
		}
		rid := fmt.Sprintf("%s_%s", p.ResourceID, id)
		attr["resource_id"] = rid
		attr["parent_id"] = p.ResourceID
		location := parentID
		if pLoc, ok := p.Attributes["location"]; ok {
			location = fmt.Sprintf("%s/%s", pLoc.(string), parentID)
		}
		attr["location"] = location

		items.Resources = append(items.Resources, &cmdb.Resource{
			ResourceID: rid,
			Attributes: attr,
		})
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  p.ResourceID,
			ResourceID2:  rid,
			RelationCode: 5,
		})
		log.Infof("add_biz_spot: '%s:%s/%s:%s'", p.ResourceID, p.MustName(), rid, attr.MustString("name"))
	}

	err = cmdb.AddItems(&items)
	if err != nil {
		log.Errorf("add_biz_spot error: %s", err.Error())
		return
	}

	log.Infof("add_biz_spot success")
}
