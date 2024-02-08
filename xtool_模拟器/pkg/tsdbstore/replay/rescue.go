package replay

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
	"xtool/pkg/reg"

	"github.com/golang/leveldb/db"
	"github.com/golang/leveldb/table"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("replay", "tsdb_rescue", TsdbRescue, "拯救历史数据", `tsdb_rescue <dataDir> <startFile>`, []*reg.Param{
		&reg.Param{Name: "dataDir", Type: "string", Necessity: true, Desc: ".ldb 数据文件目录"},
		&reg.Param{Name: "startFile", Type: "string", Necessity: false, Desc: "起始数据文件，不传默认全部"},
	})
}

// TsdbRescue 拯救数据
func TsdbRescue(dataDir string, startFile string) {
	files, err := ioutil.ReadDir(dataDir)
	if err != nil {
		log.Errorf("TsdbRescue ioutil.ReadDir '%s' error: %s", dataDir, err.Error())
		return
	}
	//err := src.Scan(keyStart, func(m map[string]interface{}) error {
	//	return dst.Save(m)
	//})

	t0 := time.Now()

	for _, f := range files {
		if !strings.HasSuffix(f.Name(), ".ldb") {
			continue
		}

		if startFile != "" && strings.Compare(f.Name(), startFile) < 0 {
			log.Infof("TsdbRescue skip file '%s'", f.Name())
			continue
		}

		filename := filepath.Join(dataDir, f.Name())
		err = rescue(filename, func(m map[string]interface{}) error {
			return dst.Save(m)
		})

		if err != nil {
			log.Warnf("TsdbRescue rescue '%s' error: %s", filename, err.Error())
			return
		}

		log.Infof("TsdbRescue rescue '%s' success, total used %v", filename, time.Since(t0))
	}

	log.Info("TsdbRescue success")
}

func rescue(filename string, do func(map[string]interface{}) error) error {
	f, err := os.Open(filename)
	if err != nil {
		return err
	}
	r := table.NewReader(f, &db.Options{
		VerifyChecksums: false,
	})
	defer r.Close()

	limit := 10000

	kvs := make(map[string]interface{})

	t0 := time.Now()

	t := r.Find(nil, nil)
	for t.Next() {
		k, v := t.Key(), t.Value()

		x := fmt.Sprintf("%q: %q", k, v)
		kv := strings.Split(x, "\\t\\\"")
		for _, i := range kv {
			if strings.Contains(i, "\\x00") {
				key := escapeKey(fmt.Sprintf("%q", k))
				if key == "" {
					continue
				}
				value := escapeValue(fmt.Sprintf("%q", v))
				kvs[key] = value
			} else {
				m := makePairs(i)
				//fmt.Println(i)
				for key, value := range m {
					kvs[key] = value
				}
			}

			if len(kvs) >= limit {
				err = do(kvs)
				if err != nil {
					log.Warnf("rescue %d data from '%s' error: %s", len(kvs), filename, err.Error())
					kvs = make(map[string]interface{})
					continue
				}

				log.Infof("rescue %d k-v from '%s' success, temp file used %v", len(kvs), filename, time.Since(t0))
				kvs = make(map[string]interface{})
			}
		}
	}

	if len(kvs) != 0 {
		err = do(kvs)
		if err != nil {
			log.Warnf("rescue %d data from '%s' error: %s", len(kvs), filename, err.Error())
			return t.Close()
		}

		log.Infof("rescue %d k-v from '%s' success, temp file used %v", len(kvs), filename, time.Since(t0))
	}

	return t.Close()
}

func makePairs(s string) map[string]string {
	m := map[string]string{}
	kvs := strings.Split(s, " ")
	if len(kvs)%2 == 1 {
		// 奇数
		//fmt.Printf("xxxxxxxxxx+%s+xxxxxxxx\n", s)
		return m
	}
	for i := 0; i < len(kvs); i += 2 {
		m[escape(kvs[i])] = escape(kvs[i+1])
	}
	return m
}

func escape(s string) string {
	return strings.Trim(strings.TrimSpace(s), "\\\"")
}

func escapeKey(s string) string {

	vs := strings.Split(s, "\\x0")
	if strings.HasPrefix(vs[0], "\"k") {
		return strings.Trim(vs[0], "\"k")
	}

	return ""
}

func escapeValue(s string) string {
	return strings.Trim(strings.TrimSpace(s), "\"")
}
