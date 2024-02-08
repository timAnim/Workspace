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

// Move 空间移动
func Move(srcID string, dstID string) error {
	d := define.M{
		"src": define.M{
			"resource_id": srcID,
		},
		"dst": define.M{
			"resource_id": dstID,
		},
	}
	b, err := json.Marshal(d)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/view/tree/space/move", auth.GetAddr()), strings.NewReader(string(b)))
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
