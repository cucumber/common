package cucumber_demo_formatter

import (
	"bytes"
	"github.com/cucumber/cucumber-messages-go/v7"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestAllResultTypes(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := gio.NewDelimitedWriter(stdin)

	var statuses = []messages.TestResult_Status{
		messages.TestResult_UNKNOWN,
		messages.TestResult_PASSED,
		messages.TestResult_SKIPPED,
		messages.TestResult_PENDING,
		messages.TestResult_UNDEFINED,
		messages.TestResult_AMBIGUOUS,
		messages.TestResult_FAILED,
	}
	for _, status := range statuses {
		err := writer.WriteMsg(newTestStepFinished(status))
		require.NoError(t, err)
	}

	stdout := &bytes.Buffer{}
	ProcessMessages(stdin, stdout)

	require.EqualValues(t,
		"👽😃🥶⏰🤷🦄💣",
		stdout.String())
}

func newTestStepFinished(status messages.TestResult_Status) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestStepFinished{
			TestStepFinished: &messages.TestStepFinished{
				TestResult: &messages.TestResult{
					Status: status,
				},
			},
		},
	}
}
