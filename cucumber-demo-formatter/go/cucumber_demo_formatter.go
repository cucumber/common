/*
Package cucumber_demo_formatter implements a simple Cucumber formatter that prints
an emoji for each step.
*/

package cucumber_demo_formatter

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v8"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(reader gio.ReadCloser, output io.Writer) {
	var emoji = map[messages.TestResult_Status]string{
		messages.TestResult_UNKNOWN:   "👽",
		messages.TestResult_PASSED:    "😃",
		messages.TestResult_SKIPPED:   "🥶",
		messages.TestResult_PENDING:   "⏰",
		messages.TestResult_UNDEFINED: "🤷",
		messages.TestResult_AMBIGUOUS: "🦄",
		messages.TestResult_FAILED:    "💣",
	}

	for {
		envelope := &messages.Envelope{}
		err := reader.ReadMsg(envelope)
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}

		switch m := envelope.Message.(type) {
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
