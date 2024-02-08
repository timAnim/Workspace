package view

import (
	"fmt"
	"strings"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	"github.com/streadway/amqp"
)

func init() {
	reg.Regist("amqp", "delete_queue", DeleteQueue, "删除MQ队列", `delete_queue <host> <name>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1:5672"},
		&reg.Param{Name: "name", Type: "string", Necessity: true, Desc: "队列名称"},
	})
}

// DeleteQueue 删除MQ数据
func DeleteQueue(addr, name string) {
	if !strings.Contains(addr, ":") {
		addr += ":5672"
	}

	conn, err := amqp.Dial(fmt.Sprintf("amqp://guest:guest@%s", addr))
	if err != nil {
		log.Errorf("amqp.Dial '%s' error: %s", addr, err.Error())
		return
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Errorf("open channel error: %s", err.Error())
		return
	}
	defer ch.Close()

	n, err := ch.QueueDelete(name, false, false, false)
	if err != nil {
		log.Errorf("delete queue '%s' error: %s", name, err.Error())
		return
	}
	log.Infof("delete queue '%s' success, purged message count: %d", name, n)
}
