package cmd

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net"
	"os"
	"os/exec"
	"os/signal"
	"path"
	"runtime"
	"runtime/debug"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"
	"xtool/pkg/reg"

	"xtool/pkg/scp"

	log "github.com/sirupsen/logrus"

	"golang.org/x/crypto/ssh"
)

func init() {
	cliMutex = &sync.Mutex{}
	reg.Regist("inner", "vi", Vim, "启用vim编辑器", `vim <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "文件名"},
	})
	reg.Regist("inner", "vim", Vim, "启用vim编辑器", `vim <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "文件名"},
	})
	reg.Regist("inner", "vimdiff", VimDiff, "使用vimdiff查看文件差异", `vimdiff <filename1> <filename2>`, []*reg.Param{
		&reg.Param{Name: "filename1", Type: "string", Necessity: true, Desc: "文件名1"},
		&reg.Param{Name: "filename2", Type: "string", Necessity: true, Desc: "文件名2"},
	})
	reg.Regist("inner", "sleep", Sleep, "延时", `sleep <duration>`, []*reg.Param{
		&reg.Param{Name: "duration", Type: "int", Necessity: true, Desc: "等待时长"},
	})
	reg.Regist("inner", "clear", Clear, "清屏", `clear`, []*reg.Param{})
	reg.Regist("inner", "exit", Exit, "退出命令行界面", `exit`, []*reg.Param{})
	reg.Regist("inner", "done", Done, "等待批量任务完成", `done`, []*reg.Param{})
	reg.Regist("inner", "wait", Wait, "等待进程退出", `wait`, []*reg.Param{})
	reg.Regist("inner", "check", Check, "检查连接状态", `check`, []*reg.Param{})

	reg.Regist("inner", "local", Local, "在无ssh连接的情况下执行本地指令，注意指令无上下文", `local <cmd>`, []*reg.Param{
		&reg.Param{Name: "cmd", Type: "string", Necessity: true, Desc: "本地指令"},
	})

	reg.Regist("inner", "summary", Summary, "在执行远程指令的基础上，在输出结果前添加对应的远程服务器IP", `summary <cmd>`, []*reg.Param{
		&reg.Param{Name: "cmd", Type: "string", Necessity: true, Desc: "远程指令"},
	})

	reg.Regist("inner", "multi_summary", MultiSummary, "并发在执行远程指令的基础上，在输出结果前添加对应的远程服务器IP", `summary <cmd>`, []*reg.Param{
		&reg.Param{Name: "cmd", Type: "string", Necessity: true, Desc: "远程指令"},
	})

	reg.Regist("conn", "connect", Connect, "连接远程主机", `connect <username> <password> <host> <port> <timeout>`, []*reg.Param{
		&reg.Param{Name: "username", Type: "string", Necessity: true, Desc: "用户名"},
		&reg.Param{Name: "password", Type: "string", Necessity: true, Desc: "密码"},
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "服务器地址"},
		&reg.Param{Name: "port", Type: "int", Necessity: false, Desc: "sshd服务端口, 默认 22"},
		&reg.Param{Name: "timeout", Type: "int", Necessity: false, Desc: "连接超时时间(单位 s), 默认 5 "},
	})
	reg.Regist("conn", "release", Release, "释放远程连接", `release <host>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "服务器地址"},
	})
	reg.Regist("conn", "release_all", ReleaseAll, "释放所有远程连接", `release_all`, []*reg.Param{})

	//reg.Regist("file", "set_download_dir", SetDownloadDir, "设置本地下载目录", `set_download_dir <dir> [format]`, []*reg.Param{
	//	&reg.Param{Name: "dir", Type: "string", Necessity: false, Desc: "本地目录，默认 download，路径中使用的${date}会被替换成时间"},
	//	&reg.Param{Name: "format", Type: "string", Necessity: false, Desc: "时间目录名的格式，默认：'20060102_150405'"},
	//})

	reg.Regist("file", "get", Get, "批量下载文件, 本操作会将文件下载到执行目录下的download目录下服务器地址对应目录中", `get <remotePath> [dir]`, []*reg.Param{
		&reg.Param{Name: "remotePath", Type: "string", Necessity: true, Desc: "远程文件路径"},
		&reg.Param{Name: "dir", Type: "string", Necessity: false, Desc: "本地目录，默认 download，路径中使用的${date}会被替换成时间"},
	})
	reg.Regist("file", "put", PutX, "批量上传文件, 若本地文件路径使用'@/<文件名>'的形式, 则会从'download/<host>'目录中去找对应文件，用于上传使用get下载的文件，另，对于'$&'的处理同putx", `put <filePath> <remoteDir>`, []*reg.Param{
		&reg.Param{Name: "filePath", Type: "string", Necessity: true, Desc: "本地文件路径, 若使用'@/<文件名>'的形式, 则会从'download/<host>'目录中去找对应文件，用于上传使用get下载的文件"},
		&reg.Param{Name: "remoteDir", Type: "string", Necessity: false, Desc: "远程目录, 默认用户home目录, 如: /root/"},
	})
	reg.Regist("file", "putx", PutX, "批量上传文件, 功能拓展版, 支持使用 '$&' 在参数中引用对应的服务器地址(&使用了取地址的概念), 如: putx download/$&.tgz, 效果与 put @/<文件名> 相同，但用法更灵活", `putx <filePath> <remoteDir>`, []*reg.Param{
		&reg.Param{Name: "filePath", Type: "string", Necessity: true, Desc: "本地文件路径, 会将路径中的'$&' 替换成对应的<host>"},
		&reg.Param{Name: "remoteDir", Type: "string", Necessity: false, Desc: "远程目录, 默认用户home目录, 如: /root/"},
	})
	reg.RegistFunc(
		reg.WithGroup("inner"),
		reg.WithName("datetime"),
		reg.WithCallback(Datetime),
		reg.WithHelp("按指定格式生成时间戳，以便用于后续指令"),
		reg.WithUsage("datetime <format>"),
		reg.WithParams([]*reg.Param{
			&reg.Param{Name: "format", Type: "string", Necessity: false, Desc: "时间格式，默认: '20060102_150405'"},
		}),
		reg.WithRetVars([]*reg.Param{
			&reg.Param{Name: "result", Type: "string", Desc: "生成的时间字符串"},
		}),
	)
	reg.RegistFunc(
		reg.WithGroup("inner"),
		reg.WithName("shell"),
		reg.WithCallback(Shell),
		reg.WithHelp("执行shell指令，并将结果字符串返回，注意，只支持linux系统"),
		reg.WithUsage("shell <cmd>"),
		reg.WithParams([]*reg.Param{
			&reg.Param{Name: "cmd", Type: "string", Necessity: true, Desc: "shell命令行"},
		}),
		reg.WithRetVars([]*reg.Param{
			&reg.Param{Name: "result", Type: "string", Desc: "shell的执行结果"},
		}),
	)

}

// Client 一个ssh客户端的相关参数集合
type Client struct {
	Cli      *ssh.Client
	HomePath string
	Arch     string
}

var (
	cliMutex *sync.Mutex
	cliMap   = map[string]*Client{}
	wg       sync.WaitGroup
)

// 启动一个并行任务
func launch(f func()) {
	wg.Add(1)
	go func() {
		defer wg.Done()
		f()
	}()
}

// Done 内置命令，等待并行任务完成
func Done() {
	wg.Wait()
	log.Info("multi command done")
}

// Wait 等待信号
func Wait() {
	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	log.Info("received signal:", <-ch)
}

// Sleep 内置命令, 延时指令
func Sleep(duration string) {
	d, err := strconv.Atoi(duration)
	if err != nil {
		d = 1
	}
	time.Sleep(time.Duration(d) * time.Second)
	log.Infof("slept %d second(s)", d)
}

// Connect 内置命令，连接服务器
func Connect(user, password, host, port, timeout string) {
	launch(func() {
		defer func() {
			if err := recover(); err != nil {
				log.Fatalf("connect [%s] error: %v", host, err)
			}
		}()
		// 此处为了防止建立连接耗时过长的情况，另开一个线程去处理
		if _, ok := cliMap[host]; ok {
			// 已连接的服务器不再重复连接
			log.Infof("[%s] connected", host)
			return
		}
		if port == "" {
			port = "22"
		}
		if timeout == "" {
			timeout = "5"
		}
		t, err := strconv.Atoi(timeout)
		if err != nil {
			log.Errorf("[%s] convert timeout to int error: %s", host, err.Error())
			return
		}

		tCtx, tCancel := context.WithTimeout(context.Background(), time.Duration(t+3)*time.Second)
		//defer tCancel()

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		go func() {
			select {
			case <-tCtx.Done():
				// 连接超时退出
				log.Errorf("[%s] connect timeout", host)
				return
			case <-ctx.Done():
				// 正常退出
				tCancel()
				return
			}
		}()

		var (
			auth         []ssh.AuthMethod
			addr         string
			clientConfig *ssh.ClientConfig
			client       *ssh.Client
			//session      *ssh.Session
			//err error
		)
		// get auth method
		auth = make([]ssh.AuthMethod, 0)
		auth = append(auth, ssh.Password(password))

		clientConfig = &ssh.ClientConfig{
			User:    user,
			Auth:    auth,
			Timeout: time.Duration(t) * time.Second,
			HostKeyCallback: func(hostname string, remote net.Addr, key ssh.PublicKey) error {
				return nil
			},
		}

		addr = fmt.Sprintf("%s:%s", host, port)

		if client, err = ssh.Dial("tcp", addr, clientConfig); err != nil {
			log.Errorf("[%s] ssh Dial error: %s", host, err)
			return
		}
		homePath := []byte("")
		{
			session, err := client.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s", host, err.Error())
				return
			}
			homePath, err = session.Output("pwd")
			if err != nil {
				log.Errorf("[%s] get home path error: %s", host, err.Error())
				return
			}
		}
		arch := []byte("")
		{
			session, err := client.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s", host, err.Error())
				return
			}
			arch, err = session.Output("uname -a")
			if err != nil {
				log.Errorf("[%s] get hardwar error: %s", host, err.Error())
				return
			}
		}
		if strings.Contains(string(arch), "x86") {
			arch = []byte("x86")
		} else if strings.Contains(string(arch), "arm") {
			arch = []byte("arm")
		}
		//session.Stdout = os.Stdout
		cli := &Client{
			Cli:      client,
			HomePath: strings.TrimSpace(string(homePath)),
			Arch:     strings.TrimSpace(string(arch)),
		}

		cliMutex.Lock()
		defer cliMutex.Unlock()
		cliMap[host] = cli
		log.Infof("[%s] connect success", host)
	})
}

// Release 内置命令，释放连接
func Release(host string) {
	if client, ok := cliMap[host]; ok {
		err := client.Cli.Close()
		if err != nil {
			log.Warnf("[%s] close error: %s", host, err)
		}
		delete(cliMap, host)
		log.Warnf("[%s] released", host)
		return
	}
	log.Warnf("[%s] has not connected yet", host)
}

// ReleaseAll 内置命令，释放所有连接
func ReleaseAll() {
	for host, client := range cliMap {
		err := client.Cli.Close()
		if err != nil {
			log.Errorf("[%s] close error: %s", host, err.Error())
			continue
		}
		delete(cliMap, host)
		log.Infof("[%s] released", host)
	}
}

// Put 内置命令，批量上传文件
func Put(file string, dstDir string) {
	//fmt.Println("func put:", file, dstDir)
	for host, client := range cliMap {
		wg.Add(1)
		go func(host string, client *Client, file, dstDir string) {
			defer wg.Done()
			toDir := dstDir
			if toDir == "" {
				toDir = client.HomePath
			}
			remoteFileName := path.Base(file)
			remotePath := path.Join(toDir, remoteFileName)
			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s", host, err.Error())
				return
			}
			// 针对下载的备份做特殊处理
			file = strings.Replace(file, "@", fmt.Sprintf("download/%s", host), -1)
			//err = scp.CopyPath(file, remotePath, session)
			err = scp.CopyToRemote(session, file, remotePath)
			if err != nil {
				log.Errorf("[%s] scp file %s error: %s", host, file, err)
				return
			}
			log.Infof("[%s] put file [%s] to [%s] success", host, file, remotePath)
		}(host, client, file, dstDir)
	}
	Done()
}

// PutX 内置命令，批量上传文件，参数中$&使用<host>替换
func PutX(file string, dstDir string) {
	//fmt.Println("func put:", file, dstDir)
	for host, client := range cliMap {
		wg.Add(1)
		go func(host string, client *Client, file, dstDir string) {
			defer wg.Done()
			toDir := dstDir
			if toDir == "" {
				toDir = client.HomePath
			}
			// 针对下载的备份做特殊处理，兼容put
			file = strings.Replace(file, "@", fmt.Sprintf("download/%s", host), -1)

			// 参数中引用服务器IP的情况
			file = strings.Replace(file, "$&", host, -1)
			// 参数中引用服务器硬件信息的情况
			file = strings.Replace(file, "${arch}", client.Arch, -1)

			remoteFileName := path.Base(file)
			remotePath := path.Join(toDir, remoteFileName)
			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s", host, err.Error())
				return
			}
			// 针对下载的备份做特殊处理
			//file = strings.Replace(file, "@", fmt.Sprintf("download/%s", host), -1)
			//err = scp.CopyPath(file, remotePath, session)
			err = scp.CopyToRemote(session, file, remotePath)
			if err != nil {
				log.Errorf("[%s] scp file %s error: %s", host, file, err)
				return
			}
			log.Infof("[%s] put file [%s] to [%s] success", host, file, remotePath)
		}(host, client, file, dstDir)
	}
	Done()
}

var (
	downloadDir = "download"
	//dateFormat  = "20060102_150405"
)

//// SetDownloadDir 设置下载目录
//func SetDownloadDir(dir string, format string) {
//	if format != "" {
//		dateFormat = format
//	}
//	if dir != "" {
//		downloadDir = strings.ReplaceAll(dir, "${date}", time.Now().Format(dateFormat))
//	}
//	log.Infof("set_download_dir to '%s' success", downloadDir)
//}

// Get 内置命令，批量下载文件
func Get(file string, dir string) {
	if dir == "" {
		dir = downloadDir
	}
	//dir = strings.ReplaceAll(dir, "${date}", time.Now().Format(dateFormat))

	for host, client := range cliMap {
		wg.Add(1)
		go func(host string, client *Client, file string) {
			defer wg.Done()
			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s", host, err)
				return
			}
			// 参数中引用服务器IP的情况
			file = strings.Replace(file, "$&", host, -1)

			localDir := path.Join(".", dir, host)
			localFileName := path.Base(file)
			os.MkdirAll(localDir, 0666)
			localPath := path.Join(localDir, localFileName)
			err = scp.CopyFromRemote(session, file, localPath)
			if err != nil {
				log.Errorf("[%s] copy from remote error: %s", host, err)
				return
			}
			log.Infof("[%s] get file [%s] to [%s] success", host, file, localPath)
		}(host, client, file)
	}
	Done()
}

// Check 内置命令，检测已建立连接
func Check() {
	for host := range cliMap {
		log.Infof("[%s] connecting", host)
	}

	log.Infof("%d hosts is connecting", len(cliMap))
}

// Datetime 获取时间戳
func Datetime(format string) string {
	if format == "" {
		format = "20060102_150405"
	}
	r := time.Now().Format(format)
	log.Infof("datetime result: '%s'", r)
	return r
}

// Shell 执行指令，获取返回结果
func Shell(cmd string) string {
	in := strings.NewReader(cmd)
	out := bytes.NewBuffer(make([]byte, 0, 1024))
	c := exec.Command("sh")
	c.Stdin = in
	c.Stdout = out

	err := c.Run()
	if err != nil {
		log.Errorf("shell command: [%s] error: %s", cmd, err.Error())
		return ""
	}
	r := out.String()
	r = strings.TrimSpace(r)
	log.Infof("shell command: [%s] success, result: %s", cmd, r)
	return r
}

// Local 执行本地命令
func Local(cmd string) {
	// 注意，cmd整体为一条指令
	in := strings.NewReader(cmd)
	c := exec.Command("sh")
	c.Stdin = in
	c.Stdout = os.Stdout

	err := c.Run()
	if err != nil {
		log.Errorf("local command: [%s] error: %s", cmd, err.Error())
		return
	}
	log.Infof("local command: [%s] success", cmd)
}

// PrefixWriter 前缀输出
type PrefixWriter struct {
	prefix string
	w      io.Writer
}

// NewPrefixWriter 新建前缀输出
func NewPrefixWriter(prefix string, w io.Writer) *PrefixWriter {
	pw := &PrefixWriter{
		prefix: prefix,
		w:      w,
	}

	pw.Write([]byte(prefix + " "))
	return pw
}

// Write 写入
func (pw *PrefixWriter) Write(p []byte) (int, error) {
	n := len(p)
	s := string(p)
	s = strings.Replace(s, "\n", "\n"+pw.prefix+" ", -1)

	_, err := pw.w.Write([]byte(s))
	if err != nil {
		return 0, err
	}

	return n, nil
}

// RSession 单个远程命令的执行session
type RSession struct {
	host string
	cmd  string
	out  io.ReadWriter
}

// NewRSession 新建远程执行session
func NewRSession(host string, cmd string) *RSession {
	rs := &RSession{
		host: host,
		cmd:  cmd,
	}
	rs.out = bytes.NewBuffer(make([]byte, 1024))
	return rs
}

// MultiSummary 内置命令，批量远程执行，在每行输出结果前加上服务器IP，便于使用shell指令分析
func MultiSummary(cmd string) {
	stopCh := make(chan bool)
	defer close(stopCh)
	rsCh := make(chan *RSession, len(cliMap))
	go func() {
		defer close(rsCh)
		for {
			select {
			case rs := <-rsCh:
				if rs.host == "" {
					log.Infof("multi_summary remote command [%s] done", cmd)
					stopCh <- true
					break
				}

				log.Infof("\033[36m>>>>>>>>>>>>>>> %s [%s] <<<<<<<<<<<<<<<\033[0m", rs.host, rs.cmd)
				io.Copy(os.Stdout, rs.out)
				os.Stdout.Write([]byte{'\n'})

				log.Infof("[%s] summary remote command [%s] success\n", rs.host, rs.cmd)
			}
		}
	}()

	for host, client := range cliMap {
		wg.Add(1)
		go func(host string, client *Client) {
			defer wg.Done()

			tmpCmd := strings.Replace(cmd, "$&", host, -1)

			defer func() {
				if err := recover(); err != nil {
					log.Fatalf("[%s] summary remote command [%s] failed\n FATAL ERROR: %v\n %s\n", host, tmpCmd, err, string(debug.Stack()))
				}
			}()

			//log.Infof("\033[36m>>>>>>>>>>>>>>> %s [%s] <<<<<<<<<<<<<<<\033[0m", host, cmd)

			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s\n", host, err.Error())
				return
			}
			defer session.Close()

			rs := NewRSession(host, tmpCmd)

			o := NewPrefixWriter(host, rs.out)
			//session.Stdin = os.Stdin
			session.Stdout = o
			//session.Stderr = os.Stderr

			err = session.Run(tmpCmd)
			if err != nil {
				// 此次执行有错误
				log.Errorf("[%s] summary remote command [%s] failed: %s\n", host, tmpCmd, err.Error())
				return
			}
			// 最后换行一次
			//log.Infof("[%s] summary remote command [%s] success\n", host, cmd)

			rsCh <- rs

		}(host, client)
	}
	Done()
	rsCh <- NewRSession("", "")
	<-stopCh
	log.Infof("multi exec remote command [%s] done", cmd)
}

// Summary 内置命令，批量远程执行，在每行输出结果前加上服务器IP，便于使用shell指令分析
func Summary(cmd string) {
	for host, client := range cliMap {
		func() {
			defer func() {
				if err := recover(); err != nil {
					log.Fatalf("[%s] summary remote command [%s] failed\n FATAL ERROR: %v\n %s\n", host, cmd, err, string(debug.Stack()))
				}
			}()

			log.Infof("\033[36m>>>>>>>>>>>>>>> %s [%s] <<<<<<<<<<<<<<<\033[0m", host, cmd)

			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s\n", host, err.Error())
				return
			}
			defer session.Close()

			o := NewPrefixWriter(host, os.Stdout)
			//session.Stdin = os.Stdin
			session.Stdout = o
			//session.Stderr = os.Stderr

			tmpCmd := strings.Replace(cmd, "$&", host, -1)

			err = session.Run(tmpCmd)
			if err != nil {
				// 此次执行有错误
				log.Errorf("[%s] summary remote command [%s] failed: %s\n", host, tmpCmd, err.Error())
				return
			}
			// 最后换行一次
			os.Stdout.Write([]byte{'\n'})
			log.Infof("[%s] summary remote command [%s] success\n", host, tmpCmd)
		}()
	}
}

// Remote 内置命令，批量远程执行
func Remote(cmd string) {
	if len(cliMap) == 0 {
		// 在无ssh连接的情况下执行本地命令
		log.Infof("\033[36m>>>>>>>>>>>>>>> no connected host, local: [%s] <<<<<<<<<<<<<<<\033[0m", cmd)
		Local(cmd)
		return
	}

	stopCh := make(chan bool)
	defer close(stopCh)
	rsCh := make(chan *RSession, len(cliMap))
	go func() {
		defer close(rsCh)
		for {
			select {
			case rs := <-rsCh:
				if rs.host == "" {
					log.Infof("remote command [%s] done", cmd)
					stopCh <- true
					break
				}

				log.Infof("\033[36m>>>>>>>>>>>>>>> %s [%s] <<<<<<<<<<<<<<<\033[0m", rs.host, rs.cmd)
				io.Copy(os.Stdout, rs.out)
				os.Stdout.Write([]byte{'\n'})

				log.Infof("[%s] remote command [%s] success\n", rs.host, rs.cmd)
			}
		}
	}()
	for host, client := range cliMap {
		wg.Add(1)
		go func(host string, client *Client) {
			defer wg.Done()
			tmpCmd := strings.Replace(cmd, "$&", host, -1)

			defer func() {
				if err := recover(); err != nil {
					log.Fatalf("[%s] remote command [%s] failed\n FATAL ERROR: %v\n %s\n", host, tmpCmd, err, string(debug.Stack()))
				}
			}()

			//log.Infof("\033[36m>>>>>>>>>>>>>>> %s [%s] <<<<<<<<<<<<<<<\033[0m", host, cmd)

			session, err := client.Cli.NewSession()
			if err != nil {
				log.Errorf("[%s] get session error: %s\n", host, err.Error())
				return
			}
			defer session.Close()

			rs := NewRSession(host, tmpCmd)

			session.Stdout = rs.out

			err = session.Run(tmpCmd)
			if err != nil {
				// 此次执行有错误
				log.Errorf("[%s] remote command [%s] failed: %s\n", host, tmpCmd, err.Error())
				return
			}
			//log.Infof("[%s] remote command [%s] success\n", host, cmd)
			rsCh <- rs

		}(host, client)
	}

	Done()
	rsCh <- NewRSession("", "")
	<-stopCh
	log.Infof("exec remote command [%s] done", cmd)
}

// Clear 内置命令，清屏
func Clear() {
	if runtime.GOOS == "windows" {
		cmd := exec.Command("cmd", "/c", "cls")
		cmd.Stdout = os.Stdout
		cmd.Run()
	} else {
		cmd := exec.Command("clear")
		cmd.Stdout = os.Stdout
		cmd.Run()
	}
}

// Vim 打开vim编辑器
func Vim(filename string) {
	if runtime.GOOS != "windows" {
		cmd := exec.Command("vim", filename)
		cmd.Stdout = os.Stdout
		cmd.Stdin = os.Stdin
		err := cmd.Run()
		if err != nil {
			log.Errorf("open vim failed, error: %s", err.Error())
			return
		}
		log.Infof("vim edit success")
	} else {
		log.Warnf("windows does not support vim")
	}
}

// VimDiff 使用 vimdiff 查看差别
func VimDiff(filename1 string, filename2 string) {
	if runtime.GOOS != "windows" {
		cmd := exec.Command("vimdiff", filename1, filename2)
		cmd.Stdout = os.Stdout
		cmd.Stdin = os.Stdin
		err := cmd.Run()
		if err != nil {
			log.Errorf("open vimdiff failed, error: %s", err.Error())
			return
		}
		log.Infof("vimdiff edit success")
	} else {
		log.Warnf("windows does not support vimdiff")
	}
}

// Exit 退出mssh命令行
func Exit() {
	for host, client := range cliMap {
		err := client.Cli.Close()
		if err != nil {
			log.Errorf("[%s] close error: %s", host, err.Error())
			continue
		}
		log.Infof("[%s] closed", host)
	}
	os.Exit(0)
}
