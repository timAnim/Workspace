package route

import (
	"embed"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("web", "restore_asset", RestoreAllAsset, "重建静态文件资源", `restore_asset`, []*reg.Param{})
}

// RestoreAllAsset 恢复静态文件，以便用于调整页面布局
func RestoreAllAsset() {
	if err := RestoreAssets(static, ".", "static"); err != nil {
		log.Errorf("restore 'static' error: %s", err.Error())
		return
	}
	log.Infof("restore 'static' success")
	if err := RestoreAssets(templates, ".", "templates"); err != nil {
		log.Errorf("restore 'templates' error: %s", err.Error())
		return
	}
	log.Infof("restore 'templates' success")
}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(efs embed.FS, dir, name string) error {
	f, err := efs.Open(_filePath(dir, name))
	if err != nil {
		return err
	}
	info, err := f.Stat()
	if err != nil {
		return err
	}
	err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
	if err != nil {
		return err
	}
	data, err := io.ReadAll(f)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
	if err != nil {
		return err
	}
	err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
	if err != nil {
		return err
	}
	return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(efs embed.FS, dir, name string) error {
	children, err := efs.ReadDir(_filePath(dir, name))
	// File
	if err != nil {
		return RestoreAsset(efs, dir, name)
	}
	// Dir
	for _, child := range children {
		err = RestoreAssets(efs, dir, _filePath(name, child.Name()))
		if err != nil {
			return err
		}
	}
	return nil
}

func _filePath(dir, name string) string {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}
