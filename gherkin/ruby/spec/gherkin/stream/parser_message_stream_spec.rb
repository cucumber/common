require 'rspec'
require 'gherkin/stream/parser_message_stream'

module Gherkin
  module Stream
    describe ParserMessageStream do
      let(:feature_content) {
        "Feature: my feature\n" \
        "  Scenario: a scenario\n" \
        "    Given some context"
      }

      let(:source_feature) {
        Cucumber::Messages::Source.new({
          uri: '//whatever/uri',
          data: feature_content,
          media_type: 'text/x.cucumber.gherkin+plain'
        })
      }

      let(:options) {
        {
          include_gherkin_document: true,
        }
      }

      let(:gherkin_document) {
        ParserMessageStream.new([], [source_feature], options).messages.first.gherkin_document
      }

      let(:scenario_id) { gherkin_document.feature.children.first.scenario.id }

      context 'options.predictable_ids' do
        context 'when not set' do
          it 'generates random UUIDs' do
            expect(scenario_id).to match(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
          end
        end

        context 'when set to true' do
          let(:options) {
            {
              include_gherkin_document: true,
              predictable_ids: true
            }
          }

          it 'generates incremental IDs' do
            expect(scenario_id).to eq("1")
          end
        end
      end

      context 'options.id_generator' do
        let(:id_generator) { double }
        let(:options) {
          {
            include_gherkin_document: true,
            id_generator: id_generator
          }
        }

        it 'uses the generator instance to produce the IDs' do
          allow(id_generator).to receive(:new_id).and_return('some-random-id')
          expect(scenario_id).to eq('some-random-id')
        end
      end
    end
  end
end