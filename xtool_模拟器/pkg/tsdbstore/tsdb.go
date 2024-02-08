package tsdbstore

import (
	"github.com/tamago-cn/gossdb"
	ssdbConf "github.com/tamago-cn/gossdb/conf"
)

const (
	ssdbKeyFmt     = "%04d%02d%02d%02d:%s:%04d" //默认ssdb主键格式
	ssdbKeyFmtZero = "%04d%02d%02d%02d:%s:0"    //为了scan时能包括起始值
)

// Tsdb 时序数据库操作
type Tsdb struct {
	Host        string
	Port        int
	MaxPoolSize int
	MinPoolSize int

	ssdbPool *gossdb.Connectors //ssdb连接池
}

// NewTsdb 新建时序数据库连接
func NewTsdb(host string, port int, maxPoolSize int, minPoolSize int) *Tsdb {
	return &Tsdb{
		Host:        host,
		Port:        port,
		MaxPoolSize: maxPoolSize,
		MinPoolSize: minPoolSize,
	}
}

// Init 初始化连接
func (db *Tsdb) Init() error {
	config := &ssdbConf.Config{
		Host:        db.Host,
		Port:        db.Port,
		MaxPoolSize: db.MaxPoolSize,
		MinPoolSize: db.MinPoolSize,

		//连接写缓冲，默认为8，单位为kb
		WriteBufferSize: 1024,
		//连接读缓冲，默认为8，单位为kb
		ReadBufferSize: 1024,
	}

	pool, err := gossdb.NewPool(config)
	if err != nil {
		return err
	}

	db.ssdbPool = pool

	return nil
}
