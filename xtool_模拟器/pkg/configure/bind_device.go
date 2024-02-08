package configure

import (
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "create_and_bind_by_id", CreateAndBindByID, "按源ID创建设备节点并做绑定", `create_and_bind_by_id <parentID> <srcID> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "资源ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
	})
}

// CreateAndBindByID 按源ID创建设备节点并做绑定
func CreateAndBindByID(parentID string, srcID string, deviceType string) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent '%s' error: %s", parentID, err.Error())
		return
	}
	if !(parent.IsSpace() || parent.IsProject()) {
		log.Errorf("parent node '%s:%s' is not space", parent.ResourceID, parent.MustName())
		return
	}
	ids := strings.Split(srcID, "_0_")
	if len(ids) != 2 {
		log.Errorf("srcID '%s' is ileggal", srcID)
		return
	}

	dstID := "0_" + ids[1]
	dst, err := cmdb.GetItem(dstID, 0)
	if err == nil {
		log.Errorf("dst node '%s' is already exist", dstID)
		return
	}

	src, err := cmdb.GetItem(srcID, 0)
	if err != nil {
		log.Errorf("get src error: %s", err.Error())
		return
	}

	if !src.IsDevice() {
		log.Errorf("src node '%s:%s' is not device", src.ResourceID, src.MustName())
		return
	}

	if src.MustDeviceType() != "" {
		log.Errorf("src node has device_type='%s'", src.MustDeviceType())
		return
	}

	device, err := driver.GetDev(deviceType)
	if err != nil {
		log.Errorf("get dev '%s' error: %s", deviceType, err.Error())
		return
	}

	dst = &cmdb.Resource{
		ResourceID: dstID,
		Attributes: device.Device,
	}

	for k, v := range src.Attributes {
		dst.Attributes[k] = v
	}
	pLoc := parent.MustLocation()

	dst.Attributes["parent_id"] = parent.ResourceID
	dst.Attributes["location"] = strings.Join([]string{pLoc, parent.ResourceID}, "/")
	if pLoc == "" {
		dst.Attributes["location"] = parent.ResourceID
	}
	delete(dst.Attributes, "org_pid")
	dst.Attributes["board_template"] = []string{deviceType}
	dst.AddBoardOption("strategy")

	// spots

	children, err := cmdb.GetChildren(src.ResourceID, 0, []string{})
	if err != nil {
		log.Errorf("get children of '%s:%s' error: %s", src.ResourceID, src.MustName(), err.Error())
		return
	}

	items := &cmdb.Items{
		Resources: make([]*cmdb.Resource, 0, len(children)+1),
		Relations: make([]*cmdb.Relation, 0, 2*len(children)+1),
	}
	items.Resources = append(items.Resources, dst)
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  parent.ResourceID,
		ResourceID2:  dst.ResourceID,
		RelationCode: 5,
	})

	for _, c := range children {
		if !c.IsSpot() {
			continue
		}
		ids = strings.Split(c.ResourceID, "_0_")
		if len(ids) != 2 {
			log.Errorf("c.ResourceID '%s' is illegal", c.ResourceID)
			return
		}
		spot := c.Copy()
		spot.ResourceID = "0_" + ids[1]
		spot.Attributes["resource_id"] = spot.ResourceID
		spot.Attributes["location"] = strings.Join([]string{pLoc, parent.ResourceID, dst.ResourceID}, "/")
		spot.Attributes["parent_id"] = dst.ResourceID

		items.Resources = append(items.Resources, spot)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  dst.ResourceID,
			ResourceID2:  spot.ResourceID,
			RelationCode: 5,
		})
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  spot.ResourceID,
			ResourceID2:  c.ResourceID,
			RelationCode: 14,
		})
	}

	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("cmdb.AddItems error: %s", err.Error())
		return
	}
	log.Infof("create device '%s:%s' from '%s:%s'", dst.ResourceID, dst.MustName(), src.ResourceID, src.MustName())
}
