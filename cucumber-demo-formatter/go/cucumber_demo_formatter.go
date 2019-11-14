/*
Package dots implements a simple Cucumber formatter that prints
a single ANSI-coloured character for each step.
*/

package cucumber_demo_formatter

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v6"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(input io.Reader, output io.Writer) {
	var emoji = map[messages.TestResult_Status]string{
		messages.TestResult_UNKNOWN:   "👽",
		messages.TestResult_PASSED:    "😃",
		messages.TestResult_SKIPPED:   "🥶",
		messages.TestResult_PENDING:   "⏰",
		messages.TestResult_UNDEFINED: "🤷",
		messages.TestResult_AMBIGUOUS: "🦄",
		messages.TestResult_FAILED:    "💣",
	}

	r := gio.NewDelimitedReader(input, 4096)
	for {
		wrapper := &messages.Envelope{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}

		switch m := wrapper.Message.(type) {
		case *messages.Envelope_TestStepFinished:
			_, err = fmt.Fprintf(output, emoji[m.TestStepFinished.TestResult.Status])
		case *messages.Envelope_TestRunFinished:
			_, err = fmt.Fprint(output, "\n")
		}
		if err != nil {
			panic(err)
		}
	}
}
