package reg

import (
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/chzyer/readline"
)

var (
	funcs []string
	// funcMap 命令方法映射
	funcMap map[string]*FuncInfo
)

func init() {
	funcMap = make(map[string]*FuncInfo)
	Regist("reg", "help", Help, "显示帮助信息", `help <command>`, []*Param{
		&Param{Name: "command", Type: "string", Necessity: false, Desc: "指令名"},
	})
}

// Param 参数信息
type Param struct {
	Name      string
	Type      string
	Necessity bool
	Desc      string
}

// FuncInfo 方法信息
type FuncInfo struct {
	Group   string
	Name    string
	Fn      interface{}
	Help    string
	Usage   string
	Params  []*Param
	RetVars []*Param
}

func search(m map[string]*FuncInfo, target string) []*FuncInfo {
	funcs := make([]*FuncInfo, 0, 10)

	for _, f := range m {
		//if strings.ContainsAny(f.Name+f.Help+f.Usage, target) {
		if strings.Contains(f.Name+f.Help+f.Usage, target) {
			funcs = append(funcs, f)
		}
	}

	return funcs
}

// Regist 注册命令行方法
func Regist(group string, name string, fn interface{}, help string, usage string, params []*Param) {
	RegistFunc(WithGroup(group), WithName(name), WithCallback(fn), WithHelp(help), WithUsage(usage), WithParams(params))
}

// RegistFunc 注册带返回参数的指令
func RegistFunc(opts ...OptFunc) {
	f := NewFunc(opts...)
	if _, ok := funcMap[f.Name]; ok {
		return
	}

	funcMap[f.Name] = f
	funcs = append(funcs, f.Name)
}

// OptFunc 可选参数
type OptFunc func(*FuncInfo)

// NewFunc 新建回调函数
func NewFunc(opts ...OptFunc) *FuncInfo {
	f := &FuncInfo{}
	for _, fn := range opts {
		fn(f)
	}
	return f
}

// WithGroup 指定指令分组
func WithGroup(group string) OptFunc {
	return func(f *FuncInfo) {
		f.Group = group
	}
}

// WithName 指定指令名
func WithName(name string) OptFunc {
	return func(f *FuncInfo) {
		f.Name = name
	}
}

// WithHelp 指定帮助信息
func WithHelp(msg string) OptFunc {
	return func(f *FuncInfo) {
		f.Help = msg
	}
}

// WithUsage 指定用法
func WithUsage(msg string) OptFunc {
	return func(f *FuncInfo) {
		f.Usage = msg
	}
}

// WithCallback 指定回调函数
func WithCallback(fn interface{}) OptFunc {
	return func(f *FuncInfo) {
		f.Fn = fn
	}
}

// WithParams 指定函数参数
func WithParams(params []*Param) OptFunc {
	return func(f *FuncInfo) {
		f.Params = params
	}
}

// WithRetVars 指定函数参数
func WithRetVars(params []*Param) OptFunc {
	return func(f *FuncInfo) {
		f.RetVars = params
	}
}

// Help 显示帮助
func Help(name string) {
	if name == "" {
		// 按group分组
		groups := []string{}
		groupMap := map[string]map[string]*FuncInfo{}
		//for k, f := range funcMap {
		for _, k := range funcs {
			f := funcMap[k]
			if _, ok := groupMap[f.Group]; ok {
				groupMap[f.Group][k] = f
			} else {
				groupMap[f.Group] = make(map[string]*FuncInfo)
				groupMap[f.Group][k] = f
				groups = append(groups, f.Group)
			}
		}
		// 显示简要帮助信息
		fmt.Printf("\033[32m所有指令, 总\033[0m %d \033[32m个:\033[0m\n", len(funcs))
		//for gn, group := range groupMap {
		for _, gn := range groups {
			group := groupMap[gn]
			fmt.Printf("  \033[36m[%s]\033[0m\n", gn)
			for k, f := range group {
				fmt.Printf("    \033[35m%s\033[0m: %s\n", k, f.Help)
			}
		}
		return
	}
	if f, ok := funcMap[name]; ok {
		fmt.Printf("指令: %s\n", f.Name)
		fmt.Printf("功能: %s\n", f.Help)

		ps := make([]string, 0, len(f.Params))
		for _, p := range f.Params {
			if p.Necessity {
				ps = append(ps, fmt.Sprintf("<%s>", p.Name))
			} else {
				ps = append(ps, fmt.Sprintf("[%s]", p.Name))
			}
		}

		if len(f.RetVars) != 0 {
			vs := make([]string, 0, len(f.RetVars))
			for _, p := range f.RetVars {
				vs = append(vs, fmt.Sprintf("<%s>", p.Name))
			}

			fmt.Printf("用法: [%s :=] %s %s\n", strings.Join(vs, " "), f.Name, strings.Join(ps, " "))
		} else {
			fmt.Printf("用法: %s %s\n", f.Name, strings.Join(ps, " "))
			//fmt.Printf("用法: %s\n", f.Usage)
		}
		fmt.Printf("参数:\n")
		for _, p := range f.Params {
			if p.Necessity == false {
				fmt.Printf("    [%s]  (%s), 可选, %s\n", p.Name, p.Type, p.Desc)
				continue
			}
			fmt.Printf("    <%s>  (%s), 必填, %s\n", p.Name, p.Type, p.Desc)
		}
		fmt.Printf("返回:\n")
		for _, p := range f.RetVars {
			fmt.Printf("    <%s>  (%s), %s\n", p.Name, p.Type, p.Desc)
		}
		return
	}

	if funcs := search(funcMap, name); len(funcs) != 0 {
		for _, f := range funcs {
			fmt.Printf("  \033[35m%s\033[0m: %s\n", f.Name, f.Help)
		}
		return
	}

	fmt.Printf("    方法 %s 未注册\n", name)
}

// listFiles 列出某目录下的文件，以用作tab补全
func listFiles(path string) func(string) []string {
	return func(line string) []string {
		names := make([]string, 0)
		files, _ := ioutil.ReadDir(path)
		for _, f := range files {
			names = append(names, f.Name())
		}
		return names
	}
}

// listFuncs 列出某目录下的文件，以用作tab补全
func listFuncs() func(string) []string {
	return func(line string) []string {
		names := make([]string, 0)
		for _, f := range funcMap {
			names = append(names, f.Name)
		}
		return names
	}
}

// GetCompleter 获取自动补全方法
func GetCompleter() *readline.PrefixCompleter {
	top := []readline.PrefixCompleterInterface{}
	cmds := []string{"python", "sh", "bash", "select", "SELECT", "delete", "DELETE", "update", "UPDATE", "export", "EXPORT"}
	for _, cmd := range cmds {
		top = append(top, readline.PcItem(cmd, readline.PcItemDynamic(listFiles("./"))))
	}
	for k, f := range funcMap {
		sub := []readline.PrefixCompleterInterface{}
		for _, p := range f.Params {
			sub = append(sub, readline.PcItem(fmt.Sprintf("<%s>", p.Name)))
		}
		sub = append(sub, readline.PcItemDynamic(listFiles("./")))
		sub = append(sub, readline.PcItemDynamic(listFuncs()))
		top = append(top, readline.PcItem(k, sub...))
	}
	completer := readline.NewPrefixCompleter(top...)
	return completer
}

// GetFunc 获取执行方法
func GetFunc(name string) (interface{}, error) {
	if f, ok := funcMap[name]; ok {
		return f.Fn, nil
	}
	return nil, fmt.Errorf("func '%s' not regist", name)
}

// GetGroupFuncs 获取方法分组
func GetGroupFuncs() map[string][]*FuncInfo {
	groupKeys := []string{}
	groupMap := map[string][]*FuncInfo{}
	for _, k := range funcs {
		f := funcMap[k]
		if _, ok := groupMap[f.Group]; ok {
			groupMap[f.Group] = append(groupMap[f.Group], f)
		} else {
			groupMap[f.Group] = []*FuncInfo{f}
			groupKeys = append(groupKeys, f.Group)
		}
	}
	_ = groupKeys

	return groupMap

}
