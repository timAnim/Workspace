package route

import (
	"embed"
	"html/template"
	"io"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"
	"sync"

	"xtool/pkg/utils"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func init() {
	if moduleMap == nil {
		moduleMap = make(map[string]*Module)
	}
}

var (
	mutex  sync.Mutex
	router *gin.Engine
)

func webCommomHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Content-Type", "application/json")
	}
}

//go:embed static
var static embed.FS

//go:embed templates
var templates embed.FS

func loadTemplate() (*template.Template, error) {
	t := template.New("")
	ds, err := templates.ReadDir("templates")
	if err != nil {
		return nil, err
	}
	for _, d := range ds {
		file, err := d.Info()
		if err != nil {
			return nil, err
		}
		if file.IsDir() || !strings.HasSuffix(d.Name(), ".tmpl") {
			continue
		}
		h, err := templates.Open(filepath.Join("templates", d.Name()))
		if err != nil {
			return nil, err
		}
		data, err := io.ReadAll(h)
		if err != nil {
			return nil, err
		}
		t, err = t.New(strings.Replace(d.Name(), "templates/", "", 1)).Parse(string(data))
		if err != nil {
			return nil, err
		}
	}
	return t, nil
}

// Reload 实现route的重载方法
func Reload() error {
	mutex.Lock()
	defer mutex.Unlock()
	Destroy()
	router = gin.Default()

	router.Delims("{[", "]}")

	if utils.IsExists("templates") {
		router.LoadHTMLGlob("templates/*")
	} else {
		tmpl, err := loadTemplate()
		if err != nil {
			return err
		}
		router.SetHTMLTemplate(tmpl)
	}

	if utils.IsExists("static") {
		router.Static("/static", "static")
	} else {
		sub, err := fs.Sub(static, "static")
		if err != nil {
			return err
		}
		router.StaticFS("/static", http.FS(sub))
	}

	router.Use(webCommomHandler())

	if middlewares != nil && len(middlewares) != 0 {
		for _, mid := range middlewares {
			router.Use(mid.middleware...)
			log.Infof("load middleware <%s>", mid.name)
		}
	}

	if moduleList != nil {
		for _, module := range moduleList {
			for _, r := range module.routes {
				for _, m := range r.methods {
					m.register()
					log.Infof("load module router: %10s %-8s %s ", "<"+module.name+">", "["+m.name+"]", r.relativePath)
				}
			}
		}
	}
	return nil
}

// Destroy 析构
func Destroy() error {
	router = nil
	return nil
}

// Router 获取router
func Router() *gin.Engine {
	return router
}
