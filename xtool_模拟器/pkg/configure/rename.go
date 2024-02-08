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
	reg.Regist("configure", "rename", Rename, "节点改名", `rename <resourceID> <newName>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "newName", Type: "string", Necessity: true, Desc: "新节点名"},
	})
	reg.Regist("configure", "sync_board_name", SyncBoardName, "同步板卡与设备名，因级联修改与导入导出修改不会修改板卡名称", `sync_board_name`, []*reg.Param{})
	reg.Regist("configure", "sync_board_id", SyncBoardID, "同步board_id与board_options，多标签操作情况下会产生board_id与board_options不一样的情况", `sync_board_id`, []*reg.Param{})
	reg.Regist("configure", "sync_board_options", SyncBoardOptions, "同步board_id到board_options，多标签操作情况下会产生board_id与board_options不一样的情况", `sync_board_options`, []*reg.Param{})
}

// Rename 节点改名
func Rename(resourceID string, newName string) {
	r, err := cmdb.GetItem(resourceID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{
			&cmdb.Resource{
				ResourceID: resourceID,
				Attributes: define.M{
					"name": newName,
				},
			},
		},
	}
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("rename error: %s", err.Error())
		return
	}
	log.Infof("'%s:%s' rename '%s:%s' success", resourceID, r.Attributes["name"].(string), resourceID, newName)
}

// SyncBoardName 同步板卡与设备名称
func SyncBoardName() {
	devices, err := cmdb.GetDevices("", 0)
	if err != nil {
		log.Errorf("sync board name error: %s", err.Error())
		return
	}
	for _, d := range devices {
		if d.Deleted == 1 {
			continue
		}
		if !strings.HasPrefix(d.ResourceID, "0_") {
			continue
		}
		ids := strings.Split(d.ResourceID, "_")
		boardName := fmt.Sprintf("E%s:%s", ids[len(ids)-1], d.Attributes["name"].(string))
		if bo, ok := d.Attributes["board_options"]; ok {

			bos := bo.([]interface{})
			for _, bid := range bos {
				boardID := bid.(string)
				Rename(boardID, boardName)
			}
		}
	}
}

// SyncBoardID 同步board_id
func SyncBoardID() {
	devices, err := cmdb.GetDevices("", 0)
	if err != nil {
		log.Errorf("sync board name error: %s", err.Error())
		return
	}
	for _, d := range devices {
		if d.Deleted == 1 {
			continue
		}
		if !strings.HasPrefix(d.ResourceID, "0_") {
			continue
		}
		if bo, ok := d.Attributes["board_options"]; ok {
			boardOptions := bo.([]interface{})
			if len(boardOptions) == 0 {
				continue
			}
			ModifyField(d.ResourceID, "board_id", fmt.Sprintf("%v", boardOptions[0]))
		}
	}
}

// SyncBoardOptions 从 board_id 同步 board_options
func SyncBoardOptions() {
	devices, err := cmdb.GetDevices("", 0)
	if err != nil {
		log.Errorf("sync board name error: %s", err.Error())
		return
	}
	for _, d := range devices {
		if d.Deleted == 1 {
			continue
		}
		if !strings.HasPrefix(d.ResourceID, "0_") {
			continue
		}
		boardOptions := d.Attributes.MustStringSlice("board_id")
		if len(boardOptions) == 0 {
			continue
		}
		ModifyField(d.ResourceID, "board_options", strings.Join(boardOptions, ","))
	}
}
