package configure

import (
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("check", "check_event_rules", CheckEventRules, "遍历CMDB，检查CMDB告警规则ID重复的情况", `check_event_rules <repair> <once> <skip>`, []*reg.Param{
		&reg.Param{Name: "repair", Type: "bool", Necessity: false, Desc: "是否同时执行修复动作，默认 false"},
		&reg.Param{Name: "once", Type: "int", Necessity: false, Desc: "单次接口获取的节点数量，默认 100，在event_rules出现错误的情况下，单次获取太多可会造成接口报错，太少执行效率又不够，因此做成可通过参数控制的"},
		&reg.Param{Name: "skip", Type: "int", Necessity: false, Desc: "跳过节点数量 默认 0"},
	})
}

func repairRule(rule string) string {
	m := strToMap(rule)
	return mapToStr(m)
}

// checkRules 检查输入的告警规则，并返回正确的规则，外带一个是否有错误的选项
func checkRules(rules []string) ([]string, bool) {
	if len(rules) == 0 {
		return rules, false
	}

	isError := false
	newRules := make([]string, 0, len(rules))
	for _, r := range rules {
		if strings.Count(r, "id=") != 1 {
			isError = true
		}
		newRules = append(newRules, repairRule(r))
	}

	return newRules, isError
}

// CheckEventRules 检查告警规则ID异常的情况
func CheckEventRules(repair string, once string, skip string) {
	rep, err := strconv.ParseBool(repair)
	if err != nil {
		rep = false
	}
	_ = rep

	o, err := strconv.Atoi(once)
	if err != nil {
		o = 100
	}

	skipN, err := strconv.Atoi(skip)
	if err != nil {
		skipN = 0
	}
	count := o
	scannedCount := skipN
	num := (skipN / o) + 1

	for count == o {
		items, err := cmdb.QueryItems(define.NewQuery().WithOutput("ci_type", "event_rules").WithPage(num, o))
		if err != nil {
			log.Errorf("cmdb.QueryItems error: %s", err.Error())
			return
		}

		scannedCount += items.ResourceCount

		updateItems := &cmdb.Items{
			Resources: make([]*cmdb.Resource, 0, len(items.Resources)),
		}

		for _, r := range items.Resources {
			ers, isError := checkRules(r.MustEventRules())
			//fmt.Println(r.ResourceID, isError)
			if isError {
				// 若规则有错，则加入更新列表
				updateItems.Resources = append(updateItems.Resources, &cmdb.Resource{
					ResourceID: r.ResourceID,
					Attributes: define.M{
						"event_rules": ers,
					},
				})
			}

		}

		if len(updateItems.Resources) != 0 {
			if rep {
				// 需要修复则更新cmdb
				err = cmdb.UpsertItems(updateItems)
				if err != nil {
					log.Errorf("[%d of %d] update %d resources error: %s", scannedCount, items.TotalCount, len(updateItems.Resources), err.Error())
				} else {
					log.Infof("[%d of %d] scan %d node(s) from cmdb found %d node(s) with error 'event_rules' field and repaired", scannedCount, items.TotalCount, items.ResourceCount, len(updateItems.Resources))
				}
			} else {
				log.Warnf("[%d of %d] scan %d node(s) from cmdb found %d node(s) with error 'event_rules' field, use 'check_event_rules true %d' to repair", scannedCount, items.TotalCount, items.ResourceCount, len(updateItems.Resources), o)
			}
		} else {
			log.Infof("[%d of %d] scan %d node(s) from cmdb found %d node(s) with error 'event_rules' field", scannedCount, items.TotalCount, items.ResourceCount, len(updateItems.Resources))
		}

		count = items.ResourceCount
		num++
	}
}
