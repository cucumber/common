require 'cucumber/messages/ndjson_to_message_enumerator'
require 'cucumber/messages/time_conversion'
require 'cucumber/messages/id_generator'

module Cucumber
  module Messages
    VERSION = File.read(File.expand_path("../../VERSION", __dir__)).strip
  end
end
