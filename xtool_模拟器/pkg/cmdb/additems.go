package cmdb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"xtool/pkg/auth"
)

// AddItems 新增CI项
func AddItems(items *Items) error {
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
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources", auth.GetAddr()), strings.NewReader(string(data)))
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
	//body, err := ioutil.ReadAll(resp.Body)
	//if err != nil {
	//	return err
	//}
	return nil
}
