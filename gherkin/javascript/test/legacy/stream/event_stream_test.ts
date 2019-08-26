import * as assert from 'assert'
import * as fs from 'fs'
import { messages } from 'cucumber-messages'
import { legacy as Gherkin } from '../../../src'

type IEvent = Pick<messages.IEnvelope, 'source' | 'gherkinDocument' | 'pickle'>

function eventUri(event: IEvent) {
  return (event.source || event.gherkinDocument || event.pickle).uri
}

describe('EventStream (legacy)', () => {
  it("transforms input to stream", (callback) => {
    const events: IEvent[] = []
    const eventStream = new Gherkin.EventStream('test.feature', {
      'source': true,
      'gherkin-document': true,
      'pickle': true
    })
    eventStream.on('data', (data: IEvent) => events.push(data))
    eventStream.on('end', () => {
      assert.equal(events.length, 3)
      assert.deepEqual(events.map(eventUri), ['test.feature', 'test.feature', 'test.feature'])
      callback()
    })
    fs.createReadStream(__dirname + '/test.feature', { encoding: 'utf-8' }).pipe(eventStream)
  })

  it("accepts a language parameter", (callback) => {
    const events: IEvent[] = []
    const eventStream = new Gherkin.EventStream('test_fr.feature', {
      'source': true,
      'gherkin-document': true,
      'pickle': true
    }, 'fr')
    eventStream.on('data', (data: IEvent) => events.push(data))
    eventStream.on('end', () => {
      assert.equal(events.length, 3)
      assert.deepEqual(events.map(eventUri), ['test_fr.feature', 'test_fr.feature', 'test_fr.feature'])
      callback()
    })
    fs.createReadStream(__dirname + '/test_fr.feature', { encoding: 'utf-8' }).pipe(eventStream)
  })
})
