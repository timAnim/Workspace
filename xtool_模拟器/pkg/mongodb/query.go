package mongodb

import (
	"xtool/pkg/cmdb"

	"github.com/globalsign/mgo"
	"gopkg.in/mgo.v2/bson"
)

// QueryItem 查询单节点
func (e *MgoEngine) QueryItem(db *mgo.Database, xid string) (*cmdb.Resource, error) {

	c := db.C("resources")
	q := c.FindId(xid)

	r := &cmdb.Resource{}
	err := q.One(r)
	if err != nil {
		return nil, err
	}

	return r, nil
}

// QueryItemsIn 查询多节点
func (e *MgoEngine) QueryItemsIn(db *mgo.Database, xids []string) ([]*cmdb.Resource, error) {

	c := db.C("resources")
	q := c.Find(bson.M{"_id": bson.M{"$in": xids}})

	rs := make([]*cmdb.Resource, 0, len(xids))
	err := q.All(&rs)
	if err != nil {
		return nil, err
	}

	return rs, nil
}

// QueryRelation 查询xid关联关系
func (e *MgoEngine) QueryRelation(db *mgo.Database, xid string, code int64) ([]*cmdb.Relation, error) {
	c := db.C("relations")
	q := c.Find(bson.M{"resource_id1": xid, "relation_code": code})

	rs := make([]*cmdb.Relation, 0, 1000)
	err := q.All(&rs)
	if err != nil {
		return nil, err
	}

	return rs, nil
}

// QueryRelatedItems 查询关联节点
func (e *MgoEngine) QueryRelatedItems(db *mgo.Database, xid string, code int64) ([]*cmdb.Resource, error) {
	rels, err := e.QueryRelation(db, xid, code)
	if err != nil {
		return nil, err
	}

	xids := make([]string, 0, len(rels))
	for _, rel := range rels {
		xids = append(xids, rel.ResourceID2)
	}

	return e.QueryItemsIn(db, xids)
}
