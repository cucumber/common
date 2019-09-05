/*
Package dots implements a simple Cucumber formatter that prints
a single ANSI-coloured character for each step.
*/

package dots

import (
	"fmt"
	"github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(stdin io.Reader, stdout io.Writer) {
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
				fmt.Fprint(stdout, "H")
			}
		case *messages.Envelope_TestStepFinished:
			switch m.TestStepFinished.TestResult.Status {
			// Keep the same order as in messages.proto - for readability's sake
			case messages.TestResult_PASSED:
				fmt.Fprint(stdout, ".")
			case messages.TestResult_SKIPPED:
				fmt.Fprint(stdout, "-")
			case messages.TestResult_PENDING:
				fmt.Fprint(stdout, "P")
			case messages.TestResult_UNDEFINED:
				fmt.Fprint(stdout, "U")
			case messages.TestResult_AMBIGUOUS:
				fmt.Fprint(stdout, "A")
			case messages.TestResult_FAILED:
				fmt.Fprint(stdout, "F")
			case messages.TestResult_UNKNOWN:
				fmt.Fprint(stdout, "?")
			}
		}
	}
	fmt.Fprint(stdout, "\n")
}
