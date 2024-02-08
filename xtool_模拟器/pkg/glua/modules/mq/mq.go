package mq

import (
	"errors"
	"fmt"
	"xtool/pkg/rmq"

	"xtool/pkg/glua/wrapper"

	"github.com/streadway/amqp"
	lua "github.com/yuin/gopher-lua"
)

// Loader 模块加载器
func Loader(L *lua.LState) int {
	// register functions to the table
	mod := L.SetFuncs(L.NewTable(), exports)
	// register other stuff
	L.SetField(mod, "name", lua.LString("mq module"))
	// returns the module
	L.Push(mod)
	return 1
}

var exports = wrapper.NewExports("mq", map[string]interface{}{
	"connect": Connect,
	"publish": Publish,
})

var mqc *rmq.Client

// Connect 连接 rabbitmq
func Connect(addr string, user string, passwd string) error {
	uri := fmt.Sprintf("amqp://%s:%s@%s", user, passwd, addr)
	c, err := rmq.Dial(uri)
	if err != nil {
		return err
	}
	mqc = c
	return nil
}

// Publish 数据发布
func Publish(exchange string, topic string, data string) error {
	if mqc == nil {
		return errors.New("rabbitmq not connected")
	}

	return mqc.Publish(exchange, topic, amqp.Publishing{
		Body: []byte(data),
	})
}
