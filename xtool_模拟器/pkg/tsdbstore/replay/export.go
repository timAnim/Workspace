package replay

import (
	"fmt"
	"os"
	"strings"
	"time"
	"xtool/pkg/reg"
	"xtool/pkg/tsdbstore"

	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("replay", "tsdb_export_by_time", TsdbExportByTime, "导出指定时间内的所有数据", `tsdb_export_by_time <startTime> <endTime>`, []*reg.Param{
		&reg.Param{Name: "startTime", Type: "string", Necessity: true, Desc: "数据开始时间，精确到小时级别，格式为'2006010215'，需要引号"},
		&reg.Param{Name: "endTime", Type: "string", Necessity: false, Desc: "数据结束时间，精确到小时级别，格式为'2006010216'，需要引号"},
	})

	reg.Regist("replay", "tsdb_export_by_time_and_id", TsdbExportByTimeAndID, "导出指定时间内指定ID的所有数据", `tsdb_export_by_time_and_id <resourceIDs> <startTime> <endTime>`, []*reg.Param{
		&reg.Param{Name: "resourceIDs", Type: "string", Necessity: true, Desc: "节点ID列表，以','隔开"},
		&reg.Param{Name: "startTime", Type: "string", Necessity: true, Desc: "数据开始时间，精确到小时级别，格式为'2006010215'，需要引号"},
		&reg.Param{Name: "endTime", Type: "string", Necessity: false, Desc: "数据结束时间，精确到小时级别，格式为'2006010216'，需要引号"},
	})
}

// TsdbExportByTime 导出数据 startTime 使用日期格式 '2006010215' 注意使用引号引起来
func TsdbExportByTime(startTime string, endTime string) {
	_, err := time.ParseInLocation("2006010215", startTime, time.Local)
	if err != nil {
		log.Errorf("startTime parse error: %s", err.Error())
		return
	}
	_, err = time.ParseInLocation("2006010215", endTime, time.Local)
	if err != nil {
		log.Errorf("endTime parse error: %s", err.Error())
		return
	}

	fp, err := os.Create(fmt.Sprintf("history_%s-%s.csv", startTime, endTime))
	if err != nil {
		log.Errorf("open file '%s' error: %s", fmt.Sprintf("history_%s-%s.csv", startTime, endTime), err.Error())
		return
	}
	defer fp.Close()

	fp.WriteString("time,timestamp,resource_id,value\n")

	err = src.ScanStartToEnd(startTime, endTime, func(m map[string]interface{}) error {
		for k, v := range m {
			t, id, err := tsdbstore.ParseKey(k)
			if err != nil {
				log.Warnf("%s", err.Error())
				continue
			}
			fp.WriteString(fmt.Sprintf("%s,%d,%s,%v\n", t.Format("2006-01-02 15:04:05"), t.Unix(), id, v))
		}
		return nil
	})
	if err != nil {
		log.Errorf("TsdbExportByTime error: %s", err.Error())
		return
	}

	log.Info("TsdbExportByTime success")
}

// TsdbExportByTimeAndID 导出数据 startTime 使用日期格式 '2006010215' 注意使用引号引起来
func TsdbExportByTimeAndID(resourceIDs string, startTime string, endTime string) {
	start, err := time.ParseInLocation("2006010215", startTime, time.Local)
	if err != nil {
		log.Errorf("startTime parse error: %s", err.Error())
		return
	}
	end, err := time.ParseInLocation("2006010215", endTime, time.Local)
	if err != nil {
		log.Errorf("endTime parse error: %s", err.Error())
		return
	}

	fp, err := os.Create(fmt.Sprintf("history_%s-%s.csv", startTime, endTime))
	if err != nil {
		log.Errorf("open file '%s' error: %s", fmt.Sprintf("history_%s-%s.csv", startTime, endTime), err.Error())
		return
	}
	defer fp.Close()
	fp.WriteString("time,timestamp,resource_id,value\n")

	ids := strings.Split(resourceIDs, ",")

	for begin := start; begin.Unix() < end.Unix(); begin = begin.Add(1 * time.Hour) {
		for _, x := range ids {
			fmt.Println(tsdbstore.BuildKey(x, begin.Unix(), true), tsdbstore.BuildKey(x, begin.Add(3599*time.Second).Unix(), false))
			err = src.ScanStartToEnd(tsdbstore.BuildKey(x, begin.Unix(), true), tsdbstore.BuildKey(x, begin.Add(3599*time.Second).Unix(), false), func(m map[string]interface{}) error {
				for k, v := range m {
					t, id, err := tsdbstore.ParseKey(k)
					if err != nil {
						log.Warnf("%s", err.Error())
						continue
					}
					fp.WriteString(fmt.Sprintf("%s,%d,%s,%v\n", t.Format("2006-01-02 15:04:05"), t.Unix(), id, v))
				}
				return nil
			})

			if err != nil {
				log.Errorf("TsdbExportByTimeAndID error: %s", err.Error())
				return
			}
		}
	}

	log.Info("TsdbExportByTimeAndID success")
}
