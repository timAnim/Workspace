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

// UpsertItems 新增或修改CI项
func UpsertItems(items *Items) error {
	if items.Resources == nil {
		items.Resources = []*Resource{}
	}
	if items.Relations == nil {
		items.Relations = []*Relation{}
	}
	data, err := json.Marshal(items)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("%s/api/v2/cmdb/resources", auth.GetAddr()), strings.NewReader(string(data)))
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
	d := define.M{}
	err = json.Unmarshal(body, &d)
	if err != nil {
		return err
	}
	if c, ok := d["error_code"]; ok {
		if c.(string) != "00" {
			return fmt.Errorf("%s", d["error_msg"].(string))
		}
	} else {
		return fmt.Errorf("unknown error")
	}
	return nil
}
