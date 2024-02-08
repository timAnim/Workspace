package cmd

import (
	"fmt"
	"math"
	"time"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/driver"
	"xtool/pkg/north"
	"xtool/pkg/project"
	"xtool/pkg/reg"
	"xtool/pkg/store"
	"xtool/pkg/tsdb"
	"xtool/pkg/vdev"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("auth", "login", Login, "登陆", `login <host> <account> <password>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "要登陆的KE服务器地址"},
		&reg.Param{Name: "account", Type: "string", Necessity: true, Desc: "登陆账号"},
		&reg.Param{Name: "password", Type: "string", Necessity: true, Desc: "登陆密码"},
	})
	reg.Regist("auth", "logout", Logout, "注销", `logout`, []*reg.Param{})
}

// Login 登陆
func Login(host string, account string, password string) {
	if auth.GetHost() != "127.0.0.1" {
		Logout()
	}

	auth.Addr = host
	cmdb.Addr = host
	driver.Addr = host
	tsdb.Addr = host
	north.Addr = host
	store.Addr = host
	vdev.Addr = host
	project.Addr = host
	err := auth.Login(account, password)
	if err != nil {
		log.Error("login error:", err.Error())
		return
	}
	bs, err := project.GetBackupList()
	if err != nil {
		log.Error("get backuplist error:", err.Error())
		return
	}

	log.Infof("login [%s] success, session: %s", auth.GetHost(), auth.GetSession())
	if len(bs) == 0 {
		fmt.Println("\033[33m请注意：当前工程无备份记录，若要做危险操作，请做好相关备份\033[0m")
	} else {
		now := time.Now().Unix()
		latest := int64(0)
		fmt.Println("当前工程备份列表:")
		for i, b := range bs {
			latest = int64(math.Max(float64(latest), float64(b.Time)))
			t := time.Unix(b.Time, 0)
			fmt.Printf("%d\t%s\t%s\t%s\t%s\n", i+1, b.BackupID, b.Name, b.Desc, t.Format("2006-01-02 15:04:05"))
		}
		if now-latest > 60*60 {
			fmt.Println("\033[33m请注意：当前工程最新备份距离现在已超过一小时，若要做危险操作，请做好相关备份\033[0m")
		}
	}
}

// Logout 注销
func Logout() {
	err := auth.Logout()
	if err != nil {
		log.Error("logout error:", err.Error())
		return
	}
	host := "127.0.0.1"
	auth.Addr = host
	cmdb.Addr = host
	driver.Addr = host
	tsdb.Addr = host
	north.Addr = host
	store.Addr = host
	vdev.Addr = host
	project.Addr = host
	log.Info("logout success")
}
