package web

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"xtool/pkg/reg"
	"xtool/pkg/route"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("web", "web", Control, "WEB服务控制", `web <subCmd> <addr>`, []*reg.Param{
		&reg.Param{Name: "subCmd", Type: "string", Necessity: true, Desc: "子命令 (start)"},
		&reg.Param{Name: "addr", Type: "string", Necessity: false, Desc: "WEB服务地址, 默认 0.0.0.0:8088"},
	})

	reg.Regist("web", "file_server", FileServer, "文件服务器", `file_server <root> <addr>`, []*reg.Param{
		&reg.Param{Name: "root", Type: "string", Necessity: true, Desc: "根目录，页面能看到的最顶层目录"},
		&reg.Param{Name: "addr", Type: "string", Necessity: false, Desc: "文件服务地址, 默认 0.0.0.0:8089"},
	})

	reg.Regist("web", "serve_file", ServeFile, "文件服务", `serve_file <prefix> <root>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: true, Desc: "url前缀"},
		&reg.Param{Name: "root", Type: "string", Necessity: true, Desc: "根目录，页面能看到的最顶层目录"},
	})

	reg.Regist("web", "http_server", HTTPServer, "HTTP服务器", `http_server <addr>`, []*reg.Param{
		&reg.Param{Name: "addr", Type: "string", Necessity: false, Desc: "服务地址, 默认 0.0.0.0:8089"},
	})
}

// serve 实现了 http server 的方法
func serve(addr string) {
	err := route.Reload()
	if err != nil {
		log.Error("route reload error:", err)
		return
	}

	server := &http.Server{
		Addr:           addr,
		Handler:        route.Router(),
		ReadTimeout:    90 * time.Second,
		WriteTimeout:   90 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Error("http server start error:", err)
		}
	}()
	log.Infof("http server listen on '%s'", addr)

	c := make(chan os.Signal)
	signal.Notify(c, syscall.SIGINT)
	fmt.Println(<-c)
	server.Close()
}

// Control WEB服务控制器
func Control(cmd string, addr string) {
	switch cmd {
	case "start":
		if addr == "" {
			addr = "0.0.0.0:8088"
		}
		serve(addr)
	default:
		fmt.Printf("web not support sub cmd: %s\n", cmd)
	}
}

// FileServer 简易文件服务器
func FileServer(root string, addr string) {
	if root == "" {
		root = "."
	}

	if addr == "" {
		addr = "0.0.0.0:8089"
	}

	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir(root))))

	go func() {
		err := http.ListenAndServe(addr, nil)
		if err != nil {
			log.Fatal("ListenAndServe: ", err)
		}
	}()

	log.Infof("file server listen on '%s'", addr)
}

// ServeFile 文件服务
func ServeFile(prefix string, root string) {
	if prefix == "" {
		prefix = "/"
	}
	if root == "" {
		root = "."
	}
	http.Handle(prefix, http.StripPrefix(prefix, http.FileServer(http.Dir(root))))
	log.Infof("serve file '%s'-->'%s'", prefix, root)
}

// HTTPServer 启动HTTP服务
func HTTPServer(addr string) {
	if addr == "" {
		addr = "0.0.0.0:8089"
	}
	go func() {
		err := http.ListenAndServe(addr, nil)
		if err != nil {
			log.Fatal("ListenAndServe: ", err)
		}
	}()
	log.Infof("http server listen on '%s'", addr)
}
