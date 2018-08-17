package dots

import (
	"bytes"
	"github.com/cucumber/cucumber-messages-go"
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

	writer.WriteMsg(newTestStepFinished(messages.Status_FAILED))
	writer.WriteMsg(newTestStepFinished(messages.Status_SKIPPED))
	writer.WriteMsg(newTestStepFinished(messages.Status_UNDEFINED))
	writer.WriteMsg(newTestStepFinished(messages.Status_AMBIGUOUS))
	writer.WriteMsg(newTestStepFinished(messages.Status_PASSED))
	writer.WriteMsg(newTestStepFinished(messages.Status_PENDING))

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
			"\n",
		}, ""),
		stdout.String())
}

func newTestStepFinished(status messages.Status) *messages.Wrapper {
	return &messages.Wrapper{
		Message: &messages.Wrapper_TestStepFinished{
			TestStepFinished: &messages.TestStepFinished{
				TestResult: &messages.TestResult{
					Status: status,
				},
			},
		},
	}
}
