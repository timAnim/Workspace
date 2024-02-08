package rmq

import (
	"fmt"
	"net/http"
	_ "net/http/pprof"
	"sync"
	"testing"

	"github.com/streadway/amqp"
)

const (
	TestUrl      = "amqp://guest:guest@127.0.0.1:5672"
	TestExchange = "rmq_test_exchange"
	TestKey      = "rmq_test_key"
	TestQueue    = "rmq_test_queue"
	TestPayload  = "test 123456789"
)

var TestClt *Client

func init() {
	go func() {
		http.ListenAndServe(":9988", nil)
	}()

	clt, err := Dial(TestUrl)
	if err != nil {
		panic(err)
		return
	}
	TestClt = clt
	fmt.Println("NumActive", TestClt.tp.GetNumActive())
}

func TestClient_Channel(t *testing.T) {
	ch, err := TestClt.Channel()
	if err != nil {
		t.Error(err)
		return
	}
	defer ch.Close()
}

func TestClient_Declare(t *testing.T) {
	err := TestClt.Declare(&Queue{
		Name:    TestQueue,
		Durable: true,
		AutoDel: false,
	}, TestKey, &Exchange{
		Name:    TestExchange,
		Type:    "topic",
		Durable: true,
		AutoDel: false,
	})
	if err != nil {
		t.Error(err)
		return
	}
}

func TestClient_Publish(t *testing.T) {
	err := TestClt.Publish(TestExchange, TestKey, amqp.Publishing{
		Body: []byte(TestPayload),
	})
	if err != nil {
		t.Error(err)
		return
	}
}

func BenchmarkClient_Publish(b *testing.B) {
	for i := 0; i < b.N; i++ {
		err := TestClt.Publish(TestExchange, TestKey, amqp.Publishing{
			Body: []byte(TestPayload),
		})
		if err != nil {
			b.Error(err)
			return
		}
	}
}

func BenchmarkClient_PublishAsync(b *testing.B) {
	wg := sync.WaitGroup{}
	for i := 0; i < b.N; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()

			err := TestClt.Publish(TestExchange, TestKey, amqp.Publishing{
				Body: []byte(TestPayload),
			})
			if err != nil {
				b.Error(err)
				return
			}
		}()
	}
	wg.Wait()
}

func TestClient_Get(t *testing.T) {
	dlv, err := TestClt.Get(TestQueue)
	if err != nil {
		t.Error(err)
		return
	}
	if string(dlv.Body) != TestPayload {
		t.Error(string(dlv.Body), "!=", TestPayload)
		return
	}
}

func BenchmarkClient_Get(b *testing.B) {
	for i := 0; i < b.N; i++ {
		dlv, err := TestClt.Get(TestQueue)
		if err == ErrEmpty {
			return
		} else if err != nil {
			b.Error(err)
			return
		}
		if string(dlv.Body) != TestPayload {
			b.Error(string(dlv.Body), "!=", TestPayload)
			return
		}
	}
}

func BenchmarkClient_GetAsync(b *testing.B) {
	wg := sync.WaitGroup{}
	for i := 0; i < b.N; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()

			dlv, err := TestClt.Get(TestQueue)
			if err == ErrEmpty {
				return
			} else if err != nil {
				b.Log(err)
				return
			}
			if string(dlv.Body) != TestPayload {
				b.Error(string(dlv.Body), "!=", TestPayload)
				return
			}
		}()
	}
	wg.Wait()
}
