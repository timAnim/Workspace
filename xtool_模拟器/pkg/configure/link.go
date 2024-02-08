package configure

import (
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("link", "link.refresh", RefreshLink, "连接重刷, V3R3B052新增特性, xcmdb>=1.1.41 xapi>=1.3.35", `link.refresh <linkID>`, []*reg.Param{
		&reg.Param{Name: "linkID", Type: "string", Necessity: true, Desc: "连接ID"},
	})
	reg.Regist("link", "link.delete", DeleteLink, "连接删除, V3R3B053新增特性, xcmdb>=1.1.53 xapi>=1.3.63", `link.delete <linkID>`, []*reg.Param{
		&reg.Param{Name: "linkID", Type: "string", Necessity: true, Desc: "连接ID"},
	})
}

// RefreshLink 连接刷新
func RefreshLink(linkID string) {
	err := cmdb.RefreshLink(linkID)
	if err != nil {
		log.Errorf("refresh link '%s' error: %s", linkID, err.Error())
		return
	}
	log.Infof("refresh link '%s' success, please wait for a moment", linkID)
}

// DeleteLink 连接删除
func DeleteLink(linkID string) {
	err := cmdb.DeleteLink(linkID)
	if err != nil {
		log.Errorf("delete link '%s' error: %s", linkID, err.Error())
		return
	}
	log.Infof("delete link '%s' success", linkID)
}
