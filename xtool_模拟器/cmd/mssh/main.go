package main

import (
	"flag"
	"fmt"
	"os"

	_ "xtool/pkg/logger"

	"xtool/pkg/interpreter"

	_ "xtool/pkg/cmd"

	log "github.com/sirupsen/logrus"
)

//go:generate go-bindata -o=asset/asset.go -pkg=asset static/... templates/...

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

func usage() {
	fmt.Println(`Usage:
	mssh [-hv]
	mssh [filename] [filename] ...
	mssh
	`)
	fmt.Printf(`Info:
	version: %s
	release time: %s
	commit sha1: %s
	`, version(), BUILD, COMMITSHA1)
	fmt.Println("\nOptions:")
	flag.PrintDefaults()
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
	// 加载初始化配置
	initFile := ".msshrc"
	interpreter.SetPrompt("mssh")
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
