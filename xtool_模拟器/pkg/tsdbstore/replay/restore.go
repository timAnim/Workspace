package replay

import (
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("replay", "tsdb_replay", TsdbReplay, "历史数据转移，将数据从源库转入目标数据库", `tsdb_replay <keyStart>`, []*reg.Param{
		&reg.Param{Name: "keyStart", Type: "string", Necessity: true, Desc: "开始的键值，用于断点续传"},
	})
}

// TsdbReplay 转移数据
func TsdbReplay(keyStart string) {
	err := src.Scan(keyStart, func(m map[string]interface{}) error {
		return dst.Save(m)
	})
	if err != nil {
		log.Errorf("TsdbReplay error: %s", err.Error())
		return
	}

	log.Info("TsdbReplay success")
}
