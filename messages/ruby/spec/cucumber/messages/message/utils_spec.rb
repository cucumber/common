require 'rspec'
require 'cucumber/messages/message/utils'

class DummyTestClass
  include Cucumber::Messages::Message::Utils
end

describe Cucumber::Messages::Message::Utils do
  subject { DummyTestClass }

  describe '#underscore' do
    it { expect(subject.underscore('test')).to eq 'test' }
    it { expect(subject.underscore('testTest')).to eq 'test_test' }
    it { expect(subject.underscore('')).to eq '' }
    it { expect(subject.underscore('T')).to eq 't' }
    it { expect(subject.underscore('test123test456Test')).to eq 'test123test456_test' }
    it { expect(subject.underscore('test-test')).to eq 'test_test' }
    it { expect(subject.underscore('TEST_Test')).to eq 'test_test' }
    it { expect(subject.underscore('test-Test')).to eq 'test_test' }
  end

  describe '#camelize' do
    it { expect(subject.camelize('test')).to eq 'test' }
    it { expect(subject.camelize('test_test')).to eq 'testTest' }
    it { expect(subject.camelize('Test_TeSt')).to eq 'TestTest' }
    it { expect(subject.camelize('')).to eq '' }
    it { expect(subject.camelize('test123test4_5_6_test')).to eq 'test123test456Test' }
    it { expect(subject.camelize('test-test')).to eq 'test-test' }
  end
end
