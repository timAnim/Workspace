package configure

import (
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "move", Move, "空间移动", `move <srcID> <dstID>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源节点ID"},
		&reg.Param{Name: "dstID", Type: "string", Necessity: true, Desc: "目标父节点ID"},
	})
}

// Move 移动
func Move(srcID string, dstID string) {
	err := cmdb.Move(srcID, dstID)
	if err != nil {
		log.Errorf("move '%s' to '%s' error: %s", srcID, dstID, err.Error())
		return
	}
	log.Infof("move '%s' to '%s' success", srcID, dstID)
}
