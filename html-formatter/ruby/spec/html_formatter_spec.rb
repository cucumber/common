require 'cucumber/messages'
require 'cucumber/html_formatter'

describe Cucumber::HTMLFormatter::Formatter do
  let(:subject) { Cucumber::HTMLFormatter::Formatter.new(out)}
  let(:out) { StringIO.new }

  context 'write_pre_message' do
    it 'outputs the content of the template up to {{messages}}' do
      subject.write_pre_message()
      expect(out.string).to start_with('<!DOCTYPE html>')
      expect(out.string).to end_with("window.CUCUMBER_MESSAGES = [\n")
    end

    it 'does not write the content twice' do
      subject.write_pre_message()
      subject.write_pre_message()

      expect(out.string.match('DOCTYPE').length).to eq(1)
    end
  end

  context 'write_message' do
    let(:message) do
      Cucumber::Messages::Envelope.new({
        pickle: Cucumber::Messages::Pickle.new({
          id: 'some-random-uid'
        })
      })
    end

    it 'raises an exception if the message is not a Cucumber::Messages::Envelope instance' do
      expect { subject.write_message('Ho hi !') }.to raise_exception(Cucumber::HTMLFormatter::MessageExpected)
    end

    it 'appends the message to out' do
      subject.write_message(message)
      expect(out.string).to eq(%|{"pickle":{"id":"some-random-uid"}}|)
    end

    it 'adds commas between the messages' do
      subject.write_message(message)
      subject.write_message(message)

      expect(out.string).to eq(%|{"pickle":{"id":"some-random-uid"}},\n{"pickle":{"id":"some-random-uid"}}|)
    end
  end

  context 'write_post_message' do
    it 'outputs the template end' do
      subject.write_post_message()
      expect(out.string).to start_with(']')
      expect(out.string).to end_with("</html>\n")

    end
  end
end
