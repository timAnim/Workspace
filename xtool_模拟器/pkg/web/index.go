package web

import (
	"net/http"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"
)

func init() {
	route.GET("web", "/", indexHandler)
}

func indexHandler(c *gin.Context) {
	//groups := reg.GetGroupFuncs()
	c.HTML(http.StatusOK, "index.tmpl", gin.H{})
}
