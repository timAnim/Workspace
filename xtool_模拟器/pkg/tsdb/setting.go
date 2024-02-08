package tsdb

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"
)

// Setting 设置值
func Setting(resourceID string, value string) error {
	q := define.M{
		"resource_id": resourceID,
		"value":       value,
	}
	data := q.String()
	check := md5.New()
	check.Write([]byte(data))
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/tsdb/setting", auth.GetAddr()), strings.NewReader(data))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("check", hex.EncodeToString(check.Sum(nil)))
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return fmt.Errorf("data error: not json, data: %s", string(body))
	}
	r := define.M{}
	r.FromString(string(body))
	if r.MustString("error_code") != "00" {
		return fmt.Errorf("error response: %s", string(body))
	}
	return nil
}
