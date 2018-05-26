package gherkin

import (
	"strings"
	"regexp"
)

type Location struct {
	Line   int `json:"line"`
	Column int `json:"column"`
}

type Node struct {
	Location *Location `json:"location,omitempty"`
	Type     string    `json:"type"`
}

type GherkinDocument struct {
	Type     string     `json:"type"`
	Feature  *Feature   `json:"feature,omitempty"`
	Comments []*Comment `json:"comments"`
}

type Description string

var reWhitespace = regexp.MustCompile("\n *")

func (d Description) String() string {
	s := string(d)
	s = strings.Trim(s, " ")
	s = reWhitespace.ReplaceAllString(s, "\n" + TwoSpaces)
	return TwoSpaces + s
}

type Feature struct {
	Node
	Tags        []*Tag        `json:"tags"`
	Language    string        `json:"language,omitempty"`
	Keyword     string        `json:"keyword"`
	Name        string        `json:"name"`
	Description Description   `json:"description,omitempty"`
	Children    []interface{} `json:"children"`
}

func (f *Feature) String() string {
	return f.Keyword
}

type Comment struct {
	Node
	Location *Location `json:"location,omitempty"`
	Text     string    `json:"text"`
}

type Tag struct {
	Node
	Location *Location `json:"location,omitempty"`
	Name     string    `json:"name"`
}

type Background struct {
	ScenarioDefinition
}

type Scenario struct {
	ScenarioDefinition
	Tags []*Tag `json:"tags"`
}

type ScenarioOutline struct {
	ScenarioDefinition
	Tags     []*Tag      `json:"tags"`
	Examples []*Examples `json:"examples"`
}

type Examples struct {
	Node
	Tags        []*Tag      `json:"tags"`
	Keyword     string      `json:"keyword"`
	Name        string      `json:"name"`
	Description Description `json:"description,omitempty"`
	TableHeader *TableRow   `json:"tableHeader,omitempty"`
	TableBody   []*TableRow `json:"tableBody"`
}

func (e *Examples) String() string {
	return TwoSpaces + e.Keyword
}

type TableRow struct {
	Node
	Cells []*TableCell `json:"cells"`
}

func (tr *TableRow) String() string {
	b := strings.Builder{}
	b.WriteString(SixSpaces)
	b.WriteString("|")
	for _, td := range tr.Cells {
		b.WriteString(" ")
		b.WriteString(td.Value)
		b.WriteString(" |")
	}
	return b.String()
}

type TableCell struct {
	Node
	Value string `json:"value"`
}

type ScenarioDefinition struct {
	Node
	Keyword     string      `json:"keyword"`
	Name        string      `json:"name"`
	Description Description `json:"description,omitempty"`
	Steps       []*Step     `json:"steps"`
}

func (s *ScenarioDefinition) String() string {
	return TwoSpaces + s.Keyword
}

type Step struct {
	Node
	Keyword  string      `json:"keyword"`
	Text     string      `json:"text"`
	Argument interface{} `json:"argument,omitempty"`
}

func (s *Step) String() string {
	return FourSpaces + s.Keyword + s.Text
}

type DocString struct {
	Node
	ContentType string `json:"contentType,omitempty"`
	Content     string `json:"content"`
	Delimitter  string `json:"-"`
}

type DataTable struct {
	Node
	Rows []*TableRow `json:"rows"`
}

const TwoSpaces = "  "
const FourSpaces = "    "
const SixSpaces = TwoSpaces + FourSpaces
