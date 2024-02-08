package define

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
)

// 定义字段断言相关错误
var (
	ErrEmptyAttributes          = errors.New("attributes is null")
	ErrFieldTypeError           = errors.New("field type error")
	ErrFieldConvertToIntError   = errors.New("string field convert to int64 error")
	ErrFieldConvertToFloatError = errors.New("string field convert to float64 error")
	ErrFieldConvertToBoolError  = errors.New("string field convert to bool error")
	ErrFieldNotExists           = errors.New("field not exists")
)

// M 定义字典
type M map[string]interface{}

// Update 字段更新
func (m M) Update(newM M) {
	for k, v := range newM {
		m[k] = v
	}
}

// String 转成字符串
func (m M) String() string {
	b, _ := json.Marshal(m)
	return string(b)
}

// StrictString 转成字符串，带error
func (m M) StrictString() (string, error) {
	b, err := json.Marshal(m)
	return string(b), err
}

// FromString 从字符串转换
func (m M) FromString(in string) {
	json.Unmarshal([]byte(in), &m)
}

// GetString 从m中按string获取字段值
func (m M) GetString(field string) (string, error) {
	if len(m) == 0 {
		return "", ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case string:
			return x, nil
		default:
			return fmt.Sprintf("%v", x), nil
		}
	}

	return "", ErrFieldNotExists
}

// MustString 从m中按string获取字段值
func (m M) MustString(field string) string {
	v, _ := m.GetString(field)
	return v
}

// GetInt64 从m中按int64获取字段值
func (m M) GetInt64(field string) (int64, error) {
	if len(m) == 0 {
		return 0, ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case int:
			return int64(x), nil
		case int8:
			return int64(x), nil
		case int16:
			return int64(x), nil
		case int32:
			return int64(x), nil
		case int64:
			return x, nil
		case uint:
			return int64(x), nil
		case uint8:
			return int64(x), nil
		case uint16:
			return int64(x), nil
		case uint32:
			return int64(x), nil
		case uint64:
			return int64(x), nil
		case float32:
			return int64(x), nil
		case float64:
			return int64(x), nil
		case string:
			i, err := strconv.ParseInt(x, 10, 64)
			if err != nil {
				return 0, ErrFieldConvertToIntError
			}
			return i, nil
		default:
			return 0, ErrFieldTypeError
		}
	}

	return 0, ErrFieldNotExists
}

// MustInt64 从m中按int64获取字段值
func (m M) MustInt64(field string) int64 {
	v, _ := m.GetInt64(field)
	return v
}

// GetFloat64 从m中按float64获取字段的值，若出现异常则返回对应的error
func (m M) GetFloat64(field string) (float64, error) {
	if len(m) == 0 {
		return 0.0, ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case int:
			return float64(x), nil
		case int8:
			return float64(x), nil
		case int16:
			return float64(x), nil
		case int32:
			return float64(x), nil
		case int64:
			return float64(x), nil
		case uint:
			return float64(x), nil
		case uint8:
			return float64(x), nil
		case uint16:
			return float64(x), nil
		case uint32:
			return float64(x), nil
		case uint64:
			return float64(x), nil
		case float32:
			return float64(x), nil
		case float64:
			return x, nil
		case string:
			f, err := strconv.ParseFloat(x, 64)
			if err != nil {
				return 0.0, ErrFieldConvertToFloatError
			}
			return f, nil
		default:
			return 0.0, ErrFieldTypeError
		}
	}

	return 0.0, ErrFieldNotExists
}

// MustFloat64 从m中按float64获取字段的值，若出现异常则返回对应的error
func (m M) MustFloat64(field string) float64 {
	v, _ := m.GetFloat64(field)
	return v
}

// GetBool 从m中按bool获取字段的值，若出现异常则返回对应的error
func (m M) GetBool(field string) (bool, error) {
	if len(m) == 0 {
		return false, ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case bool:
			return x, nil
		case string:
			b, err := strconv.ParseBool(x)
			if err != nil {
				return false, ErrFieldConvertToBoolError
			}
			return b, nil
		default:
			return false, ErrFieldTypeError
		}
	}

	return false, ErrFieldNotExists
}

// MustBool 从m中按bool获取字段的值，若出现异常则返回对应的error
func (m M) MustBool(field string) bool {
	v, _ := m.GetBool(field)
	return v
}

// GetStringSlice 按字符串切片获取字段的值，若出现异常则返回对应的error
func (m M) GetStringSlice(field string) ([]string, error) {
	if len(m) == 0 {
		return []string{}, ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case []string:
			return x, nil
		case []interface{}:
			vs := make([]string, 0, len(x))
			for _, i := range x {
				vs = append(vs, fmt.Sprintf("%v", i))
			}
			return vs, nil
		case string:
			vs := make([]string, 0, 10)
			err := json.Unmarshal([]byte(x), &vs)
			if err != nil {
				return []string{x}, nil
			}
			return vs, nil
		default:
			return []string{}, ErrFieldTypeError
		}
	}

	return []string{}, ErrFieldNotExists
}

// MustStringSlice 按字符串切片获取字段的值，若出现异常则返回对应的error
func (m M) MustStringSlice(field string) []string {
	v, _ := m.GetStringSlice(field)
	return v
}

// GetInt64Slice 按字符串切片获取字段的值，若出现异常则返回对应的error
func (m M) GetInt64Slice(field string) ([]int64, error) {
	if len(m) == 0 {
		return []int64{}, ErrEmptyAttributes
	}

	if v, ok := m[field]; ok {
		switch x := v.(type) {
		case []int64:
			return x, nil
		// TODO: 其他类型强转
		default:
			return []int64{}, ErrFieldTypeError
		}
	}

	return []int64{}, ErrFieldNotExists
}

// MustInt64Slice 按字符串切片获取字段的值，若出现异常则返回对应的error
func (m M) MustInt64Slice(field string) []int64 {
	v, _ := m.GetInt64Slice(field)
	return v
}
