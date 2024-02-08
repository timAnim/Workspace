package auc

import (
	"errors"
	"fmt"
	"strings"
	"xtool/pkg/rmq"
	"xtool/pkg/types"

	uuid "github.com/satori/go.uuid"
	"github.com/streadway/amqp"
)

// MQClient mq 客户端
type MQClient struct {
	Addr   string `json:"addr"`
	User   string `json:"user"`
	Passwd string `json:"passwd"`

	Exchange string `json:"exchange"`
	Topic    string `json:"topic"`

	Queue   string `json:"queue"`
	AutoDel bool   `json:"auto_del"`

	mqc *rmq.Client
}

// Connect 连接 rabbitmq
func (c *MQClient) Connect() error {
	vs := strings.Split(c.Addr, ":")
	if len(vs) == 1 {
		c.Addr += ":5672"
	}
	uri := fmt.Sprintf("amqp://%s:%s@%s", c.User, c.Passwd, c.Addr)
	mqc, err := rmq.Dial(uri)
	if err != nil {
		return err
	}
	c.mqc = mqc
	return nil
}

// Disconnect 断开连接 rabbitmq
func (c *MQClient) Disconnect() error {
	if c.mqc != nil {
		return c.mqc.Close()
	}
	return nil
}

func decodeWrapper(encoding string, fn func([]byte) error) func([]byte) error {
	d, err := rmq.NewContentDecoder(encoding)
	if err != nil {
		return func([]byte) error { return err }
	}
	return func(in []byte) error {
		out, err := d.Decode(in)
		if err != nil {
			return err
		}
		return fn(out)
	}
}

// Consume 数据消费
func (c *MQClient) Consume(cb func([]byte) error) error {
	if c.mqc == nil {
		return errors.New("rabbitmq not connected")
	}

	err := c.mqc.DeclareExchange(&rmq.Exchange{
		Name:    c.Exchange,
		Type:    "topic",
		Durable: true,
		AutoDel: false,
	})
	if err != nil {
		return err
	}

	if c.Queue == "" {
		c.Queue = fmt.Sprintf("x.%s", uuid.NewV4().String())
	}
	qConf := &rmq.Queue{
		Name:    c.Queue,
		Durable: false,
		AutoDel: c.AutoDel,
	}

retry:
	q, err := c.mqc.DeclareQueue(qConf)
	if err != nil {
		if strings.Contains(err.Error(), "arg 'auto_delete'") {
			qConf.AutoDel = !qConf.AutoDel
			goto retry
		} else if strings.Contains(err.Error(), "arg 'durable'") {
			qConf.Durable = !qConf.Durable
			goto retry
		}
		return err
	}

	if err := c.mqc.DeclareBinding(q.Name, c.Topic, c.Exchange); err != nil {
		return err
	}

	consumer := c.mqc.NewConsumer(q.Name, rmq.Nack(true), rmq.Qos(1))
	defer consumer.Close()
	consumer.AddHandler(func(delivery rmq.Delivery) error {
		return decodeWrapper(delivery.ContentEncoding, cb)(delivery.Payload)
	})
	select {}
}

// Publish 数据发布
func (c *MQClient) Publish(data string) error {
	if c.mqc == nil {
		return errors.New("rabbitmq not connected")
	}

	return c.mqc.Publish(c.Exchange, c.Topic, amqp.Publishing{
		Body: []byte(data),
	})
}

// PublishValue 数据发布
func (c *MQClient) PublishValue(resourceID string, value string) error {
	if c.mqc == nil {
		return errors.New("rabbitmq not connected")
	}

	d := types.M{
		"value_source": "strategy",
		"values": []types.M{
			types.M{
				"resource_id": resourceID,
				"value":       value,
			},
		},
	}

	return c.mqc.Publish(c.Exchange, c.Topic, amqp.Publishing{
		Body: []byte(d.String()),
	})
}
