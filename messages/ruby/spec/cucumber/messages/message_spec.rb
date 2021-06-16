require 'cucumber/messages'

module Cucumber
  module Messages
    describe Envelope do
      describe '#to_camel_symbol_hash' do
        it 'generates a symbol Hash without nil entries' do
          envelope = Envelope.new(
            meta: Meta.new
          )
          hash = envelope.to_camel_symbol_hash
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

      describe '.from_camel_symbol_hash' do
        it 'generates an instance' do
          envelope = Envelope.from_camel_symbol_hash(
            {
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
            }
          )
          expect(envelope.to_camel_symbol_hash).to eq(Envelope.new(
            meta: Meta.new
          ).to_camel_symbol_hash)
        end
      end
    end
  end
end
