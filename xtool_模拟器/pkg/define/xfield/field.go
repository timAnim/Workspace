package xfield

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"xtool/pkg/reg"

	log "github.com/sirupsen/logrus"
)

func init() {
	initFieldMap()
	reg.Regist("fields", "field_info", FieldInfo, "字段信息", `field <name>`, []*reg.Param{
		&reg.Param{Name: "name", Type: "string", Necessity: false, Desc: "字段名"},
	})
	reg.Regist("fields", "field_add", FieldAdd, "添加字段支持", `field_add <fieldName> <fieldType> <realType> <desc>`, []*reg.Param{
		&reg.Param{Name: "fieldName", Type: "string", Necessity: true, Desc: "字段名"},
		&reg.Param{Name: "fieldType", Type: "string", Necessity: false, Desc: "字段类型，默认string"},
		&reg.Param{Name: "realType", Type: "string", Necessity: false, Desc: "真实类型，默认string"},
		&reg.Param{Name: "desc", Type: "string", Necessity: false, Desc: "字段描述"},
	})
}

var (
	fieldMap map[string]*Field
)

// Field 字段结构定义
type Field struct {
	Name      string
	Type      string
	RealType  string // 实际类型，如ci_type的类型是数字, 但存入数据库的是字符串数字
	Adaptable bool   // 是否可修改
	Desc      string
	Chioces   []*Choice
}

// Choice 可选项
type Choice struct {
	Value string
	Desc  string
}

// CheckField 字段检测，检测字段合法性，并返回字段值
func CheckField(name string, value string) (interface{}, error) {
	if f, ok := fieldMap[name]; ok {
		if f.Adaptable == false {
			return nil, fmt.Errorf("field %s is not adaptable", name)
		}
		switch f.Type {
		case "int":
			v, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				return nil, err
			}
			switch f.RealType {
			case "int":
				return v, nil
			case "string":
				return value, nil
			}
		case "string":
			return value, nil
		case "list":
			v := []interface{}{}
			if err := json.Unmarshal([]byte(value), &v); err != nil {
				return strings.Split(value, ","), nil
			}
			return v, nil
		case "bool":
			v, err := strconv.ParseBool(value)
			if err != nil {
				return nil, err
			}
			return v, nil
		case "object":
			v := map[string]interface{}{}
			err := json.Unmarshal([]byte(value), &v)
			return v, err

		default:
		}
	}
	return nil, fmt.Errorf("field %s not support", name)
}

// FieldInfo 显示字段信息
func FieldInfo(name string) {
	if name == "" {
		for k, v := range fieldMap {
			e := "不可修改"
			if v.Adaptable {
				e = "可修改"
			}
			fmt.Printf("%-20s\t%-10s\t%-10s\t%s\n", "<"+k+">", v.Type, e, v.Desc)
		}
		return
	}
	if f, ok := fieldMap[name]; ok {
		fmt.Printf("字段名: %s\n", f.Name)
		fmt.Printf("字段类型: %s\n", f.Type)
		fmt.Printf("实际类型: %s\n", f.RealType)
		fmt.Printf("可否修改: %v\n", f.Adaptable)
		fmt.Printf("字段描述: %s\n", f.Desc)
		if f.Chioces != nil {
			fmt.Println("选项:")
			for _, c := range f.Chioces {
				fmt.Printf("    %s: %s\n", c.Value, c.Desc)
			}
		}
	}
}

var typeMap = map[string]bool{
	"int":    true,
	"float":  true,
	"string": true,
	"object": true,
	"list":   true,
}

// FieldAdd 添加字段支持
func FieldAdd(fieldName string, fieldType string, realType string, desc string) {
	m, err := regexp.MatchString("^[a-zA-Z_][a-zA-Z_0-9]*$", fieldName)
	if err != nil {
		log.Errorf("field check error: %s", err.Error())
		return
	}

	if !m {
		log.Errorf("field check error: illegal identifier '%s'", fieldName)
		return
	}

	if _, ok := fieldMap[fieldName]; ok {
		log.Errorf("field '%s' is already supported", fieldName)
		FieldInfo(fieldName)
		return
	}

	if _, ok := typeMap[fieldType]; !ok {
		fieldType = "string"
	}

	if _, ok := typeMap[realType]; !ok {
		realType = "string"
	}
	if desc == "" {
		desc = "新增支持字段"
	}

	fieldMap[fieldName] = &Field{
		Name:      fieldName,
		Type:      fieldType,
		RealType:  realType,
		Adaptable: true,
		Desc:      desc,
	}
}

func initFieldMap() {
	fieldMap = make(map[string]*Field)

	fieldMap["resource_id"] = &Field{
		Name:      "resource_id",
		Type:      "string",
		RealType:  "string",
		Adaptable: false,
		Desc:      "节点ID",
	}
	fieldMap["parent_id"] = &Field{
		Name:      "parent_id",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "父节点ID",
	}
	fieldMap["ci_type"] = &Field{
		Name:      "ci_type",
		Type:      "int",
		RealType:  "string",
		Adaptable: false,
		Desc:      "节点类型",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "工程根节点"},
			&Choice{Value: "2", Desc: "设备"},
			&Choice{Value: "3", Desc: "测点"},
			&Choice{Value: "4", Desc: "CEP告警点"},
			&Choice{Value: "5", Desc: "空间"},
			&Choice{Value: "6", Desc: "组态页面"},
			&Choice{Value: "7", Desc: "连接或板卡节点"},
			&Choice{Value: "8", Desc: "模板页面"},
			&Choice{Value: "9", Desc: "图片"},
		},
	}
	fieldMap["location"] = &Field{
		Name:      "location",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "节点位置",
	}

	fieldMap["name"] = &Field{
		Name:      "name",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "节点名称",
	}
	fieldMap["board_type"] = &Field{
		Name:      "board_type",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "板卡类型",
	}
	fieldMap["device_type"] = &Field{
		Name:      "device_type",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "设备类型, 将空间定义为设备的一种，用于统一模板",
	}
	fieldMap["vendor_info"] = &Field{
		Name:      "vendor_info",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "依赖信息",
	}
	fieldMap["board_options"] = &Field{
		Name:      "board_options",
		Type:      "list",
		RealType:  "list",
		Adaptable: true,
		Desc:      "采集板卡列表",
	}
	fieldMap["space_type"] = &Field{
		Name:      "space_type",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "空间类型",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "区域"},
			&Choice{Value: "2", Desc: "园区"},
			&Choice{Value: "3", Desc: "楼宇"},
			&Choice{Value: "4", Desc: "楼层"},
			&Choice{Value: "5", Desc: "房间"},
			&Choice{Value: "6", Desc: "机柜列"},
			&Choice{Value: "7", Desc: "机柜位"},
		},
	}
	fieldMap["purpose"] = &Field{
		Name:      "purpose",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "房间用途",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "IT机房"},
			&Choice{Value: "1", Desc: "库房"},
			&Choice{Value: "2", Desc: "其他功能机房"},
		},
	}
	fieldMap["position_types"] = &Field{
		Name:      "position_types",
		Type:      "list",
		RealType:  "list",
		Adaptable: true,
		Desc:      "可上架位置，表示节点能够放在什么样空间类型的节点下，为可选空间类型的列表",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "区域"},
			&Choice{Value: "2", Desc: "园区"},
			&Choice{Value: "3", Desc: "楼宇"},
			&Choice{Value: "4", Desc: "楼层"},
			&Choice{Value: "5", Desc: "房间"},
			&Choice{Value: "6", Desc: "机柜列"},
			&Choice{Value: "7", Desc: "机柜位"},
			&Choice{Value: "8", Desc: "托盘"},
			&Choice{Value: "9", Desc: "刀箱"},
		},
	}
	fieldMap["value_source"] = &Field{
		Name:      "value_source",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "测点绑定类型",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "连接"},
			&Choice{Value: "1", Desc: "空间"},
			&Choice{Value: "2", Desc: "策略"},
		},
	}
	fieldMap["data_source"] = &Field{
		Name:      "data_source",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "数据来源",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "采集"},
			&Choice{Value: "1", Desc: "输入"},
			&Choice{Value: "2", Desc: "计算"},
		},
	}
	fieldMap["value_type"] = &Field{
		Name:      "value_type",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "值类型",
		Chioces: []*Choice{
			&Choice{Value: "int", Desc: "整型"},
			&Choice{Value: "float", Desc: "浮点型"},
			&Choice{Value: "string", Desc: "字符串"},
		},
	}
	fieldMap["spot_type"] = &Field{
		Name:      "spot_type",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "测点类型",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "模拟量点"},
			&Choice{Value: "2", Desc: "状态量点"},
			&Choice{Value: "3", Desc: "控制点"},
		},
	}
	fieldMap["is_subsystem"] = &Field{
		Name:      "is_subsystem",
		Type:      "int",
		RealType:  "int",
		Adaptable: true,
		Desc:      "板卡节点是否子系统, 留空默认0",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "否"},
			&Choice{Value: "1", Desc: "是"},
		},
	}
	fieldMap["is_collect"] = &Field{
		Name:      "is_collect",
		Type:      "int",
		RealType:  "int",
		Adaptable: true,
		Desc:      "是否启动采集",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "启动"},
			&Choice{Value: "1", Desc: "停止"},
		},
	}
	fieldMap["subsystem_type"] = &Field{
		Name:      "subsystem_type",
		Type:      "int",
		RealType:  "int",
		Adaptable: true,
		Desc:      "子系统类型",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "常规板卡"},
			&Choice{Value: "1", Desc: "V6子系统"},
			&Choice{Value: "2", Desc: "AU/GU/KE子系统"},
		},
	}
	fieldMap["import_type"] = &Field{
		Name:      "import_type",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "导入类型",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "常规设备"},
			&Choice{Value: "1", Desc: "V6导入"},
			&Choice{Value: "2", Desc: "AU/GU/KE导入"},
		},
	}
	fieldMap["access"] = &Field{
		Name:      "access",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "读写权限",
		Chioces: []*Choice{
			&Choice{Value: "r", Desc: "只读"},
			&Choice{Value: "w", Desc: "只写"},
			&Choice{Value: "rw", Desc: "读写"},
		},
	}
	fieldMap["is_common"] = &Field{
		Name:      "is_common",
		Type:      "int",
		RealType:  "int",
		Adaptable: true,
		Desc:      "是否通用设备",
		Chioces: []*Choice{
			&Choice{Value: "0", Desc: "是"},
			&Choice{Value: "1", Desc: "否"},
		},
	}
	fieldMap["status"] = &Field{
		Name:      "status",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "机房状态, 实际此字段值不应该存在CMDB中; 设备节点资产状态",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "可用"},
			&Choice{Value: "2", Desc: "已用"},
			&Choice{Value: "3", Desc: "预占"},
			&Choice{Value: "4", Desc: "禁用"},
		},
	}
	fieldMap["alias"] = &Field{
		Name:      "alias",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "别名",
	}
	fieldMap["board_id"] = &Field{
		Name:      "board_id",
		Type:      "list",
		RealType:  "list",
		Adaptable: true,
		Desc:      "板卡ID列表, 与board_options意义有点重复",
	}
	fieldMap["board_template"] = &Field{
		Name:      "board_template",
		Type:      "list",
		RealType:  "list",
		Adaptable: true,
		Desc:      "板卡类型列表",
	}
	fieldMap["device_info"] = &Field{
		Name:      "device_info",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "设备分类信息,前三级, 一级分类.二级分类.三级分类",
	}
	fieldMap["description"] = &Field{
		Name:      "description",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "描述",
	}
	fieldMap["default"] = &Field{
		Name:      "default",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "测点默认值",
	}
	fieldMap["precision"] = &Field{
		Name:      "precision",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "测点精度(小数位数)",
	}
	fieldMap["mapper"] = &Field{
		Name:      "mapper",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "状态点映射规则，格式为 0=正常,1=异常",
	}
	fieldMap["unit"] = &Field{
		Name:      "unit",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "单位",
	}
	fieldMap["event_rules"] = &Field{
		Name:      "event_rules",
		Type:      "list",
		RealType:  "list",
		Adaptable: true,
		Desc:      "事件规则",
	}
	fieldMap["filter"] = &Field{
		Name:      "filter",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "过滤规则",
	}
	fieldMap["codecex"] = &Field{
		Name:      "filter",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "自定义编码",
	}
	fieldMap["group"] = &Field{
		Name:      "group",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "测点分组",
	}
	fieldMap["guid"] = &Field{
		Name:      "guid",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "子系统标识",
	}
	fieldMap["transfer"] = &Field{
		Name:      "transfer",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "连接参数",
	}
	fieldMap["compressor"] = &Field{
		Name:      "compressor",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "压缩器",
	}
	fieldMap["converter"] = &Field{
		Name:      "converter",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "转换器",
	}
	fieldMap["hasAdd"] = &Field{
		Name:      "compressor",
		Type:      "bool",
		RealType:  "bool",
		Adaptable: true,
		Desc:      "导入标记",
	}
	fieldMap["ref_device"] = &Field{
		Name:      "ref_device",
		Type:      "string",
		RealType:  "string",
		Adaptable: true,
		Desc:      "组态模板",
	}
	fieldMap["active_status"] = &Field{
		Name:      "active_status",
		Type:      "int",
		RealType:  "string",
		Adaptable: true,
		Desc:      "激活状态",
		Chioces: []*Choice{
			&Choice{Value: "1", Desc: "可用"},
			&Choice{Value: "2", Desc: "已用"},
			&Choice{Value: "3", Desc: "预占"},
			&Choice{Value: "4", Desc: "禁用"},
		},
	}

	fieldMap["owner"] = &Field{
		Name:      "owner",
		Type:      "object",
		RealType:  "object",
		Adaptable: true,
		Desc:      "所属",
	}

	fieldMap["department"] = &Field{
		Name:      "department",
		Type:      "object",
		RealType:  "object",
		Adaptable: true,
		Desc:      "部门",
	}

	fieldMap["template_page"] = &Field{
		Name:      "template_page",
		Type:      "object",
		RealType:  "object",
		Adaptable: true,
		Desc:      "设备模板展示，object中包含equipType与templateType字段，目前equipType没用，templateType由'_'分隔的数字表示，分别表示在设施监控页面需要展示什么样的页面，对应位为1表示展示，为0不展示，位数为6，分别表示 运行原理图/概要信息/参数状态/告警记录/资产信息/设备控制",
	}
}
