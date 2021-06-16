require 'rspec'
require 'cucumber/messages/message/utils'

class TestSupport
  include Cucumber::Messages::Message::Utils
end

describe Cucumber::Messages::Message::Utils do
  describe '#underscore' do
    it { expect(TestSupport.underscore('test')).to eq 'test' }
    it { expect(TestSupport.underscore('testTest')).to eq 'test_test' }
    it { expect(TestSupport.underscore('')).to eq '' }
    it { expect(TestSupport.underscore('T')).to eq 't' }
    it { expect(TestSupport.underscore('test123test456Test')).to eq 'test123test456_test' }
    it { expect(TestSupport.underscore('test-test')).to eq 'test_test' }
    it { expect(TestSupport.underscore('TEST_Test')).to eq 'test_test' }
    it { expect(TestSupport.underscore('test-Test')).to eq 'test_test' }
  end

  describe '#camelize' do
    it { expect(TestSupport.camelize('test')).to eq 'test' }
    it { expect(TestSupport.camelize('test_test')).to eq 'testTest' }
    it { expect(TestSupport.camelize('Test_TeSt')).to eq 'TestTest' }
    it { expect(TestSupport.camelize('')).to eq '' }
    it { expect(TestSupport.camelize('test123test4_5_6_test')).to eq 'test123test456Test' }
    it { expect(TestSupport.camelize('test-test')).to eq 'test-test' }
  end
end
