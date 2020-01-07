require 'rspec'
require 'gherkin'
require 'gherkin/gherkin_query'

describe Gherkin::Query do
  let(:subject) { Gherkin::Query.new() }

  let(:gherkin_document) { messages.find {|m| m.gherkin_document != nil }.gherkin_document }
  let(:messages) {
    Gherkin.from_source(
      "some/path",
      feature_content,
      {
        include_gherkin_document: true
      }
    ).to_a
  }

  let(:feature_content) {
    """
    @feature-tag
    Feature: my feature

      Background:
        Given a passed background step

      @scenario-tag
      Scenario: my scenario
        Given a passed step

      Scenario Outline: with examples
        Given a <status> step

        @example-tag
        Examples:
          | status |
          | passed |


      Rule: this is a rule
        Background:
          Given the passed step in the rule background

        @ruled-scenario-tag
        Scenario: a ruled scenario
          Given a step in the ruled scenario
      """
  }

  context '#get_location' do
    before do
      messages.each { |message|
        subject.update(message)
      }
    end

    let(:background) { gherkin_document.feature.children.find { |c| c.background != nil }.background }
    let(:scenarios) { gherkin_document.feature.children.filter {|c| c.scenario != nil } }
    let(:scenario) { scenarios.first.scenario }

    it 'raises an exception when the AST node ID is unknown' do
      expect { subject.get_location("this-id-may-not-exist-for-real") }.to raise_exception(Gherkin::AstNodeNotLocatedException)
    end

    it 'provides location of scenario' do
      expect(subject.get_location(scenario.id)).to eq(scenario.location)
    end

    context 'when querying steps' do
      let(:background_step) { background.steps.first }
      let(:scenario_step) { scenario.steps.first }

      it 'provides location of background step' do
        expect(subject.get_location(background_step.id)).to eq(background_step.location)
      end

      it 'provides location of scenario step' do
        expect(subject.get_location(scenario_step.id)).to eq(scenario_step.location)
      end
    end

    context 'when querying tags' do
      let(:feature_tag) { gherkin_document.feature.tags.first }
      let(:scenario_tag) { scenario.tags.first }
      let(:example_tag) { scenarios.last.scenario.examples.first.tags.first }

      it 'provides the location of feature tags' do
        expect(subject.get_location(feature_tag.id)).to eq(feature_tag.location)
      end

      it 'provides the location of scenario tags' do
        expect(subject.get_location(scenario_tag.id)).to eq(scenario_tag.location)
      end

      it 'provides the location of scenario example tags' do
        expect(subject.get_location(example_tag.id)).to eq(example_tag.location)
      end
    end

    context 'when children are scoped in a Rule' do
      let(:rule) { gherkin_document.feature.children.find { |c| c.rule != nil }.rule }
      let(:rule_background) { rule.children.find { |c| c.background != nil}.background }
      let(:rule_background_step) { rule_background.steps.first }
      let(:rule_scenario) { rule.children.find { |c| c.scenario != nil}.scenario }
      let(:rule_scenario_step) { rule_scenario.steps.first }
      let(:rule_scenario_tag) { rule_scenario.tags.first }

      it 'provides location of background step' do
        expect(subject.get_location(rule_background_step.id)).to eq(rule_background_step.location)
      end

      it 'provides location of scenario' do
        expect(subject.get_location(rule_scenario.id)).to eq(rule_scenario.location)
      end

      it 'provides location of scenario tag' do
        expect(subject.get_location(rule_scenario_tag.id)).to eq(rule_scenario_tag.location)
      end

      it 'provides location of scenario step' do
        expect(subject.get_location(rule_scenario_step.id)).to eq(rule_scenario_step.location)
      end
    end
  end
end