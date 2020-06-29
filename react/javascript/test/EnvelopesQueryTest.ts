import { EnvelopesQuery } from '../src/EnvelopesQueryContext'
import { messages } from '@cucumber/messages'
import assert from 'assert'

describe('EnvelopesQuery', () => {
  let query: EnvelopesQuery
  const envelopes = [
    messages.Envelope.create({
      meta: messages.Meta.create({
        protocolVersion: 'X.Y.Z',
      }),
    }),
    messages.Envelope.create({
      gherkinDocument: messages.GherkinDocument.create({
        uri: 'some/gherkin_document',
      }),
    }),
    messages.Envelope.create({
      pickle: messages.Pickle.create({
        id: '1',
      }),
    }),
    messages.Envelope.create({
      pickle: messages.Pickle.create({
        id: '2',
      }),
    }),
    messages.Envelope.create({
      pickle: messages.Pickle.create({
        id: '3',
      }),
    }),
  ]

  beforeEach(() => {
    query = new EnvelopesQuery()
    for (const envelope of envelopes) {
      query.update(envelope)
    }
  })

  context('find', () => {
    it('returns undefined when no envelope matches', () => {
      assert.strictEqual(
        query.find((env) => env.hook !== null),
        undefined
      )
    })

    it('returns the first matching envelope', () => {
      assert.strictEqual(
        query.find((env) => env.meta !== null),
        envelopes[0]
      )
    })

    it('returns the first matching envelope even when there are multiple matches', () => {
      assert.strictEqual(
        query.find((env) => env.pickle !== null),
        envelopes[2]
      )
    })
  })
  context('filter', () => {
    it('returns an empty list when there are no match', () => {
      assert.deepStrictEqual(
        query.filter((env) => env.hook !== null),
        []
      )
    })

    it('returns all matching envelopes', () => {
      assert.deepStrictEqual(
        query.filter((env) => env.pickle !== null),
        envelopes.slice(2)
      )
    })
  })
})
