package project

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"
	"xtool/pkg/define"

	"github.com/tidwall/gjson"
)

// Addr HTTP 服务器地址
var Addr string

func init() {
	Addr = "127.0.0.1"
}

// BackupItem 备份记录
type BackupItem struct {
	BackupID string     `json:"backup_id"`
	Name     string     `json:"name"`
	Desc     string     `json:"description"`
	Time     int64      `json:"time"`
	Detail   []define.M `json:"detail"`
	Allow    int        `json:"allow"`
}

// GetBackupList 获取备份列表
func GetBackupList() ([]*BackupItem, error) {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/system/backup?backup_id=", auth.GetAddr()), nil)
	if err != nil {
		return nil, err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	bs := []*BackupItem{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode == http.StatusNotFound {
		// 不存在备份列表时直接返回空列表，兼容rainc
		return bs, nil
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}
	//fmt.Println(string(body), err)
	json.Unmarshal([]byte(gjson.Get(string(body), "data.backups").String()), &bs)
	return bs, nil
}
