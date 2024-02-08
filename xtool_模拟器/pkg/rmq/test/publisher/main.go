package main

import (
	"context"
	"flag"
	"fmt"
	"xtool/pkg/rmq"
	"net/http"
	_ "net/http/pprof"
	"sync"
)

const (
	TestExchange = "rmq_test_exchange"
	TestKey      = "rmq_test_key"
	TestQueue    = "rmq_test_queue"
	TestPayload  = "test 123456789"
)

var (
	size = flag.Int("size", 128, "pool size")
	addr = flag.String("addr", "192.168.20.137", "addr")
)

func main() {
	flag.Parse()
	TestUrl := "amqp://guest:guest@" + *addr + ":5672"

	go func() {
		http.ListenAndServe(":9990", nil)
	}()

	clt, err := rmq.Dial(TestUrl)
	if err != nil {
		panic(err)
	}
	/*
		for i := 0; i < 100; i++ {
			p := clt.NewPublisher(TestExchange, TestKey, rmq.Ack(true), rmq.ContentType(rmq.MIMEJSON), rmq.PoolSize(*size))
			payload := []byte(TestPayload)

			wg := sync.WaitGroup{}

			for i := 0; i < 100; i++ {
				wg.Add(1)
				go func(i int) {
					defer wg.Done()

					for j := 0; j < 2; j++ {
						if err = p.PublishContext(context.Background(), payload); err != nil {
							fmt.Println(i, j, err)
							return
						}
					}
				}(i)
			}
			wg.Wait()

			p.Close()
		}
	*/
	p := clt.NewPublisher(TestExchange, TestKey, rmq.Ack(true), rmq.ContentType(rmq.MIMEJSON), rmq.PoolSize(*size))
	payload := []byte(TestPayload)

	wg := sync.WaitGroup{}

	for i := 0; i < 3000; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()

			for j := 0; j < 1000000; j++ {
				if err = p.PublishContext(context.Background(), payload); err != nil {
					fmt.Println(i, j, err)
					return
				}
			}
		}(i)
	}
	wg.Wait()
}
