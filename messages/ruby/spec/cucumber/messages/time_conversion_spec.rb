require 'cucumber/messages'

module Cucumber
  module Messages
    describe TimeConversion do
      include TimeConversion

      it 'converts to and from milliseconds since epoch' do
        time = Time.now
        timestamp = time_to_timestamp(time)
        time_again = timestamp_to_time(timestamp)

        expect(time_again).to eq(time)
      end


      it 'converts to and from seconds duration' do
        duration_in_seconds = 1234
        duration = seconds_to_duration(duration_in_seconds)
        duration_in_seconds_again = duration_to_seconds(duration)

        expect(duration_in_seconds_again).to eq(duration_in_seconds)
      end
    end
  end
end
