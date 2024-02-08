package configure

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"sort"
	"strconv"
	"strings"
	"xtool/pkg/driver"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("list", "export_groups_to_md", ExportGroupsToMD, "将 groups_brd.json 导出到 markdown 文件，可应用于xmind", `export_groups_to_md <rootID> <withSpot>`, []*reg.Param{
		&reg.Param{Name: "rootID", Type: "string", Necessity: true, Desc: "模板根节点ID"},
		&reg.Param{Name: "withSpot", Type: "bool", Necessity: false, Desc: "带测点导出，默认 false"},
	})
}

// ExportGroupsToMD 导出设备类型列表到 markdown 文件
func ExportGroupsToMD(rootID string, withSpot string) {
	wSpot, err := strconv.ParseBool(withSpot)
	if err != nil {
		wSpot = false
	}

	gd, err := driver.GetGroupDev()
	if err != nil {
		log.Errorf("get groups_dev error: %s", err.Error())
		return
	}

	sort.Sort(gd)

	getLevel := func(g string) int {
		return len(strings.Split(g, "."))
	}

	buf := bytes.NewBuffer(make([]byte, 0, 1024))

	for _, g := range gd {
		if !strings.HasPrefix(g.ID, rootID) {
			continue
		}
		id := strings.TrimPrefix(strings.TrimPrefix(g.ID, rootID), ".")
		if id == "" {
			buf.WriteString("# " + g.Value + "\n")
			continue
		}

		lvl := getLevel(id)
		for i := 0; i <= lvl; i++ {
			buf.WriteString("#")
		}
		buf.WriteString(" " + g.Value + "\n")

		if !wSpot || g.Level != "7" {
			continue
		}
		brd, err := driver.GetBrd(g.ID)
		if err != nil {
			log.Warnf(" driver.GetBrd '%s' error: %s", g.ID, err.Error())
			continue
		}

		brd.Spots.Sort()
		for _, s := range brd.Spots {
			for i := 0; i <= lvl+1; i++ {
				buf.WriteString("#")
			}
			buf.WriteString(fmt.Sprintf(" %s %s\n", s.MustString("id"), s.MustString("name")))
		}
	}
	filename := fmt.Sprintf("groups_dev-%s.md", rootID)
	if err := ioutil.WriteFile(filename, buf.Bytes(), 0666); err != nil {
		log.Errorf("outil.WriteFile '%s' error: %s", filename, err.Error())
		return
	}
	log.Infof("exported groups_dev to '%s' success", filename)
}
