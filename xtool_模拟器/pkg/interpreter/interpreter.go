package interpreter

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"reflect"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/cmd"
	"xtool/pkg/reg"
	"xtool/pkg/sqladapter"

	"github.com/chzyer/readline"
	"github.com/cosiner/argv"
	shellquote "github.com/kballard/go-shellquote"
	log "github.com/sirupsen/logrus"
	"github.com/tealeg/xlsx"
)

func init() {
	reg.Regist("inner", "run", Run, "执行脚本文件, 若文件后缀为xlsx, 则转向执行xlsx文件", `run <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "脚本文件名"},
	})
	reg.Regist("inner", "runx", RunX, "执行excel文件中以'script'开头的sheet, 所有要执行的指令在这些表中配置，第一列为指令", `runx <xlsxFile>`, []*reg.Param{
		&reg.Param{Name: "xlsxFile", Type: "string", Necessity: true, Desc: "excel文件名"},
	})
	reg.Regist("inner", "loop", Loop, "循环执行脚本", `loop <filename> <count>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "脚本文件名"},
		&reg.Param{Name: "count", Type: "int", Necessity: false, Desc: "循环次数，默认无限循环"},
	})
	reg.Regist("inner", "time", Time, "脚本执行计时", `time <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "脚本文件名"},
	})
	reg.Regist("inner", "print", Print, "输出变量值", `print <varName>`, []*reg.Param{
		&reg.Param{Name: "varName", Type: "string", Necessity: true, Desc: "变量名，使用'$'引用"},
	})
}

var (
	prompt   = "xcli"
	paramMap = map[string]string{}
)

// call 内置命令通用调用方法
func call(fn interface{}, vars []string, params ...interface{}) {
	ft := reflect.TypeOf(fn)
	if len(vars) != 0 && ft.NumOut() != len(vars) {
		// 带返回参数，但数量不匹配的情况，提示并终止
		log.Warn("vars count not match")
		return
	}
	extra := ft.NumIn() - len(params)
	if extra > 0 {
		// 函数需求参数多余提供参数的情况
		for i := 0; i < extra; i++ {
			params = append(params, "")
		}
	} else if extra < 0 {
		// 函数需求参数少于提供的参数的情况
		log.Warn("params count not match")
		return
	}
	f := reflect.ValueOf(fn)
	in := make([]reflect.Value, len(params))
	for k, param := range params {
		//fmt.Println(param)
		in[k] = reflect.ValueOf(param)
	}
	out := f.Call(in)
	for i, k := range vars {
		paramMap[k] = out[i].String()
		paramMap["{"+k+"}"] = out[i].String()
	}
}

// Print 输出变量值
func Print(varName string) {
	fmt.Println(varName)
}

// filterInput 过滤特定输入
func filterInput(r rune) (rune, bool) {
	switch r {
	// block CtrlZ feature
	case readline.CharCtrlZ:
		return r, false
	}
	return r, true
}

// Run 内置命令，执行脚本, 若后缀为xlsx会转到RunX
func Run(script string) {
	paramMap["1"] = script
	fns := strings.Split(script, ".")
	if fns[len(fns)-1] == "xlsx" {
		RunX(script)
		return
	}
	fp, err := os.Open(script)
	if err != nil {
		log.Errorf("run script %s error: %s", script, err.Error())
		return
	}
	defer fp.Close()
	Interpret(fp)
}

// RunX 内置命令，执行excel文件
func RunX(xlsxFile string) {
	paramMap["1"] = xlsxFile
	f, err := xlsx.OpenFile(xlsxFile)
	if err != nil {
		log.Errorf("run excel file '%s' error: %s", xlsxFile, err.Error())
		return
	}
	for _, sheet := range f.Sheets {
		if !strings.HasPrefix(sheet.Name, "script") {
			log.Infof("run excel file '%s' skip none script sheet '%s'", xlsxFile, sheet.Name)
			continue
		}

		lines := []string{}
		for _, row := range sheet.Rows {
			cs := []string{}
			for _, c := range row.Cells {
				p := c.String()
				if p == "" {
					break
				}
				cs = append(cs, p)
			}
			line := shellquote.Join(cs...)
			line = strings.ReplaceAll(line, "\\$", "$")
			line = strings.ReplaceAll(line, "\\&", "&")
			line = strings.ReplaceAll(line, "\\{", "{")
			line = strings.ReplaceAll(line, "\\}", "}")
			line = strings.ReplaceAll(line, "\\>", ">")
			line = strings.ReplaceAll(line, "\\<", "<")
			lines = append(lines, line)
		}

		script := strings.Join(lines, "\n")
		fp := ioutil.NopCloser(strings.NewReader(script))
		Interpret(fp)

		log.Infof("run excel file '%s' sheet '%s' success", xlsxFile, sheet.Name)
	}
	log.Infof("run excel file '%s' success", xlsxFile)
}

// Loop 循环
func Loop(filename string, count string) {
	n, err := strconv.ParseInt(count, 10, 64)
	if err != nil {
		n = -1
	}
	for i := int64(0); i < n || n < 0; i++ {
		Run(filename)
		log.Infof("loop running times %d", i+1)
	}
}

// Time 内置命令，执行脚本, 若后缀为xlsx会转到RunX
func Time(script string) {
	t := time.Now().Unix()
	defer func() {
		log.Infof("run script '%s' used %d s", script, time.Now().Unix()-t)
	}()
	Run(script)
}

// SetPrompt 设置提示符
func SetPrompt(p string) {
	prompt = p
}

// Interpret 解释输入流
func Interpret(in io.ReadCloser) {
	readline.Stdin = in
	r, err := readline.NewEx(&readline.Config{
		Prompt:          fmt.Sprintf("\033[33m[%s ~ ]#\033[0m ", prompt),
		HistoryFile:     "/tmp/xcli.tmp",
		AutoComplete:    reg.GetCompleter(),
		InterruptPrompt: "^C",
		EOFPrompt:       "exit",

		HistorySearchFold:   true,
		FuncFilterInputRune: filterInput,
	})
	if err != nil {
		panic(err)
	}
	defer r.Close()

	//log.SetOutput(r.Stderr())
	for {
		line, err := r.Readline()
		if err == readline.ErrInterrupt {
			if len(line) == 0 {
				break
			} else {
				continue
			}
		} else if err == io.EOF {
			break
		}

		orgLine := line

		line = strings.TrimSpace(line)
		//parseLine(line)
		if len(line) == 0 {
			// 输入为空继续
			continue
		}
		if strings.HasPrefix(line, "#") {
			// 将"#"定为注释
			continue
		}
		args, err := argv.Argv([]rune(line), paramMap, argv.Run)
		if err != nil {
			// 解析错误打日志继续
			log.Error(line, err)
			continue
		}
		cs := make([]string, 0, len(args))
		for _, as := range args {
			c := shellquote.Join(as...)
			cs = append(cs, c)
		}
		line = strings.Join(cs, " | ")
		line = strings.ReplaceAll(line, "\\$", "$")
		line = strings.ReplaceAll(line, "\\&", "&")
		line = strings.ReplaceAll(line, "\\{", "{")
		line = strings.ReplaceAll(line, "\\}", "}")
		line = strings.ReplaceAll(line, "\\>", ">")
		line = strings.ReplaceAll(line, "\\<", "<")

		switch args[0][0] {
		case "select", "SELECT", "export", "EXPORT", "delete", "DELETE", "update", "UPDATE":
			sqladapter.Exec(orgLine)
			continue
		case "summary":
			ws := strings.Split(line, " ")

			if len(ws) == 1 {
				continue
			}

			cmd.Summary(strings.Join(ws[1:], " "))
			continue

		case "multi_summary":
			ws := strings.Split(line, " ")

			if len(ws) == 1 {
				continue
			}

			cmd.MultiSummary(strings.Join(ws[1:], " "))
			continue
		}

		// 分析返回值与实际参数
		vars := make([]string, 0, 5)
		rargs := make([]string, 0, 5)

		hasRet := false
		for i, a := range args[0] {
			xs := strings.Split(a, ":=")
			if len(xs) == 1 {
				vars = append(vars, a)
				continue
			}

			if len(xs) == 2 {
				if xs[0] != "" {
					vars = append(vars, xs[0])
				}
				if xs[1] != "" {
					rargs = append(rargs, xs[1])
				}
				hasRet = true
				rargs = append(rargs, args[0][i+1:]...)
				break
			}
		}

		if !hasRet {
			vars = []string{}
			rargs = args[0]
		}
		if hasRet && len(vars) == 0 {
			log.Error("variable count not match")
			continue
		}

		if fn, err := reg.GetFunc(rargs[0]); err == nil {
			params := []interface{}{}
			if len(rargs) > 1 {
				for _, param := range rargs[1:] {
					params = append(params, param)
				}
			}
			call(fn, vars, params...)
			//} else if strings.HasPrefix(line, "run") {
			//	// 对run特殊处理，放在funcMap中会出现循环调用
			//	if len(args[0]) == 1 {
			//		continue
			//	}
			//	for _, param := range args[0][1:] {
			//		Run(param)
			//	}
		} else {
			cmd.Remote(line)
		}
	}
}
