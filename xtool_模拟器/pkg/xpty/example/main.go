package main

import (
	"fmt"

	"github.com/creack/pty"
	"github.com/tamago-cn/mbserver"
)

func main() {
	master, slave, err := pty.Open()
	if err != nil {
		fmt.Println(err)
		return
	}
	defer slave.Close()
	defer master.Close()

	fmt.Println(slave.Name())

	for {
		b := make([]byte, 512)
		n, err := master.Read(b)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("master recv: ", n, mbserver.FormatBytes(b[:n]))

		for {
			if b[n-1] == 0x0A && b[n-2] == 0x0D {
				n -= 2
			} else {
				break
			}
		}
		x, err := master.Write(b[:n])
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("master send: ", x)
	}
}
