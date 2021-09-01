package gherkin

import (
	"bytes"
	"encoding/json"
	"github.com/cucumber/common/messages/go/v17"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMessagesWithStdin(t *testing.T) {
	stdin := &bytes.Buffer{}
	encoder := json.NewEncoder(stdin)

	gherkin := `Feature: Minimal

  Scenario: a
    Given a

  Scenario: b
    Given b
`

	envelope := &messages.Envelope{
		Source: &messages.Source{
			Uri:       "features/test.feature",
			Data:      gherkin,
			MediaType: "text/x.cucumber.gherkin+plain",
		},
	}

	require.NoError(t, encoder.Encode(envelope))
	require.NoError(t, encoder.Encode(envelope))

	decoder := json.NewDecoder(stdin)

	writtenMessages, err := Messages(
		nil,
		decoder,
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
