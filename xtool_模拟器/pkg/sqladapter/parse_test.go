package sqladapter

import (
	"fmt"
	"testing"
)

func TestParseWhere(t *testing.T) {
	sqls := []string{
		"SELECT * FROM cmdb",
		"SELECT * FROM `cmdb`",
		"SELECT resource_id, ci_type FROM `cmdb`",
		"SELECT * FROM `cmdb` WHERE ci_type = '2' AND location like 'project_root%'",
		"SELECT * FROM `cmdb` WHERE event_type = 2 AND location like 'project_root%'",
		"SELECT * FROM `cmdb` WHERE event_level in (2, 3, 4) AND location like 'project_root%'",
		"SELECT * FROM `cmdb` WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root'",
		"SELECT ci_type, device_type FROM `cmdb` WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root'",
		"SELECT ci_type, device_type FROM `cmdb` WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root'",
		"SELECT ci_type, device_type FROM cmdb WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc",
		"SELECT ci_type, device_type FROM cmdb WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc limit 50",
		"SELECT ci_type, device_type FROM cmdb WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc limit 1, 50",
		"SELECT ci_type, device_type FROM cmdb WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc limit 2, 50",
		"SELECT ci_type, device_type FROM cmdb WHERE ci_type in ('2', '3', '5') AND location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc limit 40, 50",
		"SELECT count(*) WHERE location like 'project_root%' or resource_id = 'project_root' order by resource_id asc, ci_type desc limit 40, 50",
		"UPDATE cmdb SET name = 'test', location = 'project_root' WHERE resource_id = '0_101'",
		"DELETE FROM cmdb WHERE resource_id = '0_101'",
		"DELETE FROM cmdb",
	}
	for _, sql := range sqls {
		op, err := ParseSQL(sql)
		if err != nil {
			t.Error(err)
		}
		if op == nil {
			continue
		}
		fmt.Println(sql)
		fmt.Println(op.String())
		fmt.Println()
	}
}
