package trace

import (
	"net/http"
	_ "net/http/pprof"
	"os"
	"os/signal"
	"runtime/debug"
	"syscall"
	"xtool/pkg/cfg"

	log "github.com/sirupsen/logrus"
)

func init() {
	conf = &Conf{
		Msg:          "\n>>>>>>>>>>>>>>>> FATAL ERROR <<<<<<<<<<<<<<<<<\n",
		DebugAddress: "0.0.0.0:8081",
	}
	cfg.RegistSection("trace", conf, nil, nil)
}

// Conf 输出信息配置
type Conf struct {
	Msg          string `ini:"msg"`
	DebugAddress string `ini:"debug_address"`
}

var conf *Conf

/*
	"                      |\n"+
	"                  \\       /\n"+
	"                    .---. \n"+
	"               '-.  |   |  .-'\n"+
	"                 ___|   |___\n"+
	"            -=  [FATAL ERROR]  =-\n"+
	"                `---.   .---' \n"+
	"             __||__ |   | __||__\n"+
	"             '-..-' |   | '-..-'\n"+
	"               ||   |   |   ||\n"+
	"               ||_.-|   |-,_||\n"+
	"             .-\"`   `\"`'`   `\"-.\n"+
	"           .'                   '.\n",
*/

// Stack 输出异常退出信息
func Stack() {
	if err := recover(); err != nil {
		log.Fatal(conf.Msg, err, "\n"+string(debug.Stack())+"\n")
	}
}

// Debug 启动调试端口
func Debug() {
	/***** DEBUG BEGIN *****/
	go func() {
		err := http.ListenAndServe(conf.DebugAddress, nil)
		if err != nil {
			log.Error("DEBUG INTERFACE", err)
		}
	}()
	/***** DEBUG END *****/
}

// Wait 等待退出信号
func Wait() {
	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	log.Info("received signal:", <-ch)
}
