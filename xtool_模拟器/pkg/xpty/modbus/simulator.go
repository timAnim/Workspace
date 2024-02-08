package modbus

import (
	"context"
	"fmt"
	"math/rand"
	"sync"
	"time"

	"github.com/gizak/termui/v3"
	ui "github.com/gizak/termui/v3"
	"github.com/gizak/termui/v3/widgets"
	"github.com/tamago-cn/mbserver"

	log "github.com/sirupsen/logrus"
)

// Simulator modbus 模拟器
func Simulator(fn func(*mbserver.Server) ([]string, error)) {
	srv := mbserver.NewServer()
	defer srv.Close()

	inputCh := make(chan bool)
	holdCh := make(chan bool)
	inputStep := 1
	holdStep := 1

	mX := 0
	mY := 0

	holdAutoInc := func() {
		ticker := time.NewTicker(1 * time.Second)
		for {
			select {
			case <-holdCh:
				return
			case <-ticker.C:
				for i := 0; i < len(srv.HoldingRegisters); i++ {
					srv.HoldingRegisters[i] = uint16(int(srv.HoldingRegisters[i]) + holdStep)
				}
			}
		}
	}

	setHoldValue := func() {
		for i := 0; i < len(srv.HoldingRegisters); i++ {
			srv.HoldingRegisters[i] = uint16(int(srv.HoldingRegisters[i]) + holdStep)
		}
	}

	inputAutoInc := func() {
		ticker := time.NewTicker(1 * time.Second)
		for {
			select {
			case <-inputCh:
				return
			case <-ticker.C:
				for i := 0; i < len(srv.InputRegisters); i++ {
					srv.InputRegisters[i] = uint16(int(srv.InputRegisters[i]) + inputStep)
				}
			}
		}
	}

	setInputValue := func() {
		for i := 0; i < len(srv.InputRegisters); i++ {
			srv.InputRegisters[i] = uint16(int(srv.InputRegisters[i]) + inputStep)
		}
	}

	if err := ui.Init(); err != nil {
		log.Fatalf("failed to initialize termui: %v", err)
	}
	defer ui.Close()

	slaves, err := fn(srv)
	if err != nil {
		log.Errorf("srv.Listen error: %s", err.Error())
		return
	}

	// add base info
	{
		table := widgets.NewTable()

		table.TextStyle = ui.NewStyle(ui.ColorWhite)
		table.RowSeparator = true
		table.BorderStyle = ui.NewStyle(ui.ColorGreen)
		table.SetRect(0, 0, 35, 25)
		table.FillRow = true

		table.Rows = make([][]string, len(slaves)+1)
		table.Rows[0] = []string{"ports"}

		for i, slave := range slaves {
			table.Rows[i+1] = []string{slave}
		}

		ui.Render(table)
	}

	coilLow := byte(0)
	coilHigh := byte(255)
	coilRandStatus := "|>"
	coilCh := make(chan bool)

	coilRand := func() {
		ticker := time.NewTicker(5 * time.Second)
		for {
			select {
			case <-coilCh:
				return
			case <-ticker.C:
				r := int(coilHigh - coilLow)
				for i := 0; i < len(srv.Coils); i++ {
					srv.Coils[i] = byte(int(coilLow) + rand.Intn(r))
				}
			}
		}
	}

	coilCtrlTable := widgets.NewTable()
	{

		coilCtrlTable.TextStyle = ui.NewStyle(ui.ColorWhite)
		coilCtrlTable.RowSeparator = true
		coilCtrlTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
		coilCtrlTable.SetRect(35, 49, 70, 54)
		coilCtrlTable.ColumnWidths = []int{2, 4, 2, 11, 2, 4, 2}
		coilCtrlTable.FillRow = true
		coilCtrlTable.TextAlignment = ui.AlignCenter

		coilCtrlTable.Rows = make([][]string, 2)
		coilCtrlTable.Rows[0] = []string{"", "下限", "", "随机", "", "上限", ""}
		coilCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", coilLow), "+", coilRandStatus, "-", fmt.Sprintf("%d", coilHigh), "+"}
		ui.Render(coilCtrlTable)
	}

	dInputLow := byte(0)
	dInputHigh := byte(255)
	dInputRandStatus := "|>"
	dInputCh := make(chan bool)

	dInputRand := func() {
		ticker := time.NewTicker(5 * time.Second)
		for {
			select {
			case <-dInputCh:
				return
			case <-ticker.C:
				r := int(dInputHigh - dInputLow)
				for i := 0; i < len(srv.DiscreteInputs); i++ {
					srv.DiscreteInputs[i] = byte(int(dInputLow) + rand.Intn(r))
				}
			}
		}
	}

	dInputCtrlTable := widgets.NewTable()
	{

		dInputCtrlTable.TextStyle = ui.NewStyle(ui.ColorWhite)
		dInputCtrlTable.RowSeparator = true
		dInputCtrlTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
		dInputCtrlTable.SetRect(70, 49, 105, 54)
		dInputCtrlTable.ColumnWidths = []int{2, 4, 2, 11, 2, 4, 2}
		dInputCtrlTable.FillRow = true
		dInputCtrlTable.TextAlignment = ui.AlignCenter

		dInputCtrlTable.Rows = make([][]string, 2)
		dInputCtrlTable.Rows[0] = []string{"", "下限", "", "随机", "", "上限", ""}
		dInputCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", dInputLow), "+", dInputRandStatus, "-", fmt.Sprintf("%d", dInputHigh), "+"}
		ui.Render(dInputCtrlTable)
	}

	inputLow := uint16(0)
	inputHigh := uint16(65535)
	inputRandStatus := "|>"
	//inputCh := make(chan bool)

	inputRand := func() {
		ticker := time.NewTicker(5 * time.Second)
		for {
			select {
			case <-inputCh:
				return
			case <-ticker.C:
				r := int(inputHigh - inputLow)
				for i := 0; i < len(srv.Coils); i++ {
					srv.InputRegisters[i] = uint16(int(inputLow) + rand.Intn(r))
				}
			}
		}
	}

	inputCtrlTable := widgets.NewTable()
	{

		inputCtrlTable.TextStyle = ui.NewStyle(ui.ColorWhite)
		inputCtrlTable.RowSeparator = true
		inputCtrlTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
		inputCtrlTable.SetRect(105, 49, 140, 54)
		inputCtrlTable.ColumnWidths = []int{2, 6, 2, 7, 2, 6, 2}
		inputCtrlTable.FillRow = true
		inputCtrlTable.TextAlignment = ui.AlignCenter

		inputCtrlTable.Rows = make([][]string, 2)
		inputCtrlTable.Rows[0] = []string{"", "下限", "", "随机", "", "上限", ""}
		inputCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", inputLow), "+", inputRandStatus, "-", fmt.Sprintf("%d", inputHigh), "+"}
		ui.Render(inputCtrlTable)
	}

	holdLow := uint16(0)
	holdHigh := uint16(65535)
	holdRandStatus := "|>"
	//holdCh := make(chan bool)

	holdRand := func() {
		ticker := time.NewTicker(5 * time.Second)
		for {
			select {
			case <-holdCh:
				return
			case <-ticker.C:
				r := int(holdHigh - holdLow)
				for i := 0; i < len(srv.Coils); i++ {
					srv.HoldingRegisters[i] = uint16(int(holdLow) + rand.Intn(r))
				}
			}
		}
	}

	holdCtrlTable := widgets.NewTable()
	{

		holdCtrlTable.TextStyle = ui.NewStyle(ui.ColorWhite)
		holdCtrlTable.RowSeparator = true
		holdCtrlTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
		holdCtrlTable.SetRect(140, 49, 175, 54)
		holdCtrlTable.ColumnWidths = []int{2, 6, 2, 7, 2, 6, 2}
		holdCtrlTable.FillRow = true
		holdCtrlTable.TextAlignment = ui.AlignCenter

		holdCtrlTable.Rows = make([][]string, 2)
		holdCtrlTable.Rows[0] = []string{"", "下限", "", "随机", "", "上限", ""}
		holdCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", holdLow), "+", holdRandStatus, "-", fmt.Sprintf("%d", holdHigh), "+"}
		ui.Render(holdCtrlTable)
	}

	ctx, cancel := context.WithCancel(context.Background())
	ticker := time.NewTicker(1 * time.Second)

	wg := sync.WaitGroup{}
	defer wg.Wait()

	{

		go func() {
			wg.Add(1)
			defer wg.Done()

			infoTable := widgets.NewTable()
			{

				infoTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				infoTable.RowSeparator = true
				infoTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				infoTable.SetRect(0, 25, 35, 49)
				infoTable.FillRow = true
				infoTable.ColumnWidths = []int{5, 27}

				infoTable.Rows = make([][]string, 11)
				for i := 0; i < 10; i++ {
					infoTable.Rows[i] = []string{"", ""}
				}
				infoTable.Rows[0] = []string{"key", "用途"}
				infoTable.Rows[1] = []string{"w", fmt.Sprintf("输入步长+1, 当前值: %d", inputStep)}
				infoTable.Rows[2] = []string{"s", fmt.Sprintf("输入步长-1, 当前值: %d", inputStep)}
				infoTable.Rows[3] = []string{"e", fmt.Sprintf("锁存步长+1, 当前值: %d", holdStep)}
				infoTable.Rows[4] = []string{"d", fmt.Sprintf("锁存步长-1, 当前值: %d", holdStep)}
				infoTable.Rows[5] = []string{"r", "启动输入寄存器定时自增"}
				infoTable.Rows[6] = []string{"f", "停止输入寄存器定时自增"}
				infoTable.Rows[7] = []string{"t", "启动锁存寄存器定时自增"}
				infoTable.Rows[8] = []string{"g", "停止锁存寄存器定时自增"}
				infoTable.Rows[9] = []string{"x", "手动增加输入寄存器"}
				infoTable.Rows[10] = []string{"c", "手动增加锁存寄存器"}
				ui.Render(infoTable)
			}

			statusTable := widgets.NewTable()
			{

				statusTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				statusTable.RowSeparator = true
				statusTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				statusTable.SetRect(0, 49, 35, 54)
				statusTable.FillRow = true

				statusTable.Rows = make([][]string, 2)
				statusTable.Rows[0] = []string{"X", "Y"}
				statusTable.Rows[1] = []string{fmt.Sprintf("%d", mX), fmt.Sprintf("%d", mY)}
				ui.Render(statusTable)
			}

			coilTable := widgets.NewTable()
			nCoilReg := len(srv.Coils)
			{

				coilTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				coilTable.RowSeparator = true
				coilTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				coilTable.SetRect(35, 0, 70, 49)
				coilTable.ColumnWidths = []int{6, 6, 20}
				coilTable.FillRow = true

				coilTable.Rows = make([][]string, nCoilReg+2)
				coilTable.Rows[0] = []string{"", "线圈", "01"}
				coilTable.Rows[1] = []string{"addr", "data", "7 6 5 4 3 2 1 0"}
				ui.Render(coilTable)
			}

			dInputTable := widgets.NewTable()
			nDInputReg := len(srv.DiscreteInputs)
			{

				dInputTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				dInputTable.RowSeparator = true
				dInputTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				dInputTable.SetRect(70, 0, 105, 49)
				dInputTable.ColumnWidths = []int{6, 6, 20}
				dInputTable.FillRow = true

				dInputTable.Rows = make([][]string, nDInputReg+2)
				dInputTable.Rows[0] = []string{"", "离散量输入寄存器", "02"}
				dInputTable.Rows[1] = []string{"addr", "data", "7 6 5 4 3 2 1 0"}
				ui.Render(dInputTable)
			}

			inputTable := widgets.NewTable()
			nInputReg := len(srv.InputRegisters)
			{

				inputTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				inputTable.RowSeparator = true
				inputTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				inputTable.SetRect(105, 0, 140, 49)
				inputTable.FillRow = true

				inputTable.Rows = make([][]string, nInputReg+2)
				inputTable.Rows[0] = []string{"", "输入寄存器", "04"}
				inputTable.Rows[1] = []string{"addr", "data", "UBInt16"}
				ui.Render(inputTable)
			}

			holdTable := widgets.NewTable()
			nHoldReg := len(srv.HoldingRegisters)
			{

				holdTable.TextStyle = ui.NewStyle(ui.ColorWhite)
				holdTable.RowSeparator = true
				holdTable.BorderStyle = ui.NewStyle(ui.ColorGreen)
				holdTable.SetRect(140, 0, 175, 49)
				holdTable.FillRow = true

				holdTable.Rows = make([][]string, nHoldReg+2)
				holdTable.Rows[0] = []string{"", "锁存寄存器", "03"}
				holdTable.Rows[1] = []string{"addr", "data", "UBInt16"}
				ui.Render(holdTable)
			}

			for {
				select {
				case <-ctx.Done():
					return
				case <-ticker.C:
					// 刷新 infoTable
					infoTable.Rows[1] = []string{"w", fmt.Sprintf("输入步长+1, 当前值: %d", inputStep)}
					infoTable.Rows[2] = []string{"s", fmt.Sprintf("输入步长-1, 当前值: %d", inputStep)}
					infoTable.Rows[3] = []string{"e", fmt.Sprintf("锁存步长+1, 当前值: %d", holdStep)}
					infoTable.Rows[4] = []string{"d", fmt.Sprintf("锁存步长-1, 当前值: %d", holdStep)}

					ui.Render(infoTable)

					statusTable.Rows[1] = []string{fmt.Sprintf("%d", mX), fmt.Sprintf("%d", mY)}
					ui.Render(statusTable)

					// 刷新 线圈
					for i := 0; i < nCoilReg; i++ {
						index := i + 2
						v := srv.Coils[i]
						coilTable.Rows[index] = []string{
							fmt.Sprintf("%04X", i),
							fmt.Sprintf("%02X", v),
							fmt.Sprintf("%d %d %d %d %d %d %d %d", v>>7&1, v>>6&1, v>>5&1, v>>4&1, v>>3&1, v>>2&1, v>>1&1, v&1),
						}
					}
					ui.Render(coilTable)

					// 刷新 离散输入寄存器
					for i := 0; i < nDInputReg; i++ {
						index := i + 2
						v := srv.DiscreteInputs[i]
						dInputTable.Rows[index] = []string{
							fmt.Sprintf("%04X", i),
							fmt.Sprintf("%02X", v),
							fmt.Sprintf("%d %d %d %d %d %d %d %d", v>>7&1, v>>6&1, v>>5&1, v>>4&1, v>>3&1, v>>2&1, v>>1&1, v&1),
						}
					}

					ui.Render(dInputTable)

					// 刷新 输入寄存器
					for i := 0; i < nInputReg; i++ {
						index := i + 2
						inputTable.Rows[index] = []string{
							fmt.Sprintf("%04X", i),
							fmt.Sprintf("%04X", srv.InputRegisters[i]),
							fmt.Sprintf("%d", srv.InputRegisters[i]),
						}
					}
					ui.Render(inputTable)

					// 刷新 锁存表
					for i := 0; i < nHoldReg; i++ {
						index := i + 2
						holdTable.Rows[index] = []string{
							fmt.Sprintf("%04X", i),
							fmt.Sprintf("%04X", srv.HoldingRegisters[i]),
							fmt.Sprintf("%d", srv.HoldingRegisters[i]),
						}
					}
					ui.Render(holdTable)

				}
			}
		}()
	}

	uiEvents := ui.PollEvents()
	for {
		e := <-uiEvents
		switch e.Type {
		case termui.KeyboardEvent:
			switch e.ID {
			case "q", "<C-c>":
				cancel()
				return
			case "w":
				inputStep++
			case "s":
				inputStep--
			case "e":
				holdStep++
			case "d":
				holdStep--
			case "r":
				go inputAutoInc()
			case "f":
				inputCh <- true
			case "t":
				go holdAutoInc()
			case "g":
				holdCh <- true
			case "x":
				setInputValue()
			case "c":
				setHoldValue()
			}
		case termui.MouseEvent:
			switch e.ID {
			case "<MouseLeft>":
				me := e.Payload.(termui.Mouse)
				mX = me.X
				mY = me.Y
				{
					if mX >= 36 && mX <= 37 && mY == 52 && int(coilLow) > 0 {
						coilLow--
					}
					if mX >= 44 && mX <= 45 && mY == 52 && coilLow < coilHigh {
						coilLow++
					}
					if mX >= 59 && mX <= 60 && mY == 52 && coilLow < coilHigh {
						coilHigh--
					}
					if mX >= 67 && mX <= 68 && mY == 52 && int(coilHigh) < 255 {
						coilHigh++
					}
					if mX >= 47 && mX <= 57 && mY == 52 {
						if coilRandStatus == "|>" {
							coilRandStatus = "||"
							go coilRand()
						} else {
							coilRandStatus = "|>"
							coilCh <- true
						}
					}
					coilCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", coilLow), "+", coilRandStatus, "-", fmt.Sprintf("%d", coilHigh), "+"}
					ui.Render(coilCtrlTable)
				}
				{
					if mX >= 71 && mX <= 72 && mY == 52 && int(dInputLow) > 0 {
						dInputLow--
					}
					if mX >= 78 && mX <= 79 && mY == 52 && dInputLow < dInputHigh {
						dInputLow++
					}
					if mX >= 94 && mX <= 95 && mY == 52 && dInputLow < dInputHigh {
						dInputHigh--
					}
					if mX >= 102 && mX <= 103 && mY == 52 && int(dInputHigh) < 255 {
						dInputHigh++
					}
					if mX >= 82 && mX <= 92 && mY == 52 {
						if dInputRandStatus == "|>" {
							dInputRandStatus = "||"
							go dInputRand()
						} else {
							dInputRandStatus = "|>"
							dInputCh <- true
						}
					}
					dInputCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", dInputLow), "+", dInputRandStatus, "-", fmt.Sprintf("%d", dInputHigh), "+"}
					ui.Render(dInputCtrlTable)
				}
				{
					if mX >= 106 && mX <= 107 && mY == 52 && int(inputLow) > 0 {
						inputLow--
					}
					if mX >= 116 && mX <= 117 && mY == 52 && inputLow < inputHigh {
						inputLow++
					}
					if mX >= 127 && mX <= 128 && mY == 52 && inputLow < inputHigh {
						inputHigh--
					}
					if mX >= 137 && mX <= 138 && mY == 52 && int(inputHigh) < 65535 {
						inputHigh++
					}
					if mX >= 118 && mX <= 125 && mY == 52 {
						if inputRandStatus == "|>" {
							inputRandStatus = "||"
							go inputRand()
						} else {
							inputRandStatus = "|>"
							inputCh <- true
						}
					}
					inputCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", inputLow), "+", inputRandStatus, "-", fmt.Sprintf("%d", inputHigh), "+"}
					ui.Render(inputCtrlTable)
				}
				{
					if mX >= 141 && mX <= 142 && mY == 52 && int(holdLow) > 0 {
						holdLow--
					}
					if mX >= 150 && mX <= 152 && mY == 52 && holdLow < holdHigh {
						holdLow++
					}
					if mX >= 162 && mX <= 163 && mY == 52 && holdLow < holdHigh {
						holdHigh--
					}
					if mX >= 172 && mX <= 173 && mY == 52 && int(holdHigh) < 65535 {
						holdHigh++
					}
					if mX >= 154 && mX <= 160 && mY == 52 {
						if holdRandStatus == "|>" {
							holdRandStatus = "||"
							go holdRand()
						} else {
							holdRandStatus = "|>"
							holdCh <- true
						}
					}
					holdCtrlTable.Rows[1] = []string{"-", fmt.Sprintf("%d", holdLow), "+", holdRandStatus, "-", fmt.Sprintf("%d", holdHigh), "+"}
					ui.Render(holdCtrlTable)
				}
			}
		}
	}
}
