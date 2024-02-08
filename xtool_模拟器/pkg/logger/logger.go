package logger

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path"
	"runtime"
	"strings"
	"xtool/pkg/reg"

	"github.com/rifflock/lfshook"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("logger", "log", addLogger, "添加日志记录", `log <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "日志文件名"},
		&reg.Param{Name: "enableColor", Type: "bool", Necessity: false, Desc: "文件中日志等级是否带颜色，默认带颜色，为false不带颜色"},
	})
	setLogger()
}

const (
	nocolor = 0
	red     = 31
	green   = 32
	yellow  = 33
	blue    = 36
	gray    = 37
)

// LogFormatter 日志格式化
type LogFormatter struct {
	EnableTime      bool
	EnablePos       bool
	EnableColor     bool
	TimestampFormat string
	CallerLevel     int
}

// Format renders a single log entry
func (f *LogFormatter) Format(entry *log.Entry) ([]byte, error) {
	var b *bytes.Buffer

	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}

	f.colored(b, entry, f.TimestampFormat)

	b.WriteByte('\n')
	return b.Bytes(), nil
}

func (f *LogFormatter) colored(b *bytes.Buffer, entry *log.Entry, timestampFormat string) {
	var levelColor int
	switch entry.Level {
	case log.DebugLevel:
		levelColor = gray
	case log.WarnLevel:
		levelColor = yellow
	case log.ErrorLevel, log.FatalLevel, log.PanicLevel:
		levelColor = red
	default:
		levelColor = blue
	}

	_, file, line, ok := runtime.Caller(f.CallerLevel)
	if !ok {
		file = "unknown"
		line = 0
	}
	file = path.Base(file)
	timePrefix := ""
	if f.EnableTime {
		timePrefix = fmt.Sprintf("%s ", entry.Time.Format(timestampFormat))
	}
	pos := ""
	if f.EnablePos {
		pos = fmt.Sprintf("[%s:%d] ", file, line)
	}
	levelText := strings.ToUpper(entry.Level.String())[0:4]
	if f.EnableColor {
		levelText = fmt.Sprintf("[\x1b[%dm%s\x1b[0m] ", levelColor, levelText)
	} else {
		levelText = fmt.Sprintf("[%s] ", levelText)
	}

	fmt.Fprintf(b, "%s%s%s%-44s ", timePrefix, pos, levelText, entry.Message)
}

// setLogger 设置默认日志格式
func setLogger() {
	log.SetFormatter(&LogFormatter{
		EnableColor:     true,
		TimestampFormat: "",
		CallerLevel:     7,
	})
	log.SetOutput(os.Stdout)
}

// addLogger 内置命令，增加日志记录
func addLogger(file string, enableColor string) {
	if file == "" {
		log.Errorf("log file should not be null")
		return
	}
	ec := true
	if enableColor == "false" {
		ec = false
	}
	lfHook := lfshook.NewHook(
		file,
		&LogFormatter{
			EnableTime:      true,
			EnablePos:       true,
			EnableColor:     ec,
			TimestampFormat: "2006-01-02 15:04:05",
			CallerLevel:     12,
		})
	log.AddHook(lfHook)
}

// AddWebLogger 输出日志到WEB端
func AddWebLogger(out io.Writer) {
	lfHook := lfshook.NewHook(
		out,
		&LogFormatter{
			EnableColor:     false,
			TimestampFormat: "",
			CallerLevel:     10,
		})
	log.AddHook(lfHook)
}
