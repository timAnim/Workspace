package tsdbstore

import (
	"errors"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/tamago-cn/gossdb"
)

// ParseKey 从key中直接解析时间与ID
func ParseKey(k string) (time.Time, string, error) {
	ks := strings.Split(k, ":")
	if len(ks) != 3 {
		return time.Now(), "", fmt.Errorf("ParseKey '%s' error: not standard key pattern", k)
	}

	if len(ks[0]) != 10 {
		return time.Now(), "", fmt.Errorf("ParseKey '%s' error: first seg must be len 10", k)
	}

	if len(ks[2]) != 4 {
		return time.Now(), "", fmt.Errorf("ParseKey '%s' error: last seg must be len 4", k)
	}

	year, _ := strconv.Atoi(k[:4])
	month, _ := strconv.Atoi(k[4:6])
	day, _ := strconv.Atoi(k[6:8])
	hour, _ := strconv.Atoi(k[8:10])
	pos := strings.LastIndex(k, ":")
	rid := k[11:pos]
	seconds, _ := strconv.Atoi(k[pos+1:])
	minute, second := seconds/60, seconds%60
	return time.Date(year, time.Month(month), day, hour, minute, second, 0, time.Local), rid, nil
}

// BuildKey 构建key
func BuildKey(resourceID string, ts int64, isStart bool) string {
	return genSSDBKey(resourceID, ts, isStart)
}

//通过获取固定时间点获取历史数据
func (db *Tsdb) getHistoryValue(ids []string, begin int64, end int64, interval string) (map[string]ValueTimeList, error) {
	//将采集刻度换算成秒
	var intervalSecond int64
	switch interval {
	case "five":
		intervalSecond = 300
	case "ten":
		intervalSecond = 600
	case "quarter":
		intervalSecond = 900
	case "twenty":
		intervalSecond = 1200
	case "half":
		intervalSecond = 1800
	default:
		return nil, fmt.Errorf("UnSupported Time Interval=%s", interval)
	}

	//按照采集刻度构造MultiGet请求
	var keys []string
	for t := begin; t <= end; {
		mod := t % intervalSecond
		if mod == 0 { //只要采集刻度对应的固定点
			date := time.Unix(t, 0)
			for _, rid := range ids {
				keys = append(keys, fmt.Sprintf(ssdbKeyFmt, date.Year(), date.Month(), date.Day(), date.Hour(), rid, date.Minute()*60+date.Second()))
			}
			t += intervalSecond
		} else {
			t += intervalSecond - mod
		}
	}

	//从连接池获取一个连接
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("getHistoryValue NewClient", err)
		return nil, err
	}
	defer ssdbConn.Close()

	//调用MultiGet请求
	val, err := ssdbConn.MultiGetArray(keys)
	if err != nil {
		log.Error("getHistoryValue ssdbConn.MultiGetArray", keys, err)
		return nil, err
	}
	log.Debug("ssdbConn.MultiGetArray", keys, "success")

	//拼装结果
	var rid string
	var year, month, day, hour, minute, second, seconds, pos int
	ridMap := make(map[string]ValueTimeList)
	for k, v := range val {
		year, _ = strconv.Atoi(k[:4])
		month, _ = strconv.Atoi(k[4:6])
		day, _ = strconv.Atoi(k[6:8])
		hour, _ = strconv.Atoi(k[8:10])
		pos = strings.LastIndex(k, ":")
		rid = k[11:pos]
		seconds, _ = strconv.Atoi(k[pos+1:])
		minute, second = seconds/60, seconds%60
		ridMap[rid] = append(ridMap[rid], &ValueTime{
			Time:  strconv.FormatInt(time.Date(year, time.Month(month), day, hour, minute, second, 0, time.Local).Unix(), 10),
			Value: v.String(),
		})
	}

	//对结果排序
	for _, vl := range ridMap {
		sort.Sort(vl)
	}

	return ridMap, nil
}

//通过扫描磁盘获取历史数据
func (db *Tsdb) scanHistoryValue(ids []string, begin int64, end int64) (map[string]ValueTimeList, error) {
	var err error

	//计算开始和结束时间的小时点
	beginH, endH := begin/3600, end/3600

	//测点按字典排序
	sort.Strings(ids)
	//测试排序效果
	//log.Info("GetHistoryValue sort", req.GetResourceid())

	res := make(map[string]ValueTimeList)

	if beginH < endH { //请求时间区间分布在不同小时内
		//将(10:32,13:01)按小时拆分成[(10:32,10:59), (11:00,11:59), (12:00,12:59), (13:00,13:01)]的列表
		for b, e := begin, int64(0); b <= end; b = e + 1 {
			e = b + 3599
			if e/3600 > b/3600 { //不在一个小时区间
				e = b/3600*3600 + 3599
				err = db.scanSsdb(b, e, ids, res)
			} else { //在一个小时区间
				if e >= end { //最后一个小时
					err = db.scanSsdb(b, end, ids, res)
				} else { //中间一个小时
					err = db.scanSsdb(b, e, ids, res)
				}
			}

			if err != nil {
				break
			}
		}
	} else if beginH == endH { //请求时间区间分布在同一个小时内
		err = db.scanSsdb(begin, end, ids, res)
	}

	return res, err
}

//获取同一个小时内测点的时序数据，begin和end必须为同一小时
func (db *Tsdb) scanSsdb(begin, end int64, rids []string, res map[string]ValueTimeList) (err error) {
	log.Debugf("scanSsdb begin=%d end=%d resourceids=%v", begin, end, rids)

	//转换成时间格式
	beginDate := time.Unix(begin, 0)
	endDate := time.Unix(end, 0)

	//从连接池获取一个连接
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("scanSsdb ssdbPool.NewClient", err)
		return err
	}
	defer ssdbConn.Close()

	//遍历测点获取时序数据
	var keyBegin, keyEnd string
	var year, month, day, hour, minute, second, seconds int
	for _, rid := range rids {
		//ssdb扫描区间是前开后闭，若分和秒都为0且需包含此值，则使用2017052410:0_1_2:0作为起始值
		if beginDate.Minute() == 0 && beginDate.Second() == 0 {
			keyBegin = fmt.Sprintf(ssdbKeyFmtZero, beginDate.Year(), beginDate.Month(), beginDate.Day(), beginDate.Hour(), rid)
		} else {
			keyBegin = fmt.Sprintf(ssdbKeyFmt, beginDate.Year(), beginDate.Month(), beginDate.Day(), beginDate.Hour(), rid, beginDate.Minute()*60+beginDate.Second()-1)
		}
		keyEnd = fmt.Sprintf(ssdbKeyFmt, endDate.Year(), endDate.Month(), endDate.Day(), endDate.Hour(), rid, endDate.Minute()*60+endDate.Second())

		//扫描ssdb一个小时内的某个测点的数据
		scanRes, err := ssdbConn.Scan(keyBegin, keyEnd, 3600)
		if err != nil {
			log.Error("scanSsdb ssdbConn.Scan", keyBegin, keyEnd, err)
			return err
		}
		log.Debug("ssdbConn.Scan", keyBegin, keyEnd, "success")

		//拼装结果
		if _, ok := res[rid]; !ok {
			res[rid] = ValueTimeList{}
		}
		for k, v := range scanRes {
			year, _ = strconv.Atoi(k[:4])
			month, _ = strconv.Atoi(k[4:6])
			day, _ = strconv.Atoi(k[6:8])
			hour, _ = strconv.Atoi(k[8:10])
			seconds, _ = strconv.Atoi(k[strings.LastIndex(k, ":")+1:])
			minute, second = seconds/60, seconds%60
			res[rid] = append(res[rid], &ValueTime{
				Time:  strconv.FormatInt(time.Date(year, time.Month(month), day, hour, minute, second, 0, time.Local).Unix(), 10),
				Value: v.String(),
			})
		}
	}

	return nil
}

type scanResult struct {
	ResourceID string
	Ts         int64
	Value      string
	Err        error
}

func genSSDBKey(resourceID string, ts int64, isStart bool) string {
	t := time.Unix(ts, 0)

	//ssdb扫描区间是前开后闭，若分和秒都为0且需包含此值，则使用2017052410:0_1_2:0作为起始值
	if isStart && ts%3600 == 0 {
		return fmt.Sprintf("%s:%s:", t.Format("2006010215"), resourceID)
	}
	return fmt.Sprintf("%s:%s:%04d", t.Format("2006010215"), resourceID, ts%3600)
}

func genResourceIDAndTsFromSSDBKey(k string) (resourceID string, ts int64, err error) {
	//k: 2017010211:0_1_2:1234
	if len(k) < 14 {
		return "", 0, fmt.Errorf("wrong key format: %s", k)
	}
	hour := k[0:10]
	seconds := k[len(k)-4:]
	t, err := time.ParseInLocation("2006010215", hour, time.Local)
	if err != nil {
		return "", 0, fmt.Errorf("wrong key format: %s", k)
	}
	secs, err := strconv.Atoi(seconds)
	if err != nil {
		return "", 0, fmt.Errorf("wrong key format: %s", k)
	}

	return k[11 : len(k)-5], t.Unix() + int64(secs), nil
}

var scanBySSDB = func(ssdbClient *gossdb.Client, startKey, endKey string, limit int64, inverse bool) (map[string]gossdb.Value, error) {
	if inverse {
		log.Debugf("RSCAN: start: %s, end: %s, count: %d", startKey, endKey, limit)
		return ssdbClient.Rscan(endKey, startKey, limit)
	}

	log.Debugf("SCAN: start: %s, end: %s, count: %d", startKey, endKey, limit)
	return ssdbClient.Scan(startKey, endKey, limit)
}

func scanFirst(ssdbClient *gossdb.Client, resourceID string, beginTs, endTs int64) scanResult {
	log.Debugf("scan start resource_id: %s, start_ts: %d, end:ts:%d", resourceID, beginTs, endTs)
	defer func() {
		log.Debugf("scan finish resource_id: %s, start_ts: %d, end:ts:%d", resourceID, beginTs, endTs)
	}()
	beginTsHour, endTsHour := beginTs/3600, endTs/3600
	if beginTsHour == endTsHour {
		ssdbResult, err := scanBySSDB(ssdbClient, genSSDBKey(resourceID, beginTs, true), genSSDBKey(resourceID, endTs, false), 1, false)
		if err != nil {
			return scanResult{Err: err}
		}
		for k, v := range ssdbResult {
			rid, ts, err := genResourceIDAndTsFromSSDBKey(k)
			return scanResult{ResourceID: rid, Ts: ts, Value: v.String(), Err: err}
		}
		return scanResult{Err: errValueNotFound}
	}
	result := scanFirst(ssdbClient, resourceID, beginTs, beginTsHour*3600+3599)
	if result.Err != errValueNotFound {
		return result
	}
	return scanFirst(ssdbClient, resourceID, beginTsHour*3600+3600, endTs)
}

var errValueNotFound = errors.New("value not found")

func rscanFirst(ssdbClient *gossdb.Client, resourceID string, beginTs, endTs int64) scanResult {
	log.Debugf("rscan start resource_id: %s, start_ts: %d, end:ts:%d", resourceID, beginTs, endTs)
	defer func() {
		log.Infof("rscan finish resource_id: %s, start_ts: %d, end:ts:%d", resourceID, beginTs, endTs)
	}()

	beginTsHour, endTsHour := beginTs/3600, endTs/3600
	if beginTsHour == endTsHour {
		ssdbResult, err := scanBySSDB(ssdbClient, genSSDBKey(resourceID, beginTs, true), genSSDBKey(resourceID, endTs, false), 1, true)
		if err != nil {
			return scanResult{Err: err}
		}
		for k, v := range ssdbResult {
			rid, ts, err := genResourceIDAndTsFromSSDBKey(k)
			return scanResult{ResourceID: rid, Ts: ts, Value: v.String(), Err: err}
		}
		return scanResult{Err: errValueNotFound}
	}
	result := rscanFirst(ssdbClient, resourceID, endTsHour*3600, endTs)
	if result.Err != errValueNotFound {
		return result
	}
	return rscanFirst(ssdbClient, resourceID, beginTs, endTsHour*3600-1)
}

//GetHistoryValue 获取测点历史RPC接口
func (db *Tsdb) GetHistoryValue(ids []string, begin int64, end int64, interval string) (map[string]ValueTimeList, error) {
	//有设置采集刻度采用MultiGet，否则Scan
	log.Debugf("start get history value: %v", time.Now())
	defer func() {
		log.Debugf("end get history value: %v", time.Now())
	}()
	if interval != "" {
		log.Debug("GetHistoryValue MultiGet", ids, begin, end, interval)
		return db.getHistoryValue(ids, begin, end, interval)
	}
	log.Debug("GetHistoryValue Scan", ids, begin, end)
	return db.scanHistoryValue(ids, begin, end)

}

// GetHistoryValueByTsAndIntervalRes 获取时间范围内的值, etl用到
type GetHistoryValueByTsAndIntervalRes struct {
	Result string
}

// GetHistoryValueByTsAndInterval 按时间戳获取历史数据
func (db *Tsdb) GetHistoryValueByTsAndInterval(rid string, timestamp int64, interval int64) (*GetHistoryValueByTsAndIntervalRes, error) {
	log.Debugf("get history value by ts and interval, resource_id: %s, ts: %d, interval: %d", rid, timestamp, interval)
	out := &GetHistoryValueByTsAndIntervalRes{}
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("ssdbPool.NewClient:", err)
		return nil, err
	}
	defer ssdbConn.Close()
	key := genSSDBKey(rid, timestamp, false)
	log.Debugf("get key: %s", key)
	v, err := ssdbConn.Get(key)
	if err != nil {
		log.Errorf("ssdbConn.Get %s, error: %s", key, err.Error())
		return nil, err
	}
	if !v.IsEmpty() {
		out.Result = v.String()
		return out, nil
	}
	var returnErr error
	items := [2]scanResult{}
	items[0].Err = errValueNotFound
	items[1].Err = errValueNotFound
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		log.Debug("before scan get client")
		ssdbConn, err := db.ssdbPool.NewClient()
		if err != nil {
			log.Error("scanSsdb ssdbPool.NewClient", err)
			returnErr = err
			return
		}
		defer ssdbConn.Close()

		log.Debug("end scan get client")
		items[0] = scanFirst(ssdbConn, rid, timestamp, timestamp+interval)
	}()
	go func() {
		defer wg.Done()
		log.Debug("before rscan get client")
		ssdbConn, err := db.ssdbPool.NewClient()
		if err != nil {
			log.Error("scanSsdb ssdbPool.NewClient", err)
			returnErr = err
			return
		}
		defer ssdbConn.Close()

		log.Debug("before rscan get client")
		items[1] = rscanFirst(ssdbConn, rid, timestamp, timestamp-interval)
	}()
	wg.Wait()
	log.Debug("wg wait finish")
	if returnErr != nil {
		log.Errorf("scan or rscan with err: %s", returnErr)
		return nil, returnErr
	}
	var searchTs int64
	log.Infof("items: %v", items)
	for _, item := range items {
		if item.Err == errValueNotFound {
			continue
		}
		if item.Err != nil {
			return nil, item.Err
		}
		if math.Abs(float64(timestamp-searchTs)) > math.Abs(float64(timestamp-item.Ts)) {
			searchTs = item.Ts
			out.Result = item.Value
		}
	}
	log.Debugf("return: %v,out.Result: %s", out, out.Result)
	return out, nil
}

func lastKey(keys []string) string {
	sort.Strings(keys)
	return keys[len(keys)-1]
}

// Scan 扫描数据
func (db *Tsdb) Scan(keyStart string, do func(map[string]interface{}) error) error {
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("ssdbPool.NewClient:", err)
		return err
	}
	defer ssdbConn.Close()

	limit := 10000

	t0 := time.Now()

	for {
		t := time.Now()
		m, err := ssdbConn.Scan(keyStart, "", int64(limit))
		if err != nil {
			return err
		}

		//log.Infof("ssdbConn.Scan used %v", time.Since(t0))
		//t0 = time.Now()

		kvs := make(map[string]interface{})
		keys := make([]string, 0, limit)
		for k, v := range m {
			keys = append(keys, k)
			kvs[k] = v.String()
		}
		//log.Infof("make map used %v", time.Since(t0))

		err = do(kvs)
		if err != nil {
			log.Errorf("do with scanned data error: %s, temp keyStart: '%s'", err.Error(), keyStart)
			return err
		}
		//log.Infof("do save used %v", time.Since(t0))

		log.Infof("do with scanned data len %d k-v success, used %v, total used %v, temp keyStart: '%s'", len(keys), time.Since(t), time.Since(t0), keyStart)

		if len(m) < limit {
			log.Infof("do with scanned data done")
			return nil
		}

		keyStart = lastKey(keys)
	}
}

// ScanStartToEnd 扫描数据
func (db *Tsdb) ScanStartToEnd(keyStart string, keyEnd string, do func(map[string]interface{}) error) error {
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("ssdbPool.NewClient:", err)
		return err
	}
	defer ssdbConn.Close()

	limit := 10000

	t0 := time.Now()

	for {
		t := time.Now()
		m, err := ssdbConn.Scan(keyStart, keyEnd, int64(limit))
		if err != nil {
			return err
		}

		//log.Infof("ssdbConn.Scan used %v", time.Since(t0))
		//t0 = time.Now()

		kvs := make(map[string]interface{})
		keys := make([]string, 0, limit)
		for k, v := range m {
			keys = append(keys, k)
			kvs[k] = v.String()
		}
		//log.Infof("make map used %v", time.Since(t0))

		err = do(kvs)
		if err != nil {
			log.Errorf("do with scanned data error: %s, temp keyStart: '%s'", err.Error(), keyStart)
			return err
		}
		//log.Infof("do save used %v", time.Since(t0))

		log.Infof("do with scanned data len %d k-v success, used %v, total used %v, temp keyStart: '%s'", len(keys), time.Since(t), time.Since(t0), keyStart)

		if len(m) < limit {
			log.Infof("do with scanned data done")
			return nil
		}

		keyStart = lastKey(keys)
	}
}
