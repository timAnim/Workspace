package biz

import (
	"fmt"
	"xtool/pkg/jfmt"
	"xtool/pkg/rainc"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("rainc", "rainc_template_info", ShowTemplateInfo, "彩虹C02AU设备模板信息", `rainc_template_info <deviceType>`, []*reg.Param{
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
	})
	reg.Regist("rainc", "rainc_template_list", ShowTemplateList, "彩虹C02AU设备模板信息", `rainc_template_list <query>`, []*reg.Param{
		&reg.Param{Name: "query", Type: "string", Necessity: true, Desc: "查询字符串"},
	})
}

// ShowTemplateInfo 展示模板信息
func ShowTemplateInfo(deviceType string) {
	ti, err := rainc.GetTemplateInfo(deviceType)
	if err != nil {
		log.Errorf("rainc.GetTemplateInfo error: %s", err.Error())
		return
	}

	jfmt.Print(ti)

	log.Infof("show template info success")
}

// ShowTemplateList 展示模板列表
func ShowTemplateList(query string) {
	ts, err := rainc.GetTemplateList(query)
	if err != nil {
		log.Errorf("rainc.GetTemplateInfo error: %s", err.Error())
		return
	}
	for i, t := range ts {
		fmt.Println(i+1, t.DeviceType, t.DeviceInfo, t.Protocol, t.UpTime)
	}

	log.Infof("show template list success")
}
