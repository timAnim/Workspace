package gonginx

//Directive represents any nginx directive
type Directive struct {
	Block      IBlock
	Name       string
	Parameters []string //TODO: Save parameters with their type
}

//GetName get directive name
func (d *Directive) GetName() string {
	return d.Name
}

//GetParameters get all parameters of a directive
func (d *Directive) GetParameters() []string {
	return d.Parameters
}

//GetBlock get block if it has
func (d *Directive) GetBlock() IBlock {
	return d.Block
}
