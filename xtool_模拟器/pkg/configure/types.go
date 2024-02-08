package configure

type MQValue struct {
	Args   *MQValueArgs `json:"args"`
	UID    string       `json:"_unique_id"`
	Method string       `json:"method"`
}

type MQValueArgs struct {
	Data *MQValueData `json:"data"`
}

type MQValueData struct {
	Device *MQValueSpot   `json:"device"`
	Spots  []*MQValueSpot `json:"spots"`
}

type MQValueSpot struct {
	ResourceID string `json:"resource_id"`
	RealValue  string `json:"real_value"`
	Status     int    `json:"status"`
	Timestamp  int64  `json:"timestamp"`
}
