/*
Package cucumber_demo_formatter implements a simple Cucumber formatter that prints
an emoji for each step.
*/

package cucumber_demo_formatter

import (
	"encoding/json"
	"fmt"
	"github.com/cucumber/common/messages/go/v17"
	"io"
)

func ProcessMessages(reader io.Reader, output io.Writer) {
	var emoji = map[messages.TestStepResultStatus]string{
		messages.TestStepResultStatus_UNKNOWN:   "👽",
		messages.TestStepResultStatus_PASSED:    "😃",
		messages.TestStepResultStatus_SKIPPED:   "🥶",
		messages.TestStepResultStatus_PENDING:   "⏰",
		messages.TestStepResultStatus_UNDEFINED: "🤷",
		messages.TestStepResultStatus_AMBIGUOUS: "🦄",
		messages.TestStepResultStatus_FAILED:    "💣",
	}

	decoder := json.NewDecoder(reader)
	for {
		envelope := &messages.Envelope{}
		err := decoder.Decode(envelope)
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}

		if envelope.TestStepFinished != nil {
			_, err = fmt.Fprintf(output, emoji[envelope.TestStepFinished.TestStepResult.Status])
		}
		if envelope.TestRunFinished != nil {
			_, err = fmt.Fprint(output, "\n")
		}
		if err != nil {
			panic(err)
		}
	}
}
