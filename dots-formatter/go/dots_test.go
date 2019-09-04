package dots

import (
	"bytes"
	"github.com/cucumber/cucumber-messages-go/v5"
	"github.com/fatih/color"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	"io/ioutil"
	"strings"
	"testing"
)

func TestAllResultTypes(t *testing.T) {
	stdin := &bytes.Buffer{}
	writer := gio.NewDelimitedWriter(stdin)

	writer.WriteMsg(newTestStepFinished(messages.TestResult_FAILED))
	writer.WriteMsg(newTestStepFinished(messages.TestResult_SKIPPED))
	writer.WriteMsg(newTestStepFinished(messages.TestResult_UNDEFINED))
	writer.WriteMsg(newTestStepFinished(messages.TestResult_AMBIGUOUS))
	writer.WriteMsg(newTestStepFinished(messages.TestResult_PASSED))
	writer.WriteMsg(newTestStepFinished(messages.TestResult_PENDING))
	writer.WriteMsg(newTestHookFinished(messages.TestResult_PASSED))
	writer.WriteMsg(newTestHookFinished(messages.TestResult_FAILED))

	// Write to disk, so it can be used for a manual test
	b := stdin.Bytes()
	err := ioutil.WriteFile("all-results.bin", b, 0644)
	require.NoError(t, err)

	stdout := &bytes.Buffer{}
	ProcessMessages(stdin, stdout)

	require.EqualValues(t,
		strings.Join([]string{
			color.New(color.FgRed).Sprint("F"),
			color.New(color.FgCyan).Sprint("-"),
			color.New(color.FgYellow).Sprint("U"),
			color.New(color.FgMagenta).Sprint("A"),
			color.New(color.FgGreen).Sprint("."),
			color.New(color.FgYellow).Sprint("P"),
			color.New(color.FgRed).Sprint("H"),
			"\n",
		}, ""),
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

func newTestHookFinished(status messages.TestResult_Status) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestHookFinished{
			TestHookFinished: &messages.TestHookFinished{
				TestResult: &messages.TestResult{
					Status: status,
				},
			},
		},
	}
}
