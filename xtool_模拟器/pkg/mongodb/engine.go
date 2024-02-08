package mongodb

import (
	"fmt"
	"time"

	"github.com/globalsign/mgo"
)

// MgoEngine sqlite版CMDB引擎
type MgoEngine struct {
	Host           string        `ini:"host" comment:"mongodb 服务地址"` //IP地址
	Port           string        `ini:"port" comment:"mongodb 服务端口"` //端口
	Username       string        `ini:"username"`                    //用户名
	Password       string        `ini:"password"`                    //密码
	Dbname         string        `ini:"dbname"`                      //数据库
	ConnectTimeout time.Duration `ini:"connect_timeout"`             // 连接超时
	PoolTimeout    time.Duration `ini:"pool_timeout"`                // 连接超时
	MaxPoolSize    int           `ini:"max_pool_size"`               //连接池数量上限

	conn *mgo.Session
}

// NewEngine 新建mongodb引擎
func NewEngine(host, port, username, password, dbName string, connTimout, poolTimeout time.Duration, maxPoolSize int) *MgoEngine {
	return &MgoEngine{
		Host:           host,
		Port:           port,
		Username:       username,
		Password:       password,
		Dbname:         dbName,
		ConnectTimeout: connTimout,
		PoolTimeout:    poolTimeout,
		MaxPoolSize:    maxPoolSize,
	}
}

func (e *MgoEngine) getURL() string {
	return fmt.Sprintf("mongodb://%s:%s?connect=direct", e.Host, e.Port)
}

func (e *MgoEngine) getDB() (*mgo.Session, *mgo.Database) {
	session := e.conn.Clone()
	return session, session.DB(e.Dbname)
}

// Do 执行动作
func (e *MgoEngine) Do(fn func(db *mgo.Database) error) error {
	session, db := e.getDB()
	defer session.Close()

	return fn(db)
}

// Init 初始化引擎
func (e *MgoEngine) Init() error {
	session, err := mgo.DialWithTimeout(e.getURL(), e.ConnectTimeout*time.Second)
	if err != nil {
		return err
	}
	session.SetMode(mgo.Monotonic, true)
	session.SetPoolLimit(e.MaxPoolSize)
	session.SetPoolTimeout(e.PoolTimeout * time.Second)
	e.conn = session
	return nil
}
