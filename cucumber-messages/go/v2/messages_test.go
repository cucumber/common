package messages

import (
	"bytes"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMessages(t *testing.T) {
	t.Run("builds a pickle doc string", func(t *testing.T) {
		location := &Location{
			Line:   uint32(10),
			Column: uint32(20),
		}
		pickleDocString := PickleDocString{
			Location:    location,
			ContentType: "text/plain",
			Content:     "some\ncontent\n",
		}

		b := &bytes.Buffer{}
		writer := gio.NewDelimitedWriter(b)
		writer.WriteMsg(&pickleDocString)

		r := gio.NewDelimitedReader(b, 4096)
		var decoded PickleDocString
		r.ReadMsg(&decoded)
		require.Equal(t, uint32(20), decoded.Location.Column)
		require.Equal(t, "some\ncontent\n", decoded.Content)
	})

	t.Run("builds a step", func(t *testing.T) {
		location := &Location{
			Line:   10,
			Column: 20,
		}

		docString := &DocString{
			Content:  "Hello",
			Location: location,
		}
		step := &Step{
			Keyword:  "Given",
			Text:     "the following message:",
			Argument: &Step_DocString{docString},
		}

		b := &bytes.Buffer{}
		writer := gio.NewDelimitedWriter(b)
		writer.WriteMsg(step)

		r := gio.NewDelimitedReader(b, 4096)
		var decoded Step
		r.ReadMsg(&decoded)
		require.Equal(t, "Hello", decoded.GetDocString().Content)
	})
}
