package configure

import (
	"fmt"
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("check", "check_cmdb", CheckCmdb, "检查CMDB数据，针对一些常用字段进行校验，输出报告", `check_cmdb <rootID>`, []*reg.Param{
		&reg.Param{Name: "spaceID", Type: "string", Necessity: true, Desc: "页面所在源空间节点ID"},
	})
	reg.Regist("check", "set_check_deleted", SetCheckDeleted, "设置检查选项，是否检查删除的节点", `set_check_deleted <deleted>`, []*reg.Param{
		&reg.Param{Name: "deleted", Type: "int", Necessity: false, Desc: "设置是否检查删除的节点"},
	})
	reg.Regist("check", "set_check_device_keys", SetCheckDeviceKeys, "设置设备检查选项", `set_check_device_keys <keys>`, []*reg.Param{
		&reg.Param{Name: "keys", Type: "string", Necessity: false, Desc: "设备字段检查，检查字段是否存在, 用','隔开"},
	})
	reg.Regist("check", "set_check_space_keys", SetCheckSpaceKeys, "设置空间检查选项", `set_check_space_keys <keys>`, []*reg.Param{
		&reg.Param{Name: "keys", Type: "string", Necessity: false, Desc: "设备字段检查，检查字段是否存在, 用','隔开"},
	})
}

var deleted = 0

// SetCheckDeleted 设置检查选项，是否检查删除的节点
func SetCheckDeleted(del string) {
	d, _ := strconv.Atoi(del)
	if d != 1 {
		deleted = 0
	} else {
		deleted = 1
	}
}

var devKeys = []string{"device_type", "device_info", "vendor_info", "import_type"}

// SetCheckDeviceKeys 设置设备检查字段
func SetCheckDeviceKeys(keys string) {
	if keys == "" {
		log.Errorf("please assign keys for device check")
		return
	}
	devKeys = strings.Split(keys, ",")
	log.Infoln("check device keys:", devKeys)
}

var spaceKeys = []string{"space_type"}

// SetCheckSpaceKeys 设置空间检查字段
func SetCheckSpaceKeys(keys string) {
	if keys == "" {
		log.Errorf("please assign keys for space check")
		return
	}
	spaceKeys = strings.Split(keys, ",")
	log.Infoln("check space keys:", spaceKeys)
}

// CheckCmdb CMDB数据检测, 从根节点递归
func CheckCmdb(rootID string) {
	if rootID == "" {
		rootID = "project_root"
	}
	root, err := cmdb.GetItem(rootID, 0)
	_ = root
	if err != nil {
		log.Errorf("get node '%s' error: %s", rootID, err.Error())
		return
	}
	errCount := checkChildren(root)
	if errCount != 0 {
		log.Warnf("check '%s:%v' found %d error(s)", root.ResourceID, root.Attributes["name"], errCount)
	} else {
		log.Infof("check '%s:%v' passed", root.ResourceID, root.Attributes["name"])
	}
}

func checkChildren(root *cmdb.Resource) int {
	children, err := cmdb.GetChildren(root.ResourceID, deleted, nil)
	if err != nil {
		log.Errorf("get children of '%s' error: %s", root.ResourceID, err.Error())
		return 1
	}
	errCount := 0
	for _, c := range children {
		if c.Deleted == 1 {
			log.Warnf("node '%s:%v' is deleted", c.ResourceID, c.Attributes["name"])
			continue
		}
		// TODO: 检测子节点
		errCount += checkCiType(c)
		errCount += checkLocation(root, c)
	}
	return errCount
}

func checkCiType(item *cmdb.Resource) int {
	errCount := 0
	if ct, ok := item.Attributes["ci_type"]; ok {
		switch ct.(string) {
		case "1":
			// 工程根节点
			errCount += checkChildren(item)
		case "2":
			// 设备
			errCount += checkDevice(item)
			errCount += checkChildren(item)
		case "3":
			// 测点
		case "4":
			// 告警点
		case "5":
			// 空间
			errCount += checkSpace(item)
			errCount += checkChildren(item)
		case "6":
			// 页面
		case "7":
			// 未知
		case "8":
			// 设备模板页面
		case "9":
			// 图片
		}
	} else {
		log.Warnf("node '%s:%v' has no field 'ci_type'", item.ResourceID, item.Attributes["name"])
		errCount++
	}
	return errCount
}

func checkName(item *cmdb.Resource) {
	if v, ok := item.Attributes["name"]; ok {
		fmt.Println(item.ResourceID, v)
	} else {
		log.Warnf("node '%s' has no field 'name'", item.ResourceID)
	}
}

func checkDevice(item *cmdb.Resource) int {
	// 检查设备, 设备通常有device_type device_info, vendor_info, import_type等字段
	errCount := 0
	fields := devKeys
	for _, f := range fields {
		if v, ok := item.Attributes[f]; ok {
			_ = v
		} else {
			log.Errorf("device node '%s:%v' has no field '%s'", item.ResourceID, item.Attributes["name"], f)
			errCount++
		}
	}
	if errCount != 0 {
		log.Warnf("check device node '%s:%s' found '%d' error(s)", item.ResourceID, item.Attributes["name"], errCount)
	} else {
		log.Infof("check device node '%s:%s' passed", item.ResourceID, item.Attributes["name"])
	}
	return errCount
}

func checkSpace(item *cmdb.Resource) int {
	// 检查空间, 空间通常有space_type等字段
	errCount := 0
	fields := spaceKeys
	for _, f := range fields {
		if v, ok := item.Attributes[f]; ok {
			_ = v
		} else {
			log.Errorf("space node '%s:%v' has no field '%s'", item.ResourceID, item.Attributes["name"], f)
			errCount++
		}
	}
	if errCount != 0 {
		log.Warnf("check space node '%s:%v' found '%d' error(s)", item.ResourceID, item.Attributes["name"], errCount)
	} else {
		log.Infof("check space node '%s:%v' passed", item.ResourceID, item.Attributes["name"])
	}
	return errCount
}

func checkLocation(parent *cmdb.Resource, item *cmdb.Resource) int {
	pLoc, ok := parent.Attributes["location"]
	if !ok {
		log.Errorf("node '%s:%v' parent '%s:%v' has no field 'location'", item.ResourceID, item.Attributes["name"], parent.ResourceID, parent.Attributes["name"])
		return 1
	}
	loc, ok := item.Attributes["location"]
	if !ok {
		log.Errorf("node '%s:%v' has no field 'location'", item.ResourceID, item.Attributes["name"])
		return 1
	}
	tmpLoc := fmt.Sprintf("%s/%s", pLoc.(string), parent.ResourceID)
	if pLoc.(string) == "" {
		tmpLoc = parent.ResourceID
	}
	if tmpLoc != loc.(string) {
		log.Errorf("node '%s:%v' has an error location, value is: '%v', should be '%s'", item.ResourceID, item.Attributes["name"], loc, tmpLoc)
		return 1
	}
	return 0
}
