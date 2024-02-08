package main

import (
	"flag"
	"fmt"
	"xtool/pkg/rmq"
	"net/http"
	_ "net/http/pprof"
)

const (
	TestExchange = "rmq_test_exchange"
	TestKey      = "rmq_test_key"
	TestQueue    = "rmq_test_queue"
	TestPayload  = "test 123456789"
)

var (
	size = flag.Int("size", 128, "handle size")
	addr = flag.String("addr", "192.168.20.137", "addr")
)

func main() {
	flag.Parse()
	TestUrl := "amqp://guest:guest@" + *addr + ":5672"

	go func() {
		http.ListenAndServe(":9989", nil)
	}()

	clt, err := rmq.Dial(TestUrl)
	if err != nil {
		panic(err)
	}

	c := clt.NewConsumer(TestQueue, rmq.Nack(false), rmq.Qos(3))
	for i := 0; i < *size; i++ {
		c.AddHandler(handler)
	}

	select {}
}

func handler(delivery rmq.Delivery) error {
	if string(delivery.Payload) != TestPayload {
		fmt.Println(string(delivery.Payload) + "!=" + TestPayload)
	}
	return nil
}
