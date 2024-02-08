package driver

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"
)

// Addr 服务器地址
var Addr string

func init() {
	Addr = "127.0.0.1"
}

// GetTemplate 获取模板
func GetTemplate(name string) ([]byte, error) {

	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/device_template/drivers/%s", auth.GetAddr(), name), nil)
	if err != nil {
		return nil, err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	//if err != nil {
	//	return nil, err
	//}
	//return body, nil
	return body, err
}
