package configure

import (
	"xtool/pkg/reg"
	"xtool/pkg/tsdb"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "spot_setting", SpotSetting, "执行设置命令", `spot_setting <resourceID> <value>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "测点ID"},
		&reg.Param{Name: "value", Type: "string", Necessity: true, Desc: "设置值"},
	})
}

// SpotSetting 执行设置命令
func SpotSetting(resourceID string, value string) {
	err := tsdb.Setting(resourceID, value)
	if err != nil {
		log.Errorf("spot_setting %s:%s error: %s", resourceID, value, err.Error())
		return
	}
	log.Infof("spot_setting %s:%s success", resourceID, value)
}
