# coding: utf-8
require 'rspec'
require 'gherkin/gherkin'

module Gherkin
  describe Gherkin do
    context 'using paths' do
      it "works" do
        cucumber_messages = Gherkin.new(
          ["testdata/good/minimal.feature"],
          true, true, true
        )
        messages = cucumber_messages.messages.to_a
        expect(messages.length).to eq(3)
      end
    end

    context 'using string content' do
      it 'works' do
        gherkin = Gherkin.new(
          [],
          true, true, true
        )
        file = File.new('testdata/good/minimal.feature')
        content = file.read.encode('UTF-8')
        messages = gherkin.parse('testdata/good/minimal.feature', content).to_a
        expect(messages.length).to eq(3)
      end
    end
  end
end
