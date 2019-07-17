/*
Package dots implements a simple Cucumber formatter that prints
a single ANSI-coloured character for each step.
*/

package dots

import (
	"fmt"
	"github.com/cucumber/cucumber/cucumber-messages/go/v3"
	"github.com/fatih/color"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(stdin io.Reader, stdout io.Writer) {
	// We always want colors, regardless of the terminal.
	// The reason being that language wrappers (Ruby, Java etc)
	// want to capture colours regardless.
	color.NoColor = false

	r := gio.NewDelimitedReader(stdin, 4096)
	for {
		wrapper := &messages.Envelope{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}

		switch m := wrapper.Message.(type) {
		case *messages.Envelope_TestHookFinished:
			switch m.TestHookFinished.TestResult.Status {
			case messages.TestResult_FAILED:
				color.New(color.FgRed).Fprint(stdout, "H")
			}
		case *messages.Envelope_TestStepFinished:
			switch m.TestStepFinished.TestResult.Status {
			case messages.TestResult_AMBIGUOUS:
				color.New(color.FgMagenta).Fprint(stdout, "A")
			case messages.TestResult_FAILED:
				color.New(color.FgRed).Fprint(stdout, "F")
			case messages.TestResult_PASSED:
				color.New(color.FgGreen).Fprint(stdout, ".")
			case messages.TestResult_PENDING:
				color.New(color.FgYellow).Fprint(stdout, "P")
			case messages.TestResult_SKIPPED:
				color.New(color.FgCyan).Fprint(stdout, "-")
			case messages.TestResult_UNDEFINED:
				color.New(color.FgYellow).Fprint(stdout, "U")
			}
		}
	}
	fmt.Fprint(stdout, "\n")
}
