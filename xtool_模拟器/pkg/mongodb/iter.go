package mongodb

import (
	"fmt"
	"xtool/pkg/cmdb"

	"github.com/globalsign/mgo"
)

// IterResource 迭代查询到的数据
func (e *MgoEngine) IterResource(db *mgo.Database, filter interface{}, fn func(*cmdb.Resource) error) error {

	c := db.C("resources")
	q := c.Find(filter)

	iter := q.Iter()
	r := &cmdb.Resource{}
	for iter.Next(r) {
		err := fn(r)
		if err != nil {
			return fmt.Errorf("IterResource do fn error: %s", err.Error())
		}
	}

	if iter.Timeout() {
		return fmt.Errorf("IterResource iter.Timeout")
	}

	err := iter.Close()
	if err != nil {
		return fmt.Errorf("IterResource iter.Close error: %s", err.Error())
	}

	return nil
}

// IterRelation 迭代关系
func (e *MgoEngine) IterRelation(db *mgo.Database, filter interface{}, fn func(*cmdb.Relation) error) error {

	c := db.C("relations")

	q := c.Find(filter)
	iter := q.Iter()
	r := &cmdb.Relation{}
	for iter.Next(r) {
		err := fn(r)
		if err != nil {
			return fmt.Errorf("IterRelation do fn error %s", err.Error())
		}
	}
	if iter.Timeout() {
		return fmt.Errorf("IterRelation iter.Timeout")
	}

	err := iter.Close()
	if err != nil {
		return fmt.Errorf("IterRelation iter.Close error %s", err.Error())
	}

	return nil
}
