package docsify

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"xtool/pkg/reg"

	"github.com/fsnotify/fsnotify"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("docsify", "watch_dir_gen_sidebar", WatchDirGenSidebar, "监听目录生成用于 docsify 的侧边栏配置 _sidebar.md", `watch_dir_gen_sidebar <dir>`, []*reg.Param{
		&reg.Param{Name: "dir", Type: "string", Necessity: true, Desc: "目录路径"},
	})
	reg.Regist("docsify", "add_sidebar_ignore", AddSidebarIgnore, "忽略侧边栏中的链接文档", `add_sidebar_ignore <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "要忽略的文件或目录"},
	})
}

// WatchDirGenSidebar 监听目录生成用于 docsify 的 _sidebar.md
func WatchDirGenSidebar(dir string) {
	if dir == "" {
		dir = "."
	}

	//http.HandleFunc("/api/docsify/upload", uploadHandler(dir))

	go func() {
		watcher, err := fsnotify.NewWatcher()
		if err != nil {
			log.Errorf("fsnotify.NewWatcher error: %s", err.Error())
			return
		}
		defer watcher.Close()

		filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
			if info.IsDir() {
				if err := watcher.Add(path); err != nil {
					log.Errorf("watcher.Add '%s' error: %s", path, err.Error())
					return err
				}
			}
			return nil
		})
		for {
			select {
			case ev := <-watcher.Events:
				//判断事件发生的类型，如下5种
				// Create 创建
				// Write 写入
				// Remove 删除
				// Rename 重命名
				// Chmod 修改权限
				if filepath.Base(ev.Name) == "_sidebar.md" {
					continue
				}

				buf := bytes.NewBuffer(make([]byte, 0, 1024))
				if err := genSidebar(watcher, buf, dir, dir, "", ""); err != nil {
					log.Warnf("genSidebar for '%s' error: %s", dir, err.Error())
					continue
				}
				if err := ioutil.WriteFile(filepath.Join(dir, "_sidebar.md"), buf.Bytes(), 0666); err != nil {
					log.Errorf("WriteFil error: %s ", err.Error())
					return
				}

			case err := <-watcher.Errors:
				log.Errorf("watcher error: %s ", err.Error())
				return
			}
		}
	}()

	//select {}
}

var sidebarIgnore = map[string]bool{
	"_sidebar.md": true,
}

// AddSidebarIgnore 忽略将要放入 _sidebar.md 的文件
func AddSidebarIgnore(filename string) {
	sidebarIgnore[filename] = true
	log.Infof("_sidebar.md ignore '%s'", filename)
}

func genSidebar(watcher *fsnotify.Watcher, buf *bytes.Buffer, rootDir string, dir string, prefix string, pIndex string) error {
	//if dir != rootDir {

	//	url := strings.TrimPrefix(filepath.Dir(dir), rootDir)
	//	buf.WriteString(fmt.Sprintf("%s- [..](%s/)\n", prefix, url))
	//}
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		return err
	}
	i := 1
	for _, f := range files {

		if _, ok := sidebarIgnore[f.Name()]; ok {
			continue
		}
		url := strings.TrimPrefix(filepath.Join(dir, f.Name()), rootDir)

		index := fmt.Sprintf("%s.%d", pIndex, i)
		if pIndex == "" {
			index = fmt.Sprintf("%d", i)
		}

		if f.IsDir() {
			buf.WriteString(fmt.Sprintf("%s* [%s %s](%s/)\n", prefix, index, f.Name(), url))

			subDir := filepath.Join(dir, f.Name())
			watcher.Add(subDir)

			if err := genSidebar(watcher, buf, rootDir, subDir, prefix+"  ", index); err != nil {
				return err
			}
		} else {
			lowerFilename := strings.ToLower(f.Name())
			if !strings.HasSuffix(lowerFilename, ".md") {
				continue
			}
			buf.WriteString(fmt.Sprintf("%s* [%s %s](%s)\n", prefix, index, strings.TrimSuffix(strings.TrimSuffix(f.Name(), ".md"), ".MD"), url))
		}
		i++
	}

	return nil
}
