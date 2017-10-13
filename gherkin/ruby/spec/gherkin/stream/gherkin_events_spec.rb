require 'rspec'
require 'gherkin/stream/gherkin_events'
require 'gherkin/stream/source_events'

module Gherkin
  module Stream
    describe GherkinEvents do
      it "accepts a language parameter" do
        source_events = SourceEvents.new([File.dirname(__FILE__) + '/test_fr.feature'])
        gherkin_events = GherkinEvents.new({
          print_source: true,
          print_ast: true,
          print_pickles: true
        }, 'fr')

        event_types = []
        source_events.enum.each do |source_event|
          gherkin_events.enum(source_event).each do |event|
            event_types << event[:type]
          end
        end

        expect(event_types).to eq(['source', 'gherkin-document', 'pickle'])
      end
    end
  end
end
