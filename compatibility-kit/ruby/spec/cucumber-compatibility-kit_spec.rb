require 'cucumber-compatibility-kit'

describe Cucumber::CompatibilityKit do
  let(:features_path) { File.expand_path("#{File.dirname(__FILE__)}/../features") }
  let(:gherkin_examples) {
    [
      'attachments',
      'data-tables',
      'examples-tables',
      'hooks',
      'minimal',
      'parameter-types',
      'pending',
      'retry',
      'rules',
      'skipped',
      'stack-traces',
      'undefined',
      'unknown-parameter-type'
    ]
  }
  let(:markdown_examples) {
    [
      'markdown'
    ]
  }

  describe '#examples_path' do
    it 'returns the path of the features folder' do
      expect(Cucumber::CompatibilityKit.examples_path)
        .to eq(features_path)
    end
  end

  describe '#example_path' do
    context 'with an existing example' do
      it 'returns the path of the folder of the example' do
        expect(Cucumber::CompatibilityKit.example_path('hooks'))
          .to eq("#{features_path}/hooks")
      end
    end

    context 'with an unexisting example' do
      it 'raises ArgumentError' do
        expect { Cucumber::CompatibilityKit.example_path('should-not-exists') }
          .to raise_error(ArgumentError)
      end
    end
  end

  describe '#gherkin_examples' do
    it 'returns the list of gherkin examples' do
      expect(Cucumber::CompatibilityKit.gherkin_examples)
        .to match_array(gherkin_examples)
    end
  end

  describe '#markdown_examples' do
    it 'returns the list of markdown examples' do
      expect(Cucumber::CompatibilityKit.markdown_examples)
        .to match_array(markdown_examples)
    end
  end

  describe '#all_examples' do
    it 'returns the list of all available examples' do
      expect(Cucumber::CompatibilityKit.all_examples)
        .to match_array(gherkin_examples + markdown_examples)
    end
  end
end