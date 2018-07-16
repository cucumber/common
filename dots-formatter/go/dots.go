/*
Package dots implements a simple Cucumber formatter that prints
a single ANSI-coloured character for each step.
*/

package dots

import (
	"io"
	"fmt"
	gio "github.com/gogo/protobuf/io"
	"github.com/cucumber/cucumber-messages-go"
	"github.com/fatih/color"
)

func ProcessMessages(stdin io.Reader, stdout io.Writer) {
	// We always want colors, regardless of the terminal.
	// The reason being that language wrappers (Ruby, Java etc)
	// want to capture colours regardless.
	color.NoColor = false

	r := gio.NewDelimitedReader(stdin, 4096)
	for {
		wrapper := &messages.Wrapper{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}

		switch t := wrapper.Message.(type) {
		case *messages.Wrapper_TestStepFinished:
			switch t.TestStepFinished.Status {
			case messages.Status_AMBIGUOUS:
				color.New(color.FgMagenta).Fprint(stdout, "A")
			case messages.Status_FAILED:
				color.New(color.FgRed).Fprint(stdout, "F")
			case messages.Status_PASSED:
				color.New(color.FgGreen).Fprint(stdout, ".")
			case messages.Status_PENDING:
				color.New(color.FgYellow).Fprint(stdout, "P")
			case messages.Status_SKIPPED:
				color.New(color.FgCyan).Fprint(stdout, "-")
			case messages.Status_UNDEFINED:
				color.New(color.FgYellow).Fprint(stdout, "U")
			}
		}
	}
	fmt.Fprint(stdout, "\n")
}
