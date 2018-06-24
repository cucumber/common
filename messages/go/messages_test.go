package messages_test

import (
	"encoding/json"
	"testing"

	messages "github.com/cucumber/cucumber/messages/go"
	"github.com/stretchr/testify/require"
)

func TestMessages(t *testing.T) {
	t.Run("builds a pickle doc string", func(t *testing.T) {
		location := &messages.Location{
			Line:   10,
			Column: 20,
		}
		pickleDocString := messages.PickleDocString{
			Location:    location,
			ContentType: "text/plain",
			Content:     "some\ncontent\n",
		}
		encoded, err := json.Marshal(pickleDocString)
		require.NoError(t, err)
		var decoded messages.PickleDocString
		err = json.Unmarshal(encoded, &decoded)
		require.NoError(t, err)
		require.Equal(t, pickleDocString, decoded)
	})
}
