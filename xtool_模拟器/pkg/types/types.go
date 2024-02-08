package types

//// EventItem 定义事件
//type EventItem struct {
//	GUID          string      `json:"guid"`
//	ResourceID    string      `json:"resource_id"`
//	Content       string      `json:"content"`
//	EventType     int32       `json:"event_type"`
//	EventLevel    int32       `json:"event_level"`
//	EventSnapshot string      `json:"event_snapshot"`
//	EventTime     interface{} `json:"event_time"`
//	EventLocation string      `json:"event_location"`
//	EventSource   string      `json:"event_source"`
//
//	IsRecover int32 `json:"is_recover"`
//}

// ValueItem 数据节点
type ValueItem struct {
	ResourceID string      `json:"resource_id"`
	RealValue  interface{} `json:"real_value"`
	Status     int32       `json:"status"`
	Timestamp  int64       `json:"timestamp"`
	SaveTime   int64       `json:"save_time"`
}

// Value MQ数据流
type Value struct {
	Device *ValueItem   `json:"device"`
	Spots  []*ValueItem `json:"spots"`
}
