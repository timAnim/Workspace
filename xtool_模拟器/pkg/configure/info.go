package configure

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/tsdb"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("configure", "info", Info, "显示节点信息", `info <resourceID>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
	})
	reg.Regist("configure", "childinfo", ChildInfo, "显示子节点概要信息", `childinfo <resourceID> <attrs>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "attrs", Type: "string", Necessity: false, Desc: "自定义输出字段"},
	})
	reg.Regist("configure", "related_info", RelatedInfo, "显示关联节点概要信息", `related_info <resourceID> <relationCode> <reverse> <attrs>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
		&reg.Param{Name: "relationCode", Type: "int", Necessity: false, Desc: "关系码，默认 5"},
		&reg.Param{Name: "reverse", Type: "int", Necessity: false, Desc: "是否反查，默认 0(不反查)"},
		&reg.Param{Name: "attrs", Type: "string", Necessity: false, Desc: "自定义输出字段"},
	})
	reg.Regist("configure", "info_export", InfoExport, "导出节点信息，以节点'resourceID-name.json'形式命名导出文件", `info_export <resourceID>`, []*reg.Param{
		&reg.Param{Name: "resourceID", Type: "string", Necessity: true, Desc: "节点ID"},
	})
	reg.Regist("configure", "info_import", InfoImport, "导入节点信息", `info_import <infoFile>`, []*reg.Param{
		&reg.Param{Name: "infoFile", Type: "string", Necessity: true, Desc: "导出文件名"},
	})
}

func jsonFormat(obj interface{}) (string, error) {
	b, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}
	var out bytes.Buffer
	err = json.Indent(&out, b, "", "    ")
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

// Info 显示节点信息
func Info(resourceID string, deleted string) {
	del, err := strconv.Atoi(deleted)
	if err != nil {
		del = 0
	}
	r, err := cmdb.GetItem(resourceID, del)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	info, err := jsonFormat(r)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	fmt.Println(info)
}

// ChildInfo 显示子节点概要
func ChildInfo(resourceID string, attrs string) {
	rs, err := cmdb.GetChildren(resourceID, 1, nil)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	//fmt.Println(rs)
	//vs, _ := tsdb.GetSnapshot([]string{r.ResourceID})
	//fmt.Println(vs)
	ids := []string{}
	os := []string{}
	if attrs == "" {
		for _, r := range rs {
			ids = append(ids, r.ResourceID)
			//fmt.Printf("%s:%s %d\n", r.ResourceID, r.Attributes["name"].(string), r.Deleted)
			os = append(os, fmt.Sprintf("%s:%s %d", r.ResourceID, r.Attributes["name"], r.Deleted))
		}
	} else {
		as := strings.Split(attrs, ",")
		for _, r := range rs {
			ids = append(ids, r.ResourceID)
			o := []string{}
			o = append(o, fmt.Sprintf("%s:%s %d", r.ResourceID, r.Attributes["name"], r.Deleted))
			for _, a := range as {
				if v, ok := r.Attributes[a]; ok {
					o = append(o, fmt.Sprintf("%v", v))
				} else {
					o = append(o, fmt.Sprintf("$%s_NOT_FOUND$", a))
				}
			}
			os = append(os, strings.Join(o, "  "))
			//fmt.Println(o...)
		}
	}
	vs, _ := tsdb.GetSnapshot(ids)
	idVMap := map[string]*define.ValueItem{}
	for _, v := range vs {
		idVMap[v.ResourceID] = v
	}
	for i, id := range ids {
		if v, ok := idVMap[id]; ok {
			fmt.Println(os[i], v.RealValue)
		} else {
			fmt.Println(os[i], "--")
		}
	}
}

// RelatedInfo 显示关联节点信息
func RelatedInfo(resourceID string, relationCode string, reverse string, attrs string) {
	relCode, err := strconv.Atoi(relationCode)
	if err != nil {
		relCode = 5
	}

	rvs, err := strconv.Atoi(reverse)
	if err != nil {
		rvs = 0
	}

	rs, err := cmdb.GetRelated(resourceID, relCode, rvs, 0, []string{})
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	//fmt.Println(rs)
	//vs, _ := tsdb.GetSnapshot([]string{r.ResourceID})
	//fmt.Println(vs)
	ids := []string{}
	os := []string{}
	if attrs == "" {
		for _, r := range rs {
			ids = append(ids, r.ResourceID)
			//fmt.Printf("%s:%s %d\n", r.ResourceID, r.Attributes["name"].(string), r.Deleted)
			os = append(os, fmt.Sprintf("%s:%s %d", r.ResourceID, r.Attributes["name"], r.Deleted))
		}
	} else {
		as := strings.Split(attrs, ",")
		for _, r := range rs {
			ids = append(ids, r.ResourceID)
			o := []string{}
			o = append(o, fmt.Sprintf("%s:%s %d", r.ResourceID, r.Attributes["name"], r.Deleted))
			for _, a := range as {
				if v, ok := r.Attributes[a]; ok {
					o = append(o, fmt.Sprintf("%v", v))
				} else {
					o = append(o, fmt.Sprintf("$%s_NOT_FOUND$", a))
				}
			}
			os = append(os, strings.Join(o, "  "))
			//fmt.Println(o...)
		}
	}
	vs, _ := tsdb.GetSnapshot(ids)
	idVMap := map[string]*define.ValueItem{}
	for _, v := range vs {
		idVMap[v.ResourceID] = v
	}
	for i, id := range ids {
		if v, ok := idVMap[id]; ok {
			fmt.Println(os[i], v.RealValue)
		} else {
			fmt.Println(os[i], "--")
		}
	}
}

// InfoExport 导出节点信息
func InfoExport(resourceID string) {
	r, err := cmdb.GetItem(resourceID, 0)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	info, err := jsonFormat(r)
	if err != nil {
		log.Errorf("get node '%s' error: %s", resourceID, err.Error())
		return
	}
	infoFile := fmt.Sprintf("%s-%s.json", r.ResourceID, r.Attributes["name"])
	err = ioutil.WriteFile(infoFile, []byte(info), 0666)
	if err != nil {
		log.Errorf("write info to '%s' error: %s", infoFile, err.Error())
		return
	}
	log.Infof("export info of '%s' to '%s' success", resourceID, infoFile)
}

// InfoImport 导入节点信息
func InfoImport(infoFile string) {
	b, err := ioutil.ReadFile(infoFile)
	if err != nil {
		log.Errorf("read info from infoFile '%s' error: %s", infoFile, err.Error())
		return
	}
	r := &cmdb.Resource{}
	err = json.Unmarshal(b, r)
	if err != nil {
		log.Errorf("unmarshal info error: %s", err.Error())
		return
	}
	items := &cmdb.Items{
		Resources: []*cmdb.Resource{r},
	}
	err = cmdb.AddItems(items)
	if err != nil {
		log.Errorf("update info error: %s", err.Error())
		return
	}
	log.Infof("import info of '%s' success", r.ResourceID)
}
