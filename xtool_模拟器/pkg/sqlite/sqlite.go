package sqlite

import (
	"database/sql"
	"fmt"
	"io"
	"regexp"
	"strings"
	"xtool/pkg/reg"

	"github.com/chzyer/readline"
	sqlite3 "github.com/mattn/go-sqlite3"
	log "github.com/sirupsen/logrus"
)

func init() {
	regex := func(re string, s interface{}) (bool, error) {
		switch x := s.(type) {
		case string:
			return regexp.MatchString(re, x)
		default:
			return false, nil
		}
	}
	sql.Register("sqlite3_with_go_func",
		&sqlite3.SQLiteDriver{
			ConnectHook: func(conn *sqlite3.SQLiteConn) error {
				return conn.RegisterFunc("REGEXP", regex, false)
			},
		})

	reg.Regist("sqlite", "sqlite", Sqlite, "打开sqlite3数据库", `sqlite <dbFile>`, []*reg.Param{
		&reg.Param{Name: "dbFile", Type: "string", Necessity: true, Desc: "sqlite数据文件名"},
	})
}

// filterInput 过滤特定输入
func filterInput(r rune) (rune, bool) {
	switch r {
	// block CtrlZ feature
	case readline.CharCtrlZ:
		return r, false
	}
	return r, true
}

// Sqlite 加载sqlite数据库文件
func Sqlite(dbFile string) {
	db, err := sql.Open("sqlite3_with_go_func", dbFile)
	if err != nil {
		log.Errorf("open db '%s' error: %s", dbFile, err.Error())
		return
	}
	defer db.Close()

	r, err := readline.NewEx(&readline.Config{
		Prompt:          "\033[35msqlite> \033[0m ",
		HistoryFile:     "/tmp/sqlite.tmp",
		AutoComplete:    reg.GetCompleter(),
		InterruptPrompt: "^C",
		EOFPrompt:       "exit",

		HistorySearchFold:   true,
		FuncFilterInputRune: filterInput,
	})
	if err != nil {
		panic(err)
	}
	defer r.Close()

	for {
		line, err := r.Readline()
		if err == readline.ErrInterrupt {
			if len(line) == 0 {
				break
			} else {
				continue
			}
		} else if err == io.EOF {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		rows, err := db.Query(line)
		if err != nil {
			log.Errorf("db.Query error: %s", err.Error())
			continue
		}

		cols, err := rows.Columns()
		if err != nil {
			log.Errorf("rows.Columns error: %s", err.Error())
			continue
		}
		fmt.Println(cols)
		vs := make([]interface{}, 0, len(cols))
		for i := 0; i < len(cols); i++ {
			var v string
			vs = append(vs, &v)
		}
		for rows.Next() {
			err = rows.Scan(vs...)
			if err != nil {
				log.Errorf("rows.Scan error: %s", err.Error())
				continue
			}
			rvs := make([]string, 0, len(cols))
			for _, v := range vs {
				rvs = append(rvs, *v.(*string))
			}
			fmt.Println(rvs)
		}

	}
}
