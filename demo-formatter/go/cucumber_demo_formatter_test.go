package cucumber_demo_formatter

import (
	"bytes"
	"encoding/json"
	"github.com/cucumber/common/messages/go/v17"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestAllResultTypes(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := json.NewEncoder(stdin)

	var statuses = []messages.TestStepResultStatus{
		messages.TestStepResultStatus_UNKNOWN,
		messages.TestStepResultStatus_PASSED,
		messages.TestStepResultStatus_SKIPPED,
		messages.TestStepResultStatus_PENDING,
		messages.TestStepResultStatus_UNDEFINED,
		messages.TestStepResultStatus_AMBIGUOUS,
		messages.TestStepResultStatus_FAILED,
	}
	for _, status := range statuses {
		err := writer.Encode(newTestStepFinished(status))
		require.NoError(t, err)
	}
	err := writer.Encode(newTestRunFinished())
	require.NoError(t, err)

	stdout := &bytes.Buffer{}
	ProcessMessages(stdin, stdout)

	require.EqualValues(t,
		"👽😃🥶⏰🤷🦄💣\n",
		stdout.String())
}

func newTestStepFinished(status messages.TestStepResultStatus) *messages.Envelope {
	return &messages.Envelope{
		TestStepFinished: &messages.TestStepFinished{
			TestStepResult: &messages.TestStepResult{
				Status: status,
			},
		},
	}
}

func newTestRunFinished() *messages.Envelope {
	return &messages.Envelope{
		TestRunFinished: &messages.TestRunFinished{},
	}
}
