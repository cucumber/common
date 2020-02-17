/*
Package cucumber_demo_formatter implements a simple Cucumber formatter that prints
an emoji for each step.
*/

package cucumber_demo_formatter

import (
	"fmt"
	messages "github.com/cucumber/messages-go/v10"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(reader gio.ReadCloser, output io.Writer) {
	var emoji = map[messages.TestStepResult_Status]string{
		messages.TestStepResult_UNKNOWN:   "👽",
		messages.TestStepResult_PASSED:    "😃",
		messages.TestStepResult_SKIPPED:   "🥶",
		messages.TestStepResult_PENDING:   "⏰",
		messages.TestStepResult_UNDEFINED: "🤷",
		messages.TestStepResult_AMBIGUOUS: "🦄",
		messages.TestStepResult_FAILED:    "💣",
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
			_, err = fmt.Fprintf(output, emoji[m.TestStepFinished.TestStepResult.Status])
		case *messages.Envelope_TestRunFinished:
			_, err = fmt.Fprint(output, "\n")
		}
		if err != nil {
			panic(err)
		}
	}
}
