package messages

import (
	"github.com/stretchr/testify/require"
	"testing"
	"time"
)

func TestTimeConversion(t *testing.T) {
	t.Run("converts to and from milliseconds since epoch (wall time)", func(t *testing.T) {
		now := time.Unix(1, 234)
		timestamp := GoTimeToTimestamp(now)
		nowAgain := TimestampToGoTime(timestamp)

		require.Equal(t, now, nowAgain)
	})

	t.Run("converts to and from duration (monotonic time)", func(t *testing.T) {
		durationInNanoseconds, err := time.ParseDuration("1234ms")
		require.NoError(t, err)
		duration := GoDurationToDuration(durationInNanoseconds)
		durationInNanosecondsAgain := DurationToGoDuration(duration)

		require.Equal(t, durationInNanoseconds, durationInNanosecondsAgain)
	})

	t.Run("converts to and from duration (with nanoseconds)", func(t *testing.T) {
		durationInNanoseconds, err := time.ParseDuration("3s890ns")
		require.NoError(t, err)
		duration := GoDurationToDuration(durationInNanoseconds)
		durationInNanosecondsAgain := DurationToGoDuration(duration)

		require.Equal(t, duration.Seconds, int64(3))
		require.Equal(t, duration.Nanos, int64(890))

		require.Equal(t, durationInNanoseconds, durationInNanosecondsAgain)
	})
}
