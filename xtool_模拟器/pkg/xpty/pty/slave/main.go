package main

import (
	"flag"
	"fmt"
	"time"

	"github.com/goburrow/modbus"
)

var slaveName = flag.Int("s", 8, "slave name")

func main() {
	flag.Parse()

	fname := fmt.Sprintf("/dev/pts/%d", *slaveName)
	//fp, err := os.Open(fname)
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//defer fp.Close()

	//fmt.Println("open file: ", fname)

	//go io.Copy(fp, os.Stdin)
	//io.Copy(os.Stdout, fp)
	//p, err := serial.Open(&serial.Config{
	//	Address:  fname,
	//	BaudRate: 9600,
	//})
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//handler := modbus.NewTCPClientHandler("localhost:1502")

	handler := modbus.NewRTUClientHandler(fname)
	// Connect manually so that multiple requests are handled in one session
	handler.SlaveId = 1
	err := handler.Connect()
	defer handler.Close()
	client := modbus.NewClient(handler)

	_, err = client.WriteMultipleRegisters(0, 3, []byte{0, 3, 0, 4, 0, 5})
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	for {
		results, err := client.ReadHoldingRegisters(0, 30)
		if err != nil {
			fmt.Printf("%v\n", err)
		}
		fmt.Printf("results %v\n", results)
		time.Sleep(1 * time.Second)
	}

}
