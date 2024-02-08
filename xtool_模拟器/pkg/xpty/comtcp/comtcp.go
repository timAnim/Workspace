package comtcp

import (
	"context"
	"io"
	"net"
	"sync"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/goburrow/serial"
)

// ComTCP 串口透传器
type ComTCP struct {
	// Addr TCP地址
	Addr string

	conf *serial.Config

	comPort serial.Port

	// 单连接
	connected bool
}

// OptFunc 额外方法
type OptFunc func(*ComTCP)

// NewComTCP 新建串口透传服务
func NewComTCP(opts ...OptFunc) *ComTCP {
	c := &ComTCP{
		Addr: "0.0.0.0:21000",
	}

	for _, opt := range opts {
		opt(c)
	}

	return c
}

// WithAddr 指定TCP监听地址
func WithAddr(addr string) OptFunc {
	return func(c *ComTCP) {
		c.Addr = addr
	}
}

// WithSerial 指定串口配置
func WithSerial(conf *serial.Config) OptFunc {
	return func(c *ComTCP) {
		c.conf = conf
	}
}

// Init 透传器初始化
func (c *ComTCP) Init() error {
	port, err := serial.Open(c.conf)
	if err != nil {
		log.Errorf("open serial port error: %s", err.Error())
		return err
	}
	c.comPort = port
	return nil
}

// Serve 启动服务
func (c *ComTCP) Serve(ctx context.Context) error {
	lis, err := net.Listen("tcp", c.Addr)
	if err != nil {
		return err
	}

	for {
		conn, err := lis.Accept()
		if err != nil {
			return err
		}
		if c.connected {
			conn.Close()
			continue
		}
		c.connected = true
		wg := sync.WaitGroup{}

		go func() {
			wg.Add(1)
			defer wg.Done()
			c.comToSock(ctx, conn)
		}()
		go func() {
			wg.Add(1)
			defer wg.Done()
			c.sockToCom(ctx, conn)
		}()
		wg.Wait()
	}
}

func (c *ComTCP) comToSock(ctx context.Context, conn net.Conn) {
	defer func() {
		if c.connected {
			conn.Close()
			c.connected = false
		}
	}()

	buf := make([]byte, 1024)
	for {
		select {
		case <-ctx.Done():
			return
		default:
			n, err := c.comPort.Read(buf)
			if err != nil {
				if err == io.EOF {
					continue
				} else {
					log.Errorf("conToSock comPort.Read error: %s", err.Error())
					return
				}
			}
			if _, err := conn.Write(buf[:n]); err != nil {
				log.Errorf("conn.Write error: %s", err.Error())
				return
			}
		}
	}
}
func (c *ComTCP) sockToCom(ctx context.Context, conn net.Conn) {
	defer func() {
		if c.connected {
			conn.Close()
			c.connected = false
		}
	}()

	buf := make([]byte, 1024)
	for {
		select {
		case <-ctx.Done():
			return
		default:
			if err := conn.SetReadDeadline(time.Now().Add(3 * time.Second)); err != nil {
				log.Warnf("sockToCom conn.SetReadDeadline: %s", err.Error())
				continue
			}

			n, err := conn.Read(buf)
			if err != nil {
				if err == io.EOF {
					return
				}
				if e, ok := err.(net.Error); ok && e.Timeout() {
					continue
				} else {
					log.Errorf("sockToCom conn.Read from %s error: %s", conn.RemoteAddr().String(), err.Error())
					return
				}
			}
			if _, err := c.comPort.Write(buf[:n]); err != nil {
				log.Errorf("c.comPort.Write error: %s", err.Error())
				return
			}
		}
	}
}
