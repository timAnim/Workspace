package sqladapter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("sql", "parse_sql", ParseQuery, "解析sql语句，生成查询结构", `parse_sql <sql>`, []*reg.Param{
		&reg.Param{Name: "sql", Type: "string", Necessity: true, Desc: "待解析的SQL语句，因SQL语句中通常含有空格，所以需要使用引号将SQL引起来，请合理使用三种引号: ', `, \""},
	})
}

// ParseQuery 解析sql语句, 转成查询语句
func ParseQuery(sql string) {
	if sql == "" {
		// 不传入sql语句的情况对sql语句语法进行说明
		desc := `
SQL语法说明(关键字不区分大小写):
1. SELECT语句(EXPORT语法与此相同), 用于查询(导出)数据:
	1) 基本格式: SELECT [字段1][, 字段2][, 字段3]... FROM cmdb  ==> 从cmdb中不带任何条件查询[字段1][, 字段2][, 字段3]..., 若只有[字段1]且为'*'，则默认只输出resource_id, ci_type, name (视业务数据库而定)
	2) 带条件的: SELECT [字段1][, 字段2][, 字段3]... FROM cmdb WHERE ci_type = '2' and location like 'project_root%' ==> 从cmdb中查询满足ci_type为'2'且在空间视图(project_root)下的节点(设备)
	3) 带排序的: SELECT [字段1][, 字段2][, 字段3]... FROM cmdb WHERE ci_type = '2' and location like 'project_root%' ORDER BY create_date ASC ==> 按创建时间升序排列
	4) 带分页的: SELECT [字段1][, 字段2][, 字段3]... FROM cmdb WHERE ci_type = '2' and location like 'project_root%' ORDER BY create_date ASC LIMIT 50 ==> 50个每页取第一页 (注意: 此处与经典SQL的语法有区别)
	5) 带页码的: SELECT [字段1][, 字段2][, 字段3]... FROM cmdb WHERE ci_type = '2' and location like 'project_root%' ORDER BY create_date ASC LIMIT 2, 50 ==> 50个每页取第一页 (注意: 此处与经典SQL的语法有区别，LIMIT后第一个数字被解析成页码)
2. UPDATE语句, 用于条件更新数据(服务端V3R3_CP001以后支持):
	TODO
3. DELETE语句, 用于条件删除数据(对于CMDB数据而言，与UPDATE会有重复部分):
	TODO
		`
		fmt.Println(desc)
		return
	}
	op, err := ParseSQL(sql)
	if err != nil {
		log.Errorf("ParseSQL error: %s", err.Error())
		return
	}
	buf := bytes.NewBuffer([]byte{})
	err = json.Indent(buf, []byte(op.String()), "", "    ")
	if err != nil {
		log.Errorf("json.Indent error: %s", err.Error())
		return
	}
	fmt.Println(buf.String())
}

func printRes(headers []string, items *cmdb.Items) {
	for _, r := range items.Resources {
		if len(headers) == 0 {
			fmt.Println(r.ResourceID, r.Attributes["ci_type"], r.Attributes["name"])
			continue
		}
		out := []interface{}{r.ResourceID}
		for _, f := range headers {
			out = append(out, r.Attributes[f])
		}
		fmt.Println(out...)
	}
	fmt.Printf("display %d of %d\n", items.ResourceCount, items.TotalCount)
}

func cell(i, j int) string {
	return fmt.Sprintf("%s%d", utils.ToAlphaString(j), i+1)
}

func toString(in interface{}) interface{} {
	switch x := in.(type) {
	case map[string]interface{}, []interface{}:
		b, err := json.Marshal(x)
		if err != nil {
			return x
		}
		return string(b)
	default:
		return x
	}
}

func exportRes(headers []string, items *cmdb.Items) {
	fp := excelize.NewFile()
	resSheet := fp.GetSheetName(1)
	if len(headers) == 0 {
		headers = []string{"ci_type", "name"}
	}
	fp.SetCellValue(resSheet, cell(0, 0), "index")
	fp.SetCellValue(resSheet, cell(0, 1), "resource_id")
	fp.SetCellValue(resSheet, cell(0, 2), "deleted")
	for j, h := range headers {
		if h == "resource_id" {
			continue
		}
		fp.SetCellValue(resSheet, cell(0, 3+j), h)
	}
	for i, r := range items.Resources {
		fp.SetCellValue(resSheet, cell(i+1, 0), i+1)
		fp.SetCellValue(resSheet, cell(i+1, 1), r.ResourceID)
		fp.SetCellValue(resSheet, cell(i+1, 2), r.Deleted)
		for j, h := range headers {
			if h == "resource_id" {
				continue
			}
			fp.SetCellValue(resSheet, cell(i+1, 3+j), toString(r.Attributes[h]))
		}
	}
	fileName := fmt.Sprintf("export-%s.xlsx", time.Now().Format("20060102150405"))
	err := fp.SaveAs(fileName)
	if err != nil {
		log.Errorf("export save as '%s' error: %s", fileName, err.Error())
		return
	}
	log.Infof("export %v to '%s' success", headers, fileName)
}

// Exec 执行sql语句
func Exec(sql string) {
	realSQL := strings.Replace(sql, "export ", "select ", 1)
	realSQL = strings.Replace(realSQL, "EXPORT ", "SELECT ", 1)
	op, err := ParseSQL(realSQL)
	if err != nil {
		log.Errorf("ParseSQL error: %s", err.Error())
		return
	}
	switch x := op.(type) {
	case *define.Query:
		t := "cmdb"
		if len(x.From) != 0 {
			// 第一个table标识业务，默认cmdb
			t = x.From[0]
		}
		switch t {
		case "cmdb", "cmdb_all":
			// 执行cmdb查询
			//fmt.Println(x.String())

			x.Translate = 1
			items, err := cmdb.QueryItems(x)
			if err != nil {
				log.Errorf("cmdb.QueryItems error: %s", err.Error())
				return
			}
			if strings.HasPrefix(sql, "select") || strings.HasPrefix(sql, "SELECT") {
				printRes(x.Output, items)
			} else if strings.HasPrefix(sql, "export") || strings.HasPrefix(sql, "EXPORT") {
				exportRes(x.Output, items)
			} else if x.Update != nil {
				uItems := &cmdb.Items{
					Resources: make([]*cmdb.Resource, 0, len(items.Resources)),
				}
				for _, r := range items.Resources {
					uItems.Resources = append(uItems.Resources, &cmdb.Resource{
						ResourceID: r.ResourceID,
						Attributes: x.Update,
					})
				}

				err = cmdb.UpsertItems(uItems)
				if err != nil {
					log.Errorf("cmdb.UpsertItems error: %s", err.Error())
					return
				}
				log.Infof("update success: %s", x.Update.String())
			}
			return
		default:
			log.Warnf("unsupported query: [%s]", sql)
			return
		}
	default:
		log.Warnf("unsupported query: [%s]", sql)
		return
	}
}
