package tsdbstore

import (
	"fmt"
	"time"
	"xtool/pkg/define"

	log "github.com/sirupsen/logrus"
)

// SaveHistoryValue 保存历史数据
func (db *Tsdb) SaveHistoryValue(vs []*define.ValueItem) error {
	if len(vs) == 0 {
		return nil
	}
	kvs := define.M{}
	for _, v := range vs {
		tDate := time.Unix(v.SaveTime, 0)
		if v.SaveTime == 0 {
			tDate = time.Unix(v.Timestamp, 0)
		}
		key := fmt.Sprintf(ssdbKeyFmt, tDate.Year(), tDate.Month(), tDate.Day(), tDate.Hour(), v.ResourceID, tDate.Minute()*60+tDate.Second())
		kvs[key] = v.RealValue
	}
	//从连接池获取一个连接
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("SaveHistoryValue NewClient", err)
		return err
	}
	defer ssdbConn.Close()
	err = ssdbConn.MultiSet(kvs)
	if err != nil {
		log.Errorf("SaveHistoryValue ssdbConn.MultiSet: %s", err.Error())
		return err
	}
	return nil
}

// SaveHistory 保存历史数据
func (db *Tsdb) SaveHistory(vm map[string]ValueTimeList) error {
	if len(vm) == 0 {
		return nil
	}

	kvs := map[string]interface{}{}

	for id, vs := range vm {
		for _, v := range vs {
			key, value, err := v.Format(id)
			if err != nil {
				return err
			}

			kvs[key] = value
		}
	}

	//从连接池获取一个连接
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("SaveHistory NewClient", err)
		return err
	}

	defer ssdbConn.Close()

	args := make([]interface{}, 0, 2*len(kvs)+1)
	args = append(args, "multi_set")

	for k, v := range kvs {
		args = append(args, k, v)
	}

	//err = ssdbConn.MultiSet(kvs)
	_, err = ssdbConn.Do(args...)
	if err != nil {
		log.Errorf("SaveHistory ssdbConn.MultiSet: %s", err.Error())
		return err
	}
	return nil
}

// Save 保存
func (db *Tsdb) Save(m map[string]interface{}) error {
	ssdbConn, err := db.ssdbPool.NewClient()
	if err != nil {
		log.Error("NewClient error", err)
		return err
	}

	defer ssdbConn.Close()

	args := make([]interface{}, 0, 2*len(m)+1)
	args = append(args, "multi_set")

	for k, v := range m {
		args = append(args, k, v)
	}

	//err = ssdbConn.MultiSet(kvs)
	_, err = ssdbConn.Do(args...)
	if err != nil {
		log.Errorf("ssdbConn.MultiSet error: %s", err.Error())
		return err
	}
	return nil
}
