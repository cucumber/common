package cucumberexpressions

type Group struct {
	value    string
	start    int
	end      int
	children []*Group
}

func NewGroup(value string, start, end int, children []*Group) *Group {
	return &Group{
		value:    value,
		start:    start,
		end:      end,
		children: children,
	}
}

func (g *Group) Value() string {
	return g.value
}

func (g *Group) Start() int {
	return g.start
}

func (g *Group) End() int {
	return g.end
}

func (g *Group) Children() []*Group {
	return g.children
}

func (g *Group) Values() []string {
	if len(g.children) == 0 {
		return []string{g.value}
	}
	result := make([]string, len(g.children))
	for i, child := range g.children {
	  result[i] = child.Value()
	}
	return result
}
