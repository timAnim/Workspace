package pre

import (
	"xtool/pkg/auth"
	"xtool/pkg/cmd"
	"xtool/pkg/interpreter"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("auth", "pre_login", Login, "预登陆，增加用于批量执行的服务器地址，配合range指令使用", `pre_login`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "要登陆的KE服务器地址"},
		&reg.Param{Name: "account", Type: "string", Necessity: true, Desc: "登陆账号"},
		&reg.Param{Name: "password", Type: "string", Necessity: true, Desc: "登陆密码"},
	})
	reg.Regist("auth", "range", Range, "遍历所有预登陆的服务器执行指令，用于批量导入导出，批量重刷等场景", `range <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "遍历执行文件"},
	})
}

var loginInfo = map[string][3]string{}

// Login 预登陆
func Login(host string, account string, password string) {
	if host == "" || account == "" || password == "" {
		log.Errorf("please assign a pre login host")
		return
	}
	loginInfo[host] = [3]string{host, account, password}
}

// Range 遍历保存的预登陆信息，执行脚本
func Range(filename string) {
	if auth.Addr != "127.0.0.1" {
		cmd.Logout()
	}
	for _, info := range loginInfo {
		cmd.Login(info[0], info[1], info[2])
		interpreter.Run(filename)
		cmd.Logout()
	}
}
