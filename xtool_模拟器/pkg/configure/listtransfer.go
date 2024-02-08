package configure

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"xtool/pkg/auth"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
	"github.com/tealeg/xlsx"
)

func init() {
	reg.Regist("transfer", "list_transfer", ListTransfer, "输出通信参数列表", `list_transfer`, []*reg.Param{})
	reg.Regist("transfer", "export_transfer", ExportTransfer, "导出通信参数列表", `export_transfer`, []*reg.Param{})
	reg.Regist("transfer", "import_transfer", ImportTransfer, "使用此指令，将使用export_transfer导出的表经过修改之后再次导入，实现通信参数批量修改", `import_transfer <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "导入文件名"},
	})
}

// ListTransfer 展示串口参数列表
func ListTransfer() {
	boards, err := cmdb.GetChildren("link_root", 0, nil)
	if err != nil {
		log.Errorf("get boards error: %s", err.Error())
		return
	}
	for _, b := range boards {
		//fmt.Println(b.ResourceID, b.Attributes["name"], b.Attributes["transfer"])
		if t, ok := b.Attributes["transfer"]; ok {
			tMap := strToMap(t.(string))
			fmt.Println(b.ResourceID, b.Attributes["name"], tMap)
		}
	}
}

var tSortMap = map[string]int{
	"ComTransfer":     1,
	"TcpTransfer":     2,
	"SnmpTransfer":    3,
	"VirtualTransfer": 4,
}

type transferItem struct {
	Board    *cmdb.Resource
	Transfer map[string]string
}

type tItemList []*transferItem

func (t tItemList) Swap(i, j int) {
	t[i], t[j] = t[j], t[i]
}

func (t tItemList) Less(i, j int) bool {
	x := t[i]
	y := t[j]
	tx, ok := tSortMap[x.Transfer["transfer"]]
	if !ok {
		return false
	}
	ty, ok := tSortMap[x.Transfer["transfer"]]
	if !ok {
		return true
	}
	if tx != ty {
		return tx <= ty
	}
	// 通信方式相同的情况下按参数排序
	switch tx {
	case 1:
		// 串口按串口号排序
		comX := strings.Replace(x.Transfer["com"], "COM", "", -1)
		comY := strings.Replace(y.Transfer["com"], "COM", "", -1)
		nx, err := strconv.ParseInt(comX, 10, 64)
		if err != nil {
			// 非标准串口
			return false
		}
		ny, err := strconv.ParseInt(comY, 10, 64)
		if err != nil {
			// 非标准串口
			return true
		}
		if nx != ny {
			return nx <= ny
		}
		ax, _ := strconv.ParseInt(x.Transfer["addr"], 16, 64)
		ay, _ := strconv.ParseInt(y.Transfer["addr"], 16, 64)
		return ax <= ay
	case 2, 3:
		// 网口按IP，端口排序
		ipX := ipv4ToInt(x.Transfer["ip"])
		ipY := ipv4ToInt(y.Transfer["ip"])
		if ipX != ipY {
			return ipX <= ipY
		}
		px, _ := strconv.ParseInt(x.Transfer["port"], 10, 64)
		py, _ := strconv.ParseInt(y.Transfer["port"], 10, 64)
		if px != py {
			return px <= py
		}
		ax, _ := strconv.ParseInt(x.Transfer["addr"], 16, 64)
		ay, _ := strconv.ParseInt(y.Transfer["addr"], 16, 64)
		return ax <= ay
	case 4:
		return true
	}
	return true
}
func (t tItemList) Len() int {
	return len(t)
}

/*
// 将整数转换为IP
func inetNtoa(ipnr int64) net.IP {
	var bytes [4]byte
	bytes[0] = byte(ipnr & 0xFF)
	bytes[1] = byte((ipnr >> 8) & 0xFF)
	bytes[2] = byte((ipnr >> 16) & 0xFF)
	bytes[3] = byte((ipnr >> 24) & 0xFF)

	return net.IPv4(bytes[3], bytes[2], bytes[1], bytes[0])
}
*/
// 将IP转换位整数
func ipv4ToInt(ipv4 string) int64 {
	bits := strings.Split(ipv4, ".")
	if len(bits) != 4 {
		return -1
	}

	b0, _ := strconv.Atoi(bits[0])
	b1, _ := strconv.Atoi(bits[1])
	b2, _ := strconv.Atoi(bits[2])
	b3, _ := strconv.Atoi(bits[3])

	var sum int64

	sum += int64(b0) << 24
	sum += int64(b1) << 16
	sum += int64(b2) << 8
	sum += int64(b3)

	return sum
}

// ExportTransfer 导出通信参数
func ExportTransfer() {
	boards, err := cmdb.GetChildren("link_root", 0, nil)
	if err != nil {
		log.Errorf("get boards error: %s", err.Error())
		return
	}
	comMap, err := cmdb.GetComList()
	if err != nil {
		log.Errorf("get comlist error: %s", err.Error())
		return
	}
	getCom := func(com string) string {
		if v, ok := comMap[com]; ok {
			return v
		}
		return com
	}

	tKeys := sort.IntSlice{}
	transferGroup := map[int]tItemList{}

	for _, b := range boards {
		if t, ok := b.Attributes["transfer"]; ok {
			tMap := strToMap(t.(string))
			if c, ok := tMap["com"]; ok {
				tMap["com"] = getCom(c)
			}
			x, ok := tSortMap[tMap["transfer"]]
			if !ok {
				// 仅支持4种transfer
				continue
			}
			log.Infoln("export", b.ResourceID, b.Attributes["name"], t.(string))
			tItems, ok := transferGroup[x]
			if !ok {
				tItems = tItemList{}
				tKeys = append(tKeys, x)
			}
			tItems = append(tItems, &transferItem{
				Board:    b,
				Transfer: tMap,
			})
			transferGroup[x] = tItems
		}
	}
	sort.Sort(tKeys)
	//fmt.Println(transferGroup)

	xlsxFile := xlsx.NewFile()

	summarySheet, err := xlsxFile.AddSheet("概览信息")
	if err != nil {
		log.Errorf("add sheet failed, error: %s", err.Error())
		return
	}
	_ = summarySheet

	infoSheet, err := xlsxFile.AddSheet("额外信息")
	if err != nil {
		log.Errorf("add sheet failed, error: %s", err.Error())
		return
	}

	i := 0
	infoSheet.Cell(i, 0).SetString("串口映射")
	for k, v := range comMap {
		infoSheet.Cell(i, 1).SetString(k)
		infoSheet.Cell(i, 2).SetString(v)
		i++
	}

	parityMap := map[string]string{
		"None":  "无校验",
		"Even":  "偶校验",
		"Odd":   "奇校验",
		"Mark":  "1检验",
		"Space": "0检验",
	}
	i++
	infoSheet.Cell(i, 0).SetString("校验选项")
	for k, v := range parityMap {
		infoSheet.Cell(i, 1).SetString(k)
		infoSheet.Cell(i, 2).SetString(v)
		i++
	}

	flowList := []string{"None", "RTS/CTS", "XON/XOFF", "DTR/DSR"}
	i++
	infoSheet.Cell(i, 0).SetString("流控选项")
	for _, v := range flowList {
		infoSheet.Cell(i, 1).SetString(v)
		i++
	}

	// 样式
	s := xlsx.NewStyle()
	s.Alignment.Horizontal = "center"
	s.Alignment.Vertical = "center"
	// 用于summarySheet计数
	x := 0

	headers := []string{"通信方式", "接口地址", "设备", "设备地址", "波特率"}
	for j, h := range headers {
		summarySheet.Cell(x, j).SetString(h)
		summarySheet.Cell(x, j).SetStyle(s)
	}
	summarySheet.Col(1).Width = 20
	summarySheet.Col(2).Width = 35
	x++
	for _, k := range tKeys {
		tItems := transferGroup[k]
		switch k {
		case 1:
			sheet, err := xlsxFile.AddSheet("串口设备")
			if err != nil {
				log.Errorf("add sheet failed, error: %s", err.Error())
				return
			}
			headers := []string{"板卡ID", "板卡名", "通信方式", "串口地址", "波特率", "设备地址", "校验方式", "数据位", "停止位", "流控", "超时时间", "采集间隔"}
			for j, h := range headers {
				sheet.Cell(0, j).SetString(h)
			}
			sort.Sort(tItems)
			// 记录通信方式的合并起始行
			begin := x
			// 记录接口地址的合并起始行
			beginA := x
			for i, tItem := range tItems {
				sheet.Cell(i+1, 0).SetString(tItem.Board.ResourceID)
				sheet.Cell(i+1, 1).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				sheet.Cell(i+1, 2).SetString("串口通信")
				sheet.Cell(i+1, 3).SetString(fmt.Sprintf("%v", tItem.Transfer["com"]))
				sheet.Cell(i+1, 4).SetString(fmt.Sprintf("%v", tItem.Transfer["baudrate"]))
				sheet.Cell(i+1, 5).SetString(hexToOrd(fmt.Sprintf("%v", tItem.Transfer["addr"])))
				sheet.Cell(i+1, 6).SetString(fmt.Sprintf("%v", parityMap[fmt.Sprintf("%v", tItem.Transfer["parity"])]))
				sheet.Cell(i+1, 7).SetString(fmt.Sprintf("%v", tItem.Transfer["databits"]))
				sheet.Cell(i+1, 8).SetString(fmt.Sprintf("%v", tItem.Transfer["stopbits"]))
				sheet.Cell(i+1, 9).SetString(fmt.Sprintf("%v", tItem.Transfer["flow_control"]))
				sheet.Cell(i+1, 10).SetString(fmt.Sprintf("%v", tItem.Transfer["timeout"]))
				sheet.Cell(i+1, 11).SetString("1000")

				summarySheet.Cell(x, 0).SetString("串口通信")
				summarySheet.Cell(x, 1).SetString(fmt.Sprintf("%v", tItem.Transfer["com"]))
				summarySheet.Cell(x, 2).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				summarySheet.Cell(x, 3).SetString(hexToOrd(fmt.Sprintf("%v", tItem.Transfer["addr"])))
				summarySheet.Cell(x, 4).SetString(fmt.Sprintf("%v", tItem.Transfer["baudrate"]))

				// 合并单元格

				summarySheet.Cell(begin, 0).Merge(0, x-begin)

				summarySheet.Cell(x, 1).SetStyle(s)
				if summarySheet.Cell(beginA, 1).String() == fmt.Sprintf("%v", tItem.Transfer["com"]) {
					summarySheet.Cell(beginA, 1).Merge(0, x-beginA)
				} else {
					beginA = x
				}

				x++
			}
			summarySheet.Cell(begin, 0).SetStyle(s)
		case 2:
			sheet, err := xlsxFile.AddSheet("网口设备")
			if err != nil {
				log.Errorf("add sheet failed, error: %s", err.Error())
				return
			}
			headers := []string{"板卡ID", "板卡名", "通信方式", "IP地址", "端口", "设备地址", "超时时间", "采集间隔"}
			for j, h := range headers {
				sheet.Cell(0, j).SetString(h)
			}
			sort.Sort(tItems)
			// 记录通信方式的合并起始行
			begin := x
			// 记录接口地址的合并起始行
			beginA := x
			for i, tItem := range tItems {
				sheet.Cell(i+1, 0).SetString(tItem.Board.ResourceID)
				sheet.Cell(i+1, 1).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				sheet.Cell(i+1, 2).SetString("TCP通信")
				sheet.Cell(i+1, 3).SetString(fmt.Sprintf("%v", tItem.Transfer["ip"]))
				sheet.Cell(i+1, 4).SetString(fmt.Sprintf("%v", tItem.Transfer["port"]))
				sheet.Cell(i+1, 5).SetString(hexToOrd(fmt.Sprintf("%v", tItem.Transfer["addr"])))
				sheet.Cell(i+1, 6).SetString(fmt.Sprintf("%v", tItem.Transfer["timeout"]))
				sheet.Cell(i+1, 7).SetString("1000")

				summarySheet.Cell(x, 0).SetString("网口通信")
				summarySheet.Cell(x, 1).SetString(fmt.Sprintf("%v:%v", tItem.Transfer["ip"], tItem.Transfer["port"]))
				summarySheet.Cell(x, 2).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				summarySheet.Cell(x, 3).SetString(hexToOrd(fmt.Sprintf("%v", tItem.Transfer["addr"])))

				// 合并单元格
				summarySheet.Cell(begin, 0).Merge(0, x-begin)

				summarySheet.Cell(x, 1).SetStyle(s)
				if summarySheet.Cell(beginA, 1).String() == fmt.Sprintf("%v:%v", tItem.Transfer["ip"], tItem.Transfer["port"]) {
					summarySheet.Cell(beginA, 1).Merge(0, x-beginA)
				} else {
					beginA = x
				}
				x++
			}
			summarySheet.Cell(begin, 0).SetStyle(s)
		case 3:
			sheet, err := xlsxFile.AddSheet("SNMP设备")
			if err != nil {
				log.Errorf("add sheet failed, error: %s", err.Error())
				return
			}
			headers := []string{"板卡ID", "板卡名", "通信方式", "SNMP设备地址", "SNMP设备端口", "SNMP团体名", "采集间隔"}
			for j, h := range headers {
				sheet.Cell(0, j).SetString(h)
			}
			sort.Sort(tItems)
			// 记录通信方式的合并起始行
			begin := x
			// 记录接口地址的合并起始行
			beginA := x
			for i, tItem := range tItems {
				sheet.Cell(i+1, 0).SetString(tItem.Board.ResourceID)
				sheet.Cell(i+1, 1).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				sheet.Cell(i+1, 2).SetString("SNMP通信")
				sheet.Cell(i+1, 3).SetString(fmt.Sprintf("%v", tItem.Transfer["ip"]))
				sheet.Cell(i+1, 4).SetString(fmt.Sprintf("%v", tItem.Transfer["port"]))
				sheet.Cell(i+1, 5).SetString(fmt.Sprintf("%v", tItem.Transfer["community"]))
				sheet.Cell(i+1, 6).SetString("1000")

				summarySheet.Cell(x, 0).SetString("SNMP通信")
				summarySheet.Cell(x, 1).SetString(fmt.Sprintf("%v:%v", tItem.Transfer["ip"], tItem.Transfer["port"]))
				summarySheet.Cell(x, 2).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))

				// 合并单元格
				summarySheet.Cell(begin, 0).Merge(0, x-begin)

				summarySheet.Cell(x, 1).SetStyle(s)
				if summarySheet.Cell(beginA, 1).String() == fmt.Sprintf("%v:%v", tItem.Transfer["ip"], tItem.Transfer["port"]) {
					summarySheet.Cell(beginA, 1).Merge(0, x-beginA)
				} else {
					beginA = x
				}
				x++
			}
			summarySheet.Cell(begin, 0).SetStyle(s)
		case 4:
			sheet, err := xlsxFile.AddSheet("虚拟设备")
			if err != nil {
				log.Errorf("add sheet failed, error: %s", err.Error())
				return
			}
			headers := []string{"板卡ID", "板卡名", "通信方式", "采集间隔"}
			for j, h := range headers {
				sheet.Cell(0, j).SetString(h)
			}
			sort.Sort(tItems)
			for i, tItem := range tItems {
				sheet.Cell(i+1, 0).SetString(tItem.Board.ResourceID)
				sheet.Cell(i+1, 1).SetString(fmt.Sprintf("%v", tItem.Board.Attributes["name"]))
				sheet.Cell(i+1, 2).SetString("虚拟通信")
				sheet.Cell(i+1, 3).SetString("1000")
			}
		}
	}
	filename := fmt.Sprintf("transfer-%s.xlsx", auth.GetHost())
	err = xlsxFile.Save(filename)
	if err != nil {
		log.Errorf("save transfer params to '%s' error: %s", filename, err.Error())
		return
	}
	log.Infof("export transfer to '%s' success", filename)
}

// ImportTransfer 导入通信参数
func ImportTransfer(filename string) {
	f, err := xlsx.OpenFile(filename)
	if err != nil {
		log.Errorf("open file '%s' error: %s", filename, err.Error())
		return
	}
	comMap, err := cmdb.GetComList()
	if err != nil {
		log.Errorf("get comlist error: %s", err.Error())
		return
	}
	rComMap := map[string]string{}
	for k, v := range comMap {
		rComMap[v] = k
	}

	getCom := func(com string) string {
		if v, ok := rComMap[com]; ok {
			return v
		}
		return com
	}
	parityMap := map[string]string{
		"无校验": "None",
		"偶校验": "Even",
		"奇校验": "Odd",
		"1检验": "Mark",
		"0检验": "Space",
	}
	for _, sheet := range f.Sheets[2:len(f.Sheets)] {
		for _, row := range sheet.Rows {
			resourceID := row.Cells[0].String()
			switch row.Cells[2].String() {
			case "串口通信":
				tMap := map[string]string{
					"transfer":     "ComTransfer",
					"com":          getCom(row.Cells[3].String()),
					"baudrate":     row.Cells[4].String(),
					"addr":         ordToHex(row.Cells[5].String()),
					"parity":       fmt.Sprintf("%v", parityMap[row.Cells[6].String()]),
					"databits":     row.Cells[7].String(),
					"stopbits":     row.Cells[8].String(),
					"flow_control": row.Cells[9].String(),
					"timeout":      row.Cells[10].String(),
				}
				ModifyField(resourceID, "transfer", mapToStr(tMap))

			case "TCP通信":
				tMap := map[string]string{
					"transfer": "TcpTransfer",
					"ip":       getCom(row.Cells[3].String()),
					"port":     row.Cells[4].String(),
					"addr":     ordToHex(row.Cells[5].String()),
					"timeout":  row.Cells[6].String(),
				}
				ModifyField(resourceID, "transfer", mapToStr(tMap))
			case "SNMP通信":
				tMap := map[string]string{
					"transfer":  "SnmpTransfer",
					"ip":        getCom(row.Cells[3].String()),
					"port":      row.Cells[4].String(),
					"community": row.Cells[5].String(),
				}
				ModifyField(resourceID, "transfer", mapToStr(tMap))
			case "虚拟通信":
				tMap := map[string]string{
					"transfer": "VirtualTransfer",
				}
				ModifyField(resourceID, "transfer", mapToStr(tMap))
			}
		}
	}
	log.Infof("import transfer params from '%s' success", filename)
}

func mapToStr(m map[string]string) string {
	vs := []string{}
	for k, v := range m {
		vs = append(vs, strings.Join([]string{k, v}, "="))
	}
	return strings.Join(vs, ";")
}

func hexToOrd(h string) string {
	o, _ := strconv.ParseInt(h, 16, 64)
	return fmt.Sprintf("%d", o)
}

func ordToHex(o string) string {
	h, _ := strconv.ParseInt(o, 10, 64)
	return fmt.Sprintf("%02x", h)
}
