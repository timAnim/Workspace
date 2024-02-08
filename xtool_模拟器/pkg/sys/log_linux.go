package sys

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"path/filepath"
	"strings"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("system", "check_log", CheckLog, "日志检查", `check_log`, []*reg.Param{})
}

var logDir = "/opt/log"

// CheckLog 日志检查
func CheckLog() {
	// 检查/opt/log 下的日志
	files, err := ioutil.ReadDir(logDir)
	if err != nil {
		log.Errorf("获取 '%s' 下的日志文件出错: %s", logDir, err.Error())
		return
	}

	for _, f := range files {
		if !strings.HasSuffix(f.Name(), ".log") {
			continue
		}
		//log.Infof(f.Name())
		reduceLog(f.Name())
	}
}

func reduceLog(logFile string) {
	o, err := utils.GetShellOutput(fmt.Sprintf("cat %s | grep ERROR | tail -n 1000", filepath.Join(logDir, logFile)))
	if err != nil {
		log.Errorf("读取日志文件 '%s' 出错: %s", filepath.Join(logDir, logFile), err.Error())
		return
	}
	logMap := make(map[string]*info)
	sr := strings.NewReader(o)
	reader := bufio.NewReader(sr)
	for {
		x, _, err := reader.ReadLine()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Errorf("readline error: %s", err.Error())
			break
		}

		line := strings.TrimSpace(string(x))
		if len(line) == 0 {
			continue
		}

		if len(line) > 256 {
			line = line[0:256]
		}
		//log.Info(line)

		i := parseLine(line)
		if i == nil {
			continue
		}
		if v, ok := logMap[i.Msg]; ok {
			v.Count++
		} else {
			logMap[i.Msg] = i
		}
	}

	for msg, i := range logMap {
		log.Infof("检查日志文件 '%s' 在样本中发现 %d 条错误消息: '%s'", logFile, i.Count, msg)
	}
}

type info struct {
	Count int64
	Time  string
	Pos   string
	Msg   string
}

func parseLine(line string) *info {
	vs := strings.Split(line, "[ERROR]")
	if len(vs) != 2 {
		return nil
	}

	tfl := strings.Split(strings.TrimSpace(vs[0]), " ")
	if len(tfl) != 3 {
		return nil
	}

	i := &info{
		Count: 1,
		Time:  fmt.Sprintf("%s %s", tfl[0], tfl[1]),
		Pos:   tfl[2],
		Msg:   vs[1],
	}
	return i
}
