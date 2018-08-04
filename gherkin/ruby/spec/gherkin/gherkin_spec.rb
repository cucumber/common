require 'rspec'
require 'gherkin/gherkin'

module Gherkin
  describe Gherkin do
    it "parses gherkin from the file system" do
      gherkin = Gherkin.new(
        ["testdata/good/minimal.feature"],
        true, true, true
      )
      messages = gherkin.messages.to_a
      expect(messages.length).to eq(3)
    end
  end
end
