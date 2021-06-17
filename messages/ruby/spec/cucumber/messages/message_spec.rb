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

    describe Scenario do
      describe '#to_camel_symbol_hash' do
        it 'traverses object arrays' do
          scenario = Scenario.new(
            id: '99',
            location: Location.new(
              line: 5
            ),
            keyword: 'Scenario',
            name: 'My Scenario',
            description: 'bla',
            tags: [],
            steps: [
              Step.new(
                id: '100',
                location: Location.new(
                  line: 6
                ),
                keyword: 'Given ',
                text: 'step one'
              ),
              Step.new(
                id: '101',
                location: Location.new(
                  line: 7
                ),
                keyword: 'When ',
                text: 'step two'
              )
            ]
          )
          hash = scenario.to_camel_symbol_hash
          expect(hash).to eq({
                               id: '99',
                               location: {
                                 line: 5
                               },
                               keyword: 'Scenario',
                               name: 'My Scenario',
                               description: 'bla',
                               tags: [],
                               steps: [
                                 {
                                   id: '100',
                                   location: {
                                     line: 6
                                   },
                                   keyword: 'Given ',
                                   text: 'step one'
                                 },
                                 {
                                   id: '101',
                                   location: {
                                     line: 7
                                   },
                                   keyword: 'When ',
                                   text: 'step two'
                                 }
                               ],
                               examples: []
                             })
        end
      end

      describe '.from_camel_symbol_hash' do
        it 'generates an instance' do
          scenario = Scenario.from_camel_symbol_hash(
            {
              id: '99',
              location: {
                line: 5
              },
              keyword: 'Scenario',
              name: 'My Scenario',
              description: 'bla',
              tags: [],
              steps: [
                {
                  id: '100',
                  location: {
                    line: 6
                  },
                  keyword: 'Given ',
                  text: 'step one'
                },
                {
                  id: '101',
                  location: {
                    line: 7
                  },
                  keyword: 'When ',
                  text: 'step two'
                }
              ],
              examples: []
            }
          )
          expect(scenario.to_camel_symbol_hash).to eq(Scenario.new(
            id: '99',
            location: Location.new(
              line: 5
            ),
            keyword: 'Scenario',
            name: 'My Scenario',
            description: 'bla',
            tags: [],
            steps: [
              Step.new(
                id: '100',
                location: Location.new(
                  line: 6
                ),
                keyword: 'Given ',
                text: 'step one'
              ),
              Step.new(
                id: '101',
                location: Location.new(
                  line: 7
                ),
                keyword: 'When ',
                text: 'step two'
              )
            ]).to_camel_symbol_hash)
        end
      end
    end

  end
end
