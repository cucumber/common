/*
Package cucumber_demo_formatter implements a simple Cucumber formatter that prints
an emoji for each step.
*/

package cucumber_demo_formatter

import (
	"fmt"
	"github.com/cucumber/messages-go/v12"
	gio "github.com/gogo/protobuf/io"
	"io"
)

func ProcessMessages(reader gio.ReadCloser, output io.Writer) {
	var emoji = map[messages.TestStepFinished_TestStepResult_Status]string{
		messages.TestStepFinished_TestStepResult_UNKNOWN:   "👽",
		messages.TestStepFinished_TestStepResult_PASSED:    "😃",
		messages.TestStepFinished_TestStepResult_SKIPPED:   "🥶",
		messages.TestStepFinished_TestStepResult_PENDING:   "⏰",
		messages.TestStepFinished_TestStepResult_UNDEFINED: "🤷",
		messages.TestStepFinished_TestStepResult_AMBIGUOUS: "🦄",
		messages.TestStepFinished_TestStepResult_FAILED:    "💣",
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
