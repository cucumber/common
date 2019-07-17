#!/usr/bin/env ruby
#
# Reads a JSON-encoded Cucumber Message from STDIN and writes it to
# STDOUT with delimited binary encoding.
require 'json'
require 'cucumber/messages'

envelope = Cucumber::Messages::Envelope.new(JSON.parse(STDIN.read))
envelope.write_delimited_to(STDOUT)