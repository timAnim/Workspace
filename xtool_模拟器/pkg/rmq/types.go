package rmq

import (
	"context"
	"errors"
	"github.com/streadway/amqp"
	"time"
)

var (
	ErrClosed           = amqp.ErrClosed
	ErrDeadlineExceeded = context.DeadlineExceeded
	ErrCanceled         = context.Canceled
	ErrTypeAssert       = errors.New("unexpected type")
	ErrRejected         = errors.New("rejected")
	ErrEmpty            = errors.New("empty")
)

type Exchange struct {
	Name    string `json:"name"`
	Type    string `json:"type"`
	Durable bool   `json:"durable"`
	AutoDel bool   `json:"auto_del"`
}

type Queue struct {
	Name    string `json:"name"`
	Durable bool   `json:"durable"`
	AutoDel bool   `json:"auto_del"`
	TTL     int    `json:"ttl"`
}

type Config struct {
	Url             string   `json:"url"`
	Exchange        Exchange `json:"exchange"`
	Queue           Queue    `json:"queue"`
	ContentEncoding string   `json:"content_encoding"`
	RoutingKey      string   `json:"routing_key"`
	NoACK           bool     `json:"no_ack"`
}

type MIME string

const (
	MIMEJSON     MIME = "application/json"
	MIMEXML      MIME = "application/xml"
	MIMEPlain    MIME = "text/plain"
	MIMEProtobuf MIME = "application/x-protobuf"
)

type Delivery struct {
	ContentType     MIME
	ContentEncoding string
	MessageId       string
	Timestamp       time.Time
	Type            string
	UserId          string
	AppId           string
	Payload         []byte
}
