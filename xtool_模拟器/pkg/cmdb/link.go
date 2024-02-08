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

// RefreshLink 刷新连接
func RefreshLink(resourceID string) error {
	d := define.M{
		"resource_id": resourceID,
	}
	b, err := json.Marshal(d)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/refresh", auth.GetAddr()), strings.NewReader(string(b)))
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

// DeleteLink 删除连接
func DeleteLink(resourceID string) error {
	d := define.M{
		"resource_id": resourceID,
	}
	b, err := json.Marshal(d)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/link_delete", auth.GetAddr()), strings.NewReader(string(b)))
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
