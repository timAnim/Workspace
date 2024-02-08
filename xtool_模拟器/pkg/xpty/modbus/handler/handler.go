package handler

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"sort"
	"strconv"
	"strings"
	"time"
	modbusPb "xtool/pkg/protos/modbus"
	"xtool/pkg/utils"

	"github.com/goburrow/serial"
	log "github.com/sirupsen/logrus"

	"github.com/tamago-cn/mbserver"
)

var _ modbusPb.XModbusServer = &Server{}

// Conf 配置信息
type Conf struct {
	InputRangeMin []int
	InputRangeMax []int
	InputRandom   []bool

	HoldingRangeMin []int
	HoldingRangeMax []int
	HoldingRandom   []bool

	DInputRandom []bool
	CoilRandom   []bool
}

// Server modbus 模拟器
type Server struct {
	config string

	modbusPb.XModbusServer

	mbserver.Server

	Conf

	//InputRangeMin []int
	//InputRangeMax []int
	//InputRandom   []bool

	//HoldingRangeMin []int
	//HoldingRangeMax []int
	//HoldingRandom   []bool

	//DInputRandom []bool
	//CoilRandom   []bool

	rtuPortBase int
	tcpPortBase int

	rtuPortCount int
	tcpPortCount int

	ttyPrefixs    []string
	ttyExcludeMap map[string]struct{}

	modbusRTUAddrs []string
	modbusTCPAddrs []string

	modbusTTYConfigs []*serial.Config
}

// OptFunc 可选参数
type OptFunc func(*Server)

// WithRTUPortBase 指定 modbusRTU 端口基数
func WithRTUPortBase(n int) OptFunc {
	return func(s *Server) {
		s.rtuPortBase = n
	}
}

// WithRTUPortCount 指定 modbusRTU 端口数量
func WithRTUPortCount(count int) OptFunc {
	return func(s *Server) {
		s.rtuPortCount = count
	}
}

// WithTCPPortBase 指定 modbusRTU 端口基数
func WithTCPPortBase(n int) OptFunc {
	return func(s *Server) {
		s.tcpPortBase = n
	}
}

// WithTCPPortCount 指定 modbusTCP 端口数量
func WithTCPPortCount(count int) OptFunc {
	return func(s *Server) {
		s.tcpPortCount = count
	}
}

// WithTTYPrefix 指定串口设备前缀
func WithTTYPrefix(ttyPrefix string) OptFunc {
	return func(s *Server) {
		s.ttyPrefixs = strings.Split(ttyPrefix, ",")
	}
}

// WithTTYExclude 指定串口设备前缀
func WithTTYExclude(ttys ...string) OptFunc {
	return func(s *Server) {
		for _, d := range ttys {
			s.ttyExcludeMap[d] = struct{}{}
		}
	}
}

// NewServer 新建modbus模拟器
func NewServer(opts ...OptFunc) *Server {
	ms := mbserver.NewServer()
	s := &Server{
		config: "modbus.conf",

		Server: *ms,
		Conf: Conf{
			InputRangeMin: make([]int, 65536),
			InputRangeMax: make([]int, 65536),
			InputRandom:   make([]bool, 65536),

			HoldingRangeMin: make([]int, 65536),
			HoldingRangeMax: make([]int, 65536),
			HoldingRandom:   make([]bool, 65536),

			DInputRandom: make([]bool, 65536/8),
			CoilRandom:   make([]bool, 65536/8),

			// TODO: 加上串口配置
		},

		rtuPortBase: 21000,
		tcpPortBase: 22000,

		rtuPortCount: 10,
		tcpPortCount: 10,

		ttyPrefixs:    make([]string, 0, 2),
		ttyExcludeMap: make(map[string]struct{}),

		modbusRTUAddrs: make([]string, 0, 10),
		modbusTCPAddrs: make([]string, 0, 10),

		modbusTTYConfigs: make([]*serial.Config, 0, 10),
	}

	for _, opt := range opts {
		opt(s)
	}

	s.initRegisters()

	s.initServe()

	go s.refreshRegisters()

	return s
}

func (s *Server) saveConf() {
	utils.DumpWithIndent(s.config, s.Conf, "", "  ")
}

func (s *Server) restoreConf() {
	utils.Load(s.config, &s.Conf)
}

func (s *Server) initRegisters() {

	for i := 0; i < 65536; i++ {
		s.InputRandom[i] = false
		s.InputRangeMin[i] = 0
		s.InputRangeMax[i] = 100

		s.HoldingRandom[i] = false
		s.HoldingRangeMin[i] = 0
		s.HoldingRangeMax[i] = 100
	}

	for i := 0; i < 65536/8; i++ {
		s.DInputRandom[i] = false
		s.CoilRandom[i] = false
	}

	s.restoreConf()
}

func (s *Server) isSerialPort(fname string) bool {
	if _, ok := s.ttyExcludeMap[fname]; ok {
		return false
	}
	for _, p := range s.ttyPrefixs {
		if strings.HasPrefix(fname, p) {
			return true
		}
	}
	return false
}

func sortFiles(files []os.FileInfo) {
	r := regexp.MustCompile(`\d+`)
	indexFunc := func(in string) int {
		out := r.FindString(in)
		v, _ := strconv.Atoi(out)
		return v
	}
	sort.Slice(files, func(i, j int) bool {
		x := indexFunc(files[i].Name())
		y := indexFunc(files[j].Name())
		return x < y
	})
}

func (s *Server) initServe() {
	for i := 0; i < s.rtuPortCount; i++ {
		addr := fmt.Sprintf("0.0.0.0:%d", s.rtuPortBase+i)
		if err := s.ListenRTUonTCP(addr); err != nil {
			log.Warnf("ListenRTUonTCP '%s' error: %s", addr, err.Error())
		} else {
			s.modbusRTUAddrs = append(s.modbusRTUAddrs, addr)
			log.Infof("ListenRTUonTCP '%s' success", addr)
		}
	}
	for i := 0; i < s.tcpPortCount; i++ {
		addr := fmt.Sprintf("0.0.0.0:%d", s.tcpPortBase+i)
		if err := s.ListenTCP(addr); err != nil {
			log.Warnf("ListenTCP '%s' error: %s", addr, err.Error())
		} else {
			s.modbusTCPAddrs = append(s.modbusTCPAddrs, addr)
			log.Infof("ListenTCP '%s' success", addr)
		}
	}
	if runtime.GOOS == "windows" {
		return
	}
	files, err := ioutil.ReadDir("/dev")
	if err != nil {
		log.Warnf("list dir '/dev' error: %s", err.Error())
		return
	}

	sortFiles(files)

	for _, f := range files {
		if s.isSerialPort(f.Name()) {
			addr := filepath.Join("/dev", f.Name())
			c := &serial.Config{
				Address:  addr,
				BaudRate: 9600,
				DataBits: 8,
				StopBits: 1,
				Parity:   "N",
				Timeout:  5000 * time.Millisecond,
				//RS485: serial.RS485Config{
				//	Enabled:            true,
				//	DelayRtsBeforeSend: 2 * time.Millisecond,
				//	DelayRtsAfterSend:  3 * time.Millisecond,
				//	RtsHighDuringSend:  false,
				//	RtsHighAfterSend:   false,
				//	RxDuringTx:         false,
				//},
			}
			if err := s.ListenRTU(c); err != nil {
				log.Warnf("ListenRTU '%s' error: %s", c.Address, err.Error())
			} else {
				s.modbusTTYConfigs = append(s.modbusTTYConfigs, c)
				log.Infof("ListenRTU '%s' success", c.Address)
			}
		}
	}
}

func (s *Server) refreshRegisters() {
	ticker := time.NewTicker(5 * time.Second)
	for {
		select {
		case <-ticker.C:
			for i := 0; i < 65535; i++ {
				if s.InputRandom[i] {
					s.InputRegisters[i] = uint16(s.InputRangeMin[i] + rand.Intn(s.InputRangeMax[i]-s.InputRangeMin[i]))
				}
				if s.HoldingRandom[i] {
					s.HoldingRegisters[i] = uint16(s.HoldingRangeMin[i] + rand.Intn(s.HoldingRangeMax[i]-s.HoldingRangeMin[i]))
				}
			}
			for i := 0; i < 65536/8; i++ {
				if s.DInputRandom[i] {
					x := byte(rand.Intn(256))
					for j := 0; j < 8; j++ {
						s.DiscreteInputs[i*8+j] = (x >> j) & byte(0x1)
					}
				}
				if s.CoilRandom[i] {
					x := byte(rand.Intn(256))
					for j := 0; j < 8; j++ {
						s.Coils[i*8+j] = (x >> j) & byte(0x1)
					}
				}
			}
		}
	}
}
