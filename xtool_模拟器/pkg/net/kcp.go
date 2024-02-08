package net

import (
	"context"
	"crypto/sha1"
	"github.com/xtaci/kcp-go"
	"golang.org/x/crypto/pbkdf2"
	"net"
)

var (
	defaultKCPOption = &KCPOption{
		Crypt:             KCPCryptNil,
		DataShard:         10,
		ParityShards:      3,
		SockBuf:           10485760,
		NoDelay:           1,
		Interval:          20,
		Resend:            2,
		NoCongestion:      1,
		SndWnd:            2048,
		RcvWnd:            2048,
		MTU:               1350,
		AckNoDelay:        true,
		MaxFrameSize:      4096,
		KeepAliveInterval: 30,
	}
	DefaultKCPDialer = &KCPDialer{DefaultKCPOption()}
)

func DefaultKCPOption() KCPOption {
	return *defaultKCPOption
}

func DialKCPContext(ctx context.Context, network, addr string) (net.Conn, error) {
	return DefaultKCPDialer.DialContext(ctx, network, addr)
}

func ListenKCP(network, address string) (net.Listener, error) {
	return ListenKCPWithOption(network, address, DefaultKCPOption())
}

func ListenKCPWithOption(network, address string, opt KCPOption) (net.Listener, error) {
	block, err := opt.Crypt.NewBlock(genPass(opt.Key))
	if err != nil {
		return nil, err
	}

	kl, err := kcp.ListenWithOptions(address, block, opt.DataShard, opt.ParityShards)
	if err != nil {
		return nil, err
	}

	kl.SetReadBuffer(opt.SockBuf)
	kl.SetWriteBuffer(opt.SockBuf)

	l := &KCPListener{KCPOption: opt, Listener: kl}

	return l, nil
}

type KCPOption struct {
	Crypt             KCPCrypt
	Key               string
	DataShard         int
	ParityShards      int
	SockBuf           int
	NoDelay           int
	Interval          int
	Resend            int
	NoCongestion      int
	SndWnd            int
	RcvWnd            int
	MTU               int
	AckNoDelay        bool
	MaxFrameSize      int
	KeepAliveInterval int
}

type KCPDialer struct {
	KCPOption
}

func (d *KCPDialer) Dial(network, address string) (net.Conn, error) {
	return d.DialContext(context.Background(), network, address)
}

func (d *KCPDialer) DialContext(ctx context.Context, network, address string) (net.Conn, error) {
	block, err := d.Crypt.NewBlock(genPass(d.Key))
	if err != nil {
		return nil, err
	}

	conn, err := kcp.DialWithOptions(address, block, d.DataShard, d.ParityShards)
	if err != nil {
		return nil, err
	}

	conn.SetWriteBuffer(d.SockBuf)
	conn.SetReadBuffer(d.SockBuf)
	conn.SetStreamMode(true)
	conn.SetWriteDelay(true)
	conn.SetNoDelay(d.NoDelay, d.Interval, d.Resend, d.NoCongestion)
	conn.SetWindowSize(d.SndWnd, d.RcvWnd)
	conn.SetMtu(d.MTU)
	conn.SetACKNoDelay(d.AckNoDelay)

	return conn, nil
}

type KCPListener struct {
	KCPOption
	*kcp.Listener
}

func (l *KCPListener) Accept() (net.Conn, error) {
	conn, err := l.AcceptKCP()
	if err != nil {
		return nil, err
	}

	conn.SetStreamMode(true)
	conn.SetWriteDelay(true)
	conn.SetNoDelay(l.NoDelay, l.Interval, l.Resend, l.NoCongestion)
	conn.SetWindowSize(l.SndWnd, l.RcvWnd)
	conn.SetMtu(l.MTU)
	conn.SetACKNoDelay(l.AckNoDelay)

	return conn, nil
}

type KCPCrypt int

const (
	KCPCryptNil KCPCrypt = iota
	KCPCryptSM4
	KCPCryptTEA
	KCPCryptXOR
	KCPCryptAES128
	KCPCryptAES192
	KCPCryptBlowfish
	KCPCryptTwofish
	KCPCryptCast5
	KCPCryptTripleDES
	KCPCryptXTEA
	KCPCryptSalsa20

	KCPCryptMax = KCPCryptSalsa20
)

func (c KCPCrypt) String() string {
	switch c {
	case KCPCryptNil:
		return "none"
	case KCPCryptSM4:
		return "sm4"
	case KCPCryptTEA:
		return "tea"
	case KCPCryptXOR:
		return "xor"
	case KCPCryptAES128:
		return "aes-128"
	case KCPCryptAES192:
		return "aes-192"
	case KCPCryptBlowfish:
		return "blowfish"
	case KCPCryptTwofish:
		return "twofish"
	case KCPCryptCast5:
		return "cast5"
	case KCPCryptTripleDES:
		return "3des"
	case KCPCryptXTEA:
		return "xtea"
	case KCPCryptSalsa20:
		return "salsa20"
	}
	return "unknown"
}

func (c KCPCrypt) NewBlock(pass []byte) (kcp.BlockCrypt, error) {
	switch c {
	case KCPCryptSM4:
		return kcp.NewSM4BlockCrypt(pass[:16])
	case KCPCryptTEA:
		return kcp.NewTEABlockCrypt(pass[:16])
	case KCPCryptXOR:
		return kcp.NewSimpleXORBlockCrypt(pass)
	case KCPCryptAES128:
		return kcp.NewAESBlockCrypt(pass[:16])
	case KCPCryptAES192:
		return kcp.NewAESBlockCrypt(pass[:24])
	case KCPCryptBlowfish:
		return kcp.NewBlowfishBlockCrypt(pass)
	case KCPCryptTwofish:
		return kcp.NewTwofishBlockCrypt(pass)
	case KCPCryptCast5:
		return kcp.NewCast5BlockCrypt(pass[:16])
	case KCPCryptTripleDES:
		return kcp.NewTripleDESBlockCrypt(pass[:24])
	case KCPCryptXTEA:
		return kcp.NewXTEABlockCrypt(pass[:16])
	case KCPCryptSalsa20:
		return kcp.NewSalsa20BlockCrypt(pass)
	}
	return nil, nil
}

const KCPPassSalt = "xnet"

func genPass(key string) []byte {
	return pbkdf2.Key([]byte(key), []byte(KCPPassSalt), 4096, 32, sha1.New)
}
