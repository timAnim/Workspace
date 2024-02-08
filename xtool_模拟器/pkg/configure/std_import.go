package configure

import (
	"fmt"
	"strings"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "std_device_import", StdDeviceImport, "标准化导入", `std_device_import <parentID> <deviceID> <deviceType>`, []*reg.Param{
		&reg.Param{Name: "parentID", Type: "string", Necessity: true, Desc: "父节点ID"},
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
	})
}

// StdDeviceImport 标准化设备导入
func StdDeviceImport(parentID string, deviceID string, deviceType string) {
	if !(strings.HasPrefix(parentID, "0_") || parentID == "project_root") {
		log.Errorf("do not support to import device to none local node '%s'", parentID)
		return
	}

	if strings.HasPrefix(deviceID, "0_") {
		log.Errorf("do not support to import local device '%s' to local node", deviceID)
		return
	}

	dtSplit := strings.Split(deviceType, ".")
	if len(dtSplit) != 7 {
		log.Errorf("error device_type '%s', should be 7 levels", deviceType)
		return
	}

	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		log.Errorf("get parent node '%s' error: %s", parentID, err.Error())
		return
	}

	if !(parent.IsSpace() || parent.IsDevice() || parent.IsProject()) {
		// 非空间与设备类节点不允许设备导入
		log.Errorf("cannot import device to node '%s:%s' because it is not a space, device or project_root node", parent.ResourceID, parent.MustName())
		return
	}

	subDevice, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device node '%s' error: %s", deviceID, err.Error())
		return
	}

	if !subDevice.IsDevice() {
		log.Errorf("this operation cannot import none device node '%s:%s'", subDevice.ResourceID, subDevice.MustName())
		return
	}

	device, err := buildDeviceFromDev(parentID, deviceType, false)
	if err != nil {
		log.Errorf("std_device_import buildDeviceFromDev error: %s", err.Error())
		return
	}

	if err := device.bind(subDevice); err != nil {
		log.Errorf("std_device_import device.bind error: %s", err.Error())
		return
	}

	items := device.Items()

	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("std_device_import '%s:%s' to '%s:%s' upsert items error: %s", subDevice.ResourceID, subDevice.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	err = cmdb.Bind(parent.ResourceID, []string{device.Device.ResourceID})
	if err != nil {
		log.Errorf("std_device_import '%s:%s' to '%s:%s' bind error: %s", device.Device.ResourceID, device.Device.MustName(), parent.ResourceID, parent.MustName(), err.Error())
		return
	}

	log.Infof("std_device_import '%s:%s' --> '%s:%s' to '%s:%s' success", subDevice.ResourceID, subDevice.MustName(), device.Device.ResourceID, device.Device.MustName(), parent.ResourceID, parent.MustName())
}

type boardItem struct {
	Board *cmdb.Resource
	Spots []*cmdb.Resource
}

type deviceItem struct {
	Device    *cmdb.Resource
	Spots     []*cmdb.Resource
	Boards    []*boardItem
	Relations []*cmdb.Relation
}

func (d *deviceItem) Items() *cmdb.Items {
	items := &cmdb.Items{
		Resources: make([]*cmdb.Resource, 0, len(d.Spots)+1),
		Relations: make([]*cmdb.Relation, 0, len(d.Relations)+len(d.Spots)+1),
	}

	if len(d.Relations) != 0 {
		items.Relations = append(items.Relations, d.Relations...)
	}

	items.Resources = append(items.Resources, d.Device)
	items.Relations = append(items.Relations, &cmdb.Relation{
		ResourceID1:  d.Device.MustParentID(),
		ResourceID2:  d.Device.ResourceID,
		RelationCode: 5,
	})

	for _, s := range d.Spots {
		items.Resources = append(items.Resources, s)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  d.Device.ResourceID,
			ResourceID2:  s.ResourceID,
			RelationCode: 5,
		})
	}
	if len(d.Boards) == 0 {
		return items
	}

	for _, b := range d.Boards {
		items.Resources = append(items.Resources, b.Board)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  "link_root",
			ResourceID2:  b.Board.ResourceID,
			RelationCode: 5,
		})

		for _, s := range b.Spots {
			items.Resources = append(items.Resources, s)
			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  b.Board.ResourceID,
				ResourceID2:  s.ResourceID,
				RelationCode: 5,
			})
			msID := s.Attributes.MustString("map_ids")
			if msID == "" {
				continue
			}

			items.Relations = append(items.Relations, &cmdb.Relation{
				ResourceID1:  fmt.Sprintf("%s_%s", d.Device.ResourceID, msID),
				ResourceID2:  s.ResourceID,
				RelationCode: 14,
			})
		}
	}

	return items
}

func (d *deviceItem) bind(subDevice *cmdb.Resource) error {
	spots, err := cmdb.GetChildren(subDevice.ResourceID, 0, []string{})
	if err != nil {
		return err
	}

	spotMap := map[string]*cmdb.Resource{}
	for _, s := range d.Spots {
		spotMap[s.Attributes.MustString("id")] = s
	}

	for _, s := range spots {
		mID := s.Attributes.MustString("map_ids")
		if mSpot, ok := spotMap[mID]; ok {
			d.Relations = append(d.Relations, &cmdb.Relation{
				ResourceID1:  mSpot.ResourceID,
				ResourceID2:  s.ResourceID,
				RelationCode: 14,
			})
		}
	}

	bos := d.Device.Attributes.MustStringSlice("board_options")
	d.Device.Attributes["board_options"] = append(bos, subDevice.ResourceID)

	d.Device.Attributes["name"] = subDevice.Attributes.MustString("name")

	return nil
}

func (d *deviceItem) buildBoards(boardOptions []string) error {
	for _, boardType := range boardOptions {
		ids, err := cmdb.NewID(1)
		if err != nil {
			return err
		}
		boardID := ids[0]
		brd, err := driver.GetBrd(boardType)
		if err != nil {
			return err
		}

		board := &boardItem{}
		board.Board = &cmdb.Resource{
			ResourceID: boardID,
			Attributes: brd.Board,
		}
		board.Board.Attributes["subsystem_type"] = 0
		board.Board.Attributes["is_collect"] = 1
		board.Board.Attributes["parent_id"] = "link_root"
		board.Board.Attributes["location"] = "link_root"
		transfer := fmt.Sprintf("transfer=%s", strings.Split(board.Board.Attributes["transfer"].(string), ",")[0])
		board.Board.Attributes["transfer"] = transfer

		for _, spot := range brd.Spots {
			spotID := fmt.Sprintf("%s_%s", boardID, spot["id"].(string))
			spot["resource_id"] = spotID
			spot["parent_id"] = boardID
			spot["location"] = strings.Join([]string{board.Board.MustLocation(), boardID}, "/")
			board.Spots = append(board.Spots, &cmdb.Resource{
				ResourceID: spotID,
				Attributes: spot,
			})
		}
		d.Boards = append(d.Boards, board)
	}
	return nil
}

func buildDeviceFromDev(parentID string, deviceType string, withBoard bool) (*deviceItem, error) {
	parent, err := cmdb.GetItem(parentID, 0)
	if err != nil {
		return nil, err
	}
	dev, err := driver.GetDev(deviceType)
	if err != nil {
		return nil, err
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

	device := &deviceItem{}

	ids, err := cmdb.NewID(1)
	if err != nil {
		return nil, err
	}
	deviceID := ids[0]
	log.Infof("create device '%s'", deviceID)

	device.Device = &cmdb.Resource{
		ResourceID: deviceID,
		Attributes: dev.Device,
	}
	device.Device.Attributes["resource_id"] = deviceID
	device.Device.Attributes["parent_id"] = parentID
	device.Device.Attributes["location"] = location
	device.Device.Attributes["create_date"] = int64(time.Now().UnixNano() / 1000)

	for _, spot := range dev.Spots {
		spotID := fmt.Sprintf("%s_%s", deviceID, spot.MustString("id"))
		spot["resource_id"] = spotID
		spot["parent_id"] = deviceID
		spot["location"] = fmt.Sprintf("%s/%s", location, deviceID)
		device.Spots = append(device.Spots, &cmdb.Resource{
			ResourceID: spotID,
			Attributes: spot,
		})
	}

	boardOptions := device.Device.Attributes.MustStringSlice("board_options")
	if withBoard {
		if err := device.buildBoards(boardOptions); err != nil {
			return nil, err
		}
		boardIDs := make([]string, 0, len(device.Boards))
		if len(device.Boards) != 0 {
			for _, b := range device.Boards {
				boardIDs = append(boardIDs, b.Board.ResourceID)
			}
		}
		device.Device.Attributes["board_options"] = boardIDs
		device.Device.Attributes["board_id"] = boardIDs
	} else {
		device.Device.Attributes["board_options"] = []string{}
		device.Device.Attributes["board_id"] = []string{}
	}

	return device, nil
}
