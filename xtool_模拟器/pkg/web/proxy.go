package web

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("web", "http_proxy", Proxy, "反向代理", `http_proxy <prefix> <host>`, []*reg.Param{
		&reg.Param{Name: "prefix", Type: "string", Necessity: true, Desc: "子命令 (start)"},
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "目标地址"},
		&reg.Param{Name: "trim", Type: "string", Necessity: false, Desc: "截取前缀"},
	})
}

// Proxy 反向代理
func Proxy(prefix string, host string, trim string) {
	http.Handle(prefix, http.StripPrefix(trim, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		addr := "http://" + host
		remote, err := url.Parse(addr)
		if err != nil {
			log.Errorf("reverse proxy parse addr error: %s", err.Error())
			return
		}
		proxy := httputil.NewSingleHostReverseProxy(remote)
		proxy.ServeHTTP(w, r)
	})))
}
