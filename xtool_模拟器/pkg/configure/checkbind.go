package configure

import (
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("bind", "check_bind", CheckBind, "检查设备绑定", `check_bind <deviceID>`, []*reg.Param{
		&reg.Param{Name: "deviceID", Type: "string", Necessity: true, Desc: "待检查的设备ID"},
		&reg.Param{Name: "repair", Type: "string", Necessity: false, Desc: "是否尝试修复，1:修复, 默认不修复"},
	})
}

// CheckBind 检查绑定
func CheckBind(deviceID string, repair string) {
	device, err := cmdb.GetItem(deviceID, 0)
	if err != nil {
		log.Errorf("get device '%s' error: %s", deviceID, err.Error())
		return
	}

	children, err := cmdb.GetChildren(device.ResourceID, 0, []string{"name", "ci_type", "spot_type"})
	if err != nil {
		log.Errorf("get children of '%s' error: %s", deviceID, err.Error())
		return
	}

	count := 0

	for _, c := range children {
		binds, err := cmdb.GetRelated(c.ResourceID, 14, 0, 0, []string{"name", "ci_type"})
		if err != nil {
			log.Errorf("get binds of '%s' error: %s", c.ResourceID, err.Error())
			count++
			continue
		}

		if len(binds) == 0 {
			log.Warnf("spot '%s:%s' has no bind board spot", c.ResourceID, c.MustName())
			count++
			continue
		}

		if len(binds) > 1 {
			ids := make([]string, 0, len(binds))
			for _, b := range binds {
				ids = append(ids, b.ResourceID)
			}
			log.Warnf("spot '%s:%s' has bind multi board spots: %v", c.ResourceID, c.MustName(), ids)
			if repair == "1" {
				for _, b := range binds {
					DeleteRel(c.ResourceID, b.ResourceID)
				}
			}
			count++
			continue
		}
		log.Infof("spot '%s:%s' has bind to spot: '%s:%s'", c.ResourceID, c.MustName(), binds[0].ResourceID, binds[0].MustName())
	}

	if len(device.MustBoardOptions()) != 1 {
		log.Warnf("device '%s' board_options %v maybe error", device.ResourceID, device.MustBoardOptions())
		count++
	}

	log.Infof("check device '%s' success, error count: %d", device.ResourceID, count)
	if repair == "1" && count > 0 {
		RefreshDevice(deviceID)
	}
}
