package pub

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"xtool/pkg/reg"
	"xtool/pkg/rmq"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("amqp", "mq_replay", Replay, "重播MQ数据", `mq_replay <host> <exchange> <routingKey> <recFile>`, []*reg.Param{
		&reg.Param{Name: "recFile", Type: "string", Necessity: true, Desc: "要重现的数据文件"},
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1"},
		&reg.Param{Name: "exchange", Type: "string", Necessity: true, Desc: "交换机"},
		&reg.Param{Name: "routingKey", Type: "string", Necessity: true, Desc: "路由键"},
	})

	reg.Regist("amqp", "set_publish_mq_auth", SetPublishMQAuth, "设置发布端MQ用户名密码", `set_publish_mq_auth <username> <password>`, []*reg.Param{
		&reg.Param{Name: "username", Type: "string", Necessity: true, Desc: "用户名"},
		&reg.Param{Name: "password", Type: "string", Necessity: true, Desc: "密码"},
	})
}

var (
	user   = "guest"
	passwd = "guest"
)

// SetPublishMQAuth 设置发布端MQ用户名密码
func SetPublishMQAuth(username string, password string) {
	user = username
	passwd = password
	log.Infof("set publish mq auth: '%s:%s'", username, password)
}

// Replay 重播MQ数据
func Replay(recFile string, host string, exchange string, routingKey string) {
	publisher, err := newPublisher(host, exchange, routingKey)
	if err != nil {
		log.Errorf("new publisher error: %s", err.Error())
		return
	}

	f, err := os.Open(recFile)
	if err != nil {
		log.Errorf("open record file '%s' error: %s", recFile, err.Error())
		return
	}
	defer f.Close()
	reader := bufio.NewReader(f)
	for {
		line, _, err := reader.ReadLine()
		if err != nil {
			break
		}
		err = publisher.Publish(line)
		if err != nil {
			log.Errorf("publish '%s' error: %s", string(line), err.Error())
			continue
		}
		log.Infof("publish '%s' success", string(line))
	}
}

func newPublisher(host, exchange, topic string) (rmq.Publisher, error) {
	if host == "" {
		host = "127.0.0.1:5672"
	}
	if vs := strings.Split(host, ":"); len(vs) == 1 {
		host = host + ":5672"
	}

	uri := fmt.Sprintf("amqp://%s:%s@%s", user, passwd, host)

	c, err := rmq.Dial(uri)
	if err != nil {
		return nil, err
	}

	err = c.DeclareExchange(&rmq.Exchange{
		Name:    exchange,
		Type:    "topic",
		Durable: true,
		AutoDel: false,
	})
	if err != nil {
		return nil, err
	}
	return c.NewPublisher(exchange, topic, rmq.Ack(true), rmq.PoolSize(1)), nil
}
