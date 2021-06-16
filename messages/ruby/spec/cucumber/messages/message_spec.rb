require 'cucumber/messages'

module Cucumber
  module Messages
    describe Envelope do
      describe '#to_h' do
        it 'generates a hash without keys for nil values' do
          envelope = Envelope.new(
            meta: Meta.new
          )
          hash = envelope.to_hash
          expect(hash).to eq({
            meta: {
              protocolVersion: '',
              implementation: {
                name: ''
              },
              runtime: {
                name: ''
              },
              os: {
                name: ''
              },
              cpu: {
                name: ''
              }
            }
          })
        end
      end
    end
  end
end
