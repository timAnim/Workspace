package route

import "github.com/gin-gonic/gin"

var middlewares []*Mid

// Mid 中间件结构定义
type Mid struct {
	name       string
	middleware []gin.HandlerFunc
}

// Use 增加中间件
func Use(name string, middleware ...gin.HandlerFunc) {
	mid := &Mid{
		name:       name,
		middleware: middleware,
	}
	middlewares = append(middlewares, mid)
}
