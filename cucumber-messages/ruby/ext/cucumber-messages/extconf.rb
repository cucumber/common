require "mkmf"

find_executable('protoc')
makefile_content = ''

if File.exist?('../../lib/cucumber/messages_pb.rb')
  makefile_content = %Q(
default:
\t@echo "Nothing to do"
.PHONY: clean

install:
\t@echo "Nothing to do"
.PHONY: clean

clean:
\t@echo "Nothing to do"
.PHONY: clean
)
else
  makefile_content = %Q(
SHELL := /usr/bin/env bash

default: ../../lib/cucumber/messages_pb.rb

../../lib/cucumber/messages_pb.rb: ../../messages.proto
\tpushd ../.. && protoc -I. --ruby_out lib/cucumber messages.proto && popd

install:
\t@echo "Not much to do in fact"
.PHONY: clean

clean:
\trm ../../lib/cucumber/messages_pb.rb
.PHONY: clean
)
end

File.open(File.join(Dir.pwd, 'Makefile'), 'w') do |file|
  file.write makefile_content
end

$makefile_created = true
