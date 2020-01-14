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

func newTestRunFinished() *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestRunFinished{
			TestRunFinished: &messages.TestRunFinished{},
		},
	}
}
