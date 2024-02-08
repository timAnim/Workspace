package cmdb

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"xtool/pkg/auth"

	"github.com/tidwall/gjson"
)

// GetPictureList 获取图片列表
func GetPictureList() ([]string, error) {
	pics := []string{}
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/v2/cmdb/upload", auth.GetAddr()), nil)
	if err != nil {
		return pics, err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return pics, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.file_list").String()), &pics)
	if err != nil {
		return nil, err
	}

	return pics, nil
}

// GetPicture 获取图片
func GetPicture(picName string, dir string) error {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/api/picture/%s", auth.GetAddr(), picName), nil)
	if err != nil {
		return err
	}
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	p := filepath.Join(dir, picName)
	err = ioutil.WriteFile(p, body, 0666)
	if err != nil {
		return err
	}
	return nil
}

// PutPicture 上传图片, 返回filename, error
func PutPicture(picPath string) (string, error) {
	_, filename := filepath.Split(picPath)
	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	//关键的一步操作
	fileWriter, err := bodyWriter.CreateFormFile("picture", filename)
	if err != nil {
		return "", err
	}

	//打开文件句柄操作
	fh, err := os.Open(picPath)
	if err != nil {
		return "", err
	}
	defer fh.Close()

	//iocopy
	_, err = io.Copy(fileWriter, fh)
	if err != nil {
		return "", err
	}

	contentType := bodyWriter.FormDataContentType()
	bodyWriter.Close()

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/upload", auth.GetAddr()), strings.NewReader(bodyBuf.String()))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", contentType)

	c := auth.NewHTTPClient()
	resp, err := c.Do(req)

	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	picName := gjson.Get(string(body), "data.filename").String()
	return picName, nil
}

/*
// GetItemByName 根据名字获取CI项
func GetItemByName(name string, ciType string, output []string) ([]*Resource, error) {
	q := define.M{
		"output": output,
		"where": []define.M{
			define.M{
				"terms": []define.M{
					define.M{"field": "ci_type", "operator": "eq", "value": ciType},
					define.M{"field": "name", "operator": "eq", "value": name},
				},
			},
		},
	}
	b, err := json.Marshal(q)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("%s/api/v2/cmdb/resources/items", auth.GetAddr()), strings.NewReader(string(b)))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	c := auth.NewHTTPClient()
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if (len(body) == 0) || (len(body) != 0 && body[0] != '{') {
		return nil, fmt.Errorf("data error: not json, data: %s", string(body))
	}
	//fmt.Println(string(body), err)
	res := []*Resource{}
	err = json.Unmarshal([]byte(gjson.Get(string(body), "data.resources").String()), &res)
	if err != nil {
		return nil, err
	}

	return res, nil
}

// PutPictureAndRename 上传图片并改名, 用于导入导出时避免重复上传
func PutPictureAndRename(picPath string) error {
	_, filename := filepath.Split(picPath)
	name, err := PutPicture(picPath)
	if err != nil {
		return err
	}
	res, err := GetItemByName(name, "9", []string{"resource_id", "name"})
	if err != nil {
		return err
	}
	if len(res) != 1 {
		return fmt.Errorf("get new picture by name '%s'", name)
	}
	resourceID := res[0].ResourceID

	items := &Items{
		Resources: []*Resource{
			&Resource{
				ResourceID: resourceID,
				Attributes: define.M{
					"name": filename,
				},
			},
		},
	}
	err = UpsertItems(items)
	fmt.Println("666666", err, items.Resources[0].String())
	if err != nil {
		return err
	}
	return nil
}
*/
