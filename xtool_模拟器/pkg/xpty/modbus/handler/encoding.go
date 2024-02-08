package handler

import (
	"encoding/binary"
	"fmt"
	modbusPb "xtool/pkg/protos/modbus"
)

// SwapUBytes 交换高低位
func SwapUBytes(in uint16) uint16 {
	return ((in & 0xFF) << 8) | ((in >> 8) & 0xFF)
}

// SwapSBytes 交换高低位
func SwapSBytes(in int16) int16 {
	return ((in & 0xFF) << 8) | ((in >> 8) & 0xFF)
}

// Uint16toSint16 无符号转有符号
func Uint16toSint16(in uint16) int16 {
	//return (int16((in>>8)&0xFF) << 8) | (int16(in & 0xFF))
	return int16(in)
}

// Sint16toUint16 有符号转无符号
func Sint16toUint16(in int16) uint16 {
	//return (uint16((in>>8)&0xFF) << 8) | (uint16(in & 0xFF))
	return uint16(in)
}

// UBInt16Encode UBInt16 编码
func UBInt16Encode(in uint16) []byte {
	b := make([]byte, 2)
	binary.BigEndian.PutUint16(b, in)
	return b
}

// UBInt16Decode UBInt16 解码 长度不足时补0
func UBInt16Decode(in []byte) uint16 {
	return binary.BigEndian.Uint16(in)
}

// ULInt16Encode ULInt16 编码
func ULInt16Encode(in uint16) []byte {
	b := make([]byte, 2)
	binary.LittleEndian.PutUint16(b, in)
	return b
}

// ULInt16Decode ULInt16 解码 长度不足时补0
func ULInt16Decode(in []byte) uint16 {
	return binary.LittleEndian.Uint16(in)
}

// SBInt16Encode SBInt16 编码
func SBInt16Encode(in int16) []byte {
	b := make([]byte, 2)
	b[0] = byte(in >> 8)
	b[1] = byte(in)
	return b
}

// SBInt16Decode SBInt16 解码 长度不足时补0
func SBInt16Decode(in []byte) int16 {
	return (int16(in[0]) << 8) | int16(in[1])
}

// SLInt16Encode SLInt16 编码
func SLInt16Encode(in int16) []byte {
	b := make([]byte, 2)
	b[0] = byte(in)
	b[1] = byte(in >> 8)
	return b
}

// SLInt16Decode SLInt16 解码 长度不足时补0
func SLInt16Decode(in []byte) int16 {
	return int16(in[0]) | (int16(in[1]) << 8)
}

func getRange(req *modbusPb.Paging) (int, int, error) {
	if req.Index < 1 {
		req.Index = 1
	}
	if req.Size < 1 {
		req.Size = 16
	}
	begin := int((req.Index - 1) * req.Size)
	if begin > 65535 {
		return 0, 0, fmt.Errorf("out of range, index: %d, size: %d", req.Index, req.Size)
	}
	end := begin + int(req.Size)
	if end > 65536 {
		end = 65536
	}
	return begin, end, nil
}

func getBitRange(req *modbusPb.Paging) (int, int, error) {
	if req.Index < 1 {
		req.Index = 1
	}
	if req.Size < 1 {
		req.Size = 16
	}
	begin := int((req.Index - 1) * req.Size * 8)
	if begin > 65535 {
		return 0, 0, fmt.Errorf("out of range, index: %d, size: %d", req.Index, req.Size)
	}
	end := begin + int(req.Size)*8
	if end > 65536 {
		end = 65536
	}
	return begin, end, nil
}
