package configure

import (
	"fmt"
	"strconv"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "create_space", CreateSpace, "新建空间", `create_space <parentID> <spaceType> <count>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "spaceType", Type: "string", Necessity: true, Desc: "空间类型 可选项: area:区域, center:园区, dc:数据中心, building:楼栋, floor:楼层, room:房间"},
		&reg.Param{Name: "count", Type: "int", Necessity: false, Desc: "数量, 默认1"},
	})
	reg.RegistFunc(
		reg.WithGroup("configure"),
		reg.WithName("create_one_space"),
		reg.WithCallback(CreateOneSpace),
		reg.WithHelp("新建一个空间"),
		reg.WithUsage("create_one_space <parentID> <spaceType>"),
		reg.WithParams([]*reg.Param{
			&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
			&reg.Param{Name: "spaceType", Type: "string", Necessity: true, Desc: "空间类型 可选项: area:区域, center:园区, dc:数据中心, building:楼栋, floor:楼层, room:房间"},
		}),
		reg.WithRetVars([]*reg.Param{
			&reg.Param{Name: "space_id", Type: "string", Desc: "新建的空间ID"},
		}),
	)
}

// CreateSpace 创建空间
func CreateSpace(parentID string, spaceType string, count string) {
	n, err := strconv.Atoi(count)
	if err != nil {
		n = 1
	}
	items, _, err := buildSpace(parentID, spaceType, n)
	if err != nil {
		log.Errorf("build space info error: %s", err.Error())
		return
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create space error: %s", err.Error())
		return
	}
	log.Infof("create space '%s' success", spaceType)
}

// CreateOneSpace 创建单个空间
func CreateOneSpace(parentID string, spaceType string) string {
	items, spaceID, err := buildSpace(parentID, spaceType, 1)
	if err != nil {
		log.Errorf("build space info error: %s", err.Error())
		return spaceID
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("create space error: %s", err.Error())
		return spaceID
	}
	log.Infof("create space '%s' success", spaceType)
	return spaceID
}

func buildSpace(parentID string, spaceType string, n int) (*cmdb.Items, string, error) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		return nil, "", err
	}
	sp, err := driver.GetSpace(spaceType)
	if err != nil {
		return nil, "", err
	}
	var location string
	if pLoc, ok := parent.Attributes["location"]; ok {
		pLocStr := pLoc.(string)
		if pLocStr != "" {
			location = fmt.Sprintf("%s/%s", pLocStr, parent.ResourceID)
		} else {
			location = parentID
		}
	} else {
		location = parentID
	}
	items := cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	retID := ""
	for i := 0; i < n; i++ {
		ids, err := cmdb.NewID(1)
		if err != nil {
			return nil, "", err
		}
		spaceID := ids[0]
		retID = spaceID
		tmpSpace := sp.Copy()
		space := cmdb.Resource{
			ResourceID: spaceID,
			Attributes: tmpSpace.Space,
		}

		name := space.MustName()
		if name == "" {
			name = space.Attributes.MustString("description")
		}
		space.Attributes["name"] = fmt.Sprintf("%s(%d)", name, i)
		space.Attributes["resource_id"] = spaceID
		space.Attributes["parent_id"] = parentID
		space.Attributes["location"] = location
		space.Attributes["create_date"] = int64(time.Now().UnixNano() / 1000)

		boards := []string{}
		space.Attributes["board_options"] = boards
		items.Resources = append(items.Resources, &space)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  parentID,
			ResourceID2:  spaceID,
			RelationCode: 5,
		})
		if len(boards) == 1 {
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  spaceID,
				ResourceID2:  boards[0],
				RelationCode: 14,
			})
		}
		for _, spot := range tmpSpace.Spots {
			spotID := fmt.Sprintf("%s_%s", spaceID, spot["id"].(string))
			spot["resource_id"] = spotID
			spot["parent_id"] = spaceID
			spot["location"] = fmt.Sprintf("%s/%s", location, spaceID)
			items.Resources = append(items.Resources, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: spot,
			})
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  spaceID,
				ResourceID2:  spotID,
				RelationCode: 5,
			})
		}
	}
	return &items, retID, nil
}
