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
	reg.Regist("event_rules", "modify_analog_threshold", ModifyAnalogThreshold, "修改模拟量阈值，四个阈值依次递增", `modify_analog_threshold <resourceID> <lowerAlarm> <lowerRecover> <lowerLevel> <lowerContent> <upperRecover> <upperAlarm> <upperLevel> <upperContent>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "测点ID"},
		&reg.Param{Name: "lowerAlarm", Type: "float", Necessity: true, Desc: "下限告警, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "lowerRecover", Type: "float", Necessity: true, Desc: "下限恢复, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "lowerLevel", Type: "int", Necessity: true, Desc: "下限告警等级, 不需要设置请使用'-'占位, 可选等级: 0:屏蔽,1:紧急,2:严重,3:重要,4:次要,5:提示"},
		&reg.Param{Name: "lowerContent", Type: "string", Necessity: true, Desc: "下限告警内容, 不要有空格"},
		&reg.Param{Name: "upperAlarm", Type: "float", Necessity: true, Desc: "上限告警, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "upperRecover", Type: "float", Necessity: true, Desc: "上限恢复, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "upperLevel", Type: "int", Necessity: true, Desc: "上限告警等级, 不需要设置请使用'-'占位, 可选等级: 0:屏蔽,1:紧急,2:严重,3:重要,4:次要,5:提示"},
		&reg.Param{Name: "upperContent", Type: "string", Necessity: true, Desc: "上限告警内容, 不要有空格"},
	})
	reg.Regist("event_rules", "modify_digit_threshold", ModifyDigitThreshold, "修改状态量阈值", `modify_digit_threshold <resourceID> <alarm> <recover> <level> <content>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "测点ID"},
		&reg.Param{Name: "alarm", Type: "int", Necessity: true, Desc: "告警阈值, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "recover", Type: "int", Necessity: true, Desc: "恢复阈值, 不需要设置请使用'-'占位"},
		&reg.Param{Name: "level", Type: "int", Necessity: true, Desc: "告警等级, 不需要设置请使用'-'占位, 可选等级: 0:屏蔽,1:紧急,2:严重,3:重要,4:次要,5:提示"},
		&reg.Param{Name: "content", Type: "string", Necessity: true, Desc: "告警内容, 不要有空格"},
	})
	reg.Regist("event_rules", "complete_rule_content", CompleteRuleContent, "完善告警规则内容", `complete_rule_content <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
}

// ModifyAnalogThreshold 修改模拟量阈值
func ModifyAnalogThreshold(resourceID string, lowerAlarm string, lowerRecover string, lowerLevel string, lowerContent string, upperRecover string, upperAlarm string, upperLevel string, upperContent string) {
	la, err := strconv.ParseFloat(lowerAlarm, 10)
	if err != nil {
		la = 0.0
	}
	lr, err := strconv.ParseFloat(lowerRecover, 10)
	if err != nil {
		lr = 0.0
	}
	ll, err := strconv.ParseInt(lowerLevel, 10, 64)
	if err != nil {
		ll = 4
	}

	ur, err := strconv.ParseFloat(upperRecover, 10)
	if err != nil {
		ur = 0.0
	}
	ua, err := strconv.ParseFloat(upperAlarm, 10)
	if err != nil {
		ua = 0.0
	}
	ul, err := strconv.ParseInt(upperLevel, 10, 64)
	if err != nil {
		ul = 4
	}
	if la > lr || lr > ur || ur > ua {
		// 检验递增性
		log.Errorf("values are not increasingly: %v, %v, %v, %v", la, lr, ur, ua)
		return
	}
	// TODO: 增加字段校验逻辑
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	eventRules := []string{}
	if lowerAlarm != "-" && lowerRecover != "-" && lowerLevel != "-" {
		eventRules = append(eventRules, fmt.Sprintf("id=1;event_generator=DefEventGenerator;operator=<;operand=%.2f;restore_operator=>;restore_operand=%.2f;content=%s;suggest=;alarm_type=4;level=%d;disabled=false;codec=;codecex=;twinkle_time=0;continuous_time=0", la, lr, lowerContent, ll))
	}
	if upperAlarm != "-" && upperRecover != "-" && upperLevel != "-" {
		eventRules = append(eventRules, fmt.Sprintf("id=2;event_generator=DefEventGenerator;operator=>;operand=%.2f;restore_operator=<;restore_operand=%.2f;content=%s;suggest=;alarm_type=2;level=%d;disabled=false;codec=;codecex=;twinkle_time=0;continuous_time=0", ua, ur, upperContent, ul))
	}
	if len(eventRules) == 0 {
		log.Warnf("set threshold passed, no rule assigned for '%s'", resourceID)
		return
	}
	node, err := cmdb.GetItem(resourceID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	if st, ok := node.Attributes["spot_type"]; ok {
		if st.(string) != "1" {
			// 只允许对模拟量设置上下限阈值
			log.Errorf("node '%s' spot_type '%s' not support modify_threshold", resourceID, st.(string))
			return
		}
	} else {
		log.Errorf("node '%s' has no field 'spot_type', not support modify_threshold", resourceID)
		return
	}
	item := &cmdb.Resource{
		ResourceID: node.ResourceID,
		Attributes: define.M{
			"event_rules": eventRules,
		},
	}
	items.Resources = append(items.Resources, item)
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("set '%s' threshold error: %s", node.ResourceID, err.Error())
		return
	}
	log.Infof("set '%s' threshold success: (%.2f <= %.2f -- %d: %s) <<< (%.2f <= %.2f -- %d: %s)", node.ResourceID, la, lr, ll, lowerContent, ur, ua, ul, upperContent)
}

// ModifyDigitThreshold 修改模拟量阈值
func ModifyDigitThreshold(resourceID string, alarm string, recover string, level string, content string) {
	a, err := strconv.ParseInt(alarm, 10, 64)
	if err != nil {
		a = 0
	}
	r, err := strconv.ParseInt(recover, 10, 64)
	if err != nil {
		r = 0
	}
	l, err := strconv.ParseInt(level, 10, 64)
	if err != nil {
		l = 4
	}

	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	eventRules := []string{}
	if alarm != "-" && recover != "-" && level != "-" {
		eventRules = append(eventRules, fmt.Sprintf("id=1;event_generator=DefEventGenerator;operator===;operand=%d;restore_operator===;restore_operand=%d;content=%s;suggest=;alarm_type=3;level=%d;disabled=false;codec=;codecex=;twinkle_time=0;continuous_time=0", a, r, content, l))
	}
	if len(eventRules) == 0 {
		log.Warnf("set threshold passed, no rule assigned for '%s'", resourceID)
		return
	}
	node, err := cmdb.GetItem(resourceID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	if st, ok := node.Attributes["spot_type"]; ok {
		if st.(string) != "2" {
			// 只允许对状态量设置二值阈值
			log.Errorf("node '%s' spot_type '%s' not support modify_digit_threshold", resourceID, st.(string))
			return
		}
	} else {
		log.Errorf("node '%s' has no field 'spot_type', not support modify_digit_threshold", resourceID)
		return
	}
	item := &cmdb.Resource{
		ResourceID: node.ResourceID,
		Attributes: define.M{
			"event_rules": eventRules,
		},
	}
	items.Resources = append(items.Resources, item)
	err = cmdb.UpsertItems(&items)
	if err != nil {
		log.Errorf("set '%s' threshold error: %s", node.ResourceID, err.Error())
		return
	}
	log.Infof("set '%s' threshold success: (%d =x= %d -- %d: %s)", node.ResourceID, a, r, l, content)
}

// CompleteRuleContent 完善告警规则内容
func CompleteRuleContent(deviceID string) {
	res, err := cmdb.GetChildren(deviceID, 0, nil)
	if err != nil {
		log.Errorf("cmdb.GetChildren error: %s", err.Error())
		return
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{},
	}
	for _, r := range res {
		if ct, ok := r.Attributes["ci_type"]; ok {
			ciType := fmt.Sprintf("%v", ct)
			if ciType != "3" {
				continue
			}
			rules := extractRules(r)
			if len(rules) == 0 {
				continue
			}
			eventRules := []string{}
			for _, rule := range rules {
				if content, ok := rule["content"]; ok {
					if strings.HasPrefix(content, fmt.Sprintf("%v", r.Attributes["name"])) || content == "" {
						continue
					}
					rule["content"] = fmt.Sprintf("%v: %s", r.Attributes["name"], content)
					eventRules = append(eventRules, mapToStr(rule))
				}
			}
			if len(eventRules) == 0 {
				continue
			}
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: r.ResourceID,
				Attributes: define.M{
					"event_rules": eventRules,
				},
			})
		}
	}
	if len(items.Resources) == 0 {
		log.Warnf("nothing to do for '%s'", deviceID)
		return
	}
	err = cmdb.UpsertItems(items)
	if err != nil {
		log.Errorf("cmdb.UpsertItems '%s' error: %s", deviceID, err.Error())
		return
	}
	log.Infof("complete content for '%d' spots of '%s'", len(items.Resources), deviceID)
}

func extractRules(item *cmdb.Resource) []map[string]string {
	ers := []map[string]string{}
	if er, ok := item.Attributes["event_rules"]; ok {
		switch x := er.(type) {
		case []interface{}:
			for _, r := range x {
				rule := strToMap(fmt.Sprintf("%v", r))
				ers = append(ers, rule)
			}
		case []string:
			for _, r := range x {
				rule := strToMap(fmt.Sprintf("%v", r))
				ers = append(ers, rule)
			}
		}
	}
	return ers
}
