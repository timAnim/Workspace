package utils

import "math"

// ToAlphaString provides a function to convert integer to Excel sheet column
// title. For example convert 36 to column title AK:
//
//     utils.ToAlphaString(36)
//
func ToAlphaString(value int) string {
	if value < 0 {
		return ""
	}
	var ans string
	i := value + 1
	for i > 0 {
		ans = string([]byte{byte((i-1)%26 + 65)}) + ans
		i = (i - 1) / 26
	}
	return ans
}

// TitleToNumber provides a function to convert Excel sheet column title to
// int (this function doesn't do value check currently). For example convert
// AK and ak to column title 36:
//
//    utils.TitleToNumber("AK")
//    utils.TitleToNumber("ak")
//
func TitleToNumber(s string) int {
	weight := 0.0
	sum := 0
	for i := len(s) - 1; i >= 0; i-- {
		ch := int(s[i])
		if int(s[i]) >= int('a') && int(s[i]) <= int('z') {
			ch = int(s[i]) - 32
		}
		sum = sum + (ch-int('A')+1)*int(math.Pow(26, weight))
		weight++
	}
	return sum - 1
}
