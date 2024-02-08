package types

import "encoding/json"

// Query 查询结构体
type Query struct {
	//Group  string   `json:"group"`
	ResourceID   string   `json:"resource_id"`
	RelationCode int      `json:"relation_code"`
	Output       []string `json:"output,omitempty"`
	From         []string `json:"-"`
	Where        []*Cond  `json:"where"`
	Sorts        []*Sort  `json:"sorts,omitempty"`
	Page         *Page    `json:"page,omitempty"`
	Limit        *Limit   `json:"limit,omitempty"`
	Update       M        `json:"update,omitempty"`
	Translate    int      `json:"translate,omitempty"`
	Deleted      string   `json:"deleted,omitempty"`
}

func (q *Query) String() string {
	b, _ := json.Marshal(q)
	return string(b)
}

// Cond 或条件
type Cond struct {
	Terms []*Term `json:"terms"`
}

// Term 单个条件
type Term struct {
	Field    string      `json:"field"`
	Operator string      `json:"operator"`
	Value    interface{} `json:"value"`
}

// Sort 排序
type Sort struct {
	Field string `json:"field"`
	Type  string `json:"type"`
}

// Page 分页
type Page struct {
	Number uint64 `json:"number"`
	Size   uint64 `json:"size"`
}

// Limit 后端分页
type Limit struct {
	Start int `json:"start"`
	End   int `json:"end"`
}

// NewQuery 新建查询结构
func NewQuery() *Query {
	return &Query{}
}

// WithOutput 指定输出字段
func (q *Query) WithOutput(output ...string) *Query {
	q.Output = output
	return q
}

// WithPage 指定分页
func (q *Query) WithPage(number, size int) *Query {
	q.Page = &Page{
		Number: uint64(number),
		Size:   uint64(size),
	}
	return q
}

// WithTranslateYes 指定翻译location
func (q *Query) WithTranslateYes() *Query {
	q.Translate = 1
	return q
}

// WithDeletedBoth 指定查出所有节点，包括已删除的
func (q *Query) WithDeletedBoth() *Query {
	q.Deleted = "both"
	return q
}
