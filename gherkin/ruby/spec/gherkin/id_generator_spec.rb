require 'rspec'
require 'gherkin/id_generator'

describe Gherkin::IdGenerator::Incrementing do
  subject { Gherkin::IdGenerator::Incrementing.new }

  context '#new_id' do
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

describe Gherkin::IdGenerator::UUID do
  subject { Gherkin::IdGenerator::UUID.new }

  context '#new_id' do
    it 'generates a UUID' do
      allowed_characters = "[0-9a-fA-F]"
      expect(subject.new_id).to match(/#{allowed_characters}{8}\-#{allowed_characters}{4}\-#{allowed_characters}{4}\-#{allowed_characters}{4}\-#{allowed_characters}{12}/)
    end
  end
end