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

    context 'setting the default dialect' do
      it 'features will be parsed using the set default dialect' do
        gherkin = Gherkin.new(
          [],
          true, true, true, 'no'
        )
        content = """
          Egenskap: i18n support

            Scenario: Parsing many languages
              Gitt Gherkin supports many languages
              Når Norwegian keywords are parsed
              Så they should be recognized
          """
        messages = gherkin.parse('dummy', content).to_a
        expect(messages.length).to eq(3)
      end
    end
  end
end
