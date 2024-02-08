package configure

import (
	"strconv"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "addrel", AddRelation, "添加关系，节点间关系请不要随意添加，否则可能引起业务上的异常", `addrel <resourceID1> <resourceID2> <relationCode>`, []*reg.Param{
		&reg.Param{Name: "resourceID1", Type: "string", Necessity: true, Desc: "源节点ID"},
		&reg.Param{Name: "resourceID2", Type: "string", Necessity: true, Desc: "被指向节点ID"},
		&reg.Param{Name: "relationCode", Type: "int", Necessity: true, Desc: "关系码"},
	})
}

// AddRelation 添加关系
func AddRelation(resourceID1 string, resourceID2 string, relationCode string) {
	r1, err := cmdb.GetItem(resourceID1, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID1, err.Error())
		return
	}
	r2, err := cmdb.GetItem(resourceID2, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID2, err.Error())
		return
	}
	relCode, err := strconv.Atoi(relationCode)
	if err != nil {
		log.Errorf("relationCode %s convert error: %s", relationCode, err.Error())
		return
	}
	items := cmdb.Items{
		Relations: []*cmdb.Relation{
			&cmdb.Relation{
				ResourceID1:  r1.ResourceID,
				ResourceID2:  r2.ResourceID,
				RelationCode: relCode,
			},
		},
	}
	err = cmdb.AddItems(&items)
	if err != nil {
		log.Errorf("addrelation '%s'--%s->'%s' error: %s", resourceID1, relationCode, resourceID2, err.Error())
		return
	}
	log.Infof("addrelation '%s'--%s->'%s' success", resourceID1, relationCode, resourceID2)
}
