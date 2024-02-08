package handler

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	modbusPb "xtool/pkg/protos/modbus"
)

// GetCoils 获取输入寄存器数据列表
func (s *Server) GetCoils(ctx context.Context, req *modbusPb.Paging) (*modbusPb.GetCoilResp, error) {

	begin, end, err := getBitRange(req)
	if err != nil {
		return &modbusPb.GetCoilResp{}, err
	}

	brs := make([]*modbusPb.BitGroupRegister, 0, end-begin)
	for i := begin; i < end; i += 8 {
		brs = append(brs, s.getCoilBitGroupRegister(i))
	}

	return &modbusPb.GetCoilResp{
		List:  brs,
		Index: req.Index,
		Size:  req.Size,
		Total: 65536 / 8,
	}, nil
}

// SetCoil 获取输入寄存器数据列表
func (s *Server) SetCoil(ctx context.Context, req *modbusPb.SetCoilReq) (*modbusPb.SetCoilResp, error) {

	vs := strings.Split(req.Addr, "-")
	if len(vs) != 2 {
		return &modbusPb.SetCoilResp{}, fmt.Errorf("addr '%s' is illegal", req.Addr)
	}

	hAddr, err := strconv.ParseUint(vs[0], 16, 64)
	if err != nil {
		return &modbusPb.SetCoilResp{}, err
	}
	lAddr, err := strconv.ParseUint(vs[1], 16, 64)
	if err != nil {
		return &modbusPb.SetCoilResp{}, err
	}

	if lAddr%8 != 0 || hAddr-lAddr != 7 {
		return &modbusPb.SetCoilResp{}, fmt.Errorf("addr '%s' is illegal", req.Addr)
	}

	switch req.Field {
	case "hex":
		v, err := strconv.ParseUint(req.Value, 16, 64)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v > 255 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		x := byte(v)
		for j := 0; j < 8; j++ {
			s.Coils[int(lAddr)+j] = (x >> j) & byte(0x1)
		}
	case "bit7":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+7] = byte(v)
	case "bit6":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+6] = byte(v)
	case "bit5":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+5] = byte(v)
	case "bit4":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+4] = byte(v)
	case "bit3":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+3] = byte(v)
	case "bit2":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+2] = byte(v)
	case "bit1":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+1] = byte(v)
	case "bit0":
		v, err := strconv.Atoi(req.Value)
		if err != nil {
			return &modbusPb.SetCoilResp{}, err
		}
		if v < 0 || v > 1 {
			return &modbusPb.SetCoilResp{}, fmt.Errorf("value '%s' is out of range", req.Value)
		}
		s.Coils[int(lAddr)+0] = byte(v)

	default:
	}

	return &modbusPb.SetCoilResp{
		Info: s.getCoilBitGroupRegister(int(lAddr)),
	}, nil
}

func (s *Server) getCoilBitGroupRegister(i int) *modbusPb.BitGroupRegister {
	v := byte(0)
	for j := 0; j < 8; j++ {
		v |= ((s.Coils[i+j] & 0x1) << j)
	}
	return &modbusPb.BitGroupRegister{
		Addr: fmt.Sprintf("%04X-%04X", i+7, i),
		Hex:  fmt.Sprintf("%02X", v),

		Bit7: int32(s.Coils[i+7] & 0x1),
		Bit6: int32(s.Coils[i+6] & 0x1),
		Bit5: int32(s.Coils[i+5] & 0x1),
		Bit4: int32(s.Coils[i+4] & 0x1),
		Bit3: int32(s.Coils[i+3] & 0x1),
		Bit2: int32(s.Coils[i+2] & 0x1),
		Bit1: int32(s.Coils[i+1] & 0x1),
		Bit0: int32(s.Coils[i+0] & 0x1),

		Random: s.CoilRandom[i/8],
	}
}

// CoilCtrl 获取输入寄存器数据列表
func (s *Server) CoilCtrl(ctx context.Context, req *modbusPb.CoilCtrlReq) (*modbusPb.CoilCtrlResp, error) {
	defer s.saveConf()

	if req.Addr == "" {
		for i := 0; i < 65536/8; i++ {
			s.CoilRandom[i] = req.Random
		}
		return &modbusPb.CoilCtrlResp{
			Info: s.getCoilBitGroupRegister(0),
		}, nil
	}

	vs := strings.Split(req.Addr, "-")
	if len(vs) != 2 {
		return &modbusPb.CoilCtrlResp{}, fmt.Errorf("addr '%s' is illegal", req.Addr)
	}

	hAddr, err := strconv.ParseUint(vs[0], 16, 64)
	if err != nil {
		return &modbusPb.CoilCtrlResp{}, err
	}
	lAddr, err := strconv.ParseUint(vs[1], 16, 64)
	if err != nil {
		return &modbusPb.CoilCtrlResp{}, err
	}

	if lAddr%8 != 0 || hAddr-lAddr != 7 {
		return &modbusPb.CoilCtrlResp{}, fmt.Errorf("addr '%s' is illegal", req.Addr)
	}

	s.CoilRandom[int(lAddr/8)] = req.Random

	return &modbusPb.CoilCtrlResp{
		Info: s.getCoilBitGroupRegister(int(lAddr)),
	}, nil
}
