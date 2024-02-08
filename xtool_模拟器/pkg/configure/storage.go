package configure

import (
	"fmt"
	"strconv"
	"xtool/pkg/reg"
	"xtool/pkg/store"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("storage", "storage.show", ShowStorage, "显示存储配置", `storage.show`, []*reg.Param{})
	reg.Regist("storage", "storage.set_method", SetStorage, "修改存储配置", `storage.set_method`, []*reg.Param{
		&reg.Param{Name: "method", Type: "int", Necessity: false, Desc: "存储类型; 0:组合存储,1:全量实时存储,2:不存储; 默认2"},
	})
}

// ShowStorage 显示存储配置
func ShowStorage() {
	cfg, err := store.GetStorageConfig()
	if err != nil {
		log.Errorf("get storage config error: %s", err.Error())
		return
	}
	b, err := jsonFormat(cfg)
	if err != nil {
		log.Errorf("json format error: %s", err.Error())
		return
	}
	fmt.Println(string(b))
}

// SetStorage 显示存储配置
func SetStorage(method string) {
	cfg, err := store.GetStorageConfig()
	if err != nil {
		log.Errorf("get storage config error: %s", err.Error())
		return
	}
	m, err := strconv.Atoi(method)
	if err != nil {
		m = store.DontSave
	}
	switch m {
	case store.DontSave, store.AllRealTime, store.CombStorage:
	default:
		m = store.DontSave
	}

	cfg.Strategy.Method = m
	err = store.SetStorageConfig(cfg)
	if err != nil {
		log.Errorf("set storage config error: %s", err.Error())
		return
	}
	log.Infof("set storage config success")
}
