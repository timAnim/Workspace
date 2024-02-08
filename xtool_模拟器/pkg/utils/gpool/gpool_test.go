package gpool

import (
	"fmt"
	"testing"
)

func TestGPool(t *testing.T) {
	p := NewPool(5)

	go p.Run()

	for i := 0; i < 100; i++ {
		p.EntryC <- NewTask(func(x int) func() error {
			return func() error {
				fmt.Println(x)
				return nil
			}
		}(i))
	}
}
