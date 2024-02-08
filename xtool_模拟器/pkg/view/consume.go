package view

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/rmq"

	log "github.com/sirupsen/logrus"
	"github.com/tidwall/gjson"
)

func init() {
	reg.Regist("amqp", "view", Consume, "显示MQ数据", `view <host> <exchange> <routingKey>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1"},
		&reg.Param{Name: "exchange", Type: "string", Necessity: true, Desc: "交换机"},
		&reg.Param{Name: "routingKey", Type: "string", Necessity: true, Desc: "路由键"},
		&reg.Param{Name: "queue", Type: "string", Necessity: false, Desc: "队列名, 不提供则另建队列"},
	})
	reg.Regist("amqp", "viewevent", ConsumeEvent, "订阅MQ事件", `viewevent <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1"},
	})
	reg.Regist("amqp", "viewvalue", ConsumeValue, "订阅MQ数据", `viewvalue <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1"},
	})
	reg.Regist("amqp", "mq_record", Record, "记录MQ数据到文件", `mq_record <recFile> <host> <exchange> <routingKey>`, []*reg.Param{
		&reg.Param{Name: "recFile", Type: "string", Necessity: true, Desc: "要记录的文件"},
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "MQ服务器地址，默认 127.0.0.1"},
		&reg.Param{Name: "exchange", Type: "string", Necessity: true, Desc: "交换机"},
		&reg.Param{Name: "routingKey", Type: "string", Necessity: true, Desc: "路由键"},
		&reg.Param{Name: "queue", Type: "string", Necessity: false, Desc: "队列名, 不提供则另建队列"},
	})
	reg.Regist("amqp", "set_consume_mq_auth", SetConsumeMQAuth, "设置消费端MQ用户名密码", `set_consume_mq_auth <username> <password>`, []*reg.Param{
		&reg.Param{Name: "username", Type: "string", Necessity: true, Desc: "用户名"},
		&reg.Param{Name: "password", Type: "string", Necessity: true, Desc: "密码"},
	})
	reg.Regist("amqp", "set_consume_decoder", SetConsumeDecoder, "设置消费格式化", `set_consume_decoder <name>`, []*reg.Param{
		&reg.Param{Name: "name", Type: "string", Necessity: true, Desc: "格式化方案，可选 json"},
	})
	reg.Regist("amqp", "base64_encode", Base64Encode, "base64编码", `base64_encode <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "base64编码"},
	})
	reg.Regist("amqp", "base64_decode", Base64Decode, "base64解码", `base64_decode <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "base64解码"},
	})
}

// Base64Encode base64编码
func Base64Encode(filename string) {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Errorf("ioutil.ReadFile '%s' error: %s", filename, err.Error())
		return
	}
	fmt.Println(base64.StdEncoding.EncodeToString(b))
}

// Base64Decode base64解码
func Base64Decode(filename string) {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Errorf("ioutil.ReadFile '%s' error: %s", filename, err.Error())
		return
	}
	bs, err := base64.StdEncoding.DecodeString(string(b))
	if err != nil {
		log.Errorf("base64.StdEncoding.DecodeString error: %s", err.Error())
		return
	}
	fmt.Println(string(bs))
}

func textDecoder(in []byte) []byte {
	return in
}

func jsonDecoder(in []byte) []byte {
	x := define.M{}
	x.FromString(string(in))
	return []byte(x.String())
}

var consumeDecoder = textDecoder

// SetConsumeDecoder 设置消费格式化
func SetConsumeDecoder(name string) {
	switch name {
	case "json":
		consumeDecoder = jsonDecoder
	default:
		consumeDecoder = textDecoder
	}
	log.Infof("set_consume_decoder to '%s' success", name)
}

func decodeWrapper(encoding string, fn func([]byte) error) func([]byte) error {
	d, err := rmq.NewContentDecoder(encoding)
	if err != nil {
		return func([]byte) error { return err }
	}
	return func(in []byte) error {
		out, err := d.Decode(in)
		if err != nil {
			log.Errorf("consume decode error: %s", err.Error())
			return err
		}
		return fn(consumeDecoder(out))
	}
}

// SetConsumeMQAuth 设置消费端MQ用户名密码
func SetConsumeMQAuth(username string, password string) {
	user = username
	passwd = password
	log.Infof("set consume mq auth: '%s:%s'", username, password)
}

// Consume 订阅通用数据
func Consume(host string, exchange string, routingKey string, queue string) {
	Subscribe(host, exchange, routingKey, queue, func(body []byte) error {
		fmt.Println(string(body))
		return nil
	})
}

// ConsumeEvent 订阅事件数据
func ConsumeEvent(host string) {
	Subscribe(host, "fss_exchange", "fss.event.#", "", func(body []byte) error {
		event := define.M{}
		err := json.Unmarshal([]byte(gjson.Get(string(body), "args.data").String()), &event)
		if err != nil {
			return err
		}
		fmt.Println(event["guid"], event["resource_id"], event["content"], event["event_source"])
		return nil
	})
}

// ConsumeValue 订阅实时值数据
func ConsumeValue(host string) {
	Subscribe(host, "fss_exchange", "fss.value.#", "", func(body []byte) error {
		value := define.M{}
		err := json.Unmarshal([]byte(gjson.Get(string(body), "args.data").String()), &value)
		if err != nil {
			return err
		}
		fmt.Println(value["device"])
		for _, v := range value["spots"].([]interface{}) {
			fmt.Println(v)
		}
		return nil
	})
}

// Record 记录MQ数据
func Record(recFile string, host string, exchange string, routingKey string, queue string) {
	f, err := os.Create(recFile)
	if err != nil {
		log.Errorf("create record file '%s' error: %s", recFile, err.Error())
		return
	}
	defer f.Close()
	Subscribe(host, exchange, routingKey, queue, func(body []byte) error {
		fmt.Println(string(body))
		_, err := f.WriteString(strings.Replace(string(body), "\n", "\\n", -1) + "\n")
		if err != nil {
			log.Errorf("write message to file '%s' error: %s", recFile, err.Error())
			return err
		}
		return nil
	})
}
