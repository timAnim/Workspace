package box

import (
	"fmt"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"

	runewidth "github.com/mattn/go-runewidth"
	termbox "github.com/nsf/termbox-go"
)

func init() {
	reg.Regist("view", "ttree", TemplateTree, "显示模板设备树", `ttree`, []*reg.Param{})
}

// TNode 树节点
type TNode struct {
	ID       string
	Name     string
	Folded   bool
	Info     *driver.GroupDevItem
	Children []*TNode
}

// ShowName 生成节点显示内容
func (node *TNode) ShowName() string {
	var r rune
	if node.Folded == true {
		r = '+'
	} else {
		r = '-'
	}
	return fmt.Sprintf("%c %s:%s", r, node.ID, node.Info.Value)
}

// ForeGround 前景色
func (node *TNode) ForeGround() termbox.Attribute {
	return termbox.ColorDefault
}

// BackGround 背景色
func (node *TNode) BackGround() termbox.Attribute {
	return termbox.ColorDefault
}

// Render 渲染节点
func (node *TNode) Render(x, y int) int {
	fg := node.ForeGround()
	bg := node.BackGround()
	if y == ttree.posY {
		fg = termbox.ColorCyan
		bg = termbox.ColorYellow
	}
	ttree.NodePosMap[y] = node
	x0 := x
	for _, r := range []rune(node.ShowName()) {
		termbox.SetCell(x0, y, r, fg, bg)
		x0 += runewidth.RuneWidth(r)
	}
	if node.Folded == false {
		// 未折叠的节点需要渲染子节点
		for _, c := range node.Children {
			y = c.Render(x+2, y+1)
		}
	}
	return y
}

// FoldOrUnfold 展开或折叠
func (node *TNode) FoldOrUnfold() {
	node.Folded = !node.Folded
	//if node.Folded == false {
	//	node.Children = getChildTNodes(gd, node.ID)
	//}
}

var ttree TemplateTreeView
var gd []*driver.GroupDevItem

// TemplateTreeView 树结构视图
type TemplateTreeView struct {
	x          int
	y          int
	w          int
	h          int
	Root       *TNode
	NodePosMap map[int]*TNode
	posX       int
	posY       int
}

func getChildTNodes(gd []*driver.GroupDevItem, parentID string) []*TNode {
	nodes := []*TNode{}
	for _, d := range gd {
		if d.ParentID == parentID {
			nodes = append(nodes, &TNode{
				ID:       d.ID,
				Name:     d.Name,
				Folded:   true,
				Info:     d,
				Children: getChildTNodes(gd, d.ID),
			})
		}
	}
	return nodes
}

// Init 树初始化
func (ttree *TemplateTreeView) Init(x, y, w, h int) error {
	ttree.x = x
	ttree.y = y
	ttree.w = w
	ttree.h = h
	gd, err := driver.GetGroupDev()
	if err != nil {
		return err
	}
	ttree.Root = &TNode{
		ID:       "",
		Name:     "模板树",
		Folded:   false,
		Children: getChildTNodes(gd, ""),
		Info: &driver.GroupDevItem{
			ID:    "",
			Name:  "根节点",
			Value: "模板树",
		},
	}
	ttree.NodePosMap = make(map[int]*TNode)
	return nil
}

// Render 渲染树
func (ttree *TemplateTreeView) Render() {
	//termbox.SetCursor(tree.posX, tree.posY)

	fill(ttree.x, ttree.y, 1, 1, termbox.Cell{Ch: '┏'})
	fill(ttree.x+1, ttree.y, ttree.w, 1, termbox.Cell{Ch: '━'})
	fill(ttree.x+ttree.w+1, ttree.y, 1, 1, termbox.Cell{Ch: '┓'})

	fill(ttree.x, ttree.y+1, 1, ttree.h, termbox.Cell{Ch: '┃'})
	fill(ttree.x+ttree.w+1, ttree.y+1, 1, ttree.h, termbox.Cell{Ch: '┃'})

	fill(ttree.x, ttree.y+ttree.h+1, 1, 1, termbox.Cell{Ch: '┗'})
	fill(ttree.x+1, ttree.y+ttree.h+1, ttree.w, 1, termbox.Cell{Ch: '━'})
	fill(ttree.x+ttree.w+1, ttree.y+ttree.h+1, 1, 1, termbox.Cell{Ch: '┛'})

	fill(ttree.x+2, ttree.posY, ttree.w-1, 1, termbox.Cell{Ch: ' ', Fg: termbox.ColorDefault, Bg: termbox.ColorYellow})

	ttree.Root.Render(ttree.x+1, ttree.y+1)
}

// GetNode 获取节点
func (ttree *TemplateTreeView) GetNode(y int) *TNode {
	if node, ok := ttree.NodePosMap[y]; ok {
		return node
	}
	return nil
}

// FoldOrUnfold 展开或折叠
func (ttree *TemplateTreeView) FoldOrUnfold() {
	node := ttree.GetNode(ttree.posY)
	if node != nil {
		node.FoldOrUnfold()
	}
}

// CursorUp 上移光标
func (ttree *TemplateTreeView) CursorUp() {
	ttree.posY--
}

// CursorDown 下移光标
func (ttree *TemplateTreeView) CursorDown() {
	ttree.posY++
}

func tRedrawAll() {
	const coldef = termbox.ColorDefault
	termbox.Clear(coldef, coldef)
	ttree.Render()
	termbox.Flush()
}

// TemplateTree 生成一颗模板树
func TemplateTree(rootID string) {
	err := termbox.Init()
	if err != nil {
		log.Errorf("open tree error: %s", err.Error())
		return
	}
	defer termbox.Close()
	termbox.SetInputMode(termbox.InputEsc)

	_, h := termbox.Size()

	err = ttree.Init(0, 0, 50, h-2)
	if err != nil {
		log.Errorf("open template tree error: %s", err.Error())
		return
	}
	tRedrawAll()
mainloop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			switch ev.Key {
			case termbox.KeyEsc:
				break mainloop
			case termbox.KeyArrowUp:
				ttree.CursorUp()
			case termbox.KeyArrowDown:
				ttree.CursorDown()
			case termbox.KeyEnter:
				ttree.FoldOrUnfold()
			default:
			}
		case termbox.EventError:
			panic(ev.Err)
		}
		tRedrawAll()
	}
}
