package web

import (
	"io"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
	"xtool/pkg/interpreter"
	"xtool/pkg/logger"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	log "github.com/sirupsen/logrus"
)

func init() {
	route.GET("web", "/api/cmdline", cmdlineHandler)
	route.GET("web", "/api/log", logHandler)
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:   1024,
	WriteBufferSize:  1024,
	HandshakeTimeout: 5 * time.Second,
	// 取消ws跨域校验
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func cmdlineHandler(c *gin.Context) {
	func(w http.ResponseWriter, r *http.Request) {
		var conn *websocket.Conn
		var err error
		conn, err = wsupgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Errorf("Failed to set websocket upgrade: %+v", err)
			return
		}

		// 必须死循环，gin通过协程调用该handler函数，一旦退出函数，ws会被主动销毁
		for {
			// receive
			_, line, err := conn.ReadMessage()
			if err != nil {
				break
			}
			interpreter.Interpret(ioutil.NopCloser(strings.NewReader(string(line))))
		}
	}(c.Writer, c.Request)
}

type logWriter struct {
	conn *websocket.Conn
	rp   io.PipeReader
	wp   io.PipeWriter
}

// Write 往流中写数据
func (lw *logWriter) Write(p []byte) (int, error) {
	if lw.conn == nil {
		return len(p), nil
	}
	err := lw.conn.WriteMessage(websocket.TextMessage, p)
	return len(p), err
}

// Write 往流中写数据
func (lw *logWriter) SetOutput(conn *websocket.Conn) {
	if lw.conn != nil {
		lw.conn.Close()
	}
	lw.conn = conn
}

var (
	webLogger *logWriter
)

func logHandler(c *gin.Context) {
	func(w http.ResponseWriter, r *http.Request) {
		var conn *websocket.Conn
		var err error
		conn, err = wsupgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Errorf("Failed to set websocket upgrade: %+v", err)
			return
		}
		if webLogger == nil {
			webLogger = &logWriter{}
			logger.AddWebLogger(webLogger)
		}
		webLogger.SetOutput(conn)
		// 必须死循环，gin通过协程调用该handler函数，一旦退出函数，ws会被主动销毁
		for {
			// receive
			_, line, err := conn.ReadMessage()
			if err != nil {
				break
			}
			interpreter.Interpret(ioutil.NopCloser(strings.NewReader(string(line))))
		}
	}(c.Writer, c.Request)
}
