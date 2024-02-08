package mongodb

import (
	"fmt"
	"testing"
	"time"
	"xtool/pkg/cmdb"

	"github.com/globalsign/mgo"

	. "github.com/smartystreets/goconvey/convey"
)

func TestMongo(t *testing.T) {
	Convey("test mongo", t, func() {
		e := NewEngine("127.0.0.1", "27017", "", "", "dcs_cmdb", 3600*time.Second, 5*time.Second, 50)
		err := e.Init()

		So(err, ShouldBeNil)

		err = e.Do(func(db *mgo.Database) error {
			return e.IterResource(db, map[string]interface{}{}, func(r *cmdb.Resource) error {
				return e.SaveResource(db, r)
			})
		})

		So(err, ShouldBeNil)

		err = e.Do(func(db *mgo.Database) error {
			return e.IterRelation(db, map[string]interface{}{}, func(r *cmdb.Relation) error {
				fmt.Println(r.XID)
				return e.SaveRelation(db, r)
			})
		})
		So(err, ShouldBeNil)

		err = e.Do(func(db *mgo.Database) error {
			r, err := e.QueryItem(db, "project_root")
			if err != nil {
				return err
			}
			fmt.Println(r.String())
			return nil
		})
		So(err, ShouldBeNil)
	})
}
