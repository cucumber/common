require 'cucumber/html-formatter'

describe Cucumber::HTMLFormatter do
  let(:subject) { Cucumber::HTMLFormatter.new(out)}
  let(:out) { StringIO.new }

  context('write_pre_message') do
    before do
      allow(subject).to receive(:template).and_return('Before{{messages}}')
    end

    it 'outputs the content of the template up to {{messages}}' do
      subject.write_pre_message()
      expect(out.string).to eq("Before\n")
    end

    it 'does not write the content twice' do
      subject.write_pre_message()
      subject.write_pre_message()

      expect(out.string).to eq("Before\n")
    end
  end

  context('write_message')
  context('write_post_message')
end
