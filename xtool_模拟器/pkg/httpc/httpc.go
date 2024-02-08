package httpc

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"xtool/pkg/httpx"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("httpc", "http_get", Get, "执行HTTP GET请求", `http_get <url>`, []*reg.Param{
		&reg.Param{Name: "url", Type: "string", Necessity: true, Desc: "请求地址"},
	})

	reg.Regist("httpc", "http_post", Post, "执行HTTP POST请求", `http_post <url> <dataFile> <contentType>`, []*reg.Param{
		&reg.Param{Name: "url", Type: "string", Necessity: true, Desc: "请求地址"},
		&reg.Param{Name: "dataFile", Type: "string", Necessity: true, Desc: "数据文件"},
		&reg.Param{Name: "contentType", Type: "string", Necessity: true, Desc: "Content-Type，默认 'application/json'"},
	})

	reg.Regist("httpc", "http_put", Put, "执行HTTP PUT请求", `http_put <url> <dataFile> <contentType>`, []*reg.Param{
		&reg.Param{Name: "url", Type: "string", Necessity: true, Desc: "请求地址"},
		&reg.Param{Name: "dataFile", Type: "string", Necessity: true, Desc: "数据文件"},
		&reg.Param{Name: "contentType", Type: "string", Necessity: true, Desc: "Content-Type，默认 'application/json'"},
	})

	reg.Regist("httpc", "http_delete", Delete, "执行HTTP DELETE请求", `http_delete <url>`, []*reg.Param{
		&reg.Param{Name: "url", Type: "string", Necessity: true, Desc: "请求地址"},
	})
}

func rebuildURL(url string) string {
	if strings.HasPrefix(url, "http://") {
		return url
	}
	return "http://" + url
}

// Get HTTP GET请求
func Get(url string) {
	url = rebuildURL(url)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Errorf("[GET] \thttp.NewRequest error: %s", err.Error())
		return
	}

	resp, err := httpx.DoRequest(req)
	if err != nil {
		log.Errorf("[GET] \thttpx.DoRequest error: %s", err.Error())
		return
	}

	defer resp.Body.Close()

	io.Copy(os.Stdout, resp.Body)
	fmt.Println("")

	log.Infof("[GET] \t%s success", url)
}

// Post HTTP POST请求
func Post(url string, dataFile string, contentType string) {
	url = rebuildURL(url)
	if contentType == "" {
		contentType = "application/json"
	}

	fp, err := os.Open(dataFile)
	if err != nil {
		log.Errorf("[POST] \tos.Open '%s' error: %s", dataFile, err.Error())
		return
	}
	defer fp.Close()

	req, err := http.NewRequest(http.MethodPost, url, fp)
	if err != nil {
		log.Errorf("[POST] \thttp.NewRequest error: %s", err.Error())
		return
	}

	req.Header.Set("Content-Type", contentType)

	resp, err := httpx.DoRequest(req)
	if err != nil {
		log.Errorf("[POST] \thttpx.DoRequest error: %s", err.Error())
		return
	}

	defer resp.Body.Close()

	io.Copy(os.Stdout, resp.Body)
	fmt.Println("")

	log.Infof("[POST] \t%s success", url)
}

// Put HTTP PUT请求
func Put(url string, dataFile string, contentType string) {
	url = rebuildURL(url)
	if contentType == "" {
		contentType = "application/json"
	}

	req, err := http.NewRequest(http.MethodPut, url, nil)
	if err != nil {
		log.Errorf("[PUT] \thttp.NewRequest error: %s", err.Error())
		return
	}

	if dataFile != "" {
		fp, err := os.Open(dataFile)
		if err != nil {
			log.Errorf("[PUT] \tos.Open '%s' error: %s", dataFile, err.Error())
			return
		}
		defer fp.Close()

		req, err = http.NewRequest(http.MethodPut, url, fp)
		if err != nil {
			log.Errorf("[PUT] \thttp.NewRequest error: %s", err.Error())
			return
		}
	}

	req.Header.Set("Content-Type", contentType)

	resp, err := httpx.DoRequest(req)
	if err != nil {
		log.Errorf("[PUT] \thttpx.DoRequest error: %s", err.Error())
		return
	}

	defer resp.Body.Close()

	io.Copy(os.Stdout, resp.Body)
	fmt.Println("")

	log.Infof("[PUT] \t%s success", url)
}

// Delete HTTP DELETE请求
func Delete(url string) {
	url = rebuildURL(url)
	req, err := http.NewRequest(http.MethodDelete, url, nil)
	if err != nil {
		log.Errorf("[DELETE]\thttp.NewRequest error: %s", err.Error())
		return
	}

	resp, err := httpx.DoRequest(req)
	if err != nil {
		log.Errorf("[DELETE]\thttpx.DoRequest error: %s", err.Error())
		return
	}

	defer resp.Body.Close()

	io.Copy(os.Stdout, resp.Body)
	fmt.Println("")

	log.Infof("[DELETE]\t%s success", url)
}
