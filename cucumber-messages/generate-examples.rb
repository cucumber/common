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
require_relative 'docgen/message'

messages_hash = JSON.parse(IO.read(File.dirname(__FILE__) + '/messages.json'))
messages = Message.all(messages_hash)

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
