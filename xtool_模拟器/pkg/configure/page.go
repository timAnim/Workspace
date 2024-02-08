package configure

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/gotar"
	"xtool/pkg/reg"

	"github.com/Workiva/go-datastructures/set"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("page", "page_export", PageExport, "单页面导出", `page_export <spaceID> <pageName>`, []*reg.Param{
		&reg.Param{Name: "spaceID", Type: "string", Necessity: true, Desc: "页面所在源空间节点ID"},
		&reg.Param{Name: "pageName", Type: "string", Necessity: false, Desc: "页面名称, 不填则导出默认页面"},
	})
	reg.Regist("page", "page_import", PageImport, "单页面导入", `page_import <importFile> <spaceID> <targetName>`, []*reg.Param{
		&reg.Param{Name: "importFile", Type: "string", Necessity: true, Desc: "导出文件路径"},
		&reg.Param{Name: "spaceID", Type: "string", Necessity: true, Desc: "目标空间ID"},
		&reg.Param{Name: "targetName", Type: "string", Necessity: false, Desc: "目标页面名称, 需要包含空格时请用引号引起来"},
	})
	reg.Regist("page", "page_export_by_id", PageExportByID, "指定ID单页面导出，需要指定页面ID，为界面操作定制", `page_export_by_id <pageID>`, []*reg.Param{
		&reg.Param{Name: "pageID", Type: "string", Necessity: true, Desc: "页面ID"},
	})
	reg.Regist("page", "page_import_by_id", PageImportByID, "指定ID单页面导入，需要指定页面ID，为界面操作定制", `page_import_by_id <importFile> <pageID>`, []*reg.Param{
		&reg.Param{Name: "importFile", Type: "string", Necessity: true, Desc: "导出文件路径"},
		&reg.Param{Name: "pageID", Type: "string", Necessity: true, Desc: "目标页面ID"},
	})
	reg.Regist("page", "page_export_all", PageExportAll, "全页面导出", `page_export_all`, []*reg.Param{})
	reg.Regist("page", "page_import_all", PageImportAll, "全页面导入", `page_import_all <importFile>`, []*reg.Param{
		&reg.Param{Name: "importFile", Type: "string", Necessity: true, Desc: "导出文件路径"},
	})
	picPtn, _ = regexp.Compile(picPrefix + "(?P<filename>usr_\\w+.\\w+)")
}

const (
	picPrefix = "/api/picture/"
	picDir    = "picture"
	tmpDir    = "tmp"
	pageFile  = "page.json"
)

var (
	picPtn *regexp.Regexp
)

// PageExport 单页面导出
func PageExport(spaceID string, pageName string) {
	space, err := cmdb.GetItem(spaceID, 0)
	if err != nil {
		log.Errorf("get space node error: %s", err.Error())
		return
	}
	if !isSpace(space) {
		log.Errorf("node '%s' is not space", spaceID)
		return
	}
	res, err := cmdb.GetChildren(space.ResourceID, 0, nil)
	if err != nil {
		log.Errorf("get children error: %s", err.Error())
		return
	}
	// 过滤出页面
	var page *cmdb.Resource
	for _, r := range res {
		if ct, ok := r.Attributes["ci_type"]; ok {
			if ct.(string) == "6" {
				if pageName != "" {
					if n, ok := r.Attributes["name"]; ok {
						name := n.(string)
						if name != pageName {
							continue
						}
						page = r
					}
				} else {
					if isDefaultPage(r) {
						// 不指定名称则导出默认页面
						page = r
					}
				}
			}
		}
	}
	if page == nil {
		log.Errorf("page '%s' not found under space '%s:%s'", pageName, spaceID, space.Attributes["name"])
		return
	}
	if isRefPage(page) {
		log.Errorf("src page '%s' is reference page, please export the referred default page instead !", pageName)
		return
	}
	// 导出图片
	picSet := set.New()
	picURLs := picPtn.FindAllString(page.Attributes.String(), -1)
	for _, u := range picURLs {
		picSet.Add(u[len(picPrefix):])
	}
	dir := filepath.Join(tmpDir, picDir)
	err = os.MkdirAll(dir, 0666)
	if err != nil && !os.IsExist(err) {
		log.Errorf("mkdir picDir error: %s", err.Error())
		return
	}
	defer os.RemoveAll(tmpDir)
	for _, pic := range picSet.Flatten() {
		err = cmdb.GetPicture(pic.(string), dir)
		if err != nil {
			log.Errorf("get picture error: %s", err.Error())
			return
		}
	}
	pagePath := filepath.Join(tmpDir, pageFile)
	err = ioutil.WriteFile(pagePath, []byte(page.String()), 0666)
	if err != nil {
		log.Errorf("write file '%s' error: %s", pagePath, err.Error())
		return
	}
	f, err := os.Open(tmpDir)
	if err != nil {
		log.Errorf("open dir '%s' error: %s", tmpDir, err.Error())
		return
	}
	exportFile := fmt.Sprintf("%s-%s-%s.tgz", page.ResourceID, space.Attributes["name"], page.Attributes["name"])
	err = gotar.Compress([]*os.File{f}, exportFile)
	if err != nil {
		log.Errorf("pack error: %s", err.Error())
		return
	}
	log.Infof("export page '%s:%s-%s' as '%s'success", space.ResourceID, space.Attributes["name"], page.Attributes["name"], exportFile)
}

// PageImport 单页面导入
func PageImport(importFile string, spaceID string, targetName string) {
	err := gotar.DeCompress(importFile, ".")
	if err != nil {
		log.Errorf("uncompress'%s' to '%s' error: %s", importFile, tmpDir, err.Error())
		return
	}
	defer os.RemoveAll(tmpDir)

	space, err := cmdb.GetItem(spaceID, 0)
	if err != nil {
		log.Errorf("get space node error: %s", err.Error())
		return
	}
	if !isSpace(space) {
		log.Errorf("node '%s' is not space", spaceID)
		return
	}
	location := space.ResourceID
	if loc, ok := space.Attributes["location"]; ok {
		location = fmt.Sprintf("%s/%s", loc.(string), space.ResourceID)
	}

	// 获取页面信息
	pagePath := filepath.Join(tmpDir, pageFile)
	b, err := ioutil.ReadFile(pagePath)
	if err != nil {
		log.Errorf("read page file error: %s", err.Error())
		return
	}

	renameMap, err := putPictures(filepath.Join(tmpDir, picDir))
	if err != nil {
		log.Errorf("put pictures error: %s", err.Error())
		return
	}
	pageStr := string(b)
	for k, v := range renameMap {
		// 替换页面中的相关图片名称
		pageStr = strings.Replace(pageStr, k, v, -1)
	}

	page := &cmdb.Resource{}
	err = json.Unmarshal([]byte(pageStr), page)
	if err != nil {
		log.Errorf("parse page info error: %s", err.Error())
		return
	}

	page.Attributes["location"] = location
	page.Attributes["parent_id"] = space.ResourceID

	res, err := cmdb.GetChildren(space.ResourceID, 0, nil)
	if err != nil {
		log.Errorf("get children error: %s", err.Error())
		return
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{},
		Relations: []*cmdb.Relation{},
	}
	targetPages := []*cmdb.Resource{}
	for _, r := range res {
		if ct, ok := r.Attributes["ci_type"]; ok {
			if ct.(string) == "6" {
				targetPages = append(targetPages, r)
			}
		}
	}

	if len(targetPages) == 0 {
		// 空间下原本没有页面, 若新页面是默认页面则新建页面，否则报错，因空间下无默认页面，提示新建默认页面
		if !isDefaultPage(page) {
			log.Errorf("new id error: %s", err.Error())
			return
		}
		ids, err := cmdb.NewID(1)
		if err != nil {
			log.Errorf("new id error: %s", err.Error())
			return
		}
		newPageID := ids[0]
		page.Attributes["resource_id"] = newPageID
		page.Attributes[fmt.Sprintf("i_%s", newPageID)] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
		page.ResourceID = newPageID
		items.Resources = append(items.Resources, page)
		items.Relations = append(items.Relations, &cmdb.Relation{
			ResourceID1:  space.ResourceID,
			ResourceID2:  page.ResourceID,
			RelationCode: 5,
		})
		log.Infof("creating new page '%s' for space: '%s:%s'", page.ResourceID, space.ResourceID, space.Attributes["name"])
	} else {
		// 空间下原本有页面的情况
		if isDefaultPage(page) {
			// 若导出的源页面是默认页面
			// 找出目标页面中的默认页面并覆盖
			for _, p := range targetPages {
				if isDefaultPage(p) {
					p.Attributes["page_common"] = page.Attributes["page_common"]
					for k := range p.Attributes {
						if strings.HasPrefix(k, "i_0_") {
							p.Attributes[k] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
						}
					}
					items.Resources = append(items.Resources, p)
				} else if p.Attributes["name"].(string) == targetName {
					// 若提供了页面名称，找到对应名称按非引用页面覆盖
					p.Attributes["name"] = targetName
					p.Attributes["default_page"] = "0"
					p.Attributes["page_common"] = page.Attributes["page_common"]
					for k := range p.Attributes {
						if strings.HasPrefix(k, "i_0_") {
							p.Attributes[k] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
						}
					}
					items.Resources = append(items.Resources, p)
				}
			}
		} else {
			// 若导出的源页面不是默认页面, 需找到同名页面覆盖，若无同名页面，则新建
			imported := false
			for _, p := range targetPages {
				if isDefaultPage(p) {
					continue
				}
				if n, ok := p.Attributes["name"]; ok {
					// 非引用页面，判断名字是否相同
					if n.(string) == page.Attributes["name"].(string) {
						p.Attributes["page_common"] = page.Attributes["page_common"]
						for k := range p.Attributes {
							if strings.HasPrefix(k, "i_0_") {
								p.Attributes[k] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
							}
						}
						items.Resources = append(items.Resources, p)
						imported = true
					}
				}
			}

			if !imported {
				// 需新建非引用页面
				ids, err := cmdb.NewID(1)
				if err != nil {
					log.Errorf("new id error: %s", err.Error())
					return
				}
				newPageID := ids[0]
				page.Attributes["resource_id"] = newPageID
				page.Attributes[fmt.Sprintf("i_%s", newPageID)] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
				page.ResourceID = newPageID
				items.Resources = append(items.Resources, page)
				items.Relations = append(items.Relations, &cmdb.Relation{
					ResourceID1:  space.ResourceID,
					ResourceID2:  page.ResourceID,
					RelationCode: 5,
				})
			}
			log.Infof("creating new page '%s' for space: '%s:%s'", page.ResourceID, space.ResourceID, space.Attributes["name"])
		}
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("add item error: %s", err.Error())
		return
	}
	log.Infof("import page '%s:%s-%s' from '%s' success", space.ResourceID, space.Attributes["name"], page.Attributes["name"], importFile)
}

func putPictures(pictureDir string) (map[string]string, error) {
	existPics, err := cmdb.GetPictureList()
	if err != nil {
		return nil, err
	}
	picSet := set.New()
	for _, pic := range existPics {
		picSet.Add(pic)
	}
	renameMap := map[string]string{}
	fs, err := ioutil.ReadDir(pictureDir)
	if err != nil {
		if !os.IsExist(err) {
			return renameMap, nil
		}
		return nil, err
	}
	for _, f := range fs {
		pic := f.Name()
		p := filepath.Join(pictureDir, pic)
		if picSet.Exists(pic) {
			// 这种情况不需要上传新的图片
			//err = cmdb.PutPictureAndRename(p)
			//fmt.Println("33333", err)
			//if err != nil {
			//	return nil, err
			//}
			continue
		} else {
			newName, err := cmdb.PutPicture(p)
			if err != nil {
				return nil, err
			}
			renameMap[pic] = newName
		}
	}
	return renameMap, nil
}

func isDefaultPage(page *cmdb.Resource) bool {
	if d, ok := page.Attributes["default_page"]; ok {
		if d.(string) == "1" {
			return true
		}
	}
	return false
}

func isRefPage(page *cmdb.Resource) bool {
	if d, ok := page.Attributes["reference"]; ok {
		if d.(string) == "1" {
			return true
		}
	}
	return false
}

func isSpace(node *cmdb.Resource) bool {
	if ct, ok := node.Attributes["ci_type"]; ok {
		if ct.(string) == "5" || ct.(string) == "2" || ct.(string) == "1" {
			return true
		}
	}
	return false
}

func isPage(node *cmdb.Resource) bool {
	if ct, ok := node.Attributes["ci_type"]; ok {
		if ct.(string) == "6" {
			return true
		}
	}
	return false
}

type spacePage struct {
	Space *cmdb.Resource   `json:"space"`
	Pages []*cmdb.Resource `json:"pages"`
}

// PageExportAll 全页面导出
func PageExportAll() {
	spaces, err := cmdb.GetSpaces()
	if err != nil {
		log.Errorf("get spaces error: %s", err.Error())
		return
	}
	workDir, err := os.Getwd()
	if err != nil {
		log.Errorf("get workDir error: %s", err.Error())
		return
	}
	tmpWorkDir := filepath.Join(workDir, "all")
	os.RemoveAll(tmpWorkDir)
	err = os.MkdirAll(tmpWorkDir, 0666)
	if err != nil {
		log.Errorf("make tmpWorkDir error: %s", err.Error())
		return
	}
	defer os.RemoveAll(tmpWorkDir)
	err = os.Chdir(tmpWorkDir)
	if err != nil {
		log.Errorf("change to tmpWorkDir error: %s", err.Error())
		return
	}
	summary := []*spacePage{}
	for _, space := range spaces {
		pages, err := cmdb.GetPagesUnder(space.ResourceID, []string{"name", "ci_type", "default_page", "reference"})
		if err != nil {
			log.Errorf("get pages under '%s' error: %s", space.ResourceID, err.Error())
			continue
		}
		for _, p := range pages {
			if isRefPage(p) {
				// 引用页面此处不导出
				continue
			}
			PageExport(space.ResourceID, p.Attributes["name"].(string))
		}
		summary = append(summary, &spacePage{
			Space: space,
			Pages: pages,
		})
	}
	err = os.Chdir(workDir)
	if err != nil {
		log.Errorf("change to workDir error: %s", err.Error())
		return
	}
	b, err := json.Marshal(summary)
	summaryFile := filepath.Join(tmpWorkDir, "summary.json")
	err = ioutil.WriteFile(summaryFile, b, 0666)
	if err != nil {
		log.Errorf("write summaryFile '%s' error: %s", summaryFile, err.Error())
		return
	}
	f, err := os.Open(tmpWorkDir)
	if err != nil {
		log.Errorf("open dir '%s' error: %s", tmpDir, err.Error())
		return
	}
	exportFile := fmt.Sprintf("pages-%s.tgz", auth.GetHost())
	err = gotar.Compress([]*os.File{f}, exportFile)
	if err != nil {
		log.Errorf("pack file '%s' error: %s", exportFile, err.Error())
		return
	}
	log.Infof("export pages to '%s' success", exportFile)
}

// PageImportAll 全页面导入
func PageImportAll(importFile string) {
	workDir, err := os.Getwd()
	if err != nil {
		log.Errorf("get workDir error: %s", err.Error())
		return
	}
	tmpWorkDir := filepath.Join(workDir, "all")
	err = gotar.DeCompress(importFile, ".")
	if err != nil {
		log.Errorf("uncompress '%s' to '%s' error: %s", importFile, tmpWorkDir, err.Error())
		return
	}
	defer os.RemoveAll(tmpWorkDir)
	summaryFile := filepath.Join(tmpWorkDir, "summary.json")
	b, err := ioutil.ReadFile(summaryFile)
	if err != nil {
		log.Errorf("read summaryFile '%s' error: %s", summaryFile, err.Error())
		return
	}
	summary := []*spacePage{}
	err = json.Unmarshal(b, &summary)
	if err != nil {
		log.Errorf("unmarshal error: %s", err.Error())
		return
	}
	err = os.Chdir(tmpWorkDir)
	if err != nil {
		log.Errorf("change to tmpWorkDir error: %s", err.Error())
		return
	}
	for _, sp := range summary {
		for _, p := range sp.Pages {
			if isRefPage(p) {
				continue
			}
			f := fmt.Sprintf("%s-%s-%s.tgz", p.ResourceID, sp.Space.Attributes["name"], p.Attributes["name"])
			PageImport(f, sp.Space.ResourceID, p.Attributes["name"].(string))
		}
	}
	err = os.Chdir(workDir)
	if err != nil {
		log.Errorf("change to workDir error: %s", err.Error())
		return
	}
	log.Infof("import pages from '%s' success", importFile)
}

// PageExportByID 指定ID单页面导出
func PageExportByID(pageID string) {
	page, err := cmdb.GetItem(pageID, 0)
	if err != nil {
		log.Errorf("get page node error: %s", err.Error())
		return
	}
	if isRefPage(page) {
		log.Errorf("page '%s:%s' is reference page", page.ResourceID, page.Attributes["name"])
		return
	}
	// 导出图片
	picSet := set.New()
	picURLs := picPtn.FindAllString(page.Attributes.String(), -1)
	for _, u := range picURLs {
		picSet.Add(u[len(picPrefix):])
	}
	dir := filepath.Join(tmpDir, picDir)
	err = os.MkdirAll(dir, 0666)
	if err != nil && !os.IsExist(err) {
		log.Errorf("mkdir picDir error: %s", err.Error())
		return
	}
	defer os.RemoveAll(tmpDir)
	for _, pic := range picSet.Flatten() {
		err = cmdb.GetPicture(pic.(string), dir)
		if err != nil {
			log.Errorf("get picture error: %s", err.Error())
			return
		}
	}
	pagePath := filepath.Join(tmpDir, pageFile)
	err = ioutil.WriteFile(pagePath, []byte(page.String()), 0666)
	if err != nil {
		log.Errorf("write file '%s' error: %s", pagePath, err.Error())
		return
	}
	f, err := os.Open(tmpDir)
	if err != nil {
		log.Errorf("open dir '%s' error: %s", tmpDir, err.Error())
		return
	}
	exportFile := fmt.Sprintf("%s-%s.tgz", page.ResourceID, page.Attributes["name"])
	err = gotar.Compress([]*os.File{f}, exportFile)
	if err != nil {
		log.Errorf("pack error: %s", err.Error())
		return
	}
	log.Infof("export page '%s:%s' as '%s'success", page.ResourceID, page.Attributes["name"], exportFile)
}

// PageImportByID 指定ID单页面导入
func PageImportByID(importFile string, pageID string) {
	err := gotar.DeCompress(importFile, ".")
	if err != nil {
		log.Errorf("uncompress'%s' to '%s' error: %s", importFile, tmpDir, err.Error())
		return
	}
	defer os.RemoveAll(tmpDir)

	dstPage, err := cmdb.GetItem(pageID, 0)
	if err != nil {
		log.Errorf("get page node '%s' error: %s", pageID, err.Error())
		return
	}
	if !isPage(dstPage) {
		log.Errorf("node '%s:%s' is not page", dstPage.ResourceID, dstPage.Attributes["name"])
		return
	}
	if isRefPage(dstPage) {
		log.Errorf("node '%s:%s' is reference page", dstPage.ResourceID, dstPage.Attributes["name"])
		return
	}
	// 获取页面信息
	pagePath := filepath.Join(tmpDir, pageFile)
	b, err := ioutil.ReadFile(pagePath)
	if err != nil {
		log.Errorf("read page file error: %s", err.Error())
		return
	}

	renameMap, err := putPictures(filepath.Join(tmpDir, picDir))
	if err != nil {
		log.Errorf("put pictures error: %s", err.Error())
		return
	}
	pageStr := string(b)
	for k, v := range renameMap {
		// 替换页面中的相关图片名称
		pageStr = strings.Replace(pageStr, k, v, -1)
	}
	page := &cmdb.Resource{}
	err = json.Unmarshal([]byte(pageStr), page)
	if err != nil {
		log.Errorf("parse page info error: %s", err.Error())
		return
	}

	dstPage.Attributes["page_common"] = page.Attributes["page_common"]
	for k := range dstPage.Attributes {
		if strings.HasPrefix(k, "i_0_") {
			dstPage.Attributes[k] = page.Attributes[fmt.Sprintf("i_%s", page.ResourceID)]
		}
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{
			dstPage,
		},
		Relations: []*cmdb.Relation{},
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("add item error: %s", err.Error())
		return
	}
	log.Infof("import page '%s:%s' to '%s:%s' success", page.ResourceID, page.Attributes["name"], dstPage.ResourceID, dstPage.Attributes["name"])
}
