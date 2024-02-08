package configure

import (
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/mongodb"
	"xtool/pkg/reg"

	"github.com/globalsign/mgo"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("check", "check_fields", CheckFields, "检查CMDB字段，检查出不合法部分", `check_fields`, []*reg.Param{})
}

// CheckFields 字段校验
func CheckFields() {
	fs := []string{"name", "ci_type"}

	e := mongodb.NewEngine("127.0.0.1", "27017", "", "", "dcs_cmdb", 3600*time.Second, 5*time.Second, 50)

	err := e.Init()
	if err != nil {
		log.Errorf("connect mongodb error: %s", err.Error())
		return
	}

	e.Do(func(db *mgo.Database) error {
		return e.IterResource(db, define.M{}, func(r *cmdb.Resource) error {
			for _, f := range fs {
				_, err := r.Attributes.GetString(f)
				if err != nil {
					log.Errorf("check node '%s' get field '%s' error: %s", r.XID, f, err.Error())
				}
			}
			return nil
		})
	})

	log.Info("check fields done")
}
