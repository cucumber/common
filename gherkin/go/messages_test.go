package gherkin

import (
	"bytes"
	"github.com/cucumber/cucumber-messages-go"
	gio "github.com/gogo/protobuf/io"
	"testing"
)

func TestMessagesWithStdin(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := gio.NewDelimitedWriter(stdin)

	gherkin := `Feature: Minimal

  Scenario: a
    Given a

  Scenario: b
    Given b
`

	source := &messages.Source{
		Uri:  "features/test.feature",
		Data: gherkin,
		Media: &messages.Media{
			Encoding:    "UTF-8",
			ContentType: "text/x.cucumber.gherkin+plain",
		},
	}

	writer.WriteMsg(source)
	writer.WriteMsg(source)

	wrappers, err := Messages(
		nil,
		stdin,
		"en",
		true,
		true,
		true,
		nil,
		false,
	)
	if err != nil {
		t.Error(err)
	}
	if len(wrappers) != 8 {
		t.Fatalf("%d != %d", len(wrappers), 8)
	}
}
