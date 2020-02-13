package cucumber_demo_formatter

import (
	"bytes"
	"github.com/cucumber/messages-go/v9"
	fio "github.com/cucumber/messages-go/v9/io"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestAllResultTypes(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := fio.NewNdjsonWriter(stdin)

	var statuses = []messages.TestStepResult_Status{
		messages.TestStepResult_UNKNOWN,
		messages.TestStepResult_PASSED,
		messages.TestStepResult_SKIPPED,
		messages.TestStepResult_PENDING,
		messages.TestStepResult_UNDEFINED,
		messages.TestStepResult_AMBIGUOUS,
		messages.TestStepResult_FAILED,
	}
	for _, status := range statuses {
		err := writer.WriteMsg(newTestStepFinished(status))
		require.NoError(t, err)
	}
	err := writer.WriteMsg(newTestRunFinished())
	require.NoError(t, err)

	err = writer.Close()
	require.NoError(t, err)

	stdinReader := bytes.NewReader(stdin.Bytes())
	reader := fio.NewNdjsonReader(stdinReader)

	stdout := &bytes.Buffer{}
	ProcessMessages(reader, stdout)

	require.EqualValues(t,
		"👽😃🥶⏰🤷🦄💣\n",
		stdout.String())
}

func newTestStepFinished(status messages.TestStepResult_Status) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestStepFinished{
			TestStepFinished: &messages.TestStepFinished{
				TestStepResult: &messages.TestStepResult{
					Status: status,
				},
			},
		},
	}
}

func newTestRunFinished() *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestRunFinished{
			TestRunFinished: &messages.TestRunFinished{},
		},
	}
}
