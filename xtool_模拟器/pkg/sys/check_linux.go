package sys

import (
	"fmt"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/sqladapter"
	"xtool/pkg/utils"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("system", "check_system", CheckSystem, "系统体检", `check_system`, []*reg.Param{})
	reg.Regist("system", "check_link", CheckLink, "检查系统连接状态", `check_link`, []*reg.Param{})
}

// CheckSystem 系统体检
func CheckSystem() {
	// 检查系统信息
	o, err := utils.GetShellOutput("uname -a")
	if err != nil {
		log.Errorf("获取系统信息错误: %s", err.Error())
		return
	}
	log.Infof("系统信息: %s", o)

	// 检查安装版本信息
	o, err = utils.GetShellOutput("gu -i")
	if err != nil {
		log.Warnf("获取V3R2之前的版本信息错误: %s, 断定不是V3R2及以前的版本", err.Error())
	} else {
		log.Infof("获取KE版本成功: \n%s", o)
	}

	o, err = utils.GetShellOutput("cd /opt/data/xrocket/;./xrocket list")
	if err != nil {
		log.Warnf("获取V3R3版本信息错误: %s, 断定不是V3R3版本", err.Error())
	} else {
		log.Infof("获取KE版本成功: \n%s", o)
	}

	// 检查磁盘分区信息
	o, err = utils.GetShellOutput("df -h")
	if err != nil {
		log.Warnf("获取磁盘分区信息出错: %s", err.Error())
	} else {
		log.Infof("获取磁盘分区信息成功: \n%s", o)
	}

	// 检查内存信息
	o, err = utils.GetShellOutput("free -m")
	if err != nil {
		log.Warnf("获取内存信息出错: %s", err.Error())
	} else {
		log.Infof("获取内存信息成功: \n%s", o)
	}

	//o, err = utils.GetShellOutput("df -h | grep /opt/data")
	o, err = utils.GetShellOutput("df -h | grep /home")
	if err != nil {
		log.Warnf("检查 /opt/data 分区出错: %s", err.Error())
	} else {
		log.Infof("检查 /opt/data 分区成功: \n%s", o)
	}

	o, err = utils.GetShellOutput("df -h | grep swap | awk '{print $6}'")
	if err != nil {
		o, err = utils.GetShellOutput("free -m | tail -1 | awk '{print $2}'")
		if err != nil {
			log.Warnf("检查 swap 分区出错: %s", err.Error())
		} else if strings.TrimSpace(o) == "0" {
			log.Warnf("检查 swap 分区大小为 0")
		} else {
			log.Infof("swap 分区检测通过")
		}
	} else {
		x := strings.TrimSpace(o)
		if x == "/swap" {
			log.Warnf("swap 分区配置错误, 被错分成 %s", x)
		}
		o, err = utils.GetShellOutput("free -m | tail -1 | awk '{print $2}'")
		if err != nil {
			log.Warnf("检查 swap 分区出错: %s", err.Error())
		} else if strings.TrimSpace(o) == "0" {
			log.Warnf("检查 swap 分区大小为 0")
		} else {
			log.Infof("swap 分区检测通过")
		}
	}

}

// CheckLink 检查连接
func CheckLink() {
	q, err := sqladapter.ParseSQL(`select name, ci_type, parent_id, guid, addr from cmdb_all where ci_type = '7' and is_subsystem = 1`)
	if err != nil {
		log.Errorf("检查连接信息解析出错: %s", err.Error())
		return
	}

	items, err := cmdb.QueryItems(q.(*define.Query))
	if err != nil {
		log.Errorf("检查连接信息查询出错: %s", err.Error())
		return
	}

	outputLinkInfo(items)

	checkParentID(items)

	checkDuplicateGUID(items)
}

func outputLinkInfo(items *cmdb.Items) {
	infos := make([]string, 0, len(items.Resources))

	for _, r := range items.Resources {
		infos = append(infos, fmt.Sprintf("resource_id: %s, name: %s, parent_id: %s, guid: %s, addr: %s, deleted: %d", r.ResourceID, r.MustName(), r.MustParentID(), r.MustGUID(), r.Attributes.MustString("addr"), r.Deleted))
	}

	log.Infof("系统连接信息: \n%s\n", strings.Join(infos, "\n"))
}

func checkParentID(items *cmdb.Items) {
	for _, r := range items.Resources {
		parentID := r.MustParentID()

		if parentID == r.ResourceID {
			log.Errorf("节点 '%s:%s' parent_id 为其自身, 参考云禅道任务#11922", r.ResourceID, r.MustName())
		}
	}
}

func checkDuplicateGUID(items *cmdb.Items) {
	hasDup := false
	guidMap := make(map[string]*cmdb.Resource)

	for _, r := range items.Resources {
		guid := r.MustGUID()

		if v, ok := guidMap[guid]; ok {
			log.Errorf("节点 '%s:%s' 与 '%s:%s' 系统标识重复: '%s'", v.ResourceID, v.MustName(), r.ResourceID, r.MustName(), guid)
			hasDup = true
			continue
		}

		guidMap[guid] = r
	}
	if hasDup {
		log.Errorf("系统中存在重复的系统标识，这是备份还原过程中容易出现的问题，要处理此问题最好是使用最近的备份在后台还原工程\n\t参考云禅道: http://project.xbrother.com:9000/zentao/doc-view-266.html")
		return
	}

	log.Infof("系统中不存在重复的系统标识，安全")
}
