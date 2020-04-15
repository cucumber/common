package gherkin

import (
	"fmt"
	messages "github.com/cucumber/messages-go/v12"
	"os"
	"strings"
)

func ExampleParseGherkinDocument() {

	input := `Feature: Tagged Examples

  Scenario Outline: minimalistic
    Given the <what>

    @foo
    Examples:
      | what |
      | foo  |

    @bar
    Examples:
      | what |
      | bar  |

  @zap
  Scenario: ha ok
`
	r := strings.NewReader(input)

	gherkinDocument, err := ParseGherkinDocument(r, (&messages.Incrementing{}).NewId)
	if err != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err)
		return
	}
	feature := gherkinDocument.Feature
	//fmt.Fprintf(os.Stdout, "Location: %v\n", feature.Location)
	fmt.Fprintf(os.Stdout, "Keyword: %+v\n", feature.Keyword)
	fmt.Fprintf(os.Stdout, "Name: %+v\n", feature.Name)
	fmt.Fprintf(os.Stdout, "Children: length: %+v\n", len(feature.Children))

	scenario1 := feature.Children[0].GetScenario()
	//fmt.Fprintf(os.Stdout, " 1: Location: %+v\n", scenario1.Location)
	fmt.Fprintf(os.Stdout, "    Keyword: %+v\n", scenario1.Keyword)
	fmt.Fprintf(os.Stdout, "    Name: %+v\n", scenario1.Name)
	fmt.Fprintf(os.Stdout, "    Steps: length: %+v\n", len(scenario1.Steps))

	scenario2 := feature.Children[1].GetScenario()
	//fmt.Fprintf(os.Stdout, " 2: Location: %+v\n", scenario2.Location)
	fmt.Fprintf(os.Stdout, "    Keyword: %+v\n", scenario2.Keyword)
	fmt.Fprintf(os.Stdout, "    Name: %+v\n", scenario2.Name)
	fmt.Fprintf(os.Stdout, "    Steps: length: %+v\n", len(scenario2.Steps))

	// Output:
	// Keyword: Feature
	// Name: Tagged Examples
	// Children: length: 2
	//     Keyword: Scenario Outline
	//     Name: minimalistic
	//     Steps: length: 1
	//     Keyword: Scenario
	//     Name: ha ok
	//     Steps: length: 0
}

func ExampleParseGherkinDocument_multiple() {

	builder := NewAstBuilder((&messages.Incrementing{}).NewId)
	parser := NewParser(builder)
	parser.StopAtFirstError(false)
	matcher := NewMatcher(GherkinDialectsBuildin())

	input1 := `Feature: Test`
	r1 := strings.NewReader(input1)

	err1 := parser.Parse(NewScanner(r1), matcher)
	if err1 != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err1)
		return
	}
	doc1 := builder.GetGherkinDocument()
	feature1 := doc1.Feature
	//fmt.Fprintf(os.Stdout, "Location: %+v\n", feature1.Location)
	fmt.Fprintf(os.Stdout, "Keyword: %+v\n", feature1.Keyword)
	fmt.Fprintf(os.Stdout, "Name: %+v\n", feature1.Name)
	fmt.Fprintf(os.Stdout, "Children: length: %+v\n", len(feature1.Children))
	fmt.Fprintf(os.Stdout, "\n")

	input2 := `Feature: Test2`
	r2 := strings.NewReader(input2)

	err2 := parser.Parse(NewScanner(r2), matcher)
	if err2 != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err2)
		return
	}
	doc2 := builder.GetGherkinDocument()
	feature2 := doc2.Feature
	//fmt.Fprintf(os.Stdout, "Location: %+v\n", feature2.Location)
	fmt.Fprintf(os.Stdout, "Keyword: %+v\n", feature2.Keyword)
	fmt.Fprintf(os.Stdout, "Name: %+v\n", feature2.Name)
	fmt.Fprintf(os.Stdout, "Children: length: %+v\n", len(feature2.Children))

	// Output:
	// Keyword: Feature
	// Name: Test
	// Children: length: 0
	//
	// Keyword: Feature
	// Name: Test2
	// Children: length: 0
}

func ExampleParseGherkinDocument_error() {

	builder := NewAstBuilder((&messages.Incrementing{}).NewId)
	parser := NewParser(builder)
	parser.StopAtFirstError(false)
	matcher := NewMatcher(GherkinDialectsBuildin())

	input1 := `# a comment
Feature: Foo
  Scenario: Bar
    Given x
` + "      ```" + `
      unclosed docstring`
	r1 := strings.NewReader(input1)

	err1 := parser.Parse(NewScanner(r1), matcher)
	if err1 != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err1)
	}
	fmt.Fprintf(os.Stdout, "\n")

	input2 := `Feature: Foo
  Scenario: Bar
    Given x
      """
      closed docstring
      """`
	r2 := strings.NewReader(input2)

	err2 := parser.Parse(NewScanner(r2), matcher)
	if err2 != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err2)
		return
	}
	doc2 := builder.GetGherkinDocument()
	fmt.Fprintf(os.Stdout, "Comments: length: %+v\n", len(doc2.Comments))

	feature2 := doc2.Feature
	//fmt.Fprintf(os.Stdout, "Location: %+v\n", feature2.Location)
	fmt.Fprintf(os.Stdout, "Keyword: %+v\n", feature2.Keyword)
	fmt.Fprintf(os.Stdout, "Name: %+v\n", feature2.Name)
	fmt.Fprintf(os.Stdout, "Children: length: %+v\n", len(feature2.Children))
	scenario1 := feature2.Children[0].GetScenario()
	//fmt.Fprintf(os.Stdout, " 1: Location: %+v\n", scenario1.Location)
	fmt.Fprintf(os.Stdout, "    Keyword: %+v\n", scenario1.Keyword)
	fmt.Fprintf(os.Stdout, "    Name: %+v\n", scenario1.Name)
	fmt.Fprintf(os.Stdout, "    Steps: length: %+v\n", len(scenario1.Steps))

	// Output:
	// Parser errors:
	// (7:0): unexpected end of file, expected: #DocStringSeparator, #Other
	//
	// Comments: length: 0
	// Keyword: Feature
	// Name: Foo
	// Children: length: 1
	//     Keyword: Scenario
	//     Name: Bar
	//     Steps: length: 1
}

func ExampleParseGherkinDocument_dialect() {

	input := "Egenskap: i18n support"
	r := strings.NewReader(input)

	gherkinDocument, err := ParseGherkinDocumentForLanguage(r, "no", (&messages.Incrementing{}).NewId)
	if err != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err)
		return
	}
	feature := gherkinDocument.Feature
	//fmt.Fprintf(os.Stdout, "Location: %+v\n", feature.Location)
	fmt.Fprintf(os.Stdout, "Keyword: %+v\n", feature.Keyword)
	fmt.Fprintf(os.Stdout, "Name: %+v\n", feature.Name)
	fmt.Fprintf(os.Stdout, "Children: length: %+v\n", len(feature.Children))

	// Output:
	//
	// Keyword: Egenskap
	// Name: i18n support
	// Children: length: 0
}
