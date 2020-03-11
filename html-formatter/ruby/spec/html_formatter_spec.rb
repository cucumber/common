require 'cucumber/html-formatter'

describe Cucumber::HTMLFormatter do
  let(:subject) { Cucumber::HTMLFormatter.new(out)}
  let(:out) { StringIO.new }

  context('write_pre_message') do
    it 'outputs the content of the template up to {{messages}}' do
      allow(subject).to receive(:template).and_return('Before{{messages}}')

      subject.write_pre_message()
      expect(out.string).to eq("Before\n")
    end
  end

  context('write_message')
  context('write_post_message')
end
