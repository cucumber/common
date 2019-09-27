require "mkmf"

find_executable('protoc')

File.open(File.join(Dir.pwd, 'Makefile'), 'w') do |file|
  file.write %Q(
default:
\tpushd ../.. && protoc -I. -I/usr/local/include --ruby_out lib/cucumber messages.proto && popd

install:
\t@echo "Not much to do in fact"
.PHONY: clean

clean:
\trm ../../lib/cucumber/messages_pb.rb
.PHONY: clean
)
end

$makefile_created = true
