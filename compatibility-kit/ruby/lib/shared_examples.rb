require 'json'
require 'rspec'
require 'cucumber/messages'

require 'messages_comparator'
require 'keys_checker'

RSpec.shared_examples 'cucumber compatibility kit' do
  # Note: to use those examples, you need to define:
  # let(:example) {  } # the name of the example to test
  # let(:messages) {  } # the messages to validate

  let(:example) { raise "`example` missing: add `let(:example) { example_name }` to your spec" }
  let(:messages) { raise "`messages` missing: add `let(:messages) { ndjson }` to your spec" }

  let(:example_path) { Cucumber::CompatibilityKit.example_path(example) }

  let(:parsed_original) { parse_ndjson_file("#{example_path}/#{example}.feature.ndjson") }
  let(:parsed_generated) { parse_ndjson(messages) }

  let(:original_messages_types) { parsed_original.map { |msg| message_type(msg) } }
  let(:generated_messages_types) { parsed_generated.map { |msg| message_type(msg) } }

  it 'generates valid message types' do
    debug_lists(original_messages_types, generated_messages_types)
    expect(generated_messages_types).to contain_exactly(*original_messages_types)
  end

  it 'generates valid message structure' do
    comparator = CCK::MessagesComparator.new(CCK::KeysChecker, parsed_generated, parsed_original)
    comparator.debug if ENV['VERBOSE']

    if comparator.errors.any?
      fail "There were comparison errors: #{comparator.errors}"
    end
  end
end

def parse_ndjson_file(path)
  parse_ndjson(File.read(path))
end

def parse_ndjson(ndjson)
  Cucumber::Messages::NdjsonToMessageEnumerator.new(ndjson)
end

def message_type(message)
  message.to_h.keys.first
end

def debug_lists(expected, obtained)
  return unless ENV['VERBOSE']
  return if expected.sort == obtained.sort

  to_read = expected.count > obtained.count ? expected : obtained
  columnize = "\t\t\t\t | \t\t\t\t"

  puts "    | Expected #{columnize} GOT"
  to_read.each_with_index do |_, index|
    ok = expected[index] == obtained[index] ? 'v' : 'x'
    puts "[#{ok}] | #{expected[index]} #{columnize} #{obtained[index]}"
  end
end
