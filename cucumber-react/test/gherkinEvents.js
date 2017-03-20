// Utility for creating Gherkin events. Used for testing.

const Stream = require('stream')
const Gherkin = require('gherkin')
const eventValidator = require('cucumber-event-validator')

function sourceEvent(uri, data) {
  return {
    type: 'source',
    uri,
    data,
    media: {
      encoding: 'utf-8',
      type: 'text/vnd.cucumber.gherkin+plain'
    }
  }
}

async function gherkinEvents(uri, data) {
  return new Promise((resolve, reject) => {
    const events = []
    const stream = Gherkin.Stream.createGherkinStream({printSource: true, printAst: true, printPickles: true})
    stream.pipe(new Stream.Writable({
      objectMode: true,
      write: (event, _, callback) => {
        try {
          eventValidator(event)
          events.push(event)
          callback()
        } catch(err) {
          err.message += `\nEvent:\n${JSON.stringify(event, null, 2)}`
          return callback(err)
        }
      }
    })).on('finish', () => resolve(events)).on('error', reject)
    stream.write(sourceEvent(uri, data))
    stream.end()
  })
}

module.exports = gherkinEvents
