package modbus

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"sync"
	"time"

	ui "github.com/gizak/termui/v3"
	"github.com/gizak/termui/v3/widgets"
	"github.com/goburrow/modbus"
	"github.com/goburrow/serial"
	"github.com/tamago-cn/mbserver"

	log "github.com/sirupsen/logrus"
)

// ParseSerialConfig 解析串口参数
func ParseSerialConfig(com string) *serial.Config {
	//type Config struct {
	//	// Device path (/dev/ttyS0)
	//	Address string
	//	// Baud rate (default 19200)
	//	BaudRate int
	//	// Data bits: 5, 6, 7 or 8 (default 8)
	//	DataBits int
	//	// Stop bits: 1 or 2 (default 1)
	//	StopBits int
	//	// Parity: N - None, E - Even, O - Odd (default E)
	//	// (The use of no parity requires 2 stop bits.)
	//	Parity string
	//	// Read (Write) timeout.
	//	Timeout time.Duration
	//	// Configuration related to RS485
	//	RS485 RS485Config
	//}
	// /dev/ttyS0,19200,8,1,E,1000
	conf := &serial.Config{
		Address:  "/dev/ttyS0",
		BaudRate: 19200,
		DataBits: 8,
		StopBits: 1,
		Parity:   "E",
	}
	vs := strings.Split(com, ",")
	if len(vs) >= 1 {
		conf.Address = vs[0]
	}
	if len(vs) >= 2 {
		v, err := strconv.Atoi(vs[1])
		if err != nil {
			v = 19200
		}
		conf.BaudRate = v
	}
	if len(vs) >= 3 {
		v, err := strconv.Atoi(vs[2])
		if err != nil {
			v = 8
		}
		conf.DataBits = v
	}
	if len(vs) >= 4 {
		v, err := strconv.Atoi(vs[3])
		if err != nil {
			v = 1
		}
		conf.StopBits = v
	}
	if len(vs) >= 5 {
		switch vs[4] {
		case "N", "E", "O":
			conf.Parity = vs[4]
		}
	}
	if len(vs) >= 6 {
		v, err := strconv.Atoi(vs[5])
		if err != nil {
			v = 1000
		}
		conf.Timeout = time.Duration(v) * time.Millisecond
	}
	return conf
}

// View modbus 浏览器
func View(com string, slaveAddr byte, addr int, quantity int) {
	conf := ParseSerialConfig(com)
	handler := modbus.NewRTUClientHandler(conf.Address)
	handler.Config = *conf
	handler.SlaveId = slaveAddr

	err := handler.Connect()
	if err != nil {
		log.Errorf("connect to %s error: %s", com, err.Error())
		return
	}
	defer handler.Close()
	client := modbus.NewClient(handler)

	if err := ui.Init(); err != nil {
		log.Fatalf("failed to initialize termui: %v", err)
	}
	defer ui.Close()

	wg := sync.WaitGroup{}
	defer wg.Wait()

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		wg.Add(1)
		defer wg.Done()

		ticker := time.NewTicker(1 * time.Second)
		table := widgets.NewTable()

		table.TextStyle = ui.NewStyle(ui.ColorWhite)
		table.RowSeparator = true
		table.BorderStyle = ui.NewStyle(ui.ColorGreen)
		table.SetRect(0, 0, 70, 50)
		table.FillRow = true

		table.Rows = make([][]string, quantity+1)
		table.Rows[0] = []string{"addr", "data", "value"}
		ui.Render(table)
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				results, err := client.ReadHoldingRegisters(uint16(addr), uint16(quantity))
				if err != nil {
					return
				}
				//nReg := len(results) / 2

				for i := 0; i < len(results); i += 2 {
					index := i/2 + 1
					v := strings.ReplaceAll(mbserver.FormatBytes(results[i:i+2]), " ", "")
					table.Rows[index] = []string{
						fmt.Sprintf("%04X", addr+index-1),
						v,
						v,
					}
				}
				ui.Render(table)
			}
		}
	}()

	uiEvents := ui.PollEvents()
	for {
		e := <-uiEvents
		switch e.ID {
		case "q", "<C-c>":
			cancel()
			return
		}
	}
}
