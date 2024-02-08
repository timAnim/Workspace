package modbus

import (
	"github.com/tamago-cn/mbserver"

	log "github.com/sirupsen/logrus"
)

// RTUSimulator modbus RTU 模拟器
func RTUSimulator(count int) {
	Simulator(func(srv *mbserver.Server) ([]string, error) {
		slaves := make([]string, count)

		for i := 0; i < count; i++ {
			slave, err := srv.ListenPTY()
			if err != nil {
				log.Errorf("srv.ListenPTY error: %s", err.Error())
				return slaves, err
			}
			slaves[i] = slave.Name()
		}
		return slaves, nil
	})
}
