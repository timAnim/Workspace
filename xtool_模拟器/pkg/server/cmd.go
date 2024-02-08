package server

import (
	"fmt"
	"xtool/pkg/define"

	"github.com/gin-gonic/gin"
)

func cmdHandler(c *gin.Context) {
	req := define.M{}
	err := c.BindJSON(&req)
	if err != nil {
		RenderErrMsg(c, err.Error())
		return
	}
	fmt.Println(req)
	RenderSuccess(c, req)
}
