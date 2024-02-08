package handler

import (
	"context"
	"fmt"
	"strconv"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetInputRegisters 获取输入寄存器数据列表
func (s *Server) GetInputRegisters(ctx context.Context, req *modbusPb.Paging) (*modbusPb.GetInputRegisterResp, error) {

	begin, end, err := getRange(req)
	if err != nil {
		return &modbusPb.GetInputRegisterResp{}, err
	}

	wrs := make([]*modbusPb.WordRegister, 0, end-begin)
	for i := begin; i < end; i++ {
		wrs = append(wrs, s.getInputWordRegister(i))
	}

	return &modbusPb.GetInputRegisterResp{
		List:  wrs,
		Index: req.Index,
		Size:  req.Size,
		Total: 65536,
	}, nil
}

// SetInputRegister 设置输入寄存器
func (s *Server) SetInputRegister(ctx context.Context, req *modbusPb.SetInputRegisterReq) (*modbusPb.SetInputRegisterResp, error) {
	defer s.saveConf()

	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.SetInputRegisterResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	switch req.Field {
	case "hex":
		v, err := strconv.ParseUint(req.Value, 16, 64)
		if err != nil {
			return &modbusPb.SetInputRegisterResp{}, err
		}
		if v > 65535 {
			return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("hex '%s' value %d is out of range", req.Value, v)
		}
		s.InputRegisters[int(addr)] = uint16(v)
	case "ubint16":
		v, err := strconv.ParseUint(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetInputRegisterResp{}, err
		}
		if v > 65535 {
			return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("ubint16 '%s' value %d is out of range", req.Value, v)
		}
		s.InputRegisters[int(addr)] = uint16(v)
	case "ulint16":
		v, err := strconv.ParseUint(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetInputRegisterResp{}, err
		}

		if v > 65535 {
			return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("ulint16 '%s' value %d is out of range", req.Value, v)
		}

		s.InputRegisters[int(addr)] = SwapUBytes(uint16(v))
	case "sbint16":
		v, err := strconv.ParseInt(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetInputRegisterResp{}, err
		}
		if v < -32768 || v > 32767 {
			return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("sbint16 '%s' value %d is out of range", req.Value, v)
		}
		s.InputRegisters[int(addr)] = Sint16toUint16(int16(v))

	case "slint16":
		v, err := strconv.ParseInt(req.Value, 10, 64)
		if err != nil {
			return &modbusPb.SetInputRegisterResp{}, err
		}
		if v < -32768 || v > 32767 {
			return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("slint16 '%s' value %d is out of range", req.Value, v)
		}

		s.InputRegisters[int(addr)] = SwapUBytes(Sint16toUint16(int16(v)))
	default:
		return &modbusPb.SetInputRegisterResp{}, fmt.Errorf("unsupported field '%s'", req.Field)
	}

	return &modbusPb.SetInputRegisterResp{
		Info: s.getInputWordRegister(int(addr)),
	}, nil
}

// SetInputRange 设置输入寄存器范围
func (s *Server) SetInputRange(ctx context.Context, req *modbusPb.SetInputRangeReq) (*modbusPb.SetInputRangeResp, error) {
	defer s.saveConf()

	if req.Min >= req.Max {
		return &modbusPb.SetInputRangeResp{}, fmt.Errorf("range min %d bigger than max %d", req.Min, req.Max)
	}

	if req.Addr == "" {
		for i := 0; i < 65536; i++ {
			s.InputRangeMin[i] = int(req.Min)
			s.InputRangeMax[i] = int(req.Max)
		}
		return &modbusPb.SetInputRangeResp{
			Info: s.getInputWordRegister(0),
		}, nil
	}

	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.SetInputRangeResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.SetInputRangeResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	s.InputRangeMin[addr] = int(req.Min)
	s.InputRangeMax[addr] = int(req.Max)

	return &modbusPb.SetInputRangeResp{
		Info: s.getInputWordRegister(int(addr)),
	}, nil
}

// InputRegisterCtrl 设置输入寄存器范围
func (s *Server) InputRegisterCtrl(ctx context.Context, req *modbusPb.InputRegisterCtrlReq) (*modbusPb.InputRegisterCtrlResp, error) {
	defer s.saveConf()

	if req.Addr == "" {
		for i := 0; i < 65536; i++ {
			s.InputRandom[i] = req.Random
		}
		return &modbusPb.InputRegisterCtrlResp{
			Info: s.getInputWordRegister(0),
		}, nil
	}
	addr, err := strconv.ParseUint(req.Addr, 16, 64)
	if err != nil {
		return &modbusPb.InputRegisterCtrlResp{}, err
	}
	if addr > 65535 {
		return &modbusPb.InputRegisterCtrlResp{}, fmt.Errorf("addr '%s' value %d is out of range", req.Addr, addr)
	}

	s.InputRandom[addr] = req.Random

	return &modbusPb.InputRegisterCtrlResp{
		Info: s.getInputWordRegister(int(addr)),
	}, nil
}

func (s *Server) getInputWordRegister(addr int) *modbusPb.WordRegister {
	v := s.InputRegisters[addr]
	b := UBInt16Encode(v)
	wr := &modbusPb.WordRegister{
		Addr:    fmt.Sprintf("%04X", addr),
		Hex:     fmt.Sprintf("%04X", v),
		Ubint16: uint32(UBInt16Decode(b)),
		Ulint16: uint32(ULInt16Decode(b)),
		Sbint16: int32(SBInt16Decode(b)),
		Slint16: int32(SLInt16Decode(b)),
		Min:     int32(s.InputRangeMin[addr]),
		Max:     int32(s.InputRangeMax[addr]),
		Random:  s.InputRandom[addr],
	}
	return wr
}
