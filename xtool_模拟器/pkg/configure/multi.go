package configure

import (
	"io/ioutil"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/interpreter"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("modify", "multi_device", MultiDevice, "设备批处理，危险操作，慎用", `multi_device <command>`, []*reg.Param{
		&reg.Param{Name: "command", Type: "string", Necessity: true, Desc: "需要对列出的设备所做的操作(命令), 使用引号引起来，使用'@'占位设备ID"},
	})
}

// MultiDevice 设备批处理
func MultiDevice(command string) {
	devices, err := cmdb.GetDevices("", 0)
	if err != nil {
		log.Errorf("get devices error: %s", err.Error())
		return
	}
	for _, d := range devices {
		//if !strings.HasPrefix(d.ResourceID, "0_") {
		//	continue
		//}
		tmpCmd := strings.Replace(command, "@", d.ResourceID, -1)
		interpreter.Interpret(ioutil.NopCloser(strings.NewReader(tmpCmd)))
	}
	log.Infof("multi_device '%s' success", command)
}
