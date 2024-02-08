package box

import (
	//"bufio"
	"bytes"
	"container/list"
	"encoding/json"
	"fmt"

	//"io"
	"io/ioutil"
	"os"
	"os/exec"
	"os/user"
	"path"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"
	"unsafe"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/tsdb"

	"github.com/tealeg/xlsx"

	log "github.com/sirupsen/logrus"

	runewidth "github.com/mattn/go-runewidth"
	termbox "github.com/nsf/termbox-go"
)

func init() {
	reg.Regist("view", "tree", Tree, "显示设备树", `tree <rootID>`, []*reg.Param{
		&reg.Param{Name: "rootID", Type: "string", Necessity: false, Desc: "要展示的根节点, 默认 'project_root'"},
	})
}

//=======================================================================================
//Node
//=======================================================================================
// Node 树节点
type Node struct {
	ID        string
	type_     string
	Deleted   int
	Name      string
	RealValue string
	Parent    *Node
	Folded    bool
	Info      define.M
	Children  []*Node
}

// ShowName 生成节点显示内容
func (node *Node) ShowName() string {
	var r rune
	if node.Folded == true {
		r = '+'
	} else {
		r = '-'
	}
	return fmt.Sprintf("%c %s:%s %s", r, node.ID, node.Name, node.RealValue)
}

// ForeGround 前景色
func (node *Node) ForeGround() termbox.Attribute {
	if node.Deleted == 1 {
		return 9
	} else if node.type_ == "6_0" {
		return 13
	} else if node.type_ == "3_0" {
		return 14
	} else if node.type_ == "2_0" {
		return 12
	} else {
		return termbox.ColorDefault
	}
}

// BackGround 背景色
func (node *Node) BackGround() termbox.Attribute {
	return termbox.ColorDefault
}

// Render 渲染节点
func (node *Node) Render(x, y int) int {
	if y > tree.screen.h-2 {
		return y
	}
	fg := node.ForeGround()
	bg := node.BackGround()
	if y == tree.screen.posY {
		fg = termbox.ColorBlack
		bg = termbox.ColorYellow
	}
	tree.SetNode(y, node)
	x0 := x
	for _, r := range []rune(node.ShowName()) {
		termbox.SetCell(x0, y, r, fg, bg)
		x0 += runewidth.RuneWidth(r)
	}
	if node.Folded == false {
		// 未折叠的节点需要渲染子节点
		for _, c := range node.Children {
			mapMutex.Lock()
			if v, ok := idVMap[c.ID]; ok {
				c.RealValue = fmt.Sprintf("%v", v.RealValue)
			} else {
				c.RealValue = "--"
			}
			mapMutex.Unlock()
			y = c.Render(x+2, y+1)
		}
	}
	return y
}

// 刷新节点
func (node *Node) RefreshSelf() {
	node.FoldOrUnfold()
	node.FoldOrUnfold()
}

// 刷新父节点
func (node *Node) RefreshParent() {
	if node.Parent != nil {
		node.Parent.FoldOrUnfold()
		node.Parent.FoldOrUnfold()
	}
}

// FoldOrUnfold 展开或折叠
func (node *Node) FoldOrUnfold() {
	node.Folded = !node.Folded
	if node.Folded == false {
		if node.type_ == "99" {
			return
		}
		node.Children = []*Node{}
		children, err := cmdb.GetChildren(node.ID, showDeleted, nil)
		if err != nil {
			return
		}
		subMap := map[string]*Node{}
		subNode := node
		for _, c := range children {
			if ct, ok := c.Attributes["ci_type"]; ok {
				name := c.Attributes["name"].(string)
				if node.ID == "link_root" {
					if v, ok := c.Attributes["transfer"]; ok {
						if transferName, ok := strToMap(v.(string))["transfer"]; ok {
							if _, ok := subMap[transferName]; !ok {
								newNode := &Node{
									ID:       "",
									type_:    "99",
									Parent:   node,
									Deleted:  0,
									Name:     transferName,
									Folded:   true,
									Children: []*Node{},
								}
								node.Children = append(node.Children, newNode)
								subMap[transferName] = newNode
							}
							subNode = subMap[transferName]
						}
					}
				}
				Deleted := c.Deleted
				ciType := ct.(string)
				switch ciType {
				case "2", "5", "6", "7":
					if ciType == "6" && !showPage {
						break
					}
					subNode.Children = append(subNode.Children, &Node{
						ID:       c.ResourceID,
						type_:    ciType + "_" + strconv.Itoa(Deleted),
						Parent:   subNode,
						Deleted:  Deleted,
						Name:     name,
						Folded:   true,
						Children: []*Node{},
					})
				case "3":
					// 测点
					if st, yes := c.Attributes["spot_type"]; yes {
						spotType := st.(string)
						switch spotType {
						case "5":
							continue
						default:
						}
					}
					subNode.Children = append(subNode.Children, &Node{
						ID:       c.ResourceID,
						type_:    ciType + "_" + strconv.Itoa(Deleted),
						Parent:   subNode,
						Deleted:  Deleted,
						Name:     name,
						Folded:   false,
						Children: []*Node{},
					})
				default:
				}
			}
		}
	}
}

//=======================================================================================
//Frame
//=======================================================================================
type Frame struct {
	x    int
	y    int
	w    int
	h    int
	posY int
}

var (
	cur_frame interface{}
)

// InCur 鼠标在范围内
func (frame *Frame) InCur(ev termbox.Event) bool {
	if frame.x <= ev.MouseX && ev.MouseX <= frame.x+frame.w && frame.y <= ev.MouseY && ev.MouseY < frame.y+frame.h {
		return true
	}
	return false
}

// 记录当前鼠标操作的frame
func (frame *Frame) MarkCur(ev termbox.Event) {
	frame.posY = ev.MouseY
	cur_frame = nil
	for e := list_screen.Front(); e != nil; e = e.Next() {
		if (*Frame)(unsafe.Pointer(e.Value.(*Screen))) == frame {
			cur_frame = frame
			break
		}
	}
}

// 是否是当前鼠标操作的frame
func (frame *Frame) WasCur() bool {
	if cur_frame == nil {
		return false
	}
	return cur_frame.(*Frame) == frame
}

//
func (frame *Frame) GetFgBg(y int, fg, bg termbox.Attribute) (termbox.Attribute, termbox.Attribute) {
	fg0 := fg
	bg0 := bg
	if y == frame.posY {
		fg0 = termbox.ColorBlack
		bg0 = termbox.ColorYellow
	}
	return fg0, bg0
}

//=======================================================================================
//Menu
//=======================================================================================
type Menu struct {
	Frame
	open          bool
	isSelected    bool
	type_         string
	types         map[string]int
	export_fields map[string]int
	data          interface{}
	title         string
	command       string
	function      func(*Menu) error
	NodePosMap    map[int]*Menu
	parent        *Menu
	children      []*Menu
	timer         *time.Timer
}

// Add 增加子菜单
// types 类型，空间或设备是否展示等(ci_type)，nil为空白处展示
func (menu *Menu) Add(title, command string, types []string, f func(*Menu) error) *Menu {
	tps := map[string]int{}
	for _, v := range types {
		tps[v] = 0
	}
	tmp := &Menu{title: title, command: command, types: tps, export_fields: map[string]int{}, parent: menu, function: f, NodePosMap: map[int]*Menu{}, timer: time.NewTimer(0)}
	EventObjs = append(EventObjs, tmp)
	menu.children = append(menu.children, tmp)
	width := 0
	for _, r := range []rune(title) {
		width += runewidth.RuneWidth(r)
	}
	if width+2 > menu.w {
		menu.w = width + 5
	}
	return tmp
}

// GetNode 获取节点
func (menu *Menu) GetNode(y int) *Menu {
	if node, ok := menu.NodePosMap[y]; ok {
		return node
	}
	return nil
}

// IsOpen 是否打开
func (menu *Menu) IsOpen() bool {
	if menu.parent == nil {
		return menu.open
	}
	for cur := menu; cur != nil; cur = cur.parent {
		if cur.open == false {
			return false
		}
	}
	return true
}

// SetOpen 设置打开
func (menu *Menu) SetOpen(open bool) {
	if open {
		menu.open = true
		return
	}
	menu.open = false
	for _, child := range menu.children {
		child.open = false
	}
}

func (menu *Menu) Draw() {
	if !(menu.parent != nil && menu.parent.IsOpen() || menu.IsOpen()) {
		return
	}
	y0 := menu.y
	if menu.parent != nil {
		menu.parent.NodePosMap[menu.y] = menu
		x0 := menu.parent.x
		menu.x = x0 + menu.parent.w
		var fg, bg termbox.Attribute
		fg, bg = menu.parent.GetFgBg(menu.y, termbox.ColorDefault, termbox.ColorGreen)
		fill(x0, menu.y, menu.parent.w, 1, termbox.Cell{Ch: ' ', Fg: fg, Bg: bg})
		status := []rune("")
		if len(menu.children) != 0 {
			if menu.parent.posY == menu.y {
				menu.SetOpen(true)
			} else {
				menu.SetOpen(false)
			}
			status = []rune(">")
		} else if menu.isSelected {
			status = []rune("√")
		}
		for _, r := range status {
			termbox.SetCell(x0+menu.parent.w-1, menu.y, r, fg, bg)
		}
		for _, r := range []rune(menu.title) {
			termbox.SetCell(x0+1, menu.y, r, fg, bg)
			x0 += runewidth.RuneWidth(r)
		}
	}
	menu.h = 0
	for _, child := range menu.children {
		child.type_ = menu.type_
		//指定ci_type的空间才能展示指定菜单
		if _, ok := child.types[menu.type_]; len(child.types) == 0 || ok {
			child.y = y0
			child.Draw()
			y0 += 1
			menu.h += 1
		}
	}
}

func (menu *Menu) Event(ev termbox.Event) bool {
	next := true
	switch ev.Key {
	case termbox.MouseLeft:
		if menu.IsOpen() && menu.InCur(ev) {
			next = false
			select {
			case <-menu.timer.C:
				menu.timer.Reset(time.Millisecond * 300)
				if menu.posY != ev.MouseY {
					break
				}
				if ch := menu.GetNode(menu.posY); ch != nil {
					go func() {
						screen_msg.Append(fmt.Sprintf("=====开始执行:%s,%s\n", ch.title, ch.command))
						if err := ch.function(ch); err == nil {
							screen_msg.AppendWithColor(fmt.Sprintf("=====操作完成:%s,%s\n", ch.title, ch.command), 11, termbox.ColorDefault)
						} else {
							screen_msg.AppendWithColor(fmt.Sprintf("=====操作失败:%s,%s\n", ch.title, ch.command), 14, termbox.ColorDefault)
							screen_msg.AppendWithColor(fmt.Sprintf("%s\n", err), 10, termbox.ColorDefault)
						}
						time.Sleep(time.Second * 1)
						termbox.Sync()
					}()
				}
			default:
			}
			menu.posY = ev.MouseY
		}
	}
	return next
}

//=======================================================================================
//Bar
//=======================================================================================
type Bar struct {
	Frame
	touch bool
}

func (bar *Bar) Draw() {
	if bar.touch {
		fill(bar.x, bar.y, bar.w, bar.h, termbox.Cell{Ch: '#'})
	} else {
		fill(bar.x, bar.y, bar.w, bar.h, termbox.Cell{Ch: '*'})
	}
}
func (bar *Bar) Event(ev termbox.Event) bool {
	switch ev.Key {
	case termbox.MouseLeft:
		if bar.InCur(ev) {
			bar.touch = true
		}
		if bar.touch {
			if bar.h > bar.w {
				bar.x = ev.MouseX
			} else {
				bar.y = ev.MouseY
			}
		}
	case termbox.MouseRelease:
		bar.touch = false
	}
	return true
}

//=======================================================================================
//Screen
//=======================================================================================
type ScreenText struct {
	text string
	fg   termbox.Attribute
	bg   termbox.Attribute
}
type ScreenErr struct {
	screen *Screen
}

func (o *ScreenErr) Write(p []byte) (n int, err error) {
	o.screen.AppendWithColor(string(p), 10, termbox.ColorDefault)
	o.screen.ToButtom = true
	return len(p), nil
}

type ScreenOut struct {
	screen *Screen
}

func (o *ScreenOut) Write(p []byte) (n int, err error) {
	o.screen.Append(string(p))
	o.screen.ToButtom = true
	return len(p), nil
}

type Screen struct {
	Frame
	innerY   int
	ToButtom bool
	ToTop    bool
	menu     *Menu
	bar      *Bar
	out      *list.List
	Stdout   *ScreenOut
	Stderr   *ScreenErr
	element  *list.Element
	curX     int
	curY     int
}

// Draw 绘制边框
func (screen *Screen) Draw() {
	screen.bar.Draw()
	if screen.w < 0 {
		return
	}
	fill(screen.x, 0, 1, 1, termbox.Cell{Ch: '┏'})
	fill(screen.x+1, 0, screen.w, 1, termbox.Cell{Ch: '━'})
	fill(screen.x+screen.w+1, 0, 1, 1, termbox.Cell{Ch: '┓'})

	fill(screen.x, 1, 1, screen.h-2, termbox.Cell{Ch: '┃'})
	fill(screen.x+screen.w+1, 1, 1, screen.h-2, termbox.Cell{Ch: '┃'})

	fill(screen.x, screen.h-1, 1, 1, termbox.Cell{Ch: '┗'})
	fill(screen.x+1, screen.h-1, screen.w, 1, termbox.Cell{Ch: '━'})
	fill(screen.x+screen.w+1, screen.h-1, 1, 1, termbox.Cell{Ch: '┛'})

	fill(screen.x+2, screen.posY, screen.w-1, 1, termbox.Cell{Ch: ' ', Fg: termbox.ColorDefault, Bg: termbox.ColorYellow})
	x0 := screen.x + 1
	y0 := screen.innerY + 2
	color := false
	for e := screen.out.Front(); e != nil; e = e.Next() {
		i := e.Value.(*ScreenText)
		rune_s := []rune(i.text)
		mk_fg := i.fg
		mk_bg := i.bg
		for idx, r := range rune_s {
			if r == '\n' || x0 > screen.x+screen.w {
				x0 = screen.x + 1
				y0 += 1
				if r == '\n' {
					color = true
				}
				continue
			}
			if y0 > screen.h-2 {
				continue
			}
			if color && x0 == screen.x+1 {
				color = false
				startWith := func(str string) bool {
					end := idx + len([]rune(str)) + 6
					return len(rune_s) > end && strings.Contains(string(rune_s[idx:end]), str)
				}
				if startWith("-----") {
					i.fg = 11
				} else if startWith(">>>>>") {
					i.fg = 15
				} else if startWith("INFO") {
					i.fg = 13
				} else if startWith("WARN") {
					i.fg = 12
				} else if startWith("ERRO") || startWith("panic") {
					i.fg = 10
				} else {
					i.fg = mk_fg
					i.bg = mk_bg
				}
			}
			fg0, bg0 := screen.GetFgBg(y0, i.fg, i.bg)
			termbox.SetCell(x0, y0, r, fg0, bg0)
			x0 += runewidth.RuneWidth(r)
		}
	}
	screen.curX = x0
	screen.curY = y0
	if screen.WasCur() {
		cur_posX = screen.curX
		cur_posY = screen.curY
	}
	if screen.ToButtom {
		screen.ToButtom = false
		screen.innerY = screen.innerY - screen.curY + screen.h - 4
	} else if screen.ToTop {
		screen.ToTop = false
		screen.innerY = 0
	}
}

// Write 写入
func (screen *Screen) Write(p []byte) (n int, err error) {
	screen.Append(string(p))
	screen.ToButtom = true
	return len(p), nil
}
func (screen *Screen) AppendWithColor(text string, fg, bg termbox.Attribute) {
	screen.out.PushBack(&ScreenText{text, fg, bg})
}
func (screen *Screen) Append(text string) {
	screen.AppendWithColor(text, termbox.ColorDefault, termbox.ColorDefault)
}
func (screen *Screen) WriteDefault(text string) {
	screen.out.Init()
	screen.AppendWithColor(text, termbox.ColorDefault, termbox.ColorDefault)
}
func (screen *Screen) WriteWithColor(text string, fg, bg termbox.Attribute) {
	screen.out.Init()
	screen.AppendWithColor(text, fg, bg)
}
func (screen *Screen) Print(text string) {
	screen.PrintWithColor(text, termbox.ColorDefault, termbox.ColorDefault, true)
}
func (screen *Screen) PrintWithColor(text string, fg, bg termbox.Attribute, br bool) {
	x0 := screen.x + 1
	y0 := screen.innerY + 2
	for _, r := range []rune(text) {
		if br && (r == '\n' || x0 > screen.x+screen.w) {
			x0 = screen.x + 1
			y0 += 1
		}
		if y0 > screen.h-2 {
			return
		}
		fg0, bg0 := screen.GetFgBg(y0, fg, bg)
		termbox.SetCell(x0, y0, r, fg0, bg0)
		x0 += runewidth.RuneWidth(r)
	}
}

// InCur 鼠标在内部
func (screen *Screen) InCur(ev termbox.Event) bool {
	if screen.x <= ev.MouseX && ev.MouseX <= screen.x+screen.w && screen.y+1 <= ev.MouseY && ev.MouseY < screen.y+screen.h-1 {
		screen.MarkCur(ev)
		return true
	}
	return false
}

// JustShowThis 显示该窗口
func (screen *Screen) JustShowThis() {
	for e := list_screen.Front(); e != nil; e = e.Next() {
		screen := e.Value.(*Screen)
		screen.Hide()
	}
	w, _ := termbox.Size()
	front_screen := list_screen.Front().Value.(*Screen)
	screen.bar.x = front_screen.bar.x + w - front_screen.w - 5
}

// Hide 隐藏该窗口
func (screen *Screen) Hide() {
	if prev := screen.element.Prev(); prev != nil {
		prev_screen := prev.Value.(*Screen)
		screen.bar.x = prev_screen.bar.x
	}
	screen.menu.SetOpen(false)
}

// Event 接收事件
func (screen *Screen) Event(ev termbox.Event) bool {
	switch ev.Key {
	case termbox.KeyPgup:
		if screen.WasCur() {
			screen.posY += screen.h
			screen.innerY += screen.h
		}
	case termbox.KeyPgdn:
		if screen.WasCur() {
			screen.posY += screen.h
			screen.innerY -= screen.h
		}
	case termbox.MouseLeft:
		if screen.InCur(ev) {
			screen.menu.SetOpen(false)
		}
	case termbox.MouseRight:
		if screen.InCur(ev) {
			getInfo("")
			screen.menu.SetOpen(true)
			screen.menu.x = ev.MouseX
			screen.menu.y = ev.MouseY + 1
		}
	case termbox.MouseWheelUp:
		if screen.InCur(ev) {
			screen.innerY += 3
		}
	case termbox.MouseWheelDown:
		if screen.InCur(ev) {
			screen.innerY -= 3
		}
	default:
		//todo:打字
		//if screen.WasCur() {
		//	if ev.Key == termbox.KeyEnter {
		//		screen.Append("\n")
		//	} else if ev.Key == 0 {
		//		screen.Append(fmt.Sprint(string(ev.Ch)))
		//	} else if ev.Key == termbox.KeyBackspace && screen.out.Len() > 0 {
		//		screen.out.Remove(screen.out.Back())
		//	}
		//}
	}
	return true
}

//=======================================================================================
//TreeView
//=======================================================================================
// TreeView 树结构视图
type TreeView struct {
	Frame
	Root       *Node
	NodePosMap map[int]*Node
	posX       int
	screen     *Screen
	doubleC    *time.Timer
	timer      *time.Timer
	lock       sync.Mutex
}

// Init 树初始化
func (tree *TreeView) setRoot(rootID string) error {
	root, err := cmdb.GetItem(rootID, 0)
	if err != nil {
		return err
	}
	if ct, ok := root.Attributes["ci_type"]; ok {
		tree.Root = &Node{
			ID:       root.ResourceID,
			type_:    ct.(string),
			Name:     root.Attributes["name"].(string),
			Folded:   true,
			Children: []*Node{},
		}
	} else {
		return fmt.Errorf("ci_type not found")
	}
	return nil
}

// Init 树初始化
func (tree *TreeView) Init(rootID string, x, y, w, h int) error {
	tree.x = x
	tree.y = y
	tree.w = w
	_, tree.h = termbox.Size()
	tree.h -= 3
	if err := tree.setRoot(rootID); err != nil {
		return err
	}
	tree.NodePosMap = make(map[int]*Node)
	EventObjs = append(EventObjs, tree)
	tree.screen = NewScreen(true)
	return nil
}

func (tree *TreeView) Event(ev termbox.Event) bool {
	next := true
loop:
	switch ev.Key {
	case termbox.KeyArrowUp:
		tree.CursorUp()
		if tree.screen.posY < 1 {
			tree.y += 1
			tree.screen.posY = 1
		}
		getInfo("")
	case termbox.KeyArrowDown:
		tree.CursorDown()
		if tree.screen.posY > tree.screen.h-2 {
			tree.y -= 1
			tree.screen.posY = tree.screen.h - 2
		}
		getInfo("")
	case termbox.KeyPgup:
		if tree.screen.WasCur() {
			tree.screen.posY += tree.h
			tree.y += tree.h
		}
	case termbox.KeyPgdn:
		if tree.screen.WasCur() {
			tree.screen.posY -= tree.h
			tree.y -= tree.h
		}
	case termbox.KeyEnter:
		if tree.screen.WasCur() {
			tree.FoldOrUnfold()
		}
	case termbox.MouseLeft:
		if tree.screen.InCur(ev) {
			// 模拟双击
			select {
			case <-tree.doubleC.C:
				if tree.screen.posY == ev.MouseY {
					tree.FoldOrUnfold()
				}
				tree.doubleC.Stop()
			case <-tree.timer.C:
				go func() {
					tree.timer.Stop()
					tree.doubleC.Reset(time.Millisecond * 100)
					time.Sleep(time.Millisecond * 200)
					tree.timer.Reset(0)
					tree.doubleC.Stop()
				}()
			default:
				break loop
			}
			getInfo("")
			tree.screen.menu.SetOpen(false)
		}
	case termbox.MouseRight:
		if tree.screen.InCur(ev) {
			getInfo("")
			tree.screen.menu.SetOpen(true)
			tree.screen.menu.x = ev.MouseX
			tree.screen.menu.y = ev.MouseY + 1
			if node := tree.GetNode(tree.screen.posY); node != nil {
				tree.screen.menu.type_ = node.type_
			} else {
				tree.screen.menu.type_ = "nil"
			}
		}
	case termbox.MouseWheelUp:
		if tree.screen.InCur(ev) {
			tree.y += 3
		}
	case termbox.MouseWheelDown:
		if tree.screen.InCur(ev) {
			tree.y -= 3
		}
	}
	return next
}

// Render 渲染树
func (tree *TreeView) Render() {
	//termbox.SetCursor(tree.posX, tree.screen.posY)
	for e := list_screen.Front(); e != nil; e = e.Next() {
		e.Value.(*Screen).bar.h = bar_buttom.y
	}

	bar_buttom.w = screen_info.bar.x + screen_info.bar.w
	bar_buttom.Draw()

	for e := list_screen.Front(); e != nil; e = e.Next() {
		screen := e.Value.(*Screen)
		if prev := e.Prev(); prev != nil {
			prev_screen := prev.Value.(*Screen)
			screen.x = prev_screen.bar.x + prev_screen.bar.w
		}
		screen.w = screen.bar.x - screen.x - 2
		screen.h = bar_buttom.y
		screen.Draw()
	}

	tree.ClearNode()
	tree.Root.Render(tree.x+1, tree.y+1)
	for e := list_screen.Front(); e != nil; e = e.Next() {
		e.Value.(*Screen).menu.Draw()
	}
}

// GetNode 获取节点
func (tree *TreeView) GetNode(y int) *Node {
	tree.lock.Lock()
	defer tree.lock.Unlock()
	if node, ok := tree.NodePosMap[y]; ok {
		return node
	}
	return nil
}

// SetNode 设置节点
func (tree *TreeView) SetNode(y int, node *Node) {
	tree.lock.Lock()
	defer tree.lock.Unlock()
	tree.NodePosMap[y] = node
}

// SetNode 清空节点
func (tree *TreeView) ClearNode() {
	tree.lock.Lock()
	defer tree.lock.Unlock()
	tree.NodePosMap = map[int]*Node{}
}

// FoldOrUnfold 展开或折叠
func (tree *TreeView) FoldOrUnfold() {
	node := tree.GetNode(tree.screen.posY)
	if node != nil {
		node.FoldOrUnfold()
	}
}

// CursorUp 上移光标
func (tree *TreeView) CursorUp() {
	tree.screen.posY--
}

// CursorDown 下移光标
func (tree *TreeView) CursorDown() {
	tree.screen.posY++
}

//=======================================================================================
//public
//=======================================================================================

var (
	mapMutex           sync.Mutex
	tree               TreeView
	idVMap             map[string]*define.ValueItem
	screen_node        *Screen
	screen_info        *Screen
	screen_msg         *Screen
	ticker             *time.Ticker
	showDeleted        int
	showPage           bool
	bar_buttom         *Bar
	list_screen        *list.List
	EventObjs          []interface{}
	will_do            func() error
	path_home          string
	path_upload        string
	path_upload_import string
	path_download      string
	chan_in            chan bool
	chan_out           chan error
	cur_posX           int
	cur_posY           int
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

func redrawAll() {
	const coldef = termbox.ColorDefault
	termbox.Clear(coldef, coldef)
	tree.Render()
	termbox.Flush()
	//光标在屏幕底部
	termbox.SetCursor(0, tree.screen.h+1)
	//光标在点击的窗口
	//termbox.SetCursor(cur_posX, cur_posY)
}

func getInfo(text string) {
	if text != "" {
		screen_node.WriteDefault(text)
		return
	}
	node := tree.GetNode(tree.screen.posY)
	if node != nil {
		resourceID := node.ID
		r, err := cmdb.GetItem(resourceID, 1)
		if err != nil {
			screen_node.WriteWithColor(fmt.Sprintf("get node '%s' error: %s\n", resourceID, err.Error()), 10, termbox.ColorDefault)
			return
		}
		text, err := jsonFormat(r)
		if err != nil {
			screen_node.WriteWithColor(fmt.Sprintf("get node '%s' error: %s\n", resourceID, err.Error()), 10, termbox.ColorDefault)
			return
		}
		screen_node.WriteDefault(text)
	} else {
		screen_node.WriteDefault("")
	}
}

// call 内置命令通用调用方法
func call(fn interface{}, params ...interface{}) {
	ft := reflect.TypeOf(fn)
	extra := ft.NumIn() - len(params)
	if extra > 0 {
		// 函数需求参数多余提供参数的情况
		for i := 0; i < extra; i++ {
			params = append(params, "")
		}
	} else if extra < 0 {
		// 函数需求参数少于提供的参数的情况
		log.Warn("params count not match")
		return
	}
	f := reflect.ValueOf(fn)
	in := make([]reflect.Value, len(params))
	for k, param := range params {
		in[k] = reflect.ValueOf(param)
	}
	f.Call(in)
}
func pollEvent(ev termbox.Event) {
	for i := len(EventObjs) - 1; i > -1; i-- {
		mthd := reflect.ValueOf(EventObjs[i]).MethodByName("Event")
		if mthd.IsValid() {
			next := mthd.Call([]reflect.Value{reflect.ValueOf(ev)})
			if !next[0].Bool() {
				break
			}
		}
	}
}
func InitBox() {
	err := termbox.Init()
	if err != nil {
		log.Errorf("open tree error: %s", err.Error())
		return
	}
	termbox.SetInputMode(termbox.InputEsc | termbox.InputMouse)
	termbox.SetOutputMode(termbox.Output256)
}
func NewScreen(display bool) *Screen {
	if list_screen == nil {
		list_screen = list.New()
	}
	_, h := termbox.Size()
	h -= 3
	menu := &Menu{NodePosMap: map[int]*Menu{}, timer: time.NewTimer(0)}
	screen := &Screen{Frame: Frame{x: 0, y: 0, w: 50, h: h, posY: 1}, out: list.New(), menu: menu}
	screen.Stderr = &ScreenErr{screen}
	screen.Stdout = &ScreenOut{screen}
	prev_bar_x := 0
	if list_screen.Len() != 0 {
		prev_screen := list_screen.Back().Value.(*Screen)
		screen.x = prev_screen.bar.x + 1
		screen.h = prev_screen.h
		prev_bar_x = prev_screen.bar.x
	}
	screen.bar = &Bar{Frame: Frame{x: screen.x + screen.w + 2, y: 0, w: 1, h: screen.h}}
	EventObjs = append(EventObjs, screen)
	EventObjs = append(EventObjs, screen.bar)
	EventObjs = append(EventObjs, menu)
	if display {
		screen.bar.x = prev_bar_x + 50
	} else {
		screen.bar.x = prev_bar_x
	}
	screen.element = list_screen.PushBack(screen)
	return screen
}
func execCommand(cmd *exec.Cmd) error {
	cmd.Stdout = screen_msg
	cmd.Stderr = screen_msg
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}

// execCommandWithCli 调用cli执行命令
// 获取标准输出、标准错误输出
func execCommandWithCli(command, workDir string) error {
	cmd := exec.Command("sh", "-c", fmt.Sprintf("cli << EOF\nlogin %s %s %s \n %s \n logout \nEOF", auth.GetHost(), auth.GetAccount(), auth.GetPassword(), command))
	screen_msg.Append(command + "\n")
	if workDir == "" {
		workDir = path_download
	}
	cmd.Dir = workDir
	if err := execCommand(cmd); err != nil {
		return err
	}
	return nil
}

// downloadFile 下载文件
func downloadFile() error {
	cmd1 := exec.Command("sh", "-c", "ls -t|head -n 1")
	cmd1.Dir = path_download
	output, err := cmd1.Output()
	if err != nil {
		return err
	}
	will_do = func() error {
		cmd := exec.Command("sh", "-c", "sz "+string(output))
		cmd.Dir = path_download
		cmd.Stdin = os.Stdin
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			return err
		}
		time.Sleep(time.Second * 1)
		return nil
	}
	chan_in <- true
	return <-chan_out
}

// uploadFile 上传文件
func uploadFile(path string) error {
	screen_msg.JustShowThis()
	will_do = func() error {
		var errbuf bytes.Buffer
		ch := exec.Command("rz", "-y")
		ch.Dir = path
		ch.Stdin = os.Stdin
		ch.Stdout = os.Stdout
		ch.Stderr = &errbuf
		termbox.Sync()
		ch.Run()
		termbox.Sync()
		for _, errMsg := range []string{"file exists", "Sender Canceled", "Got TIMEOUT"} {
			if strings.Contains(string(errbuf.Bytes()), errMsg) {
				return fmt.Errorf(string(errbuf.Bytes()))
			}
		}
		print(string(errbuf.Bytes()))
		return nil
	}
	chan_in <- true
	return <-chan_out
}
func print(a ...interface{}) {
	screen_msg.Append(fmt.Sprint(a...))
	screen_msg.ToButtom = true
}

// exportCommand 执行命令并导出文件
func exportCommand(command string) error {
	ticker = time.NewTicker(time.Millisecond * 100)
	screen_msg.JustShowThis()
	if err := execCommandWithCli(command, path_download); err != nil {
		return err
	}
	return downloadFile()
}

// importCommand 导入文件并执行命令
func importCommand(command string) error {
	if err := uploadFile(path_upload_import); err != nil {
		return err
	}
	ticker = time.NewTicker(time.Millisecond * 100)

	cmd1 := exec.Command("sh", "-c", "ls -tc|head -n 1")
	cmd1.Dir = path_upload_import
	output, err := cmd1.Output()
	if err != nil {
		screen_msg.Append(fmt.Sprint(err))
	}
	str_cmd := fmt.Sprintf(command, strings.Trim(string(output), "\n"))
	screen_msg.JustShowThis()
	if err := execCommandWithCli(str_cmd, path_upload_import); err != nil {
		print(err)
	}
	termbox.Sync()
	ticker = time.NewTicker(time.Millisecond * 1000)
	return nil
}

func Menu_Add_SwichSindow(screen *Screen) {
	screen.menu.Add("隐藏窗口", "", []string{}, func(self *Menu) error {
		screen.Hide()
		return nil
	})
	menu := screen.menu.Add("切换窗口", "", []string{}, func(self *Menu) error {
		return nil
	})
	menu.Add("节点窗口", "", []string{}, func(self *Menu) error {
		screen_node.JustShowThis()
		return nil
	})
	menu.Add("信息窗口", "", []string{}, func(self *Menu) error {
		screen_msg.JustShowThis()
		return nil
	})
	menu.Add("命令窗口", "", []string{}, func(self *Menu) error {
		screen_info.JustShowThis()
		return nil
	})
	screen.menu.Add("转到开头", "", []string{}, func(self *Menu) error {
		screen.ToTop = true
		return nil
	})
	screen.menu.Add("转到底部", "", []string{}, func(self *Menu) error {
		screen.ToButtom = true
		return nil
	})
}
func strToMap(r string) map[string]string {
	kvMap := map[string]string{}
	kvs := strings.Split(r, ";")
	for _, kv := range kvs {
		vs := strings.SplitN(kv, "=", 2)
		if len(vs) != 2 {
			continue
		}
		k := vs[0]
		v := vs[1]
		kvMap[k] = v
	}
	return kvMap
}
func parseEventRules(item *cmdb.Resource) (lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent string) {
	lowAlarm = "-"
	lowRecover = "-"
	lowLevel = "-"
	lowContent = "-"

	upRecover = "-"
	upAlarm = "-"
	upLevel = "-"
	upContent = "-"

	if er, ok := item.Attributes["event_rules"]; ok {
		rules := er.([]interface{})
		for _, r := range rules {
			//fmt.Println(r)
			rule := strToMap(r.(string))
			switch rule["alarm_type"] {
			case "2":
				// 过高告警
				switch rule["operator"] {
				case ">", ">=":
					// 大于此值告警，说明是告警上限
					upAlarm = rule["operand"]
				}
				switch rule["restore_operator"] {
				case "<", "<=":
					// 小于此值恢复，说明是恢复上限
					upRecover = rule["restore_operand"]
				}
				upLevel = rule["level"]
				upContent = rule["content"]

			case "4":
				// 过低告警
				switch rule["operator"] {
				case "<", "<=":
					// 小于此值告警，说明是告警下限
					lowAlarm = rule["operand"]
				}
				switch rule["restore_operator"] {
				case ">", ">=":
					// 小于此值恢复，说明是恢复下限
					lowRecover = rule["restore_operand"]
				}
				lowLevel = rule["level"]
				lowContent = rule["content"]

			case "3":
				// 异常告警
				switch rule["operator"] {
				case "==":
					// 等于此值告警，说明是异常告警值
					lowAlarm = rule["operand"]
				}
				switch rule["restore_operator"] {
				case "==":
					// 等于此值恢复，说明是恢复下限
					lowRecover = rule["restore_operand"]
				}
				lowLevel = rule["level"]
				lowContent = rule["content"]

			}
		}
	}
	//fmt.Println(lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent)
	return lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent
}

var extra = []string{"device_type", "location"}

// ExportDeviceSpots 导出设备测点列表, 生成excel: device-prefix+x
func ExportDeviceSpots_res(devices []*cmdb.Resource, prefix string) {
	xlsxFile := xlsx.NewFile()
	sheet, err := xlsxFile.AddSheet("devices")
	if err != nil {
		print(fmt.Sprintf("error add sheet failed, error: %s\n", err.Error()))
		return
	}

	headers := []string{"resource_id", "name", "_location_translated"}
	headers = append(headers, extra...)
	for j, h := range headers {
		sheet.Cell(0, j).SetString(fmt.Sprintf("%v", h))
	}
	for i, d := range devices {
		for j, h := range headers {
			sheet.Cell(i+1, j).SetString(fmt.Sprintf("%v", d.Attributes[h]))
		}
		spots, err := cmdb.GetChildren(d.ResourceID, 0, nil)
		if err != nil {
			print(fmt.Sprintf("error get children of '%s' failed, error: %s\n", d.ResourceID, err.Error()))
			return
		}
		//spotSheet, err := xlsxFile.AddSheet(fmt.Sprintf("%s-%v", d.ResourceID, d.Attributes["name"]))
		// 因 sheet长度不能超过31字节，只用resource_id做表名
		spotSheet, err := xlsxFile.AddSheet(d.ResourceID)
		if err != nil {
			print(fmt.Sprintf("error add sheet failed, error: %s\n", err.Error()))
			return
		}
		spotSheet.Cell(0, 0).SetString("测点ID")
		spotSheet.Cell(0, 1).SetString("测点名")
		spotSheet.Cell(0, 2).SetString("测点类型")
		spotSheet.Cell(0, 3).SetString("下限|异常值")
		spotSheet.Cell(0, 4).SetString("下限恢复|正常值")
		spotSheet.Cell(0, 5).SetString("下限告警等级|告警等级")
		spotSheet.Cell(0, 6).SetString("下限告警内容|告警内容")
		spotSheet.Cell(0, 7).SetString("上限恢复值")
		spotSheet.Cell(0, 8).SetString("上限告警值")
		spotSheet.Cell(0, 9).SetString("上限告警等级")
		spotSheet.Cell(0, 10).SetString("上限告警内容")
		for k, spot := range spots {
			if ct, ok := spot.Attributes["ci_type"]; ok {
				if ct.(string) != "3" {
					continue
				}
			} else {
				continue
			}
			spotSheet.Cell(k+1, 0).SetString(spot.ResourceID)
			spotSheet.Cell(k+1, 1).SetString(fmt.Sprintf("%v", spot.Attributes["name"]))
			if st, ok := spot.Attributes["spot_type"]; ok {
				spotType := fmt.Sprintf("%v", st)
				switch spotType {
				case "1":
					spotSheet.Cell(k+1, 2).SetString("参数")
					lowAlarm, lowRecover, lowLevel, lowContent, upRecover, upAlarm, upLevel, upContent := parseEventRules(spot)
					spotSheet.Cell(k+1, 3).SetString(lowAlarm)
					spotSheet.Cell(k+1, 4).SetString(lowRecover)
					spotSheet.Cell(k+1, 5).SetString(lowLevel)
					spotSheet.Cell(k+1, 6).SetString(lowContent)
					spotSheet.Cell(k+1, 7).SetString(upRecover)
					spotSheet.Cell(k+1, 8).SetString(upAlarm)
					spotSheet.Cell(k+1, 9).SetString(upLevel)
					spotSheet.Cell(k+1, 10).SetString(upContent)
				case "2":
					spotSheet.Cell(k+1, 2).SetString("状态")
					alarm, recover, level, content, _, _, _, _ := parseEventRules(spot)
					spotSheet.Cell(k+1, 3).SetString(alarm)
					spotSheet.Cell(k+1, 4).SetString(recover)
					spotSheet.Cell(k+1, 5).SetString(level)
					spotSheet.Cell(k+1, 6).SetString(content)
				case "3":
					spotSheet.Cell(k+1, 2).SetString("控制")
				default:
					spotSheet.Cell(k+1, 2).SetString("-")
				}
			}
		}
		print(fmt.Sprintf("device '%s:%v' export success\n", d.ResourceID, d.Attributes["name"]))
	}

	filename := fmt.Sprintf("device-%s-%sx.xlsx", auth.GetHost(), prefix)
	err = xlsxFile.Save(path.Join(path_download, filename))
	if err != nil {
		print(fmt.Sprintf("error save xlsx file fail , error : %s\n", err.Error()))
		return
	}
	print(fmt.Sprintf("export devices like '%sx' to '%s' success\n", prefix, filename))
}

// Tree 生成一颗树
func Tree(rootID string) {
	defer termbox.Close()
	//注册需获取事件的组件及优先级
	EventObjs = []interface{}{}
	//窗口列表
	list_screen = nil
	InitBox()
	{
		_, h := termbox.Size()
		h -= 3
		bar_buttom = &Bar{Frame: Frame{x: 0, y: h, w: 1, h: 1}}
	}
	EventObjs = append(EventObjs, bar_buttom)

	if rootID == "" {
		rootID = "project_root"
	}
	if err := tree.Init(rootID, 0, 0, 50, 45); err != nil {
		log.Errorf("open tree '%s' error: %s", rootID, err.Error())
		return
	}
	screen_node = NewScreen(true)
	screen_msg = NewScreen(false)
	screen_info = NewScreen(false)
	// TODO
	// NewScreen(true)
	tree.screen.menu.Add("转到开头", "", []string{}, func(self *Menu) error {
		tree.screen.posY = 0
		tree.y = 0
		return nil
	})
	tree.screen.menu.Add("系统体检", "check_system", []string{"nil"}, func(self *Menu) error {
		screen_msg.JustShowThis()
		return execCommandWithCli(self.command, "")
	})
	{
		menu := tree.screen.menu.Add("切换到", "", []string{"nil"}, func(self *Menu) error { return nil })
		menu.Add("连接视图", "", []string{}, func(self *Menu) error {
			rootID = "link_root"
			tree.setRoot(rootID)
			return nil
		})
		menu.Add("空间视图", "", []string{}, func(self *Menu) error {
			rootID = "project_root"
			tree.setRoot(rootID)
			return nil
		})
	}
	addDiyMenu := func(menu *Menu, types []string, where string) {
		addDiyField := func(menu *Menu, types []string, field string) {
			menu.Add(field, "", types, func(self *Menu) error {
				self.isSelected = !self.isSelected
				if self.isSelected {
					self.parent.export_fields[field] = 1
				} else {
					delete(self.parent.export_fields, field)
				}
				return nil
			})
		}
		addDiyExport := func(menu *Menu, types []string, name, where string) {
			menu.Add(name, "export", types, func(self *Menu) error {
				if node := tree.GetNode(tree.screen.posY); node != nil {
					r, err := cmdb.GetItem(node.ID, 0)
					if err != nil {
						return fmt.Errorf("get node '%s' error: %s", node.ID, err.Error())
					}
					if variable, ok := r.Attributes[where]; ok {
						s := []string{}
						for k, _ := range self.parent.export_fields {
							s = append(s, k)
						}
						items := strings.Join(s, ",")
						if items == "" {
							items = "\\*"
						}
						if err := exportCommand(fmt.Sprintf("export %s from cmdb where %s = %q", items, where, "\""+variable.(string)+"\"")); err != nil {
							screen_msg.AppendWithColor(fmt.Sprintf("%s\n", err), 10, termbox.ColorDefault)
						}
						time.Sleep(time.Second * 1)
					} else {
						return fmt.Errorf("找不到" + where)
					}
				}
				return nil
			})
		}
		diy := menu.Add("定制列", "", types, func(self *Menu) error {
			return nil
		})
		addDiyField(diy, types, "name")
		addDiyField(diy, types, "location")
		addDiyField(diy, types, "device_type")
		addDiyField(diy, types, "vendor_info")
		addDiyExport(diy, types, "导出同类设备", "device_type")
		addDiyExport(diy, types, "导出同空间节点", "location")
	}
	{
		export := tree.screen.menu.Add("导出", "", []string{"1", "5_0"}, func(self *Menu) error { return nil })
		export.Add("导出当前空间设备", "export_device_by_location", []string{"1", "5_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				return exportCommand(self.command + " " + node.ID)
			}
			return nil
		})
		export.Add("导出当前空间设备测点及告警规则", "", []string{"1", "5_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				ticker = time.NewTicker(time.Millisecond * 100)
				screen_msg.JustShowThis()
				prefix := ""
				devices, err := cmdb.GetDevicesUnder(node.ID, prefix)
				if err != nil {
					return fmt.Errorf("get devices of '%s' error: %s", prefix, err.Error())
				}
				var li []*cmdb.Resource
				for _, it := range devices {
					if it.Deleted == 0 {
						li = append(li, it)
					}
				}
				ExportDeviceSpots_res(li, prefix)
				if err := downloadFile(); err != nil {
					return err
				}
			}
			return nil
		})
		tree.screen.menu.Add("导出当前页面", "page_export_by_id", []string{"6_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				return exportCommand(self.command + " " + node.ID)
			}
			return nil
		})
		tree.screen.menu.Add("导入当前页面", "page_import_by_id", []string{"6_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				return importCommand(self.command + " %s " + node.ID)
			}
			return nil
		})
		menu := tree.screen.menu.Add("创建空间", "", []string{"1", "5_0"}, func(self *Menu) error { return nil })
		menuAddSpace := func(name, spaceType string) {
			menu.Add(name, "create_space", []string{}, func(self *Menu) error {
				if node := tree.GetNode(tree.screen.posY); node != nil {
					if fn, err := reg.GetFunc(self.command); err == nil {
						call(fn, node.ID, spaceType)
					}
					node.RefreshSelf()
				}
				return nil
			})
		}
		menuAddSpace("区域", "area")
		menuAddSpace("数据中心", "dc")
		menuAddSpace("楼栋", "building")
		menuAddSpace("楼层", "floor")
		menuAddSpace("房间", "room")
	}
	{
		export := tree.screen.menu.Add("导出", "", []string{"2_0"}, func(self *Menu) error {
			return nil
		})

		export.Add("导出同类设备", "export_device", []string{"2_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				r, err := cmdb.GetItem(node.ID, 0)
				if err != nil {
					return fmt.Errorf("get node '%s' error: %s", node.ID, err.Error())
				}
				if device_type, ok := r.Attributes["device_type"]; ok {
					if err := exportCommand(self.command + " " + device_type.(string)); err != nil {
						return err
					}
				} else {
					return fmt.Errorf("找不到device_type")
				}
			}
			return nil
		})
		export.Add("导出同类设备测点及告警规则", "export_device_spots", []string{"2_0"}, func(self *Menu) error {
			ticker = time.NewTicker(time.Millisecond * 100)
			if node := tree.GetNode(tree.screen.posY); node != nil {
				r, err := cmdb.GetItem(node.ID, 0)
				if err != nil {
					return fmt.Errorf("get node '%s' error: %s", node.ID, err.Error())
				}
				if device_type, ok := r.Attributes["device_type"]; ok {
					if err := exportCommand(self.command + " " + device_type.(string)); err != nil {
						return err
					}
				} else {
					return fmt.Errorf("找不到device_type")
				}
			}
			return nil
		})
		export.Add("导出当前设备测点及告警规则", "", []string{"2_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				ticker = time.NewTicker(time.Millisecond * 100)
				screen_msg.JustShowThis()
				r, err := cmdb.GetItem(node.ID, 0)
				if err != nil {
					return fmt.Errorf("get node '%s' error: %s", node.ID, err.Error())
				}
				ExportDeviceSpots_res([]*cmdb.Resource{r}, "")
				if err := downloadFile(); err != nil {
					return err
				}
			}
			return nil
		})

		addDiyMenu(export, []string{"2_0"}, "")
		tree.screen.menu.Add("重刷此设备", "refreshdevice", []string{"2_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				if fn, err := reg.GetFunc(self.command); err == nil {
					call(fn, node.ID)
				}
				node.RefreshSelf()
			}
			return nil
		})
		tree.screen.menu.Add("重刷同类设备", "refresh_by_id", []string{"2_0"}, func(self *Menu) error {
			if node := tree.GetNode(tree.screen.posY); node != nil {
				if fn, err := reg.GetFunc(self.command); err == nil {
					call(fn, node.ID)
				}
				node.RefreshSelf()
			}
			return nil
		})
	}
	tree.screen.menu.Add("恢复", "resume", []string{"2_1", "3_1", "5_1", "7_1"}, func(self *Menu) error {
		if node := tree.GetNode(tree.screen.posY); node != nil {
			if fn, err := reg.GetFunc(self.command); err == nil {
				call(fn, node.ID)
			}
			node.RefreshParent()
		}
		return nil
	})
	tree.screen.menu.Add("修复路径字段", "repair_location", []string{"2_0", "3_0", "5_0", "7_0"}, func(self *Menu) error {
		if node := tree.GetNode(tree.screen.posY); node != nil {
			if fn, err := reg.GetFunc(self.command); err == nil {
				call(fn, node.ID)
			}
			node.RefreshParent()
		}
		return nil
	})
	tree.screen.menu.Add("导入页面", "page_import_by_id", []string{"5_0"}, func(self *Menu) error {
		if node := tree.GetNode(tree.screen.posY); node != nil {
			if err := importCommand(self.command + " %s " + node.ID); err != nil {
				return err
			}
		}
		return nil
	})
	tree.screen.menu.Add("删除(谨慎使用！！！)", "delete_ci", []string{"2_0", "3_0", "5_0", "7_0"}, func(self *Menu) error {
		if node := tree.GetNode(tree.screen.posY); node != nil {
			if fn, err := reg.GetFunc(self.command); err == nil {
				call(fn, node.ID)
			}
			node.RefreshParent()
		}
		return nil
	})
	tree.screen.menu.Add("显示删除节点", "", []string{"nil"}, func(self *Menu) error {
		if showDeleted == 0 {
			self.isSelected = true
			showDeleted = 1
		} else {
			self.isSelected = false
			showDeleted = 0
		}
		tree.setRoot(rootID)
		screen_msg.Append(fmt.Sprintf("显示删除节点:%v\n", self.isSelected))
		return nil
	})
	tree.screen.menu.Add("显示页面", "", []string{"nil"}, func(self *Menu) error {
		if showPage {
			self.isSelected = false
			showPage = false
		} else {
			self.isSelected = true
			showPage = true
		}
		tree.setRoot(rootID)
		screen_msg.Append(fmt.Sprintf("显示页面:%v\n", self.isSelected))
		return nil
	})
	tree.screen.menu.Add("上传文件", "", []string{"nil"}, func(self *Menu) error {
		uploadFile(path_upload)
		screen_info.JustShowThis()
		return nil
	})
	{
		menu_win := tree.screen.menu.Add("窗口", "", []string{"nil"}, func(self *Menu) error {
			return nil
		})
		menu_win.Add("节点窗口", "", []string{"nil"}, func(self *Menu) error {
			if screen_node.bar.x-tree.screen.bar.x == 0 {
				screen_node.bar.x = tree.screen.bar.x + 50
			} else {
				screen_node.bar.x = tree.screen.bar.x
			}
			return nil
		})
		menu_win.Add("信息窗口", "", []string{"nil"}, func(self *Menu) error {
			if screen_msg.bar.x-screen_node.bar.x == 0 {
				screen_msg.bar.x = screen_node.bar.x + 50
			} else {
				screen_msg.bar.x = screen_node.bar.x
			}
			return nil
		})
		menu_win.Add("命令窗口", "", []string{"nil"}, func(self *Menu) error {
			if screen_info.bar.x-screen_msg.bar.x == 0 {
				screen_info.bar.x = screen_msg.bar.x + 50
			} else {
				screen_info.bar.x = screen_msg.bar.x
			}
			return nil
		})
	}
	{
		menu_Add := func(menu *Menu, call func(string) error, name, command string) {
			menu.Add(name, command, []string{"nil"}, func(self *Menu) error {
				return call(self.command)
			})
		}

		menu_export := tree.screen.menu.Add("导出", "", []string{"nil"}, func(self *Menu) error { return nil })
		menu_Add(menu_export, exportCommand, "导出设备类型列表", "export_groups")
		menu_Add(menu_export, exportCommand, "导出通信参数列表", "export_transfer")
		menu_Add(menu_export, exportCommand, "导出空间列表", "export_space")
		menu_Add(menu_export, exportCommand, "导出所有设备测点及告警规则", "export_device_spots")
		menu_Add(menu_export, exportCommand, "导出所有页面", "page_export_all")

		menu_import := tree.screen.menu.Add("导入", "", []string{"nil"}, func(self *Menu) error { return nil })
		menu_Add(menu_import, importCommand, "导入通信参数列表", "import_transfer %s")
		menu_Add(menu_import, importCommand, "导入设备测点及告警规则", "import_device_spots %s")
		menu_Add(menu_import, importCommand, "导入所有页面", "page_import_all %s")
		menu_Add(menu_import, importCommand, "导入", "import %s")
	}

	{
		Menu_Add_SwichSindow(screen_node)
	}
	{
		Menu_Add_SwichSindow(screen_msg)
		screen_msg.menu.Add("清空", "", []string{}, func(self *Menu) error {
			screen_msg.WriteDefault("")
			return nil
		})
	}
	{
		Menu_Add_SwichSindow(screen_info)
	}
	idVMap = map[string]*define.ValueItem{}
	if user_cur, err := user.Current(); err != nil {
		panic(err)
	} else {
		path_home = user_cur.HomeDir
		path_upload = path_home + "/upload"
		//需要保持该目录为空
		path_upload_import = path_home + "/upload/import"
		path_download = path_home + "/download"
	}
	if err := os.MkdirAll(path_upload_import, os.ModePerm); err != nil {
		panic(err)
	}
	if err := os.MkdirAll(path_download, os.ModePerm); err != nil {
		panic(err)
	}
	if _, err := os.Stat(path_upload + "/command.sh"); err != nil {
		if os.IsNotExist(err) {
			if err := ioutil.WriteFile(path_upload+"/command.sh", []byte("echo -----upload目录\nls\necho -----时间\ndate\n"), 0777); err != nil {
				screen_msg.Append(fmt.Sprintf("error:%v\n", err))
			}
		} else {
			screen_msg.Append(fmt.Sprintf("error:%v\n", err))
		}
	}

	ticker = time.NewTicker(time.Millisecond * 1000)
	go func() {
		for {
			<-ticker.C
			termbox.Interrupt()
			var out bytes.Buffer
			ch := exec.Command("sh", "-c", "pwd && sh command.sh")
			ch.Dir = path_upload
			ch.Stdout = &out
			ch.Stderr = &out
			ch.Run()
			screen_info.WriteDefault(out.String())
			node := tree.GetNode(tree.screen.posY)
			if node == nil || node.Parent == nil {
				continue
			}
			ids := make([]string, 0, len(node.Parent.Children))
			for _, c := range node.Parent.Children {
				ids = append(ids, c.ID)
			}
			vs, _ := tsdb.GetSnapshot(ids)
			mapMutex.Lock()
			for _, v := range vs {
				idVMap[v.ResourceID] = v
			}
			mapMutex.Unlock()
		}
	}()

	tree.timer = time.NewTimer(0)
	tree.doubleC = time.NewTimer(0)
	tree.doubleC.Stop()

	redrawAll()
	chan_in = make(chan bool)
	chan_out = make(chan error)
mainloop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			switch ev.Key {
			case termbox.KeyEsc:
				break mainloop
			default:
			}
			pollEvent(ev)
		case termbox.EventMouse:
			pollEvent(ev)
		case termbox.EventError:
			panic(ev.Err)
		}
		select {
		case <-chan_in:
			if will_do != nil {
				err := will_do()
				will_do = nil
				termbox.Sync()
				time.Sleep(time.Second * 1)
				termbox.Close()
				InitBox()
				chan_out <- err
			} else {
				chan_out <- nil
			}
		default:
		}
		redrawAll()
	}
}
