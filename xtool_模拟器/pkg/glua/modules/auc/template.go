package auc

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

// GetTemplate 获取模板
func (c *Client) GetTemplate(name string) ([]byte, error) {

	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/device_template/drivers/%s", c.getAddr(), name), nil)
	if err != nil {
		return nil, err
	}
	resp, err := c.newHTTPClient().Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	return body, err
}
