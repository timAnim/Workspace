package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func genSwagger(dir string) {
	fs, _ := ioutil.ReadDir(dir)
	out, _ := os.Create(fmt.Sprintf("%s/swagger.pb.go", dir))
	out.Write([]byte(fmt.Sprintf("package %s\n\n// define swagger doc \nconst (\n\t", dir)))
	for _, f := range fs {
		if strings.HasSuffix(f.Name(), ".json") {
			fmt.Println(f.Name())
			name := strings.TrimPrefix(f.Name(), dir+".")
			fmt.Println(name)
			//out.Write([]byte(strings.TrimSuffix(name, ".json") + " = `"))
			out.Write([]byte("Swagger" + " = `"))
			f, _ := os.Open(filepath.Join(dir, f.Name()))
			io.Copy(out, f)
			out.Write([]byte("`\n"))
		}
	}
	out.Write([]byte(")\n"))
}

// Reads all .json files in the current folder
// and encodes them as strings literals in textfiles.go
func main() {
	genSwagger("modbus")
}
