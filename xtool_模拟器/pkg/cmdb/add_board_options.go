package cmdb

// AddBoardOption 获取字段demo_field的值，若出现异常则返回默认值或空值
func (r *Resource) AddBoardOption(boardID string) {
	boardOptions := r.MustBoardOptions()

	exists := false
	for _, b := range boardOptions {
		if b == boardID {
			exists = true
		}
	}
	if !exists {
		boardOptions = append(boardOptions, boardID)
		r.Attributes["board_options"] = boardOptions
	}
}
