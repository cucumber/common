package messages_test

import (
	"testing"
	"."
	"github.com/stretchr/testify/require"
	"github.com/golang/protobuf/proto"
)

func TestMessages(t *testing.T) {
	t.Run("builds a pickle doc string", func(t *testing.T) {
		location := &messages.Location{
			Line:   uint32(10),
			Column: uint32(20),
		}
		pickleDocString := messages.PickleDocString{
			Location:    location,
			ContentType: "text/plain",
			Content:     "some\ncontent\n",
		}
		encoded, err := proto.Marshal(&pickleDocString)
		require.NoError(t, err)
		println(len(encoded))
		var decoded messages.PickleDocString
		err = proto.Unmarshal(encoded, &decoded)
		require.NoError(t, err)
		require.Equal(t, uint32(20), decoded.Location.Column)
		require.Equal(t, "some\ncontent\n", decoded.Content)
	})

	t.Run("builde a step", func(t *testing.T) {
		location := &messages.Location{
			Line:   10,
			Column: 20,
		}

		docString := &messages.DocString{
			Content:  "Hello",
			Location: location,
		}
		step := &messages.Step{
			Keyword:  "Given",
			Text:     "the following message:",
			Argument: &messages.Step_DocString{docString},
		}

		bytes, err := proto.Marshal(step)
		require.NoError(t, err)
		var decoded messages.Step
		err = proto.Unmarshal(bytes, &decoded)
		require.NoError(t, err)
		require.Equal(t, "Hello", decoded.GetDocString().Content)
	})
}
