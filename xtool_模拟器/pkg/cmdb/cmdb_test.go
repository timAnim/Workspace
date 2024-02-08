package cmdb

import (
	"fmt"
	"testing"
	"xtool/pkg/auth"
)

func TestAuth(t *testing.T) {
	Addr = "127.0.0.1"
	auth.Addr = Addr
	//err := auth.Login("admin", "123456")
	//if err != nil {
	//	t.Error(err.Error())
	//}
}

/*
func TestGetItem(t *testing.T) {
	r, err := GetItem("project_root")
	if err != nil {
		t.Error(err.Error())
	}
	t.Log(r)
	fmt.Println(r)

	rs, err := GetItemsWhereResourceIDIn([]string{"project_root", "0_101", "0_102"})
	if err != nil {
		t.Error(err.Error())
	}
	t.Log(rs)
	for _, r := range rs {
		fmt.Println(r)
	}
}

func TestGetRelated(t *testing.T) {
	rs, err := GetRelated("project_root", 5, 0, 0)
	if err != nil {
		t.Error(err.Error())
	}
	t.Log(rs)
	for _, r := range rs {
		fmt.Println(r)
	}

	rs, err = GetChildren("project_root", 0)
	if err != nil {
		t.Error(err.Error())
	}
	t.Log(rs)
	for _, r := range rs {
		fmt.Println(r)
	}

	rs, err = GetParent("0_101", 0)
	if err != nil {
		t.Error(err.Error())
	}
	t.Log(rs)
	for _, r := range rs {
		fmt.Println(r)
	}
}

func TestAddItems(t *testing.T) {
	items := &Items{
		Resources: []*Resource{
			&Resource{
				ResourceID: "0_102",
				Attributes: define.M{
					"ci_type":    "5",
					"name":       "TestAddItems",
					"space_type": "5",
				},
			},
		},
		Relations: []*Relation{
			&Relation{
				ResourceID1:  "project_root",
				ResourceID2:  "0_102",
				RelationCode: 5,
			},
		},
	}
	err := AddItems(items)
	if err != nil {
		t.Error(err.Error())
	}
}

func TestUpsertItems(t *testing.T) {
	items := &Items{
		Resources: []*Resource{
			&Resource{
				ResourceID: "0_102",
				Attributes: define.M{
					"ci_type":    "5",
					"name":       "TestUpsertItems",
					"space_type": "5",
				},
			},
		},
		Relations: []*Relation{
			&Relation{
				ResourceID1:  "project_root",
				ResourceID2:  "0_102",
				RelationCode: 5,
			},
		},
	}
	err := UpsertItems(items)
	if err != nil {
		t.Error(err.Error())
	}
}
func TestNewVersion(t *testing.T) {
	NewVersionFor("device", 5)
}
*/

func TestNewVersion(t *testing.T) {
	ps, err := GetPictureList()
	fmt.Println(ps, err)
	GetPicture("usr_a98e812599b94d3c813545c6d808dc40.png", ".")
	PutPicture("./usr_a98e812599b94d3c813545c6d808dc40.png")
}
