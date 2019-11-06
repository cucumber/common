package gherkin

import (
	"strings"
	"testing"
)

const benchmarkGherkinText = `
@dead @simple
Feature: Dead Simple Calculator
  Bla Bla
  Bla

  Background:
    Given a Simple Calculator

  @wip
  Scenario: Adding 2 numbers
     When I press the key "2"
      And I press the key "+"
	  And I press the key "2"
      And I press the key "="
     Then the result should be 4

  @wip @expensive
  Scenario Outline: Simple Math
     When I press the key "<left>"
      And I press the key "<operator>"
	  And I press the key "<right>"
      And I press the key "="
     Then the result should be "<result>"

    Examples:
     | left   | operator | right   | result |
     | 2      | +        | 2       | 4      |
     | 3      | +        | 4       | 7      |

  Scenario: Adding 3 numbers
     When I press the following keys:
     """
       2
     + 2
     + 5
       =
     """
     Then the result should be 9

`

func Benchmark_NewParserMatcherScanner(b *testing.B) { //benchmark function starts with "Benchmark" and takes a pointer to type testing.B
	for i := 0; i < b.N; i++ { // use b.N for looping
		noopbuilder := new(noopBuilder)
		_ = NewParser(noopbuilder)
		_ = NewMatcher(GherkinDialectsBuildin())
		_ = NewScanner(strings.NewReader(benchmarkGherkinText))
	}
}

func Benchmark_ParseGherkinDocument(b *testing.B) { //benchmark function starts with "Benchmark" and takes a pointer to type testing.B
	for i := 0; i < b.N; i++ { // use b.N for looping
		r := strings.NewReader(benchmarkGherkinText)
		_, err := ParseGherkinDocument(r, Incrementing{}.NewId)
		if err != nil {
			b.FailNow()
		}
	}
}

type noopBuilder struct{}

func (n *noopBuilder) Build(*Token) (bool, error) {
	return true, nil
}
func (n *noopBuilder) StartRule(RuleType) (bool, error) {
	return true, nil
}
func (n *noopBuilder) EndRule(RuleType) (bool, error) {
	return true, nil
}
func (n *noopBuilder) Reset() {
}

func Benchmark_ParseWithoutBuilder(b *testing.B) { //benchmark function starts with "Benchmark" and takes a pointer to type testing.B
	b.StopTimer()

	noopbuilder := new(noopBuilder)
	parser := NewParser(noopbuilder)
	parser.StopAtFirstError(true)
	matcher := NewMatcher(GherkinDialectsBuildin())

	b.StartTimer()
	for i := 0; i < b.N; i++ { // use b.N for looping
		in := strings.NewReader(benchmarkGherkinText)
		scanner := NewScanner(in)
		err := parser.Parse(scanner, matcher)
		if err != nil {
			b.FailNow()
		}
	}
}
