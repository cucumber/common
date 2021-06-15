require 'cucumber/messages/message/deserialization'
require 'cucumber/messages/message/serialization'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Deserialization
      include Cucumber::Messages::Message::Serialization

    end
  end
end