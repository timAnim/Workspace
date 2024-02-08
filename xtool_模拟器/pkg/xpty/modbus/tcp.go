package modbus

import (
	"github.com/tamago-cn/mbserver"

	log "github.com/sirupsen/logrus"
)

// TCPSimulator modbus TCP 模拟器
func TCPSimulator(addr string) {
	Simulator(func(srv *mbserver.Server) ([]string, error) {
		slaves := make([]string, 1)

		err := srv.ListenTCP(addr)
		if err != nil {
			log.Errorf("srv.ListenTCP error: %s", err.Error())
			return slaves, err
		}
		slaves[0] = addr
		return slaves, nil
	})
}
