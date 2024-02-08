package view

import (
	"fmt"
	"strings"
	"xtool/pkg/rmq"

	uuid "github.com/satori/go.uuid"
	log "github.com/sirupsen/logrus"
)

func init() {
}

var (
	user   = "guest"
	passwd = "guest"
)

// Subscribe 订阅数据
func Subscribe(host string, exchange string, routingKey string, queue string, handler func([]byte) error) {
	if host == "" {
		host = "127.0.0.1:5672"
	}
	if vs := strings.Split(host, ":"); len(vs) == 1 {
		host = host + ":5672"
	}

	uri := fmt.Sprintf("amqp://%s:%s@%s", user, passwd, host)

	c, err := rmq.Dial(uri)
	if err != nil {
		log.Errorf("connect rabbitmq error: %s", err.Error())
		return
	}

	err = c.DeclareExchange(&rmq.Exchange{
		Name:    exchange,
		Type:    "topic",
		Durable: true,
		AutoDel: false,
	})
	if err != nil {
		log.Errorf("declare exchange error: %s", err.Error())
		return
	}

	if queue == "" {
		guid := uuid.NewV4()
		queue = fmt.Sprintf("x.%s", guid.String())
	}

	qConf := &rmq.Queue{
		Name:    queue,
		Durable: false,
		AutoDel: true,
	}

retry:
	q, err := c.DeclareQueue(qConf)
	if err != nil {
		if strings.Contains(err.Error(), "arg 'auto_delete'") {
			qConf.AutoDel = !qConf.AutoDel
			goto retry
		} else if strings.Contains(err.Error(), "arg 'durable'") {
			qConf.Durable = !qConf.Durable
			goto retry
		}
		log.Errorf("declare queue error: %s", err.Error())
		return
	}

	err = c.DeclareBinding(queue, routingKey, exchange)
	if err != nil {
		log.Errorf("declare queue binding error: %s", err.Error())
		return
	}

	consumer := c.NewConsumer(q.Name, rmq.Nack(true), rmq.Qos(1))
	consumer.AddHandler(func(delivery rmq.Delivery) error {
		return decodeWrapper(delivery.ContentEncoding, handler)(delivery.Payload)
	})

	select {}
}
