package route

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// 封装接口, 用于做接口参数说明

var (
	moduleList []*Module
	moduleMap  map[string]*Module
)

// Module 模块结构
type Module struct {
	name     string
	routes   []*Route
	routeMap map[string]*Route
}

func (m *Module) addRoute(relativePath string, method string, handlers ...gin.HandlerFunc) {
	if m.routeMap == nil {
		m.routeMap = make(map[string]*Route)
	}
	if r, ok := m.routeMap[relativePath]; ok {
		r.addMethod(method, handlers...)
		return
	}
	r := &Route{
		relativePath: relativePath,
		module:       m,
	}
	r.addMethod(method, handlers...)
	m.routes = append(m.routes, r)
	m.routeMap[relativePath] = r
}

// Route 路由结构
type Route struct {
	relativePath string
	methods      []*Method
	methodMap    map[string]*Method
	module       *Module
}

func (r *Route) addMethod(name string, handlers ...gin.HandlerFunc) {
	if r.methodMap == nil {
		r.methodMap = make(map[string]*Method)
	}
	if method, ok := r.methodMap[name]; ok {
		log.Warnf("module '%s' [%s] %s is registed", r.module.name, method.name, r.relativePath)
		return
	}
	method := &Method{
		name:     name,
		handlers: handlers,
		r:        r,
	}
	//method.register()
	r.methods = append(r.methods, method)
	r.methodMap[name] = method
}

// Method 方法结构
type Method struct {
	name     string
	handlers []gin.HandlerFunc
	r        *Route
}

func (m *Method) register() {
	switch m.name {
	case "GET":
		router.GET(m.r.relativePath, m.handlers...)
	case "POST":
		router.POST(m.r.relativePath, m.handlers...)
	case "PUT":
		router.PUT(m.r.relativePath, m.handlers...)
	case "DELETE":
		router.DELETE(m.r.relativePath, m.handlers...)
	default:
	}
}

func registModule(module string, relativePath string, method string, handlers ...gin.HandlerFunc) {
	mutex.Lock()
	defer mutex.Unlock()
	if m, ok := moduleMap[module]; ok {
		m.addRoute(relativePath, method, handlers...)
		return
	}
	m := &Module{
		name: module,
	}
	m.addRoute(relativePath, method, handlers...)
	moduleList = append(moduleList, m)
	moduleMap[module] = m
}

// GET 路由GET的装饰器, 用于注册GET接口
func GET(module string, relativePath string, handlers ...gin.HandlerFunc) {
	registModule(module, relativePath, "GET", handlers...)
}

// POST 路由POST的装饰器, 用于注册POST接口
func POST(module string, relativePath string, handlers ...gin.HandlerFunc) {
	registModule(module, relativePath, "POST", handlers...)
}

// PUT 路由PUT的装饰器, 用于注册PUT接口
func PUT(module string, relativePath string, handlers ...gin.HandlerFunc) {
	registModule(module, relativePath, "PUT", handlers...)
}

// DELETE 路由DELETE的装饰器, 用于注册DELETE接口
func DELETE(module string, relativePath string, handlers ...gin.HandlerFunc) {
	registModule(module, relativePath, "DELETE", handlers...)
}
