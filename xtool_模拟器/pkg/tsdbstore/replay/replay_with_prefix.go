package replay

import (
	"strings"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("replay", "tsdb_replay_with_prefix", TsdbReplayWithPrefix, "历史数据转移，将数据从源库转入目标数据库，并为ID加上前缀", `tsdb_replay_with_prefix <prefix> <keyStart>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: true, Desc: "需要添加的前缀"},
		&reg.Param{Name: "keyStart", Type: "string", Necessity: true, Desc: "开始的键值，用于断点续传"},
	})
}

// TsdbReplayWithPrefix 带ID前缀转移数据
func TsdbReplayWithPrefix(prefix string, keyStart string) {
	err := src.Scan(keyStart, func(m map[string]interface{}) error {
		newM := addPrefix(m, prefix)
		return dst.Save(newM)
	})
	if err != nil {
		log.Errorf("TsdbReplay error: %s", err.Error())
		return
	}

	log.Info("TsdbReplay success")
}

func addPrefix(m map[string]interface{}, prefix string) map[string]interface{} {
	newM := make(map[string]interface{})
	for k, v := range m {
		ks := strings.Split(k, ":")
		if len(ks) != 3 {
			continue
		}
		ks[1] = prefix + ks[1]
		newM[strings.Join(ks, ":")] = v
	}
	return newM
}
