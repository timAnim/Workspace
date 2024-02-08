package tsdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/define"

	"github.com/tidwall/gjson"
)

// GetEventLast 获取未恢复事件
func GetEventLast() ([]*define.EventItem, error) {
	b := `{
		"where": []
	}`
	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/tsdb/status/event/last", auth.GetAddr()), strings.NewReader(b))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
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

	eventList := []*define.EventItem{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.event_list").String()), &eventList)
	if err != nil {
		return nil, err
	}
	//for _, e := range eventList {
	//	fmt.Println(e.ResourceID, e.Content, e.EventTime, e.EventSource)
	//}
	return eventList, nil
}
