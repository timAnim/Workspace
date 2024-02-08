package cmd

import (
	"bytes"
	"encoding/binary"
	"net"
	"time"
	"xtool/pkg/reg"

	"github.com/j-keck/arping"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("inner", "ping", Ping, "连接检测", `ping <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "目标服务器"},
	})

	reg.Regist("inner", "aping", APing, "异步连接检测，配合 done 指令使用", `aping <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "目标服务器"},
	})

	reg.Regist("inner", "mac", Mac, "获取MAC地址", `mac <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "目标服务器"},
	})

	reg.Regist("inner", "amac", AMac, "异步获取MAC地址，配合 done 指令使用", `amac <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "目标服务器"},
	})
}

// ICMP 协议包
type ICMP struct {
	Type        uint8
	Code        uint8
	CheckSum    uint16
	Identifier  uint16
	SequenceNum uint16
}

func getICMP(seq uint16) ICMP {
	icmp := ICMP{
		Type:        8,
		Code:        0,
		CheckSum:    0,
		Identifier:  0,
		SequenceNum: seq,
	}

	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, icmp)
	icmp.CheckSum = CheckSum(buffer.Bytes())
	buffer.Reset()

	return icmp
}

type pingRet struct {
	receiveCnt int
	destAddr   string
	seq        uint16
	duration   int64
}

func sendICMPRequest(icmp ICMP, destAddr *net.IPAddr) (*pingRet, error) {
	conn, err := net.DialIP("ip4:icmp", nil, destAddr)
	if err != nil {
		//log.Errorf("Fail to connect to remote host: %s\n", err)
		return nil, err
	}
	defer conn.Close()

	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, icmp)

	if _, err := conn.Write(buffer.Bytes()); err != nil {
		//log.Errorf("Error: %s", err)
		return nil, err
	}

	tStart := time.Now()

	conn.SetReadDeadline((time.Now().Add(time.Second * 2)))

	recv := make([]byte, 1024)
	receiveCnt, err := conn.Read(recv)

	if err != nil {
		//log.Errorf("Error: %s", err)
		return nil, err
	}

	tEnd := time.Now()
	duration := tEnd.Sub(tStart).Nanoseconds() / 1e6

	//log.Infof("%d bytes from %s: seq=%d time=%dms", receiveCnt, destAddr.String(), icmp.SequenceNum, duration)

	return &pingRet{
		receiveCnt: receiveCnt,
		destAddr:   destAddr.String(),
		seq:        icmp.SequenceNum,
		duration:   duration,
	}, err
}

// CheckSum 校验
func CheckSum(data []byte) uint16 {
	var (
		sum    uint32
		length int = len(data)
		index  int
	)
	for length > 1 {
		sum += uint32(data[index])<<8 + uint32(data[index+1])
		index += 2
		length -= 2
	}
	if length > 0 {
		sum += uint32(data[index])
	}
	sum += (sum >> 16)

	return uint16(^sum)
}

// Ping 连接校验
func Ping(host string) {
	raddr, err := net.ResolveIPAddr("ip", host)
	if err != nil {
		log.Errorf("Fail to resolve %s, %s", host, err)
		return
	}
	r, err := sendICMPRequest(getICMP(uint16(1)), raddr)
	if err != nil {
		log.Errorf("Ping %s(%s) error: %s", host, raddr.String(), err)
		return
	}
	log.Infof("Ping %s(%s): %d bytes from %s: seq=%d time=%dms", host, raddr.String(), r.receiveCnt, r.destAddr, r.seq, r.duration)
}

// APing 连接校验
func APing(host string) {
	launch(func() {
		Ping(host)
	})
}

// Mac 获取mac地址
func Mac(host string) {
	dstIP := net.ParseIP(host)
	hwAddr, t, err := arping.Ping(dstIP)
	if err != nil {
		log.Errorf("Get MAC of %s(%s) error: %s", host, dstIP, err.Error())
		return
	}
	log.Infof("MAC of %s(%s) is: %s, timeout: %v", host, dstIP, hwAddr, t)
}

// AMac 异步获取mac地址
func AMac(host string) {
	launch(func() {
		Mac(host)
	})
}
