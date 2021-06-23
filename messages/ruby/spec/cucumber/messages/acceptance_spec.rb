require 'json'
require 'cucumber/messages'
require 'cucumber/messages.deserializers'

module Cucumber
  module Messages
    describe 'messages acdeptance tests' do
      # TODO: Remove '/minimal' from the glob
      Dir["#{File.dirname(__FILE__)}/../../../../../compatibility-kit/javascript/features/**/*.ndjson"].each do |ndjson_file|
        it "deserialises and serialises messages in #{ndjson_file}" do
          File.open(ndjson_file, 'r:utf-8') do |io|
            io.each_line do |json|
              check(json)
            end
          end
        end
      end

      def check(json)
        hash = JSON.parse(json)
        envelope = Envelope.from_json(json)
        new_json = envelope.to_json
        new_hash = JSON.parse(new_json)
        expect(new_hash).to eq(hash)
      end
    end
  end
end
