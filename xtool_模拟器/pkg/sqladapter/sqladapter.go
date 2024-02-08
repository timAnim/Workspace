package sqladapter

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"xtool/pkg/define"

	"github.com/xwb1989/sqlparser"
)

// Err sql解析错误
type Err struct {
	error
	msg string
}

// Errorf 生成新的错误信息
func Errorf(msg string, args ...interface{}) *Err {
	return &Err{msg: fmt.Sprintf(msg, args...)}
}

func (err *Err) Error() string {
	return err.msg
}

// OpParam 操作参数
type OpParam interface {
	String() string
}

// ParseSQL 解析sql语句
func ParseSQL(sql string) (OpParam, error) {
	stmt, err := sqlparser.Parse(sql)
	if err != nil {
		return nil, Errorf("sqlparser.Parse error: %s, sql: [%s]", err.Error(), sql)
	}
	switch stmt := stmt.(type) {
	case *sqlparser.Select:
		q := &define.Query{}
		q.Output, err = ParseOutput(stmt.SelectExprs)
		if err != nil {
			return nil, Errorf("ParseOutput error: %s, sql: [%s]", err.Error(), sql)
		}
		q.From, err = ParseFrom(stmt.From)
		if err != nil {
			return nil, Errorf("ParseFrom error: %s, sql: [%s]", err.Error(), sql)
		}

		if len(q.From) != 0 {
			// 第一个table标识业务，默认cmdb
			if q.From[0] == "cmdb_all" {
				q.Deleted = "both"
			}
		}

		q.Sorts, err = ParseOrder(stmt.OrderBy)
		if err != nil {
			return nil, Errorf("ParseOrder error: %s, sql: [%s]", err.Error(), sql)
		}
		q.Page, err = ParsePage(stmt.Limit)
		if err != nil {
			return nil, Errorf("ParsePage error: %s, sql: [%s]", err.Error(), sql)
		}
		if stmt.Where != nil {
			w, err := ParseWhere(stmt.Where)
			if err != nil {
				return nil, Errorf("ParseWhere error: %s, sql: [%s]", err.Error(), sql)
			}
			q.Where, err = w.Convert()
			if err != nil {
				return nil, Errorf("Convert error: %s, sql: [%s]", err.Error(), sql)
			}
		}
		return q, nil
	case *sqlparser.Update:
		q := &define.Query{}
		u, err := ParseUpdateField(stmt.Exprs)
		if err != nil {
			return nil, Errorf("ParseUpdate error: %s, sql: [%s]", err.Error(), sql)
		}
		q.Update = u
		q.From, err = ParseFrom(stmt.TableExprs)
		if err != nil {
			return nil, Errorf("ParseFrom error: %s, sql: [%s]", err.Error(), sql)
		}

		if stmt.Where != nil {
			w, err := ParseWhere(stmt.Where)
			if err != nil {
				return nil, Errorf("ParseWhere error: %s, sql: [%s]", err.Error(), sql)
			}
			q.Where, err = w.Convert()
			if err != nil {
				return nil, Errorf("Convert error: %s, sql: [%s]", err.Error(), sql)
			}
		}
		return q, nil
	case *sqlparser.Delete:
		q := &define.Query{
			Update: define.M{
				"deleted": 1,
			},
		}
		q.From, err = ParseFrom(stmt.TableExprs)
		if err != nil {
			return nil, Errorf("ParseFrom error: %s, sql: [%s]", err.Error(), sql)
		}

		if stmt.Where != nil {
			w, err := ParseWhere(stmt.Where)
			if err != nil {
				return nil, Errorf("ParseWhere error: %s, sql: [%s]", err.Error(), sql)
			}
			q.Where, err = w.Convert()
			if err != nil {
				return nil, Errorf("Convert error: %s, sql: [%s]", err.Error(), sql)
			}
		}
		return q, nil

	default:
		return nil, Errorf("unsupported statement: %s, sql: [%s]", reflect.TypeOf(stmt), sql)
	}
}

// ParseFrom 从sql中解析业务, 将业务抽象成表
func ParseFrom(ts sqlparser.TableExprs) ([]string, error) {
	tables := []string{}
	for _, expr := range ts {
		v := sqlparser.String(expr)
		tables = append(tables, v)
	}
	return tables, nil
}

// ParseOutput 从sql中解析输出字段
func ParseOutput(out sqlparser.SelectExprs) ([]string, error) {
	output := []string{}
	for _, expr := range out {
		v := fmt.Sprintf("%v", extractValue(sqlparser.String(expr)))
		if v != "*" {
			output = append(output, v)
		} else {
			return []string{}, nil
		}
	}
	return output, nil
}

// ParseOrder 从sql中解析出排序规则
func ParseOrder(orders sqlparser.OrderBy) ([]*define.Sort, error) {
	sorts := []*define.Sort{}
	for _, o := range orders {
		sorts = append(sorts, &define.Sort{
			Field: sqlparser.String(o.Expr),
			Type:  o.Direction,
		})
	}
	return sorts, nil
}

// ParsePage 从sql中解析输出分页信息
func ParsePage(lim *sqlparser.Limit) (*define.Page, error) {
	if lim == nil {
		return nil, nil
	}
	n, err := strconv.Atoi(sqlparser.String(lim.Offset))
	if err != nil || n == 0 {
		n = 1
	}
	s, err := strconv.Atoi(sqlparser.String(lim.Rowcount))
	if err != nil || n == 0 {
		s = 500
	}
	page := &define.Page{
		Number: uint64(n),
		Size:   uint64(s),
	}
	return page, nil
}

// ParseWhere 从sql中解析查询条件
func ParseWhere(where *sqlparser.Where) (*Cond, error) {
	return parseExpr(where.Expr)
}

func parseExpr(expr sqlparser.Expr) (*Cond, error) {
	switch e := expr.(type) {
	case *sqlparser.AndExpr:
		left, err := parseExpr(e.Left)
		if err != nil {
			return nil, Errorf("parseExpr error: %s", err.Error())
		}
		right, err := parseExpr(e.Right)
		if err != nil {
			return nil, Errorf("parseExpr error: %s", err.Error())
		}
		return &Cond{
			And: []*Cond{left, right},
		}, nil
	case *sqlparser.OrExpr:
		left, err := parseExpr(e.Left)
		if err != nil {
			return nil, Errorf("parseExpr error: %s", err.Error())
		}
		right, err := parseExpr(e.Right)
		if err != nil {
			return nil, Errorf("parseExpr error: %s", err.Error())
		}
		return &Cond{
			Or: []*Cond{left, right},
		}, nil
	case *sqlparser.ParenExpr:
		return parseExpr(e.Expr)
	//case *sqlparser.NotExpr:
	//	return nil, Errorf("parseExpr unsupported expr: %s", reflect.Type(e))
	case *sqlparser.ComparisonExpr:
		return &Cond{
			Term: define.Term{
				Field:    sqlparser.String(e.Left),
				Operator: op(e.Operator),
				Value:    extractValue(sqlparser.String(e.Right)),
			},
		}, nil
	case *sqlparser.IsExpr:
		return &Cond{
			Term: define.Term{
				Field:    sqlparser.String(e.Expr),
				Operator: op(e.Operator),
				Value:    "",
			},
		}, nil
	default:
		return nil, Errorf("parseExpr unsupported expr: %s", reflect.TypeOf(e))
	}
}

func op(o string) string {
	switch strings.ToLower(o) {
	case "=":
		return "eq"
	case "!=":
		return "neq"
	case ">":
		return "gt"
	case ">=":
		return "gte"
	case "<":
		return "lt"
	case "<=":
		return "lte"
	case "in":
		return "in"
	case "not in":
		return "notin"
	case "like":
		return "like"
	case "regex":
		return "regex"
	case "regexp":
		return "regexp"
	case "is null":
		return "notexists"
	case "is not null":
		return "exists"
	default:
		return strings.ToLower(o)
	}
}

func extractValue(v string) interface{} {
	if strings.HasPrefix(v, `(`) && strings.HasSuffix(v, `)`) {
		// 需要解析成list
		lv := strings.Trim(strings.Trim(v, `(`), `)`)
		vs := strings.Split(lv, ",")
		r := make([]interface{}, 0, len(vs))
		for _, x := range vs {
			r = append(r, extractValue(strings.TrimSpace(x)))
		}
		return r
	}

	if (strings.HasPrefix(v, `'`) && strings.HasSuffix(v, `'`)) || (strings.HasPrefix(v, `"`) && strings.HasSuffix(v, `"`)) || (strings.HasPrefix(v, "`") && strings.HasSuffix(v, "`")) {
		// 解析成字符串的情况
		s := strings.Trim(strings.Trim(strings.Trim(v, `'`), `"`), "`")
		m := define.M{}
		if err := json.Unmarshal([]byte(s), &m); err == nil {
			// 解析成object的情况
			return m
		}
		if strings.HasPrefix(s, `(`) && strings.HasSuffix(s, `)`) {
			// 需要解析成list
			lv := strings.Trim(strings.Trim(s, `(`), `)`)
			vs := strings.Split(lv, ",")
			r := make([]interface{}, 0, len(vs))
			for _, x := range vs {
				r = append(r, extractValue(strings.TrimSpace(x)))
			}
			return r
		}

		return strings.Trim(strings.Trim(strings.Trim(v, `'`), `"`), "`")
	}

	// 解析成数字的情况
	if x, err := strconv.Atoi(v); err == nil {
		return x
	}
	if x, err := strconv.ParseFloat(v, 64); err == nil {
		return x
	}
	if x, err := strconv.ParseBool(v); err == nil {
		return x
	}
	return v
}

func rmQuote(v string) string {
	return strings.Trim(strings.Trim(strings.Trim(v, `'`), `"`), "`")
}

// ParseUpdateField 解析更新字段
func ParseUpdateField(up sqlparser.UpdateExprs) (define.M, error) {
	update := define.M{}
	for _, u := range up {
		v := extractValue(sqlparser.String(u.Expr))
		update[rmQuote(sqlparser.String(u.Name))] = v
	}
	return update, nil
}
