package sqladapter

import (
	"encoding/json"
	"fmt"
	"strconv"
	"xtool/pkg/define"
)

// Query 通用查询结构
type Query struct {
	//Extra  bool           `json:"extra"`
	Output []string       `json:"output"`
	Where  *Cond          `json:"where"`
	Sorts  []*define.Sort `json:"sorts"`
	Page   *Page          `json:"page"`
	//Group  string         `json:"group"`
}

// Cond 通用查询条件
type Cond struct {
	And []*Cond `json:"and"`
	Or  []*Cond `json:"or"`
	define.Term
}

func (c *Cond) String() string {
	b, _ := json.Marshal(c)
	return string(b)
}

// Page 兼容分页
type Page struct {
	Number interface{} `json:"number"`
	Size   interface{} `json:"size"`
}

// Convert 转成标准查询结构
func (q *Query) Convert() (*define.Query, error) {
	dq := &define.Query{
		Sorts: q.Sorts,
	}
	//dq.Group = q.Group
	dq.Output = q.Output
	if q.Page != nil {
		p := &define.Page{}
		switch x := q.Page.Number.(type) {
		case string:
			number, err := strconv.ParseInt(x, 10, 64)
			if err != nil {
				return nil, err
			}
			p.Number = uint64(number)
		case float64:
			p.Number = uint64(x)
		case int:
			p.Number = uint64(x)
		}
		switch x := q.Page.Size.(type) {
		case string:
			size, err := strconv.ParseInt(x, 10, 64)
			if err != nil {
				return nil, err
			}
			p.Size = uint64(size)
		case float64:
			p.Size = uint64(x)
		case int:
			p.Size = uint64(x)
		}
		dq.Page = p
	}
	if q.Where == nil {
		return dq, nil
	}
	conds, err := q.Where.Convert()
	if err != nil {
		return nil, err
	}
	dq.Where = conds
	return dq, nil
}

/*
(A|B)&C => (A&C)|(B&C)
*/

// Convert 转成标准查询条件
func (c *Cond) Convert() ([]*define.Cond, error) {
	err := c.check()
	if err != nil {
		return nil, err
	}
	conds := []*define.Cond{}
	if c.Field != "" {
		// 递归出口, 到叶子节点
		conds = append(conds, &define.Cond{
			Terms: []*define.Term{&c.Term},
		})
	} else if len(c.And) != 0 {
		terms := []*define.Term{}
		for _, cond := range c.And {
			sub, err := cond.Convert()
			if err != nil {
				return nil, err
			}
			if len(sub) > 1 {
				conds = append(conds, sub...)
			} else {
				// 子条件数量为1，做条件聚合
				terms = append(terms, sub[0].Terms...)
			}
		}
		if len(conds) == 0 {
			// 没有子或条件的情况，构造一个与条件
			conds = append(conds, &define.Cond{
				Terms: terms,
			})
		} else {
			// 遍历conds，将terms合并其中
			for _, cond := range conds {
				cond.Terms = append(cond.Terms, terms...)
			}
		}
	} else if len(c.Or) != 0 {
		for _, cond := range c.Or {
			sub, err := cond.Convert()
			if err != nil {
				return nil, err
			}
			conds = append(conds, sub...)
		}
	}
	return conds, nil
}

func (c *Cond) check() error {
	if c.Field != "" && len(c.And) != 0 {
		goto err
	}
	if c.Field != "" && len(c.Or) != 0 {
		goto err
	}
	if len(c.And) != 0 && len(c.Or) != 0 {
		goto err
	}
	return nil
err:
	return fmt.Errorf("condition parse error")
}
