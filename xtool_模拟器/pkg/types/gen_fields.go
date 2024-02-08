package types

// GetName 获取字段name的值，若出现异常则返回对应的error
func (r *Resource) GetName() (string, error) {

	return r.Attributes.GetString("name")

}

// MustName 获取字段name的值，若出现异常则返回默认值或空值
func (r *Resource) MustName() string {
	v, _ := r.GetName()
	return v
}

// GetCiType 获取字段ci_type的值，若出现异常则返回对应的error
func (r *Resource) GetCiType() (string, error) {

	return r.Attributes.GetString("ci_type")

}

// MustCiType 获取字段ci_type的值，若出现异常则返回默认值或空值
func (r *Resource) MustCiType() string {
	v, _ := r.GetCiType()
	return v
}

// GetSpotType 获取字段spot_type的值，若出现异常则返回对应的error
func (r *Resource) GetSpotType() (string, error) {

	return r.Attributes.GetString("spot_type")

}

// MustSpotType 获取字段spot_type的值，若出现异常则返回默认值或空值
func (r *Resource) MustSpotType() string {
	v, _ := r.GetSpotType()
	return v
}

// GetID 获取字段id的值，若出现异常则返回对应的error
func (r *Resource) GetID() (string, error) {

	return r.Attributes.GetString("id")

}

// MustID 获取字段id的值，若出现异常则返回默认值或空值
func (r *Resource) MustID() string {
	v, _ := r.GetID()
	return v
}

// GetDeviceType 获取字段device_type的值，若出现异常则返回对应的error
func (r *Resource) GetDeviceType() (string, error) {

	return r.Attributes.GetString("device_type")

}

// MustDeviceType 获取字段device_type的值，若出现异常则返回默认值或空值
func (r *Resource) MustDeviceType() string {
	v, _ := r.GetDeviceType()
	return v
}

// GetParentID 获取字段parent_id的值，若出现异常则返回对应的error
func (r *Resource) GetParentID() (string, error) {

	return r.Attributes.GetString("parent_id")

}

// MustParentID 获取字段parent_id的值，若出现异常则返回默认值或空值
func (r *Resource) MustParentID() string {
	v, _ := r.GetParentID()
	return v
}

// GetLocation 获取字段location的值，若出现异常则返回对应的error
func (r *Resource) GetLocation() (string, error) {

	return r.Attributes.GetString("location")

}

// MustLocation 获取字段location的值，若出现异常则返回默认值或空值
func (r *Resource) MustLocation() string {
	v, _ := r.GetLocation()
	return v
}

// GetEventRules 获取字段event_rules的值，若出现异常则返回对应的error
func (r *Resource) GetEventRules() ([]string, error) {

	return r.Attributes.GetStringSlice("event_rules")

}

// MustEventRules 获取字段event_rules的值，若出现异常则返回默认值或空值
func (r *Resource) MustEventRules() []string {
	v, _ := r.GetEventRules()
	return v
}

// GetBoardOptions 获取字段board_options的值，若出现异常则返回对应的error
func (r *Resource) GetBoardOptions() ([]string, error) {

	return r.Attributes.GetStringSlice("board_options")

}

// MustBoardOptions 获取字段board_options的值，若出现异常则返回默认值或空值
func (r *Resource) MustBoardOptions() []string {
	v, _ := r.GetBoardOptions()
	return v
}

// GetBoardIDs 获取字段board_id的值，若出现异常则返回对应的error
func (r *Resource) GetBoardIDs() ([]string, error) {

	return r.Attributes.GetStringSlice("board_id")

}

// MustBoardIDs 获取字段board_id的值，若出现异常则返回默认值或空值
func (r *Resource) MustBoardIDs() []string {
	v, _ := r.GetBoardIDs()
	return v
}

// GetBoardTemplates 获取字段board_template的值，若出现异常则返回对应的error
func (r *Resource) GetBoardTemplates() ([]string, error) {

	return r.Attributes.GetStringSlice("board_template")

}

// MustBoardTemplates 获取字段board_template的值，若出现异常则返回默认值或空值
func (r *Resource) MustBoardTemplates() []string {
	v, _ := r.GetBoardTemplates()
	return v
}

// GetPrecision 获取字段precision的值，若出现异常则返回对应的error
func (r *Resource) GetPrecision() (int64, error) {

	return r.Attributes.GetInt64("precision")

}

// MustPrecision 获取字段precision的值，若出现异常则返回默认值或空值
func (r *Resource) MustPrecision() int64 {
	v, _ := r.GetPrecision()
	return v
}

// GetOrderNum 获取字段order_num的值，若出现异常则返回对应的error
func (r *Resource) GetOrderNum() (int64, error) {

	return r.Attributes.GetInt64("order_num")

}

// MustOrderNum 获取字段order_num的值，若出现异常则返回默认值或空值
func (r *Resource) MustOrderNum() int64 {
	v, _ := r.GetOrderNum()
	return v
}

// GetAccess 获取字段access的值，若出现异常则返回对应的error
func (r *Resource) GetAccess() (string, error) {

	return r.Attributes.GetString("access")

}

// MustAccess 获取字段access的值，若出现异常则返回默认值或空值
func (r *Resource) MustAccess() string {
	v, _ := r.GetAccess()
	return v
}

// GetPower 获取字段power的值，若出现异常则返回对应的error
func (r *Resource) GetPower() (float64, error) {

	return r.Attributes.GetFloat64("power")

}

// MustPower 获取字段power的值，若出现异常则返回默认值或空值
func (r *Resource) MustPower() float64 {
	v, _ := r.GetPower()
	return v
}

// GetSpaceType 获取字段space_type的值，若出现异常则返回对应的error
func (r *Resource) GetSpaceType() (string, error) {

	return r.Attributes.GetString("space_type")

}

// MustSpaceType 获取字段space_type的值，若出现异常则返回默认值或空值
func (r *Resource) MustSpaceType() string {
	v, _ := r.GetSpaceType()
	return v
}

// GetMapper 获取字段mapper的值，若出现异常则返回对应的error
func (r *Resource) GetMapper() (string, error) {

	return r.Attributes.GetString("mapper")

}

// MustMapper 获取字段mapper的值，若出现异常则返回默认值或空值
func (r *Resource) MustMapper() string {
	v, _ := r.GetMapper()
	return v
}

// GetFilter 获取字段filter的值，若出现异常则返回对应的error
func (r *Resource) GetFilter() (string, error) {

	return r.Attributes.GetString("filter")

}

// MustFilter 获取字段filter的值，若出现异常则返回默认值或空值
func (r *Resource) MustFilter() string {
	v, _ := r.GetFilter()
	return v
}

// GetPath 获取字段path的值，若出现异常则返回对应的error
func (r *Resource) GetPath() (string, error) {

	return r.Attributes.GetString("path")

}

// MustPath 获取字段path的值，若出现异常则返回默认值或空值
func (r *Resource) MustPath() string {
	v, _ := r.GetPath()
	return v
}

// GetTransfer 获取字段transfer的值，若出现异常则返回对应的error
func (r *Resource) GetTransfer() (string, error) {

	return r.Attributes.GetString("transfer")

}

// MustTransfer 获取字段transfer的值，若出现异常则返回默认值或空值
func (r *Resource) MustTransfer() string {
	v, _ := r.GetTransfer()
	return v
}

// GetValueSource 获取字段value_source的值，若出现异常则返回对应的error
func (r *Resource) GetValueSource() (int64, error) {

	return r.Attributes.GetInt64("value_source")

}

// MustValueSource 获取字段value_source的值，若出现异常则返回默认值或空值
func (r *Resource) MustValueSource() int64 {
	v, _ := r.GetValueSource()
	return v
}

// GetConverter 获取字段converter的值，若出现异常则返回对应的error
func (r *Resource) GetConverter() (string, error) {

	return r.Attributes.GetString("converter")

}

// MustConverter 获取字段converter的值，若出现异常则返回默认值或空值
func (r *Resource) MustConverter() string {
	v, _ := r.GetConverter()
	return v
}

// GetCompressor 获取字段compressor的值，若出现异常则返回对应的error
func (r *Resource) GetCompressor() (string, error) {

	return r.Attributes.GetString("compressor")

}

// MustCompressor 获取字段compressor的值，若出现异常则返回默认值或空值
func (r *Resource) MustCompressor() string {
	v, _ := r.GetCompressor()
	return v
}

// GetUnit 获取字段unit的值，若出现异常则返回对应的error
func (r *Resource) GetUnit() (string, error) {

	return r.Attributes.GetString("unit")

}

// MustUnit 获取字段unit的值，若出现异常则返回默认值或空值
func (r *Resource) MustUnit() string {
	v, _ := r.GetUnit()
	return v
}

// GetGUID 获取字段unit的值，若出现异常则返回对应的error
func (r *Resource) GetGUID() (string, error) {

	return r.Attributes.GetString("guid")

}

// MustGUID 获取字段unit的值，若出现异常则返回默认值或空值
func (r *Resource) MustGUID() string {
	v, _ := r.GetGUID()
	return v
}

// GetAddr 获取字段unit的值，若出现异常则返回对应的error
func (r *Resource) GetAddr() (string, error) {

	return r.Attributes.GetString("addr")

}

// MustAddr 获取字段unit的值，若出现异常则返回默认值或空值
func (r *Resource) MustAddr() string {
	v, _ := r.GetAddr()
	return v
}

// GetValueType 获取字段value_type的值，若出现异常则返回对应的error
func (r *Resource) GetValueType() (string, error) {

	return r.Attributes.GetString("value_type")

}

// MustValueType 获取字段value_type的值，若出现异常则返回默认值或空值
func (r *Resource) MustValueType() string {
	v, _ := r.GetValueType()
	return v
}

// GetDefault 获取字段default的值，若出现异常则返回对应的error
func (r *Resource) GetDefault() (string, error) {

	return r.Attributes.GetString("default")

}

// MustDefault 获取字段default的值，若出现异常则返回默认值或空值
func (r *Resource) MustDefault() string {
	v, _ := r.GetDefault()
	return v
}

// GetCreateDate 获取字段create_date的值，若出现异常则返回对应的error
func (r *Resource) GetCreateDate() (int64, error) {

	return r.Attributes.GetInt64("create_date")

}

// MustCreateDate 获取字段create_date的值，若出现异常则返回默认值或空值
func (r *Resource) MustCreateDate() int64 {
	v, _ := r.GetCreateDate()
	return v
}

// GetHasAdd 获取字段hasAdd的值，若出现异常则返回对应的error
func (r *Resource) GetHasAdd() (bool, error) {

	return r.Attributes.GetBool("hasAdd")

}

// MustHasAdd 获取字段hasAdd的值，若出现异常则返回默认值或空值
func (r *Resource) MustHasAdd() bool {
	v, _ := r.GetHasAdd()
	return v
}

// GetDemoFields 获取字段demo_field的值，若出现异常则返回对应的error
func (r *Resource) GetDemoFields() ([]int64, error) {

	return r.Attributes.GetInt64Slice("demo_field")

}

// MustDemoFields 获取字段demo_field的值，若出现异常则返回默认值或空值
func (r *Resource) MustDemoFields() []int64 {
	v, _ := r.GetDemoFields()
	return v
}
