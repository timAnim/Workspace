package report

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"
	"sync"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/define"
	"xtool/pkg/reg"
	"xtool/pkg/tsdb"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("report", "makecache", MakeCache, "生成缓存", `makecache`, []*reg.Param{})
	reg.Regist("report", "getall", GetAllSnapValue, "获取全量快照", `getall <count>`, []*reg.Param{
		&reg.Param{Name: "count", Type: "int", Necessity: false, Desc: "单批次测点数量, 默认 1000"},
	})
	reg.Regist("report", "get_snap_by_file", GetSnapValueByFile, "从ID列表文件获取快照", `get_snap_by_file <filename>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: false, Desc: "一次请求filename中的测点"},
	})
}

var (
	wg    sync.WaitGroup
	cache []string
)

// 启动一个并行任务
func launch(f func()) {
	wg.Add(1)
	go func() {
		defer wg.Done()
		f()
	}()
}

// MakeCache 构造缓存
func MakeCache() {
	ids, err := getAllResources("project_root")
	if err != nil {
		log.Errorf("make cache error: %s", err.Error())
		return
	}
	cache = ids
	fmt.Println(len(cache))
}

// GetAllSnapValue 获取全量快照数据
func GetAllSnapValue(count string) {
	n, err := strconv.Atoi(count)
	if err != nil {
		n = 1000
	}
	t0 := time.Now().UnixNano()
	for i := 0; i < int(len(cache)/n)+1; i++ {
		start := i * n
		end := start + n
		if end > len(cache) {
			end = len(cache)
		}
		tmpIDs := cache[start:end]
		launch(func() { getSnapValue(i, tmpIDs) })
		time.Sleep(100000000 * time.Nanosecond)
	}
	wg.Wait()
	t1 := time.Now().UnixNano()
	fmt.Printf("all len(values): %d, time: %f s\n", len(cache), (float64(t1)-float64(t0))/1000000000.0)
}

func getSnapValue(i int, ids []string) {
	t0 := time.Now().UnixNano()
	vs, _ := tsdb.GetSnapshot(ids)
	t1 := time.Now().UnixNano()
	fmt.Printf("%d -- len(ids): %d, len(values): %d, time: %f ms\n", i, len(ids), len(vs), (float64(t1)-float64(t0))/1000000.0)
}

func getAllResources(rootID string) ([]string, error) {
	ids := []string{}
	res, err := cmdb.GetChildren(rootID, 0, nil)
	if err != nil {
		return ids, err
	}
	for _, r := range res {
		ids = append(ids, r.ResourceID)
		if ct, ok := r.Attributes["ci_type"]; ok {
			ciType := ct.(string)
			switch ciType {
			case "2", "5":
				sub, err := getAllResources(r.ResourceID)
				if err != nil {
					continue
				}
				ids = append(ids, sub...)
			default:
			}
		}
	}
	return ids, err
}

type resource struct {
	ResourceID string `json:"resource_id"`
}

// GetSnapValueByFile 获取全量快照数据
func GetSnapValueByFile(filename string) {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Errorf("ioutil.ReadFile error: %s", err.Error())
		return
	}
	res := []*resource{}
	err = json.Unmarshal(b, &res)
	if err != nil {
		log.Errorf("json.Unmarshal error: %s", err.Error())
		return
	}
	ids := make([]string, 0, len(res))
	for _, r := range res {
		ids = append(ids, r.ResourceID)
	}
	vs, err := tsdb.GetSnapshot(ids)
	if err != nil {
		log.Errorf("tsdb.GetSnapshot error: %s", err.Error())
		return
	}
	vMap := map[string]*define.ValueItem{}
	for _, v := range vs {
		vMap[v.ResourceID] = v
	}
	for _, id := range ids {
		if v, ok := vMap[id]; ok {
			fmt.Println(id, v.Status, v.RealValue, v.SaveTime)
			continue
		}
		fmt.Println(id, "NOT FOUND")
	}
}
