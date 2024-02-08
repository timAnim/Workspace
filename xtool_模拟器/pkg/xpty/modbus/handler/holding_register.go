package handler

import (
	"context"
	"fmt"
	"strconv"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetHoldingRegisters 获取输入寄存器数据列表
func (s *Server) GetHoldingRegisters(ctx context.Context, req *modbusPb.Paging) (*modbusPb.GetHoldingRegisterResp, error) {

	begin, end, err := getRange(req)
	if err != nil {
		return &modbusPb.GetHoldingRegisterResp{}, err
	}

	wrs := make([]*modbusPb.WordRegister, 0, end-begin)
	for i := begin; i < end; i++ {
		wrs = append(wrs, s.getHoldingWordRegister(i))
	}

	return &modbusPb.GetHoldingRegisterResp{
		List:  wrs,
		Index: req.Index,
		Size:  req.Size,
		Total: 65536,
	}, nil
}

// SetHoldingRegister 设置输入寄存器
func (s *Server) SetHoldingRegister(ctx context.Context, req *modbusPb.SetHoldingRegisterReq) (*modbusPb.SetHoldingRegisterResp, error) {
	defer s.saveConf()

	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.SetHoldingRegisterResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	switch req.Field {
	case "hex":
		v, err := strconv.ParseUint(req.Value, 16, 64)
		if err != nil {
			return &modbusPb.SetHoldingRegisterResp{}, err
		}
		if v > 65535 {
			return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("hex '%s' value %d is out of range", req.Value, v)
		}
		s.HoldingRegisters[int(addr)] = uint16(v)
	case "ubint16":
		v, err := strconv.ParseUint(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetHoldingRegisterResp{}, err
		}
		if v > 65535 {
			return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("ubint16 '%s' value %d is out of range", req.Value, v)
		}
		s.HoldingRegisters[int(addr)] = uint16(v)
	case "ulint16":
		v, err := strconv.ParseUint(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetHoldingRegisterResp{}, err
		}

		if v > 65535 {
			return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("ulint16 '%s' value %d is out of range", req.Value, v)
		}

		s.HoldingRegisters[int(addr)] = SwapUBytes(uint16(v))
	case "sbint16":
		v, err := strconv.ParseInt(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetHoldingRegisterResp{}, err
		}
		if v < -32768 || v > 32767 {
			return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("sbint16 '%s' value %d is out of range", req.Value, v)
		}
		s.HoldingRegisters[int(addr)] = Sint16toUint16(int16(v))

	case "slint16":
		v, err := strconv.ParseInt(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetHoldingRegisterResp{}, err
		}
		if v < -32768 || v > 32767 {
			return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("slint16 '%s' value %d is out of range", req.Value, v)
		}

		s.HoldingRegisters[int(addr)] = SwapUBytes(Sint16toUint16(int16(v)))
	default:
		return &modbusPb.SetHoldingRegisterResp{}, fmt.Errorf("unsupported field '%s'", req.Field)
	}

	return &modbusPb.SetHoldingRegisterResp{
		Info: s.getHoldingWordRegister(int(addr)),
	}, nil
}

// SetHoldingRange 设置输入寄存器范围
func (s *Server) SetHoldingRange(ctx context.Context, req *modbusPb.SetHoldingRangeReq) (*modbusPb.SetHoldingRangeResp, error) {
	defer s.saveConf()

	if req.Min >= req.Max {
		return &modbusPb.SetHoldingRangeResp{}, fmt.Errorf("range min %d bigger than max %d", req.Min, req.Max)
	}

	if req.Addr == "" {
		for i := 0; i < 65536; i++ {
			s.HoldingRangeMin[i] = int(req.Min)
			s.HoldingRangeMax[i] = int(req.Max)
		}
		return &modbusPb.SetHoldingRangeResp{
			Info: s.getHoldingWordRegister(0),
		}, nil
	}

	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.SetHoldingRangeResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.SetHoldingRangeResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	s.HoldingRangeMin[addr] = int(req.Min)
	s.HoldingRangeMax[addr] = int(req.Max)

	return &modbusPb.SetHoldingRangeResp{
		Info: s.getHoldingWordRegister(int(addr)),
	}, nil
}

// HoldingRegisterCtrl 设置输入寄存器范围
func (s *Server) HoldingRegisterCtrl(ctx context.Context, req *modbusPb.HoldingRegisterCtrlReq) (*modbusPb.HoldingRegisterCtrlResp, error) {
	defer s.saveConf()

	if req.Addr == "" {
		for i := 0; i < 65536; i++ {
			s.HoldingRandom[i] = req.Random
		}
		return &modbusPb.HoldingRegisterCtrlResp{
			Info: s.getHoldingWordRegister(0),
		}, nil
	}
	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.HoldingRegisterCtrlResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.HoldingRegisterCtrlResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	s.HoldingRandom[addr] = req.Random

	return &modbusPb.HoldingRegisterCtrlResp{
		Info: s.getHoldingWordRegister(int(addr)),
	}, nil
}

func (s *Server) getHoldingWordRegister(addr int) *modbusPb.WordRegister {
	v := s.HoldingRegisters[addr]
	b := UBInt16Encode(v)
	wr := &modbusPb.WordRegister{
		Addr:    fmt.Sprintf("%04X", addr),
		Hex:     fmt.Sprintf("%04X", v),
		Ubint16: uint32(UBInt16Decode(b)),
		Ulint16: uint32(ULInt16Decode(b)),
		Sbint16: int32(SBInt16Decode(b)),
		Slint16: int32(SLInt16Decode(b)),
		Min:     int32(s.HoldingRangeMin[addr]),
		Max:     int32(s.HoldingRangeMax[addr]),
		Random:  s.HoldingRandom[addr],
	}
	return wr
}
