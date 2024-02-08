package configure

import (
	"fmt"
	"strconv"
	"xtool/pkg/north"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("north", "north.show", ShowNorth, "显示北向配置", `north.show`, []*reg.Param{})
	reg.Regist("north", "north.new", AddNorth, "新增北向连接", `north.new <sysName> <host> <sysType> <valuePushType> <aggregatedPushType>`, []*reg.Param{
		&reg.Param{Name: "sysName", Type: "string", Necessity: true, Desc: "子系统名称"},
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "上层南向地址"},
		&reg.Param{Name: "sysType", Type: "int", Necessity: false, Desc: "子系统类型, 1: V6, 2: AU/GU/KE, 默认2"},
		&reg.Param{Name: "valuePushType", Type: "int", Necessity: false, Desc: "实时数据推送类型; 0:不推送,1:实时推送,5:5分钟周期推送,10:10分钟周期推送,15:15分钟周期推送,20:20分钟周期推送,30:30分钟周期推送; 默认5"},
		&reg.Param{Name: "aggregatedPushType", Type: "int", Necessity: false, Desc: "聚合数据推送类型; 0:不推送,1:推送; 默认0"},
	})
	reg.Regist("north", "north.reset", Reset, "重置北向连接", `north.reset <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "上层南向地址"},
	})
	reg.Regist("north", "north.modify.name_by_guid", ModifyNameByGUID, "按guid修改北向数据上传方式", `north.modify.name_by_guid <guid> <sysName>`, []*reg.Param{
		&reg.Param{Name: "guid", Type: "string", Necessity: true, Desc: "子系统标识"},
		&reg.Param{Name: "sysName", Type: "string", Necessity: true, Desc: "子系统名称"},
	})
	reg.Regist("north", "north.modify.value_push_by_guid", ModifyValuePushTypeByGUID, "按guid修改北向数据上传方式", `north.modify.value_push_by_guid <guid> <valuePushType>`, []*reg.Param{
		&reg.Param{Name: "guid", Type: "string", Necessity: true, Desc: "子系统标识"},
		&reg.Param{Name: "valuePushType", Type: "int", Necessity: false, Desc: "实时数据推送类型; 0:不推送,1:实时推送,5:5分钟周期推送,10:10分钟周期推送,15:15分钟周期推送,20:20分钟周期推送,30:30分钟周期推送; 默认5"},
	})
	reg.Regist("north", "north.modify.agg_push_by_guid", ModifyAggPushTypeByGUID, "按guid修改北向聚合数据上传方式", `north.modify.agg_push_by_guid <guid> <aggregatedPushType>`, []*reg.Param{
		&reg.Param{Name: "guid", Type: "string", Necessity: true, Desc: "子系统标识"},
		&reg.Param{Name: "aggregatedPushType", Type: "int", Necessity: false, Desc: "聚合数据推送类型; 0:不推送,1:推送; 默认0"},
	})
	reg.Regist("north", "north.modify.name_by_host", ModifyNameByHost, "按上层IP修改北向数据上传方式", `north.modify.name_by_host <host> <sysName>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "上层连接IP"},
		&reg.Param{Name: "sysName", Type: "string", Necessity: true, Desc: "子系统名称"},
	})
	reg.Regist("north", "north.modify.value_push_by_host", ModifyValuePushTypeByHost, "按上层IP修改北向数据上传方式", `north.modify.value_push_by_host <host> <valuePushType>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "上层连接IP"},
		&reg.Param{Name: "valuePushType", Type: "int", Necessity: false, Desc: "实时数据推送类型; 0:不推送,1:实时推送,5:5分钟周期推送,10:10分钟周期推送,15:15分钟周期推送,20:20分钟周期推送,30:30分钟周期推送; 默认5"},
	})
	reg.Regist("north", "north.modify.agg_push_by_host", ModifyAggPushTypeByHost, "按上层IP修改北向聚合数据上传方式", `north.modify.agg_push_by_host <host> <aggregatedPushType>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "上层连接IP"},
		&reg.Param{Name: "aggregatedPushType", Type: "int", Necessity: false, Desc: "聚合数据推送类型; 0:不推送,1:推送; 默认0"},
	})
}

// ShowNorth 显示北向配置
func ShowNorth() {
	ps, err := north.GetNorthConfig()
	if err != nil {
		log.Errorf("show north error: %s", err.Error())
		return
	}
	for _, p := range ps {
		fmt.Println(p.GUID, p.SysSign, p.SysName, p.Host)
	}
	log.Infof("show north success")
}

// AddNorth 添加北向
func AddNorth(sysName string, host string, sysType string, valuePushType string, aggregatedPushType string) {
	if sysName == "" || host == "" {
		log.Error("params error")
		return
	}
	t, err := strconv.Atoi(sysType)
	if err != nil {
		// default AU/GU/KE
		t = north.SysTypeAU
	}
	switch t {
	case north.SysTypeV6, north.SysTypeAU:
	default:
		t = north.SysTypeAU
	}
	vt, err := strconv.Atoi(valuePushType)
	if err != nil {
		vt = north.ValuePeriodPush5
	}
	switch vt {
	case north.ValueDontPush, north.ValuePeriodPush5, north.ValuePeriodPush10, north.ValuePeriodPush15, north.ValuePeriodPush20, north.ValuePeriodPush30:
	default:
		vt = north.ValuePeriodPush5
	}
	at, err := strconv.Atoi(aggregatedPushType)
	if err != nil {
		at = north.AggregatedDontPush
	}
	switch at {
	case north.AggregatedPush, north.AggregatedDontPush:
	default:
		at = north.AggregatedDontPush
	}
	p := north.Param{
		Host:               host,    //string `json:"host"`
		SysName:            sysName, //string `json:"sys_name"`
		SysType:            t,       //int    `json:"sys_type"`
		NorthPort:          "6000",  //string `json:"north_port"`
		SouthPort:          "6001",  //string `json:"south_port"`
		ValuePushType:      vt,      //int    `json:"value_push_type"`
		AggregatedPushType: at,      //int    `json:"aggregated_push_type"`
	}
	err = north.New(&p)
	if err != nil {
		log.Errorf("add north %s->%s error: %s", sysName, host, err.Error())
		return
	}
	log.Infof("add north %s->%s success", sysName, host)
}

// ModifyNameByGUID 按guid修改北向连接名称
func ModifyNameByGUID(guid string, sysName string) {
	if guid == "" {
		log.Errorf("please assign a guid")
		return
	}
	p, err := north.GetNorthConfigByGUID(guid)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	p.SysName = sysName
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// ModifyValuePushTypeByGUID 修改值上传方式
func ModifyValuePushTypeByGUID(guid string, valuePushType string) {
	if guid == "" {
		log.Errorf("please assign a guid")
		return
	}
	p, err := north.GetNorthConfigByGUID(guid)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	vt, err := strconv.Atoi(valuePushType)
	if err != nil {
		vt = north.ValuePeriodPush5
	}
	switch vt {
	case north.ValueDontPush, north.ValuePeriodPush5, north.ValuePeriodPush10, north.ValuePeriodPush15, north.ValuePeriodPush20, north.ValuePeriodPush30:
	default:
		vt = north.ValuePeriodPush5
	}
	p.ValuePushType = vt
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// ModifyAggPushTypeByGUID 修改值上传方式
func ModifyAggPushTypeByGUID(guid string, aggregatedPushType string) {
	if guid == "" {
		log.Errorf("please assign a guid")
		return
	}
	p, err := north.GetNorthConfigByGUID(guid)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	at, err := strconv.Atoi(aggregatedPushType)
	if err != nil {
		at = north.AggregatedDontPush
	}
	switch at {
	case north.AggregatedPush, north.AggregatedDontPush:
	default:
		at = north.AggregatedDontPush
	}
	p.AggregatedPushType = at
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// ModifyNameByHost 按上层IP修改北向连接名称
func ModifyNameByHost(host string, sysName string) {
	if host == "" {
		log.Errorf("please assign a host")
		return
	}
	p, err := north.GetNorthConfigByHost(host)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	p.SysName = sysName
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// ModifyValuePushTypeByHost 按上层IP修改值上传方式
func ModifyValuePushTypeByHost(host string, valuePushType string) {
	if host == "" {
		log.Errorf("please assign a host")
		return
	}
	p, err := north.GetNorthConfigByHost(host)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	vt, err := strconv.Atoi(valuePushType)
	if err != nil {
		vt = north.ValuePeriodPush5
	}
	switch vt {
	case north.ValueDontPush, north.ValueRealTimePush, north.ValuePeriodPush5, north.ValuePeriodPush10, north.ValuePeriodPush15, north.ValuePeriodPush20, north.ValuePeriodPush30:
	default:
		vt = north.ValuePeriodPush5
	}
	p.ValuePushType = vt
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// ModifyAggPushTypeByHost 修改值上传方式
func ModifyAggPushTypeByHost(host string, aggregatedPushType string) {
	if host == "" {
		log.Errorf("please assign a host")
		return
	}
	p, err := north.GetNorthConfigByHost(host)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	at, err := strconv.Atoi(aggregatedPushType)
	if err != nil {
		at = north.AggregatedDontPush
	}
	switch at {
	case north.AggregatedPush, north.AggregatedDontPush:
	default:
		at = north.AggregatedDontPush
	}
	p.AggregatedPushType = at
	err = north.Modify(p)
	if err != nil {
		log.Errorf("modify north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("modify north %s->%s success", p.SysName, p.Host)
}

// Reset 重置
func Reset(host string) {
	if host == "" {
		log.Errorf("please assign a host")
		return
	}
	p, err := north.GetNorthConfigByHost(host)
	if err != nil {
		log.Errorf("get north config error: %s", err.Error())
		return
	}
	p.CmdbMaxVersion = -1
	err = north.Reset(p)
	if err != nil {
		log.Errorf("reset north %s->%s error: %s", p.SysName, p.Host, err.Error())
		return
	}
	log.Infof("reset north %s->%s success", p.SysName, p.Host)
}
