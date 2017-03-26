require "cucumber/formatter/event_stream/version"
require "cucumber/formatter/event_stream/plugin"

module Cucumber
  module Formatter
    module EventStream

      def self.new(*args)
        Plugin.new(*args)
      end

    end
  end
end
