package web

import (
	"io/ioutil"
	"strings"
	"xtool/pkg/interpreter"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"
	shellquote "github.com/kballard/go-shellquote"
)

func init() {
	route.POST("web", "/api/exec", execHandler)
}

// CmdLine 命令行
type CmdLine struct {
	Cmd    string   `json:"cmd"`
	Params []string `json:"params"`
}

func execHandler(c *gin.Context) {
	line := CmdLine{}
	err := c.BindJSON(&line)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}

	args := []string{line.Cmd}
	args = append(args, line.Params...)

	b := shellquote.Join(args...)
	interpreter.Interpret(ioutil.NopCloser(strings.NewReader(b)))

	route.RenderSuccess(c, gin.H{"exec": "ok"})
}
