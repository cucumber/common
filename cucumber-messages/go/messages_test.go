package messages

import (
	"bytes"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMessages(t *testing.T) {
	t.Run("builds a pickle doc string", func(t *testing.T) {
		pickleDocString := PickleStepArgument_PickleDocString{
			ContentType: "text/plain",
			Content:     "some\ncontent\n",
		}

		b := &bytes.Buffer{}
		writer := gio.NewDelimitedWriter(b)
		writer.WriteMsg(&pickleDocString)

		r := gio.NewDelimitedReader(b, 4096)
		var decoded PickleStepArgument_PickleDocString
		r.ReadMsg(&decoded)
		require.Equal(t, "some\ncontent\n", decoded.Content)
	})

	t.Run("builds a step", func(t *testing.T) {
		step := &GherkinDocument_Feature_Step{
			Keyword: "Given",
			Text:    "the following message:",
			Location: &Location{
				Line:   11,
				Column: 4,
			},

			Argument: &GherkinDocument_Feature_Step_DocString_{
				DocString: &GherkinDocument_Feature_Step_DocString{
					Content: "Hello",
					Location: &Location{
						Line:   12,
						Column: 6,
					},
				},
			},
		}

		b := &bytes.Buffer{}
		writer := gio.NewDelimitedWriter(b)
		writer.WriteMsg(step)

		r := gio.NewDelimitedReader(b, 4096)
		var decoded GherkinDocument_Feature_Step
		r.ReadMsg(&decoded)
		require.Equal(t, "Hello", decoded.GetDocString().Content)
	})
}
