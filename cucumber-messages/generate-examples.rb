#!/usr/bin/env ruby
#
# Generates examples for each Envelope message. Each example is written to disk 
# as a JSON document. These examples serve two purposes:
#
# - Living Documentation (they're examples of messages)
# - Input for approval tests (after processing with ./json2protobuf.rb)
#
# The examples are generated from ./messages.json - a file containing meta-information
# about the messages. It's generated with pseudomuto/protoc-gen-doc
require 'json'
require 'fileutils'

messages = {}
meta = JSON.parse(IO.read(File.dirname(__FILE__) + '/messages.json'))
meta['files'].each do |file|
  file['messages'].each do |message|
    long_name = message['longName']
    messages[long_name] = message
  end
end

class Message
  def initialize(long_name, messages)
    @long_name = long_name
    @messages = messages
  end
  
  def example
    m = @messages[@long_name]
    raise "No such message: #{@long_name}" unless m
    e = {}
    m['fields'].each do |field|
      field_name = field['name']
      long_type = field['longType']
      repeated = field['label'] == 'repeated'
      field_examples = []
      if @messages[long_type]
        field = Message.new(long_type, @messages)
        field_examples.push(field.example)
      else
        description = field['description']
        description.split(/\n/).each do |line|
          if /^\s*Example:\s*(.*)/ =~ line
            field_examples.push(JSON.parse($1))
          end
        end
      end
      e[field_name] = repeated ? field_examples : field_examples[0]
    end
    e
  end
end

FileUtils.rm_rf("examples")
FileUtils.mkdir("examples")
envelope = messages['Envelope']
envelope['fields'].each do |field|
  name = field['name']
  type = field['type']
  long_type = field['longType']
  if messages[long_type]
    message = Message.new(long_type, messages)
    envelope = {}
    envelope[name] = message.example
    File.open("examples/#{type}.json", "w") do |io|
      io.puts JSON.pretty_generate(envelope)
    end
  end
end
