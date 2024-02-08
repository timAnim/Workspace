package modbus

import (
	"context"
	"fmt"
	"xtool/pkg/xpty/comtcp"

	"github.com/goburrow/serial"
	"github.com/tamago-cn/mbserver"

	log "github.com/sirupsen/logrus"
)

// RTUOnTCPSimulator modbus RTU 模拟器
func RTUOnTCPSimulator(count int) {
	Simulator(func(srv *mbserver.Server) ([]string, error) {
		ctx := context.Background()
		slaves := make([]string, count)
		for i := 0; i < count; i++ {
			slave, err := srv.ListenPTY()
			if err != nil {
				log.Errorf("srv.ListenPTY error: %s", err.Error())
				return slaves, err
			}
			addr := fmt.Sprintf("0.0.0.0:%d", 21000+i)
			c := comtcp.NewComTCP(comtcp.WithAddr(addr), comtcp.WithSerial(&serial.Config{
				Address: slave.Name(),
			}))
			if err := c.Init(); err != nil {
				log.Errorf("c.Init error: %s", err.Error())
				return slaves, err
			}

			slaves[i] = fmt.Sprintf("%s <--> %s", addr, slave.Name())

			go c.Serve(ctx)
		}
		return slaves, nil
	})
}

// MultiRTUOnTCPSimulator modbus RTU 模拟器
func MultiRTUOnTCPSimulator(base int, count int) {
	Simulator(func(srv *mbserver.Server) ([]string, error) {
		slaves := make([]string, count)
		for i := 0; i < count; i++ {
			addr := fmt.Sprintf("0.0.0.0:%d", base+i)
			err := srv.ListenRTUonTCP(addr)
			if err != nil {
				log.Errorf("srv.ListenRTUonTCP error: %s", err.Error())
				return slaves, err
			}

			slaves[i] = addr
		}
		return slaves, nil
	})
}
