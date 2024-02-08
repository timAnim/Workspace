package web

import (
	"xtool/pkg/auth"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"
)

func init() {
	route.GET("web", "/api/auth/info", authInfoHandler)
}
func authInfoHandler(c *gin.Context) {
	host := auth.GetHost()
	account := auth.GetAccount()
	password := auth.GetPassword()
	route.RenderSuccess(c, gin.H{
		"host":     host,
		"account":  account,
		"password": password,
	})
}
