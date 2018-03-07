package cucumberexpressions

type GroupBuilder struct {
	groupBuilders []*GroupBuilder
	capturing     bool
	source        string
}

func NewGroupBuilder() *GroupBuilder {
	return &GroupBuilder{
		capturing: true,
	}
}

func (g *GroupBuilder) Add(groupBuilder *GroupBuilder) {
	g.groupBuilders = append(g.groupBuilders, groupBuilder)
}

func (g *GroupBuilder) Build(submatches []*Submatch, indexIterator *IntIterator) *Group {
	submatch := submatches[indexIterator.Next()]
	children := make([]*Group, len(g.groupBuilders))
	for i, child := range g.groupBuilders {
		children[i] = child.Build(submatches, indexIterator)
	}
	return NewGroup(submatch.value, submatch.start, submatch.end, children)
}

func (g *GroupBuilder) SetNonCapturing() {
	g.capturing = false
}

func (g *GroupBuilder) Capturing() bool {
	return g.capturing
}

func (g *GroupBuilder) Children() []*GroupBuilder {
	return g.groupBuilders
}

func (g *GroupBuilder) MoveChildrenTo(groupBuilder *GroupBuilder) {
	for _, child := range g.groupBuilders {
		groupBuilder.Add(child)
	}
}

func (g *GroupBuilder) SetSource(value string) {
	g.source = value
}

func (g *GroupBuilder) Source() string {
	return g.source
}
