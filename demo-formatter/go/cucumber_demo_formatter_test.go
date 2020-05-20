package cucumber_demo_formatter

import (
	"bytes"
	"github.com/cucumber/messages-go/v12"
	fio "github.com/cucumber/messages-go/v12/io"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestAllResultTypes(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := fio.NewNdjsonWriter(stdin)

	var statuses = []messages.TestStepFinished_TestStepResult_Status{
		messages.TestStepFinished_TestStepResult_UNKNOWN,
		messages.TestStepFinished_TestStepResult_PASSED,
		messages.TestStepFinished_TestStepResult_SKIPPED,
		messages.TestStepFinished_TestStepResult_PENDING,
		messages.TestStepFinished_TestStepResult_UNDEFINED,
		messages.TestStepFinished_TestStepResult_AMBIGUOUS,
		messages.TestStepFinished_TestStepResult_FAILED,
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

func newTestStepFinished(status messages.TestStepFinished_TestStepResult_Status) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestStepFinished{
			TestStepFinished: &messages.TestStepFinished{
				TestStepResult: &messages.TestStepFinished_TestStepResult{
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
