package cmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"
)

// Bind 绑定空间，刷location
func Bind(parentID string, ids []string) error {
	d := define.M{
		"parent_id":   parentID,
		"resource_id": ids,
		"type":        1,
	}
	b, err := json.Marshal(d)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/view/tree/space/bind", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
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
	data := define.M{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		return err
	}
	if c, ok := data["error_code"]; ok {
		if c.(string) != "00" {
			return fmt.Errorf("%s", data["error_msg"].(string))
		}
	} else {
		return fmt.Errorf("unknown error")
	}
	return nil
}
