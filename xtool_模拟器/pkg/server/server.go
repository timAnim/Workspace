package server

import (
	"net/http"
	"sync"
	"time"
	"xtool/pkg/cfg"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func init() {
	conf = &Conf{
		Address:      "0.0.0.0:8090",
		ReadTimeout:  60,
		WriteTimeout: 90,
	}
	cfg.RegistSection("server", conf, Reload, Destroy)
}

var (
	conf   *Conf
	once   sync.Once
	server *http.Server
)

// Conf 服务配置
type Conf struct {
	Address      string        `ini:"address"`
	ReadTimeout  time.Duration `ini:"read_timeout"`
	WriteTimeout time.Duration `ini:"write_timeout"`
}

// serve 实现了 http server 的方法
func serve() {
	router := gin.Default()

	router.POST("/xtool/cmd", cmdHandler)

	server = &http.Server{
		Addr:           conf.Address,
		Handler:        router,
		ReadTimeout:    conf.ReadTimeout * time.Second,
		WriteTimeout:   conf.WriteTimeout * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Error("http server start error:", err)
		}
	}()
}

// Reload 重载
func Reload() error {
	once.Do(serve)
	log.Infof("http server listen on %s", conf.Address)
	return nil
}

// Destroy 析构
func Destroy() error {
	return server.Close()
}
