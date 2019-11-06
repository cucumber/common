require 'rspec'
require 'gherkin/id_generator'

describe Gherkin::IdGenerator do
  subject { Gherkin::IdGenerator }

  before do
    allow(Gherkin::Incrementing).to receive(:new_id).and_return('Incrementing')
    allow(Gherkin::UUID).to receive(:new_id).and_return('UUID')
  end

  context '.new_id' do
    it 'uses Gherkin::UUID by default' do
      expect(subject.new_id).to eq('UUID')
    end
  end

  context 'use_incrementing' do
    it 'makes newId use Gherkin::Incrementing' do
      subject.use_incrementing
      expect(subject.new_id).to eq('Incrementing')
    end
  end
end

describe Gherkin::Incrementing do
  subject { Gherkin::Incrementing }
  before do
    # We need to ensure we start each test with a fresh index
    # If we don't, we may run test for other clases that could
    # break those
    subject.reset
  end

  context '.new_id' do
    it 'returns 0 the first time' do
      expect(subject.new_id).to eq("0")
    end

    it 'increments on every call' do
      expect(subject.new_id).to eq("0")
      expect(subject.new_id).to eq("1")
      expect(subject.new_id).to eq("2")
    end
  end
end

describe Gherkin::UUID do
  subject { Gherkin::UUID }

  context '.new_id' do
    it 'generates a UUID' do
      allowed_characters = "[0-9a-fA-F]"
      expect(subject.new_id).to match(/#{allowed_characters}{8}\-#{allowed_characters}{4}\-#{allowed_characters}{4}\-#{allowed_characters}{4}\-#{allowed_characters}{12}/)
    end
  end
end