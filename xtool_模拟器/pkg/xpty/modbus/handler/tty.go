package handler

import (
	"context"
	"time"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetTTYAddrs 获取 RTU 串口地址列表
func (s *Server) GetTTYAddrs(ctx context.Context, req *modbusPb.GetTTYAddrReq) (*modbusPb.GetTTYAddrResp, error) {
	addrs := make([]*modbusPb.TTYAddr, 0, len(s.modbusTTYConfigs))

	for _, c := range s.modbusTTYConfigs {
		addrs = append(addrs, &modbusPb.TTYAddr{
			Addr:     c.Address,
			Baud:     int32(c.BaudRate),
			Databits: int32(c.DataBits),
			Stopbits: int32(c.StopBits),
			Parity:   c.Parity,
			Timeout:  int32(c.Timeout / time.Millisecond),
		})
	}

	return &modbusPb.GetTTYAddrResp{
		Addrs: addrs,
	}, nil
}
