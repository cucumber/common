require 'rspec'
require 'gherkin/messages/subprocess_cucumber_messages'

module Gherkin
  module Messages
    describe SubprocessCucumberMessages do
      it "works" do
        cucumber_messages = SubprocessCucumberMessages.new(
          ["testdata/good/minimal.feature"], 
          true, true, true
        )
        messages = cucumber_messages.messages.to_a
        expect(messages.length).to eq(3)
      end
    end
  end
end
