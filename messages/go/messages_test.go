package messages

import (
	"bytes"
	messagesio "github.com/cucumber/messages-go/v12/io"
	gogoio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	"math"
	"testing"
)

func TestMessages(t *testing.T) {
	t.Run("builds a pickle doc string", func(t *testing.T) {
		pickleDocString := PickleStepArgument_PickleDocString{
			MediaType: "text/plain",
			Content:   "some\ncontent\n",
		}

		b := &bytes.Buffer{}
		writer := gogoio.NewDelimitedWriter(b)
		require.NoError(t, writer.WriteMsg(&pickleDocString))

		r := gogoio.NewDelimitedReader(b, math.MaxInt32)
		var decoded PickleStepArgument_PickleDocString
		require.NoError(t, r.ReadMsg(&decoded))
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
		writer := gogoio.NewDelimitedWriter(b)
		require.NoError(t, writer.WriteMsg(step))

		r := gogoio.NewDelimitedReader(b, 4096)
		var decoded GherkinDocument_Feature_Step
		require.NoError(t, r.ReadMsg(&decoded))
		require.Equal(t, "Hello", decoded.GetDocString().Content)
	})

	t.Run("reads an attachment with a tiny string as NDJSON", func(t *testing.T) {
		attachment := &Attachment{
			Body: "Hello",
		}
		b := &bytes.Buffer{}
		writer := messagesio.NewNdjsonWriter(b)
		require.NoError(t, writer.WriteMsg(attachment))
		r := messagesio.NewNdjsonReader(b)
		var decoded Attachment
		require.NoError(t, r.ReadMsg(&decoded))
		require.Equal(t, "Hello", decoded.GetBody())
	})

	t.Run("reads an attachment with a 9Mb string as NDJSON", func(t *testing.T) {
		ba := make([]byte, 9*1024*1024)
		for i := range ba {
			ba[i] = "x"[0]
		}
		s := string(ba)
		attachment := &Attachment{
			Body: s,
		}
		b := &bytes.Buffer{}
		writer := messagesio.NewNdjsonWriter(b)
		require.NoError(t, writer.WriteMsg(attachment))
		r := messagesio.NewNdjsonReader(b)
		var decoded Attachment
		require.NoError(t, r.ReadMsg(&decoded))
		require.Equal(t, s, decoded.GetBody())
	})

	t.Run("reads an attachment with a tiny string as NDJSON", func(t *testing.T) {
		b := &bytes.Buffer{}
		b.WriteString("{\"unused\": 99}\n")
		r := messagesio.NewNdjsonReader(b)
		var decoded Envelope
		require.NoError(t, r.ReadMsg(&decoded))
	})
}
