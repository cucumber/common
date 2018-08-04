# coding: utf-8
require 'rspec'
require 'gherkin/gherkin'

module Gherkin
  describe Gherkin do
    context 'using paths' do
      it "works" do
        messages = Gherkin.from_paths(
          ["testdata/good/minimal.feature"]
        )
        expect(messages.to_a.length).to eq(3)
      end
    end

    context 'using string content' do
      it 'works' do
        file = File.new('testdata/good/minimal.feature')
        content = file.read.encode('UTF-8')
        messages = Gherkin.from_source('testdata/good/minimal.feature', content).to_a
        expect(messages.to_a.length).to eq(3)
      end
    end

    context 'setting the default dialect' do
      it 'features will be parsed using the set default dialect' do
        content = """
          Egenskap: i18n support

            Scenario: Parsing many languages
              Gitt Gherkin supports many languages
              Når Norwegian keywords are parsed
              Så they should be recognized
          """
        messages = Gherkin.from_source('dummy', content, {default_dialect: 'no'})
        expect(messages.to_a.length).to eq(3)
      end
    end
  end
end
