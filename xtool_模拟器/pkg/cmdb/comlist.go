package cmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"

	"github.com/tidwall/gjson"
)

// GetComList 获取串口映射表
func GetComList() (map[string]string, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/system/comlist", auth.GetAddr()), nil)
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
	if err != nil {
		return nil, err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}
	comlist := map[string]string{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data").String()), &comlist)
	if err != nil {
		return nil, err
	}
	return comlist, nil
}
