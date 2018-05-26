package gherkin_test

import (
	"fmt"
	"strings"
	"testing"
	"github.com/cucumber/cucumber/gherkin/go"
)

func Test_line_indentation(t *testing.T) {
	td := []struct {
		fmt.Stringer
		expected string
		desc string
	}{
		{background("Background"), "  Background", "background line should have 2 spaces of indent"},
		{feature("Feature", "Example token used multiple times"), "Feature", "feature line should not be indented"},
		{description("Hello world"), "  Hello world", "1 line description should have 2 spaces of indent"},
		{description("Hello\nworld"), "  Hello\n  world", "multi-line description should have 2 spaces of indent on each line"},
		{description(" Hello\n world"), "  Hello\n  world", "multi-line description with existing indent should have 2 spaces of indent on each line"},
		{example("Examples"), "  Examples", "examples line should have 2 spaces of indent"},
		{scenario("Scenario"), "  Scenario", "scenario line should have 2 spaces of indent"},
		{scenarioOutline("Scenario Outline"), "  Scenario Outline", "scenario outline line should have 2 spaces of indent"},
		{step("Given ", "the minimalism inside a background"), "    Given", "step should have 4 spaces indent"},
		{tableRow("hello", "world"), "      | hello | world |", "table row should have 6 spaces indent"},
	}

	for _, tt := range td {
		t.Run(tt.desc, func(t *testing.T) {
			actual := tt.String()
			if !strings.HasPrefix(actual, tt.expected) {
				pos := len(tt.expected)
				t.Errorf("got prefix='%s', want '%v'", truncate(actual, pos), tt.expected)
			}
		})
	}
}

func background(keyword string) *gherkin.Background {
	b := &gherkin.Background{}
	b.Keyword = keyword
	b.Type = "Background"
	return b
}

func description(desc string) gherkin.Description {
	return gherkin.Description(desc)
}

func feature(keyword, name string) *gherkin.Feature {
	f := &gherkin.Feature{
		Keyword: keyword,
		Name: name,
	}
	f.Type = "Feature"
	return f
}

func example(keyword string) *gherkin.Examples {
	e := &gherkin.Examples{
		Keyword: keyword,
	}
	e.Type = "Examples"

	return e
}

func scenario(keyword string) *gherkin.Scenario {
	s := &gherkin.Scenario{}
	s.Keyword = keyword
	s.Type = "Scenario"
	return s
}

func scenarioOutline(keyword string) *gherkin.ScenarioOutline {
	so := &gherkin.ScenarioOutline {

	}
	so.Keyword = keyword
	so.Type = "Scenario Outline"
	return so
}

func step(keyword, text string) *gherkin.Step{
	s := &gherkin.Step{
		Keyword: keyword,
		Text: text,
	}
	s.Type = "Step"

	return s
}

func tableCell(v string) *gherkin.TableCell {
	td := &gherkin.TableCell{
		Value: v,
	}
	td.Type = "TableCell"
	return td
}

func tableRow(vals ...string) *gherkin.TableRow {
	r := &gherkin.TableRow{}
	r.Type = "TableRow"
	for _, v := range vals {
		r.Cells = append(r.Cells, tableCell(v))
	}

	return r
}

func truncate(s string, pos int) string {
	l := len(s)
	if pos > l {
		pos = l
	}

	return s[:pos]
}

