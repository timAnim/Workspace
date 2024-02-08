package rmq

import (
	"fmt"
	"github.com/streadway/amqp"
	"os"
	"path/filepath"
	"strconv"
	"sync/atomic"
)

var consumerSeq uint64

func uniqueConsumerTag() string {
	return appTag() + "-" + strconv.FormatUint(atomic.AddUint64(&consumerSeq, 1), 10)
}

func appTag() string {
	hostname, _ := os.Hostname()
	return fmt.Sprintf("%s-%s-%d", hostname, filepath.Base(os.Args[0]), os.Getpid())
}

func cutDelivery(dlv *amqp.Delivery) Delivery {
	return Delivery{
		ContentType:     MIME(dlv.ContentType),
		ContentEncoding: dlv.ContentEncoding,
		MessageId:       dlv.MessageId,
		Timestamp:       dlv.Timestamp,
		Type:            dlv.Type,
		UserId:          dlv.UserId,
		AppId:           dlv.AppId,
		Payload:         dlv.Body,
	}
}

type logger struct{}

func (l *logger) Debug(args ...interface{}) {}
func (l *logger) Warn(args ...interface{})  {}
