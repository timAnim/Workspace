package cmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"xtool/pkg/auth"
	"xtool/pkg/define"
)

// Delete 节点删除
func Delete(resourceID string, relationCode int, depth int) error {
	req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("%s/api/v2/cmdb/resources?id=%s&relation_code=%d&depth=%d", auth.GetAddr(), resourceID, relationCode, depth), nil)
	if err != nil {
		return err
	}
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

// DeleteRel 节点关系删除
func DeleteRel(resourceID1 string, resourceID2 string) error {
	req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("%s/api/v2/cmdb/resources/relations?id1=%s&id2=%s", auth.GetAddr(), resourceID1, resourceID2), nil)
	if err != nil {
		return err
	}
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
