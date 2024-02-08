package main

import (
	"fmt"
	"xtool/pkg/define"

	"github.com/mattn/go-runewidth"
	"github.com/nsf/termbox-go"
)

func tbprint(x, y int, fg, bg termbox.Attribute, msg string) {
	for _, c := range msg {
		termbox.SetCell(x, y, c, fg, bg)
		x += runewidth.RuneWidth(c)
	}
}

func fill(x, y, w, h int, cell termbox.Cell) {
	for ly := 0; ly < h; ly++ {
		for lx := 0; lx < w; lx++ {
			termbox.SetCell(x+lx, y+ly, cell.Ch, cell.Fg, cell.Bg)
		}
	}
}

// Node 树节点
type Node struct {
	ID       string
	Name     string
	Folded   bool
	Info     define.M
	Children []*Node
}

// ShowName 生成节点显示内容
func (node *Node) ShowName() string {
	var r rune
	if node.Folded == true {
		r = '+'
	} else {
		r = '-'
	}
	return fmt.Sprintf("%c %s:%s", r, node.ID, node.Name)
}

// ForeGround 前景色
func (node *Node) ForeGround() termbox.Attribute {
	return termbox.ColorDefault
}

// BackGround 背景色
func (node *Node) BackGround() termbox.Attribute {
	return termbox.ColorDefault
}

// Render 渲染节点
func (node *Node) Render(x, y int) int {
	fg := node.ForeGround()
	bg := node.BackGround()
	if y == tree.posY {
		fg = termbox.ColorCyan
		bg = termbox.ColorYellow
	}
	tree.NodePosMap[y] = node
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
func (node *Node) FoldOrUnfold() {
	node.Folded = !node.Folded
	if node.Folded == false {
		node.Children = []*Node{}
		for i := 0; i < 5; i++ {
			node.Children = append(node.Children, &Node{
				ID:       fmt.Sprintf("%s.%d", node.ID, i),
				Name:     fmt.Sprintf("子节点%d", i),
				Folded:   true,
				Children: []*Node{},
			})
		}
	}
}

var tree TreeView

// TreeView 树结构视图
type TreeView struct {
	x          int
	y          int
	w          int
	h          int
	Root       *Node
	NodePosMap map[int]*Node
	posX       int
	posY       int
}

// Init 树初始化
func (tree *TreeView) Init(x, y, w, h int) {
	tree.x = x
	tree.y = y
	tree.w = w
	tree.h = h
	tree.Root = &Node{
		ID:       "",
		Name:     "根节点",
		Folded:   true,
		Children: []*Node{},
	}
	tree.NodePosMap = make(map[int]*Node)
}

// Render 渲染树
func (tree *TreeView) Render() {
	//termbox.SetCursor(tree.posX, tree.posY)

	fill(tree.x, tree.y, 1, 1, termbox.Cell{Ch: '┏'})
	fill(tree.x+1, tree.y, tree.w, 1, termbox.Cell{Ch: '━'})
	fill(tree.x+tree.w+1, tree.y, 1, 1, termbox.Cell{Ch: '┓'})

	fill(tree.x, tree.y+1, 1, tree.h, termbox.Cell{Ch: '┃'})
	fill(tree.x+tree.w+1, tree.y+1, 1, tree.h, termbox.Cell{Ch: '┃'})

	fill(tree.x, tree.y+tree.h+1, 1, 1, termbox.Cell{Ch: '┗'})
	fill(tree.x+1, tree.y+tree.h+1, tree.w, 1, termbox.Cell{Ch: '━'})
	fill(tree.x+tree.w+1, tree.y+tree.h+1, 1, 1, termbox.Cell{Ch: '┛'})

	fill(tree.x+2, tree.posY, tree.w-1, 1, termbox.Cell{Ch: ' ', Fg: termbox.ColorDefault, Bg: termbox.ColorYellow})

	tree.Root.Render(tree.x+1, tree.y+1)
}

// GetNode 获取节点
func (tree *TreeView) GetNode(y int) *Node {
	if node, ok := tree.NodePosMap[y]; ok {
		return node
	}
	return nil
}

// FoldOrUnfold 展开或折叠
func (tree *TreeView) FoldOrUnfold() {
	node := tree.GetNode(tree.posY)
	if node != nil {
		node.FoldOrUnfold()
	}
}

// CursorUp 上移光标
func (tree *TreeView) CursorUp() {
	tree.posY--
}

// CursorDown 下移光标
func (tree *TreeView) CursorDown() {
	tree.posY++
}

func redrawAll() {
	const coldef = termbox.ColorDefault
	termbox.Clear(coldef, coldef)
	tree.Render()
	termbox.Flush()
}

// Tree 生成一颗树
func Tree() {
	err := termbox.Init()
	if err != nil {
		panic(err)
	}
	defer termbox.Close()
	termbox.SetInputMode(termbox.InputEsc)

	tree.Init(0, 0, 50, 45)

	redrawAll()
mainloop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			switch ev.Key {
			case termbox.KeyEsc:
				break mainloop
			case termbox.KeyArrowUp:
				tree.CursorUp()
			case termbox.KeyArrowDown:
				tree.CursorDown()
			case termbox.KeyEnter:
				tree.FoldOrUnfold()
			default:
			}
		case termbox.EventError:
			panic(ev.Err)
		}
		redrawAll()
	}
}

func main() {
	Tree()
}
