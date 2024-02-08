package cmd

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("picture", "pic_clip", PicClip, "图片裁剪", `pic_clip <filename> <x0> <y0> <x1> <y1>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "文件名"},
		&reg.Param{Name: "x0", Type: "int", Necessity: true, Desc: "左上角x坐标"},
		&reg.Param{Name: "y0", Type: "int", Necessity: true, Desc: "左上角y坐标"},
		&reg.Param{Name: "x1", Type: "int", Necessity: true, Desc: "右下角x坐标"},
		&reg.Param{Name: "y1", Type: "int", Necessity: true, Desc: "右下角y坐标"},
	})
	reg.Regist("picture", "pic_clip_all", PicClipAll, "图片裁剪，裁剪目录下的所有图片文件", `pic_clip_all <dir> <x0> <y0> <x1> <y1>`, []*reg.Param{
		&reg.Param{Name: "dir", Type: "string", Necessity: true, Desc: "目录名"},
		&reg.Param{Name: "x0", Type: "int", Necessity: true, Desc: "左上角x坐标"},
		&reg.Param{Name: "y0", Type: "int", Necessity: true, Desc: "左上角y坐标"},
		&reg.Param{Name: "x1", Type: "int", Necessity: true, Desc: "右下角x坐标"},
		&reg.Param{Name: "y1", Type: "int", Necessity: true, Desc: "右下角y坐标"},
	})

	reg.Regist("picture", "pic_resize", PicResize, "图片压缩", `pic_resize <filename> <maxW> <maxH>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "文件名"},
		&reg.Param{Name: "maxW", Type: "int", Necessity: true, Desc: "最大宽度"},
		&reg.Param{Name: "maxH", Type: "int", Necessity: true, Desc: "最大高度"},
	})
	reg.Regist("picture", "pic_resize_all", PicResizeAll, "图片压缩，压缩目录下的所有图片", `pic_resize_all <dir> <maxW> <maxH>`, []*reg.Param{
		&reg.Param{Name: "dir", Type: "string", Necessity: true, Desc: "目录名"},
		&reg.Param{Name: "maxW", Type: "int", Necessity: true, Desc: "最大宽度"},
		&reg.Param{Name: "maxH", Type: "int", Necessity: true, Desc: "最大高度"},
	})
}

// PicClipAll 目录中图片裁剪
func PicClipAll(dir string, x0, y0, x1, y1 string) {
	fs, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Errorf("read files in '%s' error: %s", dir, err.Error())
		return
	}

	for _, f := range fs {
		if f.IsDir() {
			continue
		}
		PicClip(filepath.Join(dir, f.Name()), x0, y0, x1, y1)
	}
}

// PicClip 图片裁剪
func PicClip(filename string, x0, y0, x1, y1 string) {
	px0, err := strconv.Atoi(x0)
	if err != nil {
		log.Errorf("can't convert x0: '%s' to int", x0)
		return
	}

	py0, err := strconv.Atoi(y0)
	if err != nil {
		log.Errorf("can't convert y0: '%s' to int", y0)
		return
	}

	px1, err := strconv.Atoi(x1)
	if err != nil {
		log.Errorf("can't convert x1: '%s' to int", x1)
		return
	}

	py1, err := strconv.Atoi(y1)
	if err != nil {
		log.Errorf("can't convert y1: '%s' to int", y1)
		return
	}

	fin, err := os.Open(filename)
	if err != nil {
		log.Errorf("can't open file '%s'", filename)
		return
	}
	defer fin.Close()

	if !utils.IsExists("cliped") {
		err := os.Mkdir("cliped", 0755)
		if err != nil {
			log.Errorf("mkdir cliped error: %s", err.Error())
			return
		}
	}

	dst := filepath.Join("cliped", fin.Name())
	fout, err := os.Create(dst)
	if err != nil {
		log.Errorf("can't create file '%s'", dst)
		return
	}
	defer fout.Close()

	err = utils.Clip(fin, fout, px0, py0, px1, py1, 0)
	if err != nil {
		log.Errorf("can't clip file '%s', error: %s", filename, err.Error())
		return
	}
	log.Infof("clip file '%s' as '%s' success", filename, dst)
}

// PicResizeAll 目录中图片压缩
func PicResizeAll(dir string, maxW string, maxH string) {
	fs, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Errorf("read files in '%s' error: %s", dir, err.Error())
		return
	}

	for _, f := range fs {
		if f.IsDir() {
			continue
		}
		PicResize(filepath.Join(dir, f.Name()), maxW, maxH)
	}
}

// PicResize 图片压缩
func PicResize(filename string, maxW string, maxH string) {
	w, err := strconv.Atoi(maxW)
	if err != nil {
		log.Errorf("can't convert maxW: '%s' to int", maxW)
		return
	}

	h, err := strconv.Atoi(maxH)
	if err != nil {
		log.Errorf("can't convert maxH: '%s' to int", maxH)
		return
	}

	fin, err := os.Open(filename)
	if err != nil {
		log.Errorf("can't open file '%s'", filename)
		return
	}
	defer fin.Close()

	if !utils.IsExists("resized") {
		err := os.Mkdir("resized", 0755)
		if err != nil {
			log.Errorf("mkdir resized error: %s", err.Error())
			return
		}
	}

	dst := filepath.Join("resized", fin.Name())
	fout, err := os.Create(dst)
	if err != nil {
		log.Errorf("can't create file '%s'", dst)
		return
	}
	defer fout.Close()

	err = utils.Scale(fin, fout, w, h, 0)
	if err != nil {
		log.Errorf("resize file '%s' error: %s", filename, err.Error())
		return
	}
	log.Infof("resize file '%s' success", filename)
}
