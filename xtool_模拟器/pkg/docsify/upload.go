package docsify

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"xtool/pkg/utils"

	log "github.com/sirupsen/logrus"
)

func uploadHandler(dir string) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		f, fh, err := req.FormFile("file")
		if err != nil {
			utils.HTTPRenderErrMsg(w, err.Error())
			return
		}

		tmpFile := filepath.Join("/tmp", fh.Filename)
		fp, err := os.Create(tmpFile)
		if err != nil {
			utils.HTTPRenderErrMsg(w, err.Error())
			return
		}
		defer fp.Close()

		io.Copy(fp, f)

		ext := filepath.Ext(tmpFile)

		switch ext {
		case ".tgz":
			cmd := fmt.Sprintf("tar -xf '%s' -C '%s'", tmpFile, dir)
			if _, err := utils.GetShellOutput(cmd); err != nil {
				log.Errorf("utils.GetShellOutput: [%s] error: %s", cmd, err.Error())
				utils.HTTPRenderErrMsg(w, err.Error())
				return
			}
		case ".doc":
			log.Errorf("cannot convert .doc file to markdown, Try using Word to save your DOC file as DOCX")
			utils.HTTPRenderErrMsg(w, "cannot convert .doc file to markdown, Try using Word to save your DOC file as DOCX")
			return
		case ".docx":
			//docxDir := filepath.Join(dir, strings.TrimSuffix(fh.Filename, ".docx"))
			docxDir := strings.TrimSuffix(fh.Filename, ".docx")
			//mediaPath := filepath.Join(docxDir, "images")
			targetDir := filepath.Join(dir, docxDir)
			mediaPath := filepath.Join(".", "images")
			mdPath := filepath.Join(".", "README.md")
			cmd := fmt.Sprintf("mkdir -p '%s'; cd '%s'; pandoc -f docx -t markdown --extract-media '%s' -o '%s' '%s'", targetDir, targetDir, mediaPath, mdPath, tmpFile)
			if _, err := utils.GetShellOutput(cmd); err != nil {
				log.Errorf("utils.GetShellOutput: [%s] error: %s", cmd, err.Error())
				utils.HTTPRenderErrMsg(w, err.Error())
				return
			}
		default:
			log.Errorf("cannot convert %s to markdown", ext)
			utils.HTTPRenderErrMsg(w, fmt.Sprintf("cannot convert %s to markdown", ext))
			return
		}

		utils.HTTPRenderSuccess(w, nil)
	}
}
