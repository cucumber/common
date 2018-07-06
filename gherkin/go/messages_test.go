package gherkin

import (
	"testing"
	"github.com/cucumber/cucumber-messages-go"
	"github.com/golang/protobuf/proto"
	"bytes"
)

func TestMessagesWithStdin(t *testing.T) {

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

	message, err := proto.Marshal(source)
	if err != nil {
		t.Error(err)
	}
	size := proto.EncodeVarint(uint64(len(message)))

	ba := []byte{}
	ba = append(ba, size...)
	ba = append(ba, message...)
	ba = append(ba, size...)
	ba = append(ba, message...)

	r := bytes.NewReader(ba)
	wrappers, err := CucumberMessages(nil, r, "en", true, true, true)
	if err != nil {
		t.Error(err)
	}
	if len(wrappers) != 8 {
		t.Fatalf("%d != %d", len(wrappers), 8)
	}
}
