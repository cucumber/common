package gherkin_test

import (
	"fmt"
	"strings"
	"testing"
	"github.com/cucumber/cucumber/gherkin/go"
)

func Test_ltr_line_identation(t *testing.T) {
	td := []struct {
		s fmt.Stringer
		expected string
		desc string
	}{
		{feature("Feature", "Example token used multiple times"), "Feature", "feature line should not be indented"},
		{step("Given ", "the minimalism inside a background"), "    Given", "step should have 4 space indent"},
		{example("Examples"), "  Examples", "examples line should have 2 spaces of indent"},
		{background("Background"), "  Background", "background line should have 2 spaces of indent"},
		{scenario("Scenario"), "  Scenario", "scenario line should have 2 spaces of indent"},
		{scenarioOutline("Scenario Outline"), "  Scenario Outline", "scenario outline line should have 2 spaces of indent"},
	}

	for _, tt := range td {
		t.Run(tt.desc, func(t *testing.T) {
			actual := tt.s.String()
			if !strings.HasPrefix(actual, tt.expected) {
				pos := len(tt.expected)
				if pos > len(actual) {
					pos = len(actual)
				}
				t.Errorf("got prefix='%s', want '%v'", actual[:pos], tt.expected)
			}
		})
	}
}

func Test_ltr_block_indentation(t *testing.T) {
	t.Skip("WIP")
	td := []struct {
		s fmt.Stringer
		expected string
		desc string
	}{
		{},
	}

	for _, tt := range td {
		t.Run(tt.desc, func(t *testing.T){
		})
	}
}

func background(keyword string) *gherkin.Background {
	b := &gherkin.Background{}
	b.Keyword = keyword
	b.Type = "Background"
	return b
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

