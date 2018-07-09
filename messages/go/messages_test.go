package messages

import (
	"testing"
	"github.com/stretchr/testify/require"
	"github.com/golang/protobuf/proto"
	"fmt"
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
		encoded, err := proto.Marshal(&pickleDocString)
		require.NoError(t, err)
		var decoded PickleDocString
		err = proto.Unmarshal(encoded, &decoded)
		require.NoError(t, err)
		require.Equal(t, uint32(20), decoded.Location.Column)
		require.Equal(t, "some\ncontent\n", decoded.Content)
	})
	
	t.Run("Roundtrips Source", func(t *testing.T) {
		s := &Wrapper{
			Message: &Wrapper_Source{
				Source: &Source{
					Uri: "JALLA",
				},
			},
		}
		marshalS, _ := proto.Marshal(s)
		fmt.Printf("S------- %d\n", len(marshalS))
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

		bytes, err := proto.Marshal(step)
		require.NoError(t, err)
		var decoded Step
		err = proto.Unmarshal(bytes, &decoded)
		require.NoError(t, err)
		require.Equal(t, "Hello", decoded.GetDocString().Content)
	})
}
