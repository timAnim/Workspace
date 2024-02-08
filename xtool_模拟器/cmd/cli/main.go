package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"

	_ "xtool/pkg/logger"

	"xtool/pkg/interpreter"

	_ "xtool/pkg/cmd"
	_ "xtool/pkg/pre"

	_ "xtool/pkg/box"
	_ "xtool/pkg/configure"
	_ "xtool/pkg/pub"
	_ "xtool/pkg/report"

	//@SQLITE@_ "xtool/pkg/sqlite"
	//_ "xtool/pkg/rainc/biz"
	_ "xtool/pkg/docsify"
	_ "xtool/pkg/glua"
	_ "xtool/pkg/ngx"
	_ "xtool/pkg/sys"
	_ "xtool/pkg/tsdbstore/replay"
	_ "xtool/pkg/view"
	_ "xtool/pkg/xpty"

	_ "xtool/pkg/httpc"

	//@WEB@_ "xtool/pkg/web"

	log "github.com/sirupsen/logrus"
)

var (
	// VERSION 版本信息
	VERSION string
	// BUILD 构建时间
	BUILD string
	// TAGCOMMITSHA1 git commit ID
	TAGCOMMITSHA1 string
	// COMMITSHA1 git commit ID
	COMMITSHA1 string
)

//命令行选项
var (
	h = flag.Bool("h", false, "Show this help")
	v = flag.Bool("v", false, "Show version")
)

func init() {
}

func version() string {
	if COMMITSHA1 == TAGCOMMITSHA1 {
		return VERSION
	}
	return VERSION + ".beta"
}

var qr = [][]bool{
	[]bool{true, true, true, true, true, true, true, false, true, false, false, true, true, false, false, true, true, false, true, true, false, false, false, true, false, true, true, true, false, false, true, true, true, true, true, true, true},
	[]bool{true, false, false, false, false, false, true, false, false, true, true, false, false, false, true, false, false, false, false, true, true, false, true, false, false, true, false, true, false, false, true, false, false, false, false, false, true},
	[]bool{true, false, true, true, true, false, true, false, false, false, true, false, false, false, true, false, true, false, true, false, true, true, false, true, false, false, true, false, true, false, true, false, true, true, true, false, true},
	[]bool{true, false, true, true, true, false, true, false, true, true, true, true, true, true, false, true, false, false, true, true, true, true, true, true, false, false, true, true, true, false, true, false, true, true, true, false, true},
	[]bool{true, false, true, true, true, false, true, false, false, true, true, false, false, true, false, false, true, true, false, false, true, true, false, true, false, false, true, true, true, false, true, false, true, true, true, false, true},
	[]bool{true, false, false, false, false, false, true, false, false, false, true, true, false, true, false, true, false, true, true, false, false, false, true, true, false, false, true, true, false, false, true, false, false, false, false, false, true},
	[]bool{true, true, true, true, true, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, true, true, true, true, true, true},
	[]bool{false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, true, true, false, true, true, true, false, true, true, false, true, false, false, true, false, false, false, false, false, false, false, false},
	[]bool{false, false, true, false, true, true, true, false, true, true, true, true, true, false, false, false, false, false, true, false, true, false, false, false, true, true, true, false, true, true, false, false, false, true, false, false, true},
	[]bool{false, false, true, false, true, true, false, true, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, false, true, false, false, false, false, true, false, true, false},
	[]bool{true, false, true, false, false, true, true, true, true, true, false, false, false, true, true, false, false, true, false, false, true, true, true, true, true, true, true, false, true, false, false, false, false, true, true, true, true},
	[]bool{false, true, false, false, false, false, false, false, false, true, true, false, true, false, true, true, false, true, false, true, true, true, false, false, true, true, false, true, true, true, true, true, true, false, false, false, true},
	[]bool{true, true, false, true, true, false, true, false, false, true, true, true, false, true, false, false, true, false, false, false, true, true, true, false, false, true, false, false, false, false, true, true, false, false, true, true, false},
	[]bool{false, true, true, false, false, true, false, false, true, false, false, false, false, true, false, true, true, false, false, false, true, false, true, true, true, false, false, false, false, true, true, true, false, false, false, true, false},
	[]bool{false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, false, false, true, true, false, false, false, false, false, true, false, true, false, true, false, true, false, false, true, false, true, true},
	[]bool{false, false, true, true, false, true, false, true, false, false, false, true, true, true, false, false, false, false, false, false, false, false, true, false, true, true, true, false, false, false, false, false, false, false, false, false, false},
	[]bool{false, false, true, true, false, true, true, true, false, true, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true, true, false, false, true},
	[]bool{true, true, true, false, false, true, false, false, true, false, true, false, true, true, false, false, false, false, false, false, false, false, true, false, true, true, false, false, false, false, true, false, false, true, false, false, true},
	[]bool{true, false, true, false, true, true, true, false, true, true, true, false, true, false, true, true, false, false, false, false, true, true, true, false, true, false, false, false, false, false, true, true, false, false, false, true, true},
	[]bool{false, false, true, true, true, false, false, true, true, true, true, true, false, true, false, false, false, false, false, false, false, false, true, true, false, true, true, false, false, true, false, true, false, true, false, true, true},
	[]bool{true, false, false, true, true, true, true, false, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, false, true, false, false, true, true, true, true, true, false, true, false, false, false},
	[]bool{false, false, false, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, true, false, true, false, false, true, true, true, true, false, true, true, false, true},
	[]bool{false, true, true, true, true, true, true, false, true, true, true, false, true, true, false, false, false, true, false, true, false, true, true, true, true, true, true, false, false, false, false, false, true, true, true, false, true},
	[]bool{true, true, false, false, true, true, false, false, true, false, true, false, false, true, true, true, true, false, false, true, false, false, false, true, true, true, true, false, true, false, false, true, false, false, false, false, false},
	[]bool{true, true, false, true, false, false, true, false, false, false, false, false, true, false, true, true, true, false, false, false, false, false, true, true, false, false, true, true, false, true, true, true, false, false, false, true, true},
	[]bool{false, true, false, true, false, false, false, false, false, true, true, false, false, true, true, true, true, false, false, true, false, false, true, true, false, true, false, false, false, true, false, false, false, true, true, false, false},
	[]bool{true, false, false, false, false, true, true, true, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, false, true, false, false, false, true, false, true, true, true, true, true, true},
	[]bool{false, true, false, false, true, false, false, true, true, false, true, false, true, false, false, true, true, true, false, true, true, false, false, true, false, true, false, false, true, false, true, true, true, false, false, true, false},
	[]bool{true, false, true, true, false, false, true, true, false, false, true, false, true, true, true, true, true, true, false, true, false, true, true, false, false, true, true, true, true, true, true, true, true, true, false, true, true},
	[]bool{false, false, false, false, false, false, false, false, true, true, false, true, false, false, true, true, false, true, true, true, true, true, true, false, true, false, true, false, true, false, false, false, true, true, true, false, true},
	[]bool{true, true, true, true, true, true, true, false, false, false, true, false, true, false, true, false, false, false, true, true, true, false, false, false, false, false, false, true, true, false, true, false, true, false, true, true, true},
	[]bool{true, false, false, false, false, false, true, false, true, false, false, false, true, true, true, false, true, true, false, true, false, false, false, false, false, true, false, false, true, false, false, false, true, false, false, true, false},
	[]bool{true, false, true, true, true, false, true, false, true, true, true, false, true, false, true, true, true, true, true, false, true, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, true},
	[]bool{true, false, true, true, true, false, true, false, false, false, true, true, true, true, true, false, false, true, true, true, false, true, false, true, true, true, true, true, true, true, false, true, true, true, false, true, true},
	[]bool{true, false, true, true, true, false, true, false, true, true, false, true, false, false, true, false, true, false, false, false, false, true, false, true, true, false, false, true, true, false, false, true, true, false, true, false, true},
	[]bool{true, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, true, false, true, true, true, false, true, false, true, true, false, true, true, false, false, true, true, false, false, true, false},
	[]bool{true, true, true, true, true, true, true, false, false, false, true, false, false, false, true, false, false, true, true, false, false, false, true, true, true, true, false, true, true, false, false, true, true, false, true, true, true},
}

func printQR() {
	fmt.Println("**************************************************************************")
	fmt.Println("如果这工具对你有用，请支持一下作者:")
	for _, bs := range qr {
		for _, b := range bs {
			if b {
				os.Stdout.Write([]byte("\033[40m  \033[0m"))
			} else {
				os.Stdout.Write([]byte("\033[47m  \033[0m"))
			}
		}
		fmt.Println("")
	}
	fmt.Println("**************************************************************************")
}

func usage() {
	fmt.Println(`Usage:
	cli [-hv]
	cli [filename] [filename] ...
	cli
	`)
	fmt.Printf(`Info:
	version: %s
	release time: %s
	commit sha1: %s
	`, version(), BUILD, COMMITSHA1)
	fmt.Println("\nOptions:")
	flag.PrintDefaults()
	printQR()
}

func main() {
	flag.Parse()
	if *h {
		usage()
		return
	}
	if *v {
		fmt.Println(version())
		return
	}

	runtime.GOMAXPROCS(runtime.NumCPU() - 1)
	// 加载初始化配置
	initFile := ".xclirc"
	interpreter.Run(initFile)

	log.Infoln("main start")
	if len(os.Args) > 1 {
		// 若带参数，则解释文件
		for _, file := range os.Args[1:] {
			interpreter.Run(file)
		}
	} else {
		interpreter.Interpret(os.Stdin)
	}
}
