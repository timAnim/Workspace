package replay

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
	"xtool/pkg/cmdb"
	"xtool/pkg/reg"
	"xtool/pkg/tsdbstore"
	"xtool/pkg/utils"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	log "github.com/sirupsen/logrus"
)

func init() {
	reg.Regist("replay", "set_src_ssdb", SetSrcSSDB, "设置源数据SSDB地址", `set_src_ssdb <host> <port>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "要登陆的KE服务器地址"},
		&reg.Param{Name: "port", Type: "string", Necessity: true, Desc: "登陆账号"},
	})

	reg.Regist("replay", "set_dst_ssdb", SetDstSSDB, "设置目标数据SSDB地址", `set_dst_ssdb <host> <port>`, []*reg.Param{
		&reg.Param{Name: "host", Type: "string", Necessity: true, Desc: "要登陆的KE服务器地址"},
		&reg.Param{Name: "port", Type: "string", Necessity: true, Desc: "登陆账号"},
	})

	reg.Regist("replay", "tsdb_replay_spot", TsdbReplaySpot, "将源ID历史数据复制到目标ID上", `tsdb_replay_spot <srcID> <dstID> <srcStartTime> <dstStartTime> <duration>`, []*reg.Param{
		&reg.Param{Name: "srcID", Type: "string", Necessity: true, Desc: "源设备ID"},
		&reg.Param{Name: "dstID", Type: "string", Necessity: true, Desc: "目标设备ID"},
		&reg.Param{Name: "srcStartTime", Type: "string", Necessity: true, Desc: "源数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
		&reg.Param{Name: "dstStartTime", Type: "string", Necessity: true, Desc: "目标数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
		&reg.Param{Name: "duration", Type: "int", Necessity: false, Desc: "拷贝时长，单位 s，不填默认900s，即15分钟"},
	})

	reg.Regist("replay", "tsdb_replay_device", TsdbReplayDevice, "将源设备历史数据复制到目标设备上", `tsdb_replay_device <srcDeviceID> <dstDeviceID> <srcStartTime> <dstStartTime> <duration>`, []*reg.Param{
		&reg.Param{Name: "srcDeviceID", Type: "string", Necessity: true, Desc: "源设备ID"},
		&reg.Param{Name: "dstDeviceID", Type: "string", Necessity: true, Desc: "目标设备ID"},
		&reg.Param{Name: "srcStartTime", Type: "string", Necessity: true, Desc: "源数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
		&reg.Param{Name: "dstStartTime", Type: "string", Necessity: true, Desc: "目标数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
		&reg.Param{Name: "duration", Type: "int", Necessity: false, Desc: "拷贝时长，单位 s，不填默认900s，即15分钟"},
	})

	reg.Regist("replay", "tsdb_export", TsdbExport, "导出源设备数据列表", `tsdb_export <deviceIDs> <startTime> <duration>`, []*reg.Param{
		&reg.Param{Name: "deviceIDs", Type: "string", Necessity: true, Desc: "源设备ID列表，以','隔开"},
		&reg.Param{Name: "startTime", Type: "string", Necessity: true, Desc: "源数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
		&reg.Param{Name: "duration", Type: "int", Necessity: false, Desc: "拷贝时长，单位 s，不填默认900s，即15分钟"},
	})

	reg.Regist("replay", "tsdb_import", TsdbImport, "导入设备数据列表", `tsdb_import <startTime>`, []*reg.Param{
		&reg.Param{Name: "filename", Type: "string", Necessity: true, Desc: "导入文件名"},
		&reg.Param{Name: "startTime", Type: "string", Necessity: true, Desc: "目标数据开始时间，格式为'2006-01-02 15:04:05'，需要引号"},
	})
}

var (
	src *tsdbstore.Tsdb
	dst *tsdbstore.Tsdb
)

// SetSrcSSDB 设置源数据库
func SetSrcSSDB(host string, port string) {
	p, _ := strconv.Atoi(port)
	if p == 0 {
		p = 8888
	}

	src = tsdbstore.NewTsdb(host, p, 10, 5)
	err := src.Init()
	if err != nil {
		log.Errorf("src.Init error: %s", err.Error())
		return
	}
	log.Infof("set src '%s:%d' success", host, p)
}

// SetDstSSDB 设置源数据库
func SetDstSSDB(host string, port string) {
	p, _ := strconv.Atoi(port)
	if p == 0 {
		p = 8888
	}

	dst = tsdbstore.NewTsdb(host, p, 10, 5)
	err := dst.Init()
	if err != nil {
		log.Errorf("src.Init error: %s", err.Error())
		return
	}
	log.Infof("set src '%s:%d' success", host, p)
}

// TsdbReplaySpot 复制数据，srcStartTime 与 dstStartTime 使用日期格式 '2006-01-02 15:04:05' 注意使用引号引起来
func TsdbReplaySpot(srcID string, dstID string, srcStartTime string, dstStartTime string, duration string) {
	if src == nil || dst == nil {
		log.Error("please connect src and dst ssdb")
		return
	}

	//t, err := time.Parse("2006-01-02 15:04:05", srcStartTime)
	t, err := time.ParseInLocation("2006-01-02 15:04:05", srcStartTime, time.Local)
	if err != nil {
		log.Errorf("time.Parse error: %s", err.Error())
		return
	}

	d, err := strconv.ParseInt(duration, 10, 64)
	if err != nil {
		d = 900
	}

	begin := t.Unix()
	end := begin + d

	srcM, err := src.GetHistoryValue([]string{srcID}, begin, end, "")
	if err != nil {
		log.Errorf("src.GetHistoryValue error: %s", err.Error())
		return
	}

	count := 0

	dstM := map[string]tsdbstore.ValueTimeList{}

	for id, vs := range srcM {
		if id == srcID {
			dstM[dstID] = vs
		}
		count += len(vs)
	}

	err = dst.SaveHistory(dstM)
	if err != nil {
		log.Errorf("dst.SaveHistory error: %s", err.Error())
		return
	}

	log.Infof("replay data success, srcID: '%s', dstID: '%s', srcStartTime: '%s', dstStartTime: '%s', duration: %d, count: %d", srcID, dstID, srcStartTime, dstStartTime, d, count)
}

// TsdbReplayDevice 复制数据，srcStartTime 与 dstStartTime 使用日期格式 '2006-01-02 15:04:05' 注意使用引号引起来
func TsdbReplayDevice(srcDeviceID string, dstDeviceID string, srcStartTime string, dstStartTime string, duration string) {

	items, err := cmdb.QueryItemsByPrefix(srcDeviceID)
	if err != nil {
		log.Errorf("cmdb.QueryItemsByPrefix error: %s", err.Error())
		return
	}

	for _, r := range items.Resources {
		TsdbReplaySpot(r.ResourceID, strings.Replace(r.ResourceID, srcDeviceID, dstDeviceID, -1), srcStartTime, dstStartTime, duration)
	}
}

func exportOneDevice(spotIDs []string, startTime string, duration int64) (map[string]tsdbstore.ValueTimeList, error) {
	if src == nil {
		log.Error("please connect src ssdb")
		return nil, errors.New("please connect src ssdb")
	}

	//t, err := time.Parse("2006-01-02 15:04:05", startTime)
	t, err := time.ParseInLocation("2006-01-02 15:04:05", startTime, time.Local)
	if err != nil {
		log.Errorf("time.Parse error: %s", err.Error())
		return nil, err
	}

	begin := t.Unix()
	end := begin + duration

	srcM, err := src.GetHistoryValue(spotIDs, begin, end, "")
	if err != nil {
		log.Errorf("src.GetHistoryValue error: %s", err.Error())
		return nil, err
	}

	return srcM, nil
}

func cell(i, j int) string {
	return fmt.Sprintf("%s%d", utils.ToAlphaString(j), i+1)
}

// TsdbExport 导出数据 startTime 使用日期格式 '2006-01-02 15:04:05' 注意使用引号引起来
func TsdbExport(deviceIDs string, startTime string, duration string) {
	devIDs := strings.Split(deviceIDs, ",")

	d, err := strconv.ParseInt(duration, 10, 64)
	if err != nil {
		d = 900
	}

	xlsxFile := excelize.NewFile()

	for _, deviceID := range devIDs {
		spots, err := cmdb.QueryItemsByPrefix(deviceID + "_")
		if err != nil {
			log.Errorf("cmdb.QueryItemsByPrefix error: %s", err.Error())
			return
		}

		spotIDs := spots.GetIDs()

		vm, err := exportOneDevice(spotIDs, startTime, d)
		if err != nil {
			log.Errorf("exportOneDevice error: %s", err.Error())
			return
		}

		_ = vm

		xlsxFile.NewSheet(deviceID)

		// 整理数据

		tvm, err := tsdbstore.ArrangeValue(vm)
		if err != nil {
			log.Errorf("tsdbstore.ArrangeValue error: %s", err.Error())
			return
		}

		// 添加表头
		xlsxFile.SetCellValue(deviceID, cell(2, 0), "时间")
		xlsxFile.SetCellValue(deviceID, cell(2, 1), "时间戳")
		// 遍历排序后的时间
		for j, spot := range spots.Resources {
			xlsxFile.SetCellValue(deviceID, cell(0, 2+j), spot.ResourceID)
			xlsxFile.SetCellValue(deviceID, cell(1, 2+j), spot.MustID())
			xlsxFile.SetCellValue(deviceID, cell(2, 2+j), spot.MustName())
		}

		for i, ts := range tvm.OrderedTime() {
			t := time.Unix(ts, 0)
			xlsxFile.SetCellValue(deviceID, cell(3+i, 0), t.Format("2006-01-02 15:04:05"))
			xlsxFile.SetCellValue(deviceID, cell(3+i, 1), fmt.Sprintf("%d", ts))

			for j, spot := range spots.Resources {
				if s, ok := tvm[ts]; ok {
					if v, ok := s.Get(spot.ResourceID); ok {
						xlsxFile.SetCellValue(deviceID, cell(3+i, 2+j), v.Value)
					}
				}
			}
		}

		log.Infof("tsdb_export '%s' success", deviceID)
	}

	fileName := "tsdb_export.xlsx"
	err = xlsxFile.SaveAs(fileName)
	if err != nil {
		log.Errorf("tsdb_export save as '%s' error: %s", fileName, err.Error())
		return
	}
	log.Infof("tsdb_export save as '%s' success", fileName)
}

// TsdbImport 导入数据 startTime 使用日期格式 '2006-01-02 15:04:05' 注意使用引号引起来
func TsdbImport(filename string, startTime string) {
	if dst == nil {
		log.Error("please connect dst ssdb")
		return
	}

	xlsxFile, err := excelize.OpenFile(filename)
	if err != nil {
		log.Errorf("excelize.OpenFile error: %s", err.Error())
		return
	}

	//t, err := time.Parse("2006-01-02 15:04:05", startTime)
	t, err := time.ParseInLocation("2006-01-02 15:04:05", startTime, time.Local)
	if err != nil {
		log.Errorf("time.Parse error: %s", err.Error())
		return
	}

	offset := int64(0)

	for i := 1; i < xlsxFile.SheetCount+1; i++ {
		deviceID := xlsxFile.GetSheetName(i)
		if strings.HasPrefix(deviceID, "Sheet") {
			continue
		}

		vm := make(map[string]tsdbstore.ValueTimeList)

		rows, err := xlsxFile.GetRows(deviceID)
		if err != nil {
			log.Errorf("GetRows error: %s", err.Error())
			return
		}

		for m, row := range rows {
			if m < 3 {
				continue
			}
			if m == 3 {
				ts, err := strconv.ParseInt(row[1], 10, 64)
				if err != nil {
					log.Errorf("strconv.ParseInt error: %s", err.Error())
					return
				}
				offset = ts - t.Unix()
			}

			//ts := xlsxFile.GetCellValue(deviceID, cell(m, 1))

			for n, c := range row {
				if n < 2 {
					continue
				}
				if c == "" {
					continue
				}

				ts, err := strconv.ParseInt(row[1], 10, 64)
				if err != nil {
					log.Errorf("strconv.ParseInt error: %s", err.Error())
					return
				}

				sID, err := xlsxFile.GetCellValue(deviceID, cell(1, n))
				if err != nil {
					log.Errorf("xlsxFile.GetCellValue error: %s", err.Error())
					return
				}
				resourceID := deviceID + "_" + sID

				//fmt.Println(m, n, ts, ts-offset, resourceID, c)
				if vl, ok := vm[resourceID]; ok {
					vm[resourceID] = append(vl, &tsdbstore.ValueTime{
						Time:  fmt.Sprintf("%d", ts-offset),
						Value: c,
					})
					continue
				}
				vm[resourceID] = tsdbstore.ValueTimeList{
					&tsdbstore.ValueTime{
						Time:  fmt.Sprintf("%d", ts-offset),
						Value: c,
					},
				}
			}
		}

		for k, v := range vm {
			fmt.Println(k, v.Len())
		}
		dst.SaveHistory(vm)
	}
}
