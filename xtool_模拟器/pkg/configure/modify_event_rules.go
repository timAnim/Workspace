package configure

import (
	"fmt"
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "modify_times", ModifyTimes, "修改板卡通信中断检测次数", `modify_times <boardID> <times>`, []*reg.Param{
		&reg.Param{Name: "boardID", Type: "string", Necessity: true, Desc: "板卡ID"},
		&reg.Param{Name: "times", Type: "int", Necessity: true, Desc: "检测次数，默认 5"},
	})
	reg.Regist("configure", "modify_level", ModifyLevel, "修改板卡通信中断告警等级", `modify_level <boardID> <level>`, []*reg.Param{
		&reg.Param{Name: "boardID", Type: "string", Necessity: true, Desc: "板卡ID"},
		&reg.Param{Name: "level", Type: "int", Necessity: true, Desc: "告警等级，1:紧急，2:严重，3:重要，4:次要，5:预警，默认 3"},
	})
}

// ModifyTimes 修改板卡通信中断检测次数
func ModifyTimes(boardID string, times string) {
	if !strings.HasPrefix(boardID, "0_") {
		log.Errorf("'%s' is not local node", boardID)
		return
	}

	t, err := strconv.Atoi(times)
	if err != nil {
		t = 5
	}

	if t == 0 {
		log.Errorf("cannot set interrupt check times as 0")
		return
	}

	tms := fmt.Sprintf("%d", t)

	board, err := cmdb.GetItem(boardID, 0)
	if err != nil {
		log.Errorf("get board node '%s' error: %s", boardID, err.Error())
		return
	}

	if !board.IsBoard() {
		log.Errorf("node '%s:%s' is not a board node", boardID, board.MustName())
		return
	}

	rules := board.MustEventRules()

	if len(rules) != 1 {
		log.Errorf("noard node '%s:%s' has unexpected event_rules: %v", boardID, board.MustName(), rules)
		return
	}

	m := strToMap(rules[0])

	if old, ok := m["times"]; ok {
		if old == tms {
			log.Infof("new times is samed to the old, ignore update")
			return
		}
		m["times"] = tms

		items := &cmdb.Items{
			Resources: []*cmdb.Resource{
				&cmdb.Resource{
					ResourceID: boardID,
					Attributes: define.M{
						"event_rules": []string{mapToStr(m)},
					},
				},
			},
		}

		err = cmdb.UpsertItems(items)
		if err != nil {
			log.Errorf("modify_times of '%s:%s' error: %s", board.ResourceID, board.MustName(), err.Error())
			return
		}
		log.Infof("modify_times if '%s:%s'from %s to %s success", board.ResourceID, board.MustName(), old, tms)
		return
	}

	log.Errorf("modify_times of '%s:%s' get unexpected event_rules: %v", board.ResourceID, board.MustName(), rules)
}

var typeMap = map[string]bool{
	"1": true,
	"2": true,
	"3": true,
	"4": true,
	"5": true,
}

// ModifyLevel 修改板卡通信中断告警等级
func ModifyLevel(boardID string, level string) {
	if !strings.HasPrefix(boardID, "0_") {
		log.Errorf("'%s' is not local node", boardID)
		return
	}

	lvl := "3"
	if _, ok := typeMap[level]; ok {
		lvl = level
	}

	board, err := cmdb.GetItem(boardID, 0)
	if err != nil {
		log.Errorf("get board node '%s' error: %s", boardID, err.Error())
		return
	}

	if !board.IsBoard() {
		log.Errorf("node '%s:%s' is not a board node", boardID, board.MustName())
		return
	}

	rules := board.MustEventRules()

	if len(rules) != 1 {
		log.Errorf("board node '%s:%s' has unexpected event_rules: %v", boardID, board.MustName(), rules)
		return
	}

	m := strToMap(rules[0])

	if old, ok := m["level"]; ok {
		if old == lvl {
			log.Infof("new level is samed to the old, ignore update")
			return
		}
		m["level"] = lvl

		items := &cmdb.Items{
			Resources: []*cmdb.Resource{
				&cmdb.Resource{
					ResourceID: boardID,
					Attributes: define.M{
						"event_rules": []string{mapToStr(m)},
					},
				},
			},
		}

		err = cmdb.UpsertItems(items)
		if err != nil {
			log.Errorf("modify_level of '%s:%s' error: %s", board.ResourceID, board.MustName(), err.Error())
			return
		}
		log.Infof("modify_level if '%s:%s'from %s to %s success", board.ResourceID, board.MustName(), old, lvl)
		return
	}

	log.Errorf("modify_level of '%s:%s' get unexpected event_rules: %v", board.ResourceID, board.MustName(), rules)
}
