package handler

import (
	"context"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetTCPAddrs 获取 TCP 地址列表
func (s *Server) GetTCPAddrs(ctx context.Context, req *modbusPb.GetTCPAddrReq) (*modbusPb.GetTCPAddrResp, error) {
	return &modbusPb.GetTCPAddrResp{
		Addrs: s.modbusTCPAddrs,
	}, nil
}
