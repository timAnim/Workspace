package rmq

import (
	"context"
	"github.com/streadway/amqp"
)

type Channel struct {
	*amqp.Channel
	confirming bool
	p          *chFactory
}

func (ch *Channel) Confirm(noWait bool) error {
	ch.confirming = true
	return ch.Channel.Confirm(noWait)
}

func (ch *Channel) Close() error {
	if ch.confirming {
		return ch.p.InvalidateObject(context.Background(), ch.Channel)
	}
	return ch.p.ReturnObject(context.Background(), ch.Channel)
}
