package xpty

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"
	"xtool/pkg/reg"
	"xtool/pkg/xpty/comtcp"
	"xtool/pkg/xpty/modbus"

	log "github.com/sirupsen/logrus"
	"github.com/tamago-cn/mbserver"
)

func init() {
	reg.Regist("xpty", "modbus_simulator", ModbusSimulator, "启动 modbus 模拟器", `modbus_simulator <count>`, []*reg.Param{
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟串口数量，默认1"},
	})
	reg.Regist("xpty", "modbus_rtu_simulator", ModbusRTUSimulator, "启动 modbus rtu 模拟器", `modbus_rtu_simulator <count>`, []*reg.Param{
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟串口数量，默认1"},
	})
	reg.Regist("xpty", "modbus_rtu_simulator_on_tcp", ModbusRTUSimulatorOnTCP, "在TCP端口上 启动 modbus rtu 模拟器", `modbus_rtu_simulator_on_tcp <count>`, []*reg.Param{
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟串口数量，默认1"},
	})
	reg.Regist("xpty", "modbus_rtu_simulator_on_multi_tcp", ModbusRTUSimulatorOnMultiTCP, "在TCP端口上 启动 modbus rtu 模拟器，支持多连接", `modbus_rtu_simulator_on_multi_tcp <base> <count>`, []*reg.Param{
		&reg.Param{Name: "base", Type: "string", Necessity: true, Desc: "模拟端口基数，默认21000"},
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟串口数量，默认1"},
	})
	reg.Regist("xpty", "modbus_tcp_simulator", ModbusTCPSimulator, "启动 modbus rtu 模拟器", `modbus_tcp_simulator <addr>`, []*reg.Param{
		&reg.Param{Name: "addr", Type: "string", Necessity: true, Desc: "TCP服务地址，默认: 0.0.0.0:21000"},
	})
	reg.Regist("xpty", "modbus_scan", ModbusScan, "扫描 modbus 设备", `modbus_scan <com> <addr>`, []*reg.Param{
		&reg.Param{Name: "com", Type: "string", Necessity: true, Desc: "串口配置，默认: '/dev/ttyS0,19200,8,1,E,1000'，使用','分隔，按顺序分别表示: 串口地址, 波特率, 数据位, 停止位, 校验(N,E,O), 串口超时"},
		&reg.Param{Name: "slaveAddr", Type: "string", Necessity: true, Desc: "设备地址，十进制，默认 0"},
		&reg.Param{Name: "addr", Type: "string", Necessity: true, Desc: "基准地址，十六进制，默认 0000"},
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "寄存器数量，十进制，默认 10"},
	})
	reg.Regist("xpty", "com_to_tcp", ComToTCP, "串口透传", `com_to_tcp <com> <addr>`, []*reg.Param{
		&reg.Param{Name: "com", Type: "string", Necessity: true, Desc: "串口配置，默认: '/dev/ttyS0,19200,8,1,E,1000'，使用','分隔，按顺序分别表示: 串口地址, 波特率, 数据位, 停止位, 校验(N,E,O), 串口超时"},
		&reg.Param{Name: "addr", Type: "string", Necessity: true, Desc: "TCP 服务地址，默认 0.0.0.0:21000"},
	})
}

func formatBytes(in []byte) string {
	n := len(in)
	bs := make([]string, n)
	for i := 0; i < n; i++ {
		bs[i] = fmt.Sprintf("%02X", in[i])
	}
	return strings.Join(bs, " ")
}

func hexStrToBytes(in string) ([]byte, error) {
	in = strings.ReplaceAll(in, " ", "")
	n := len(in)
	if n%2 != 0 {
		return []byte{}, errors.New("hexStrToBytes error: input not valid hex string")
	}
	bs := make([]byte, n/2)
	for i := 0; i < n; i += 2 {
		b, err := strconv.ParseInt(in[i:i+2], 16, 16)
		if err != nil {
			return []byte{}, err
		}
		bs[i/2] = byte(b)
	}
	return bs, nil
}

// ModbusRTUSimulator modbus rtu 模拟器
func ModbusRTUSimulator(count string) {
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}
	modbus.RTUSimulator(c)
}

// ModbusTCPSimulator modbus TCP 模拟器
func ModbusTCPSimulator(addr string) {
	if addr == "" {
		addr = "0.0.0.0:21000"
	}
	modbus.TCPSimulator(addr)
}

// ModbusRTUSimulatorOnTCP modbus TCP 模拟器
func ModbusRTUSimulatorOnTCP(count string) {
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}
	modbus.RTUOnTCPSimulator(c)
}

// ModbusRTUSimulatorOnMultiTCP modbus TCP 模拟器，支持多连接
func ModbusRTUSimulatorOnMultiTCP(base string, count string) {
	b, err := strconv.Atoi(base)
	if err != nil {
		b = 21000
	}
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}
	modbus.MultiRTUOnTCPSimulator(b, c)
}

// ModbusSimulator 模拟器
func ModbusSimulator(count string) {
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}
	srv := mbserver.NewServer()
	defer srv.Close()
	for i := 0; i < c; i++ {
		slave, err := srv.ListenPTY()
		if err != nil {
			log.Errorf("srv.ListenPTY error: %s", err.Error())
			return
		}
		log.Infof("new pty slave: %s", slave.Name())
	}

	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)

	ticker := time.NewTicker(1 * time.Second)

	for {
		select {
		case x := <-ch:
			log.Infof("recv signal: %v", x)
			return
		case <-ticker.C:
			//log.Infof("%s refresh modbus registers", x.Format("2006-01-02 15:04:05"))
			for i := 0; i < len(srv.InputRegisters); i++ {
				srv.InputRegisters[i] = uint16(rand.Intn(100))
			}

			for i := 0; i < len(srv.HoldingRegisters); i++ {
				srv.HoldingRegisters[i] = uint16(rand.Intn(100))
			}
		}
	}
}

// ModbusScan modbus 扫描
func ModbusScan(com string, slaveAddr string, addr string, count string) {
	sa, err := strconv.ParseInt(slaveAddr, 10, 16)
	if err != nil {
		sa = 0
	}
	a, err := strconv.ParseInt(addr, 16, 32)
	if err != nil {
		a = 0
	}
	c, err := strconv.ParseInt(count, 10, 32)
	if err != nil {
		c = 10
	}
	modbus.View(com, byte(sa), int(a), int(c))
}

// ComToTCP 串口转TCP
func ComToTCP(com string, addr string) {
	conf := modbus.ParseSerialConfig(com)
	if addr == "" {
		addr = "0.0.0.0:21000"
	}

	c := comtcp.NewComTCP(comtcp.WithAddr(addr), comtcp.WithSerial(conf))
	if err := c.Init(); err != nil {
		log.Errorf("ComTCP Init error: %s", err.Error())
		return
	}
	log.Infof("start serve '%s' on '%s'", com, addr)
	if err := c.Serve(context.Background()); err != nil {
		log.Errorf("ComTCP Serve error: %s", err.Error())
		return
	}
}
