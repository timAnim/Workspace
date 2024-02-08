package ngx

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	"github.com/tufanbarisyildirim/gonginx"

	"github.com/tufanbarisyildirim/gonginx/parser"
)

func init() {
	reg.Regist("inner", "nginx_reconf", NginxReconf, "重新配置nginx.conf，生成新的配置文件，将额外的配置使用 include 引入", `nginx_reconf <path>`, []*reg.Param{
		&reg.Param{Name: "path", Type: "string", Necessity: false, Desc: "原 nginx.conf 配置文件路径，默认'/usr/local/nginx/conf/nginx.conf'"},
	})
}

// LoadNginxConf 加载 nginx 配置
func LoadNginxConf(path string) {
	if path == "" {
		path = "/usr/local/nginx/conf/nginx.conf"
	}
	p, err := parser.NewParser(path)
	if err != nil {
		log.Errorf("load nginx.conf error: %s", err.Error())
		return
	}
	conf := p.Parse()

	for _, d := range conf.Block.GetDirectives() {
		fmt.Println(d.GetName(), d.GetParameters())
	}
	ds := conf.Block.FindDirectives("http")
	for _, d := range ds {
		fmt.Println(d.GetName(), d.GetParameters())

		bs := d.GetBlock()
		drs := bs.GetDirectives()
		for _, x := range drs {
			fmt.Println(x.GetName(), x.GetParameters())
		}
		srvs := conf.Block.FindDirectives("server")
		for _, srv := range srvs {
			fmt.Println(srv.GetName(), srv.GetParameters())
			sds := srv.GetBlock().GetDirectives()
			for _, sd := range sds {
				fmt.Println(sd.GetName(), sd.GetParameters())
			}
		}
	}
	fmt.Println(gonginx.DumpBlock(conf.Block, gonginx.IndentedStyle))
	//x, _ := json.Marshal(conf.Block)
	//fmt.Println(string(x))
}

// NginxReconf 重新配置 nginx
func NginxReconf(path string) {
	rc := bytes.NewBuffer(make([]byte, 0, 1024))
	outDir := "conf"
	exDir := "include"

	if err := os.MkdirAll(filepath.Join(outDir, exDir), 0755); err != nil {
		log.Errorf("mkdir '%s' error: %s", filepath.Join(outDir, exDir), err.Error())
		return
	}
	if path == "" {
		path = "/usr/local/nginx/conf/nginx.conf"
	}

	p, err := parser.NewParser(path)
	if err != nil {
		log.Errorf("load nginx.conf error: %s", err.Error())
		return
	}

	conf := p.Parse()

	for _, d := range conf.Directives {
		if d.GetName() == "http" {
			rc.WriteString("http {")
			rc.WriteString("\n")
			for _, sd := range d.GetBlock().GetDirectives() {
				if sd.GetName() == "server" {
					rc.WriteString("    server {")
					rc.WriteString("\n")
					for _, ssd := range sd.GetBlock().GetDirectives() {
						if ssd.GetName() == "location" {
							ps := ssd.GetParameters()
							if len(ps) != 0 && (ps[0] == "/" || ps[0] == "=") {
								rc.WriteString(gonginx.DumpDirective(ssd, &gonginx.Style{
									SortDirectives: false,
									StartIndent:    8,
									Indent:         4,
								}))
								rc.WriteString("\n")
							} else {
								p := strings.Join(ps, ".")
								p = strings.ReplaceAll(p, "/", "_")
								p = strings.TrimLeft(p, "_")
								exFile := filepath.Join(outDir, exDir, p)
								if err := ioutil.WriteFile(exFile, []byte(gonginx.DumpDirective(ssd, gonginx.IndentedStyle)), 0666); err != nil {
									log.Errorf("save extra location to '%s' error: %s", exFile, err.Error())
								} else {
									log.Infof("save extra location to '%s' succss", exFile)
								}
							}
						} else {
							rc.WriteString(gonginx.DumpDirective(ssd, &gonginx.Style{
								SortDirectives: false,
								StartIndent:    8,
								Indent:         4,
							}))
							rc.WriteString("\n")
						}
					}
					rc.WriteString(fmt.Sprintf("        include %s/*;", exDir))
					rc.WriteString("\n")
					rc.WriteString("    }")
					rc.WriteString("\n")
				} else {
					rc.WriteString("    ")
					rc.WriteString(gonginx.DumpDirective(sd, gonginx.IndentedStyle))
					rc.WriteString("\n")
				}
			}
			rc.WriteString("}")
			rc.WriteString("\n")
		} else {
			rc.WriteString(gonginx.DumpDirective(d, gonginx.IndentedStyle))
			rc.WriteString("\n")
		}
	}

	rcFile := filepath.Join(outDir, "nginx.conf")
	if err := ioutil.WriteFile(rcFile, rc.Bytes(), 0666); err != nil {
		log.Errorf("save root conf to '%s' error: %s", rcFile, err.Error())
	} else {
		log.Infof("save root conf to '%s' succss", rcFile)
	}
}
