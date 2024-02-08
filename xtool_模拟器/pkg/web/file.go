package web

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"xtool/pkg/route"

	"github.com/gin-gonic/gin"

	log "github.com/sirupsen/logrus"
)

func init() {
	route.GET("web", "/api/download/:filename", downloadHandler)
	route.POST("web", "/api/upload", uploadHandler)
	route.GET("web", "/api/upload", uploadPageHandler)
}

func downloadHandler(c *gin.Context) {
	filename := c.Param("filename")
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}
	defer os.Remove(filename)
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s", filename))
	c.Data(http.StatusOK, "application/octet-stream", b)
}

func uploadHandler(c *gin.Context) {

	form, err := c.MultipartForm()
	if err != nil {
		route.RenderErrMsg(c, err.Error())
		return
	}

	files := form.File["file"]
	for _, file := range files {
		c.SaveUploadedFile(file, file.Filename)
		log.Infof("SaveUploadedFile: %s", file.Filename)
	}

	//f, err := c.FormFile("file")
	//if err != nil {
	//	route.RenderErrMsg(c, err.Error())
	//	return
	//}
	//if err := c.SaveUploadedFile(f, f.Filename); err != nil {
	//	route.RenderErrMsg(c, err.Error())
	//	return
	//}
	route.RenderSuccess(c, nil)
}

func uploadPageHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "upload.tmpl", gin.H{})
}
