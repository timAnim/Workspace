package handler

import (
	"context"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetRTUAddrs 获取 RTU 地址列表
func (s *Server) GetRTUAddrs(ctx context.Context, req *modbusPb.GetRTUAddrReq) (*modbusPb.GetRTUAddrResp, error) {
	return &modbusPb.GetRTUAddrResp{
		Addrs: s.modbusRTUAddrs,
	}, nil
}
