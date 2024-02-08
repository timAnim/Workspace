// The ldbdump program dumps the contents of LevelDB tables (.ldb files),
// formerly known as sorted string tables (.sst files).
package main

import (
	"bytes"
	"flag"
	"fmt"
	"os"
	"strings"

	"github.com/golang/leveldb/db"
	"github.com/golang/leveldb/table"
)

var (
	verifyChecksums = flag.Bool("c", false, "Verify checksums.")
	truncate        = flag.Bool("t", false, "Truncate long keys and values.")

	kBuf, vBuf bytes.Buffer
)

func main() {
	flag.Parse()
	bad := false
	for i, arg := range flag.Args() {
		if i != 0 {
			fmt.Println()
		}
		if err := dump(arg); err != nil {
			bad = true
		}
	}
	if bad {
		os.Exit(1)
	}
}

func dump(filename string) error {
	f, err := os.Open(filename)
	if err != nil {
		return err
	}
	r := table.NewReader(f, &db.Options{
		VerifyChecksums: *verifyChecksums,
	})
	defer r.Close()

	t := r.Find(nil, nil)
	for t.Next() {
		k, v := t.Key(), t.Value()

		x := fmt.Sprintf("%q: %q", k, v)
		kvs := strings.Split(x, "\\t\\\"")
		for _, i := range kvs {
			if strings.Contains(i, "\\x00") {
				//if strings.Contains(i, "201") {
				fmt.Println("xxxxxx", escapeKey(fmt.Sprintf("%q", k)), escapeValue(fmt.Sprintf("%q", v)))
				//}

				continue
			}
			m := makePairs(i)
			//fmt.Println(i)
			for key, value := range m {
				fmt.Println("yyyyy", key, value)
			}
		}
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

	return s
}

func escapeValue(s string) string {
	return strings.Trim(strings.TrimSpace(s), "\"")
}
