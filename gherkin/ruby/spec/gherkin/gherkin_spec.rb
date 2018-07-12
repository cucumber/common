require 'rspec'
require 'gherkin/gherkin'

module Gherkin
  describe Gherkin do
    it "works" do
      cucumber_messages = Gherkin.new(
        ["testdata/good/minimal.feature"],
        true, true, true
      )
      messages = cucumber_messages.messages.to_a
      expect(messages.length).to eq(3)
    end
  end
end
