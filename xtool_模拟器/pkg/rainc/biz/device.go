package biz

import (
	"fmt"
	"strconv"
	"xtool/pkg/rainc"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("rainc", "rainc_new_device", NewDevice, "彩虹C02AU新建设备", `rainc_new_device <deviceType> <count>`, []*reg.Param{
		&reg.Param{Name: "deviceType", Type: "string", Necessity: true, Desc: "设备类型"},
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "新建设备数量"},
	})
	reg.Regist("rainc", "rainc_del_device", DelDevice, "彩虹C02AU删除设备", `rainc_del_device <resourceID>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "设备ID"},
	})
	reg.Regist("rainc", "rainc_device_list", DeviceList, "彩虹C02AU设备列表", `rainc_device_list`, []*reg.Param{})
	reg.Regist("rainc", "rainc_export_devices", ExportDevices, "彩虹C02AU导出设备列表", `rainc_export_devices`, []*reg.Param{})
	reg.Regist("rainc", "rainc_export_device_spots", ExportDeviceSpots, "彩虹C02AU导出设备与测点列表", `rainc_export_device_spots`, []*reg.Param{})
	reg.Regist("rainc", "rainc_raname", Rename, "彩虹C02AU设备重命名", `rainc_raname <resourceID> <newName>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "设备ID"},
		&reg.Param{Name: "newName", Type: "string", Necessity: true, Desc: "新设备名称"},
	})
}

func genTransfer(transfers []string) string {
	if len(transfers) == 0 {
		return "transfer=DefaultTransfer"
	}
	// TODO: 使用config_ui.json补全transfer
	return transfers[0]
}

// DelDevice 删除设备
func DelDevice(resourceID string) {
	d, err := rainc.GetDeviceInfo(resourceID)
	if err != nil {
		log.Errorf("rainc.GetDeviceInfo '%s' error: %s", resourceID, err.Error())
		return
	}

	err = rainc.DeleteDevice(d.ResourceID)
	if err != nil {
		log.Errorf("rainc.DeleteDevice '%s' error: %s", d.ResourceID, err.Error())
		return
	}

	log.Infof("delete device '%s' success", resourceID)
}

// NewDevice 新建设备
func NewDevice(deviceType string, count string) {
	ti, err := rainc.GetTemplateInfo(deviceType)
	if err != nil {
		log.Errorf("rainc.GetTemplateInfo error: %s", err.Error())
		return
	}
	n, err := strconv.Atoi(count)
	if err != nil {
		n = 1
	}
	ds := make([]*rainc.Device, 0, n)

	for i := 0; i < n; i++ {
		d := &rainc.Device{
			DeviceType:    ti.DeviceType,
			Name:          ti.Name,
			LimitInterval: ti.LimitInterval,
			Protocol:      ti.Protocol,
			Transfer:      genTransfer(ti.Transfer),
		}
		ds = append(ds, d)
	}

	rds, err := rainc.NewDevices(ds)
	if err != nil {
		log.Errorf("rainc.NewDevice error: %s", err.Error())
		return
	}

	fmt.Println("new devices:")
	for i, rd := range rds {
		fmt.Println(i+1, rd.ResourceID, rd.Name)
	}

	log.Infof("new device success")
}

// DeviceList 展示设备列表
func DeviceList() {
	ds, err := rainc.GetDeviceList()
	if err != nil {
		log.Errorf("rainc.GetDeviceList error: %s", err.Error())
		return
	}

	ids := make([]string, 0, len(ds))
	for _, d := range ds {
		ids = append(ids, d.ResourceID)
		//fmt.Println(i+1, d.ResourceID, d.Name)
	}

	dss, err := rainc.GetDeviceStatus(ids...)
	if err != nil {
		log.Errorf("rainc.GetDeviceStatus error: %s", err.Error())
		return
	}

	sMap := make(map[string]*rainc.DeviceStatus)
	for _, s := range dss {
		sMap[s.ResourceID] = s
	}

	for i, d := range ds {
		s, ok := sMap[d.ResourceID]
		if ok {
			fmt.Println(i+1, d.ResourceID, d.Name, s.Status)
			continue
		}
		fmt.Println(i+1, d.ResourceID, d.Name, "--")
	}

	log.Infof("show device list success")
}

// Rename 展示设备列表
func Rename(resourceID string, newName string) {
	d, err := rainc.GetDeviceInfo(resourceID)
	if err != nil {
		log.Errorf("rainc.GetDeviceInfo error: %s", err.Error())
		return
	}
	if newName == "" {
		log.Errorf("new name is null")
		return
	}
	oldName := d.Name
	d.Name = newName
	ds := []*rainc.Device{d}

	err = rainc.UpdateDevices(ds)
	if err != nil {
		log.Errorf("rainc.NewDevice error: %s", err.Error())
		return
	}
	log.Infof("device '%s' rename from '%s' to '%s' success", resourceID, oldName, newName)
}

// ExportDevices 导出设备列表
func ExportDevices() {
	ds, err := rainc.GetDeviceList()
	if err != nil {
		log.Errorf("rainc.GetDeviceList error: %s", err.Error())
		return
	}

	err = utils.GenXlsx("devices.xlsx", func(fp *excelize.File) error {
		fp.SetCellValue("Sheet1", utils.Axis(0, 0), "index")
		fp.SetCellValue("Sheet1", utils.Axis(0, 1), "resource_id")
		fp.SetCellValue("Sheet1", utils.Axis(0, 2), "name")
		fp.SetCellValue("Sheet1", utils.Axis(0, 3), "device_type")
		fp.SetCellValue("Sheet1", utils.Axis(0, 4), "ci_type")
		fp.SetCellValue("Sheet1", utils.Axis(0, 5), "is_collect")
		fp.SetCellValue("Sheet1", utils.Axis(0, 6), "limit_interval")
		fp.SetCellValue("Sheet1", utils.Axis(0, 7), "protocol")
		fp.SetCellValue("Sheet1", utils.Axis(0, 8), "transfer")
		for i, d := range ds {
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 0), i+1)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 1), d.ResourceID)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 2), d.Name)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 3), d.DeviceType)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 4), d.CiType)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 5), d.IsCollect)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 6), d.LimitInterval)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 7), d.Protocol)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 8), d.Transfer)
		}
		return nil
	})

	log.Infof("export device list to 'devices.xlsx' success")
}

// ExportDeviceSpots 导出设备测点列表
func ExportDeviceSpots() {
	ds, err := rainc.GetDeviceList()
	if err != nil {
		log.Errorf("rainc.GetDeviceList error: %s", err.Error())
		return
	}

	err = utils.GenXlsx("device_spots.xlsx", func(fp *excelize.File) error {
		fp.SetCellValue("Sheet1", utils.Axis(0, 0), "index")
		fp.SetCellValue("Sheet1", utils.Axis(0, 1), "resource_id")
		fp.SetCellValue("Sheet1", utils.Axis(0, 2), "name")
		fp.SetCellValue("Sheet1", utils.Axis(0, 3), "device_type")
		fp.SetCellValue("Sheet1", utils.Axis(0, 4), "ci_type")
		fp.SetCellValue("Sheet1", utils.Axis(0, 5), "is_collect")
		fp.SetCellValue("Sheet1", utils.Axis(0, 6), "limit_interval")
		fp.SetCellValue("Sheet1", utils.Axis(0, 7), "protocol")
		fp.SetCellValue("Sheet1", utils.Axis(0, 8), "transfer")
		for i, d := range ds {
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 0), i+1)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 1), d.ResourceID)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 2), d.Name)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 3), d.DeviceType)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 4), d.CiType)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 5), d.IsCollect)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 6), d.LimitInterval)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 7), d.Protocol)
			fp.SetCellValue("Sheet1", utils.Axis(i+1, 8), d.Transfer)
			spots, err := rainc.GetChildren(d.ResourceID)
			if err != nil {
				return err
			}
			fp.NewSheet(d.ResourceID)
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 0), "index")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 1), "resource_id")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 2), "id")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 3), "map_ids")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 4), "name")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 5), "ci_type")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 6), "spot_type")
			fp.SetCellValue(d.ResourceID, utils.Axis(0, 7), "mapper")
			for is, spot := range spots {
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 0), is+1)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 1), spot.ResourceID)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 2), spot.ID)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 3), spot.MapIDs)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 4), spot.Name)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 5), spot.CiType)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 6), spot.SpotType)
				fp.SetCellValue(d.ResourceID, utils.Axis(is+1, 7), spot.Mapper)
			}
		}

		return nil
	})
	if err != nil {
		log.Errorf("utils.GenXlsx error: %s", err.Error())
		return
	}

	log.Infof("export device and spots list to 'device_spots.xlsx' success")
}
