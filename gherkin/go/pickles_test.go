package gherkin

import (
	"fmt"
	messages "github.com/cucumber/messages-go/v12"
	"os"
	"strings"
)

func ExampleCompilePickles() {

	input := `Feature: test

  Scenario: test
    Given a <color> ball

    Examples:
      | color |
      |  red  |
`
	r := strings.NewReader(input)

	gherkinDocument, err := ParseGherkinDocument(r, (&messages.Incrementing{}).NewId)
	if err != nil {
		fmt.Fprintf(os.Stdout, "%s\n", err)
		return
	}
	pickles := Pickles(*gherkinDocument, "test.feature", (&messages.Incrementing{}).NewId)

	fmt.Fprintf(os.Stdout, "Text: %+v\n", pickles[0].Steps[0].Text)

	// Output:
	//
	// Text: a red ball
}
