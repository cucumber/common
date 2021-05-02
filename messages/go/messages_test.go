package messages

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMessages(t *testing.T) {
	t.Run("reads an attachment with a tiny string as NDJSON", func(t *testing.T) {
		envelope := &Envelope{
			Attachment: &Attachment{
				Body: "Hello",
			},
		}
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		require.NoError(t, enc.Encode(envelope))

		dec := json.NewDecoder(buf)
		var decoded Envelope
		require.NoError(t, dec.Decode(&decoded))
		require.Equal(t, envelope, &decoded)
	})

	t.Run("reads an attachment with a 9Mb string as NDJSON", func(t *testing.T) {
		ba := make([]byte, 9*1024*1024)
		for i := range ba {
			ba[i] = "x"[0]
		}
		s := string(ba)

		envelope := &Envelope{
			Attachment: &Attachment{
				Body: s,
			},
		}
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		require.NoError(t, enc.Encode(envelope))

		dec := json.NewDecoder(buf)
		var decoded Envelope
		require.NoError(t, dec.Decode(&decoded))
		require.Equal(t, envelope, &decoded)
	})
}
