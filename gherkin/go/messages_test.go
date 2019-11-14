package gherkin

import (
	"bytes"
	"github.com/cucumber/cucumber-messages-go/v7"
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

	wrapper := &messages.Envelope{
		Message: &messages.Envelope_Source{
			Source: &messages.Source{
				Uri:  "features/test.feature",
				Data: gherkin,
				Media: &messages.Media{
					Encoding:    messages.Media_UTF8,
					ContentType: "text/x.cucumber.gherkin+plain",
				},
			},
		},
	}

	writer.WriteMsg(wrapper)
	writer.WriteMsg(wrapper)

	messages, err := Messages(
		nil,
		stdin,
		"en",
		true,
		true,
		true,
		nil,
		false,
		(&Incrementing{0}).NewId,
	)
	if err != nil {
		t.Error(err)
	}
	if len(messages) != 8 {
		t.Fatalf("%d != %d", len(messages), 8)
	}
}
