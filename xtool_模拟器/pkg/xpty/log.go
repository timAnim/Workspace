package xpty

import (
	"bufio"
	"fmt"
	"io"
	"math/rand"
	"net"
	"os"
	"strconv"
	"strings"
	"xtool/pkg/jfmt"
	"xtool/pkg/reg"

	"github.com/creack/pty"
	log "github.com/sirupsen/logrus"
	"github.com/tamago-cn/mbserver"
)

func init() {
	reg.Regist("xpty", "load_log_file", LoadLogFile, "加载日志文件", `load_log_file <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "模拟日志文件"},
	})
	reg.Regist("xpty", "log_simulator_on_pty", LogSimulatorOnPTY, "日志模拟器", `log_simulator_on_pty <count>`, []*reg.Param{
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟串口数量，默认1"},
	})
	reg.Regist("xpty", "log_simulator_on_tcp", LogSimulatorOnTCP, "日志模拟器", `log_simulator_on_tcp <base> <count>`, []*reg.Param{
		&reg.Param{Name: "base", Type: "string", Necessity: true, Desc: "模拟端口基数，默认21000"},
		&reg.Param{Name: "count", Type: "string", Necessity: true, Desc: "模拟端口数量，默认1"},
	})
}

// FrameType 数据帧类型
type FrameType int

// 帧类型枚举
const (
	FrameWrite FrameType = 0
	FrameRead  FrameType = 1
)

var cmdMap = map[string][]string{}

type frame struct {
	Type FrameType
	Data string
}

// LoadLogFile 加载模拟文件
func LoadLogFile(filename string) {
	fp, err := os.Open(filename)
	if err != nil {
		log.Errorf("os.Open '%s' error: %s", filename, err.Error())
		return
	}
	defer fp.Close()

	//preLine := ""
	pF := &frame{
		Type: FrameRead,
	}

	err = read(fp, func(line []byte) {
		l := strings.TrimSpace(strings.ToUpper(string(line)))
		//fmt.Println(l)
		vs := strings.Split(l, ":")
		if len(vs) != 2 {
			pF.Type = FrameRead
			pF.Data = ""
			return
		}

		x := strings.ReplaceAll(vs[1], " ", "")

		if strings.HasPrefix(vs[0], "READ") && pF.Type == FrameWrite {
			// 可构造读写对
			if y, ok := cmdMap[pF.Data]; ok {
				cmdMap[pF.Data] = append(y, x)
			} else {
				cmdMap[pF.Data] = []string{x}
			}

			pF.Type = FrameRead
			pF.Data = x
		} else if strings.HasPrefix(vs[0], "WRITE") {
			// 暂存写包
			pF.Type = FrameWrite
			pF.Data = x
		}
	})

	if err != nil {
		log.Errorf("LoadLogFile '%s' error: %s", filename, err.Error())
		return
	}

	jfmt.Print(cmdMap)

	log.Infof("LoadLogFile '%s' success", filename)
}

func read(rd io.Reader, fn func([]byte)) error {
	r := bufio.NewReader(rd)
	for {
		line, isPrefix, err := r.ReadLine()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil
		}
		if isPrefix {
			continue
		}
		fn(line)
	}

	return nil
}

// LogSimulator 模拟器
func LogSimulator(conn io.ReadWriteCloser) {
	defer conn.Close()

	for {
		b := make([]byte, 512)
		n, err := conn.Read(b)
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Warnf("conn.Read error: %s", err.Error())
			continue
		}
		if n >= 2 && b[n-1] == byte(0x0A) && b[n-2] == byte(0x0D) {
			n = n - 2
		}
		c := mbserver.FormatBytes(b[0:n])
		log.Debugf("RECV %4d: %s", n, c)
		if vs, ok := cmdMap[strings.ReplaceAll(c, " ", "")]; ok {
			v := vs[rand.Intn(len(vs))]
			x, err := mbserver.HexStrToBytes(v)
			if err != nil {
				log.Warnf("mbserver.HexStrToBytes error: %s", err.Error())
				continue
			}
			n, err := conn.Write(x)
			if err != nil {
				log.Warnf("SEND error: %s", err.Error())
				continue
			}
			log.Debugf("SEND %4d: %s", n, v)
		} else {
			log.Warnf("nothing send for: %s", c)
		}
	}
}

// LogSimulatorOnPTY 模拟器
func LogSimulatorOnPTY(count string) {
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}
	for i := 0; i < c; i++ {
		master, slave, err := pty.Open()
		if err != nil {
			log.Warnf("pty.Open error: %s", err.Error())
			continue
		}

		go LogSimulator(master)

		log.Infof("log simulator on: %s", slave.Name())
	}
}

// LogSimulatorOnTCP 模拟器
func LogSimulatorOnTCP(base string, count string) {
	b, err := strconv.Atoi(base)
	if err != nil {
		b = 22000
	}
	c, err := strconv.Atoi(count)
	if err != nil {
		c = 1
	}

	for i := 0; i < c; i++ {
		addr := fmt.Sprintf("0.0.0.0:%d", b+i)
		lis, err := net.Listen("tcp", addr)
		if err != nil {
			log.Warnf("listen on '%s' error: %s", addr, err.Error())
			continue
		}

		go func() {
			for {
				conn, err := lis.Accept()
				if err != nil {
					continue
				}
				go LogSimulator(conn)
			}
		}()

		log.Infof("log simulator listen on '%s'", addr)
	}
}
