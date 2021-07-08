package gherkin

import (
	"encoding/json"
	"fmt"
	"github.com/cucumber/common/messages/go/v17"
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

	marshal, err := json.Marshal(pickles)
	fmt.Fprintf(os.Stdout, string(marshal))

	// Output:
	//
	// [{"id":"1","uri":"test.feature","name":"test","language":"en","steps":[{"astNodeIds":["0","2"],"id":"0","text":"a red ball"}],"tags":[],"astNodeIds":["4","2"]}]
}
