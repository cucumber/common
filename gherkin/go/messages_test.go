package gherkin

import (
	"bytes"
	"github.com/cucumber/messages-go/v8"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
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
				Uri:       "features/test.feature",
				Data:      gherkin,
				MediaType: "text/x.cucumber.gherkin+plain",
			},
		},
	}

	require.NoError(t, writer.WriteMsg(wrapper))
	require.NoError(t, writer.WriteMsg(wrapper))

	writtenMessages, err := Messages(
		nil,
		stdin,
		"en",
		true,
		true,
		true,
		nil,
		(&messages.Incrementing{}).NewId,
	)
	require.NoError(t, err)

	assert.Equal(t, 8, len(writtenMessages), "Wrong number of messages")
}
