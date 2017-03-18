/* eslint-env mocha */
const Stream = require('stream')
const assert = require('assert')
const Gherkin = require('gherkin')
const eventValidator = require('cucumber-event-validator')
const {
  reducer,
  lineAttachments,
  featureNames
} = require('../src')

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

const media = {
  "encoding": "utf-8",
  "type": "text/vnd.cucumber.stacktrace.java+plain"
}

function attachmentEvent(uri, line, data) {
  return {
    "type": "attachment",
    "source": {
      "uri": uri,
      "start": {
        "line": line,
        "column": 1
      }
    },
    "data": data,
    "media": media
  }
}

class ReducerStream extends Stream.Writable {
  constructor(reducer) {
    super({
      objectMode: true,
      write: (event, _, callback) => {
        try {
          eventValidator(event)
        } catch(err) {
          err.message += `\nEvent:\n${JSON.stringify(event, null, 2)}`
          return callback(err)
        }

        try {
          this.state = reducer(this.state, event)
          return callback()
        } catch(err) {
          return callback(err)
        }
      }
    })
    this.state = reducer()
  }
}

async function write(events) {
  const stream = new Stream.PassThrough({objectMode: true})
  const reducerStream = stream
    .pipe(Gherkin.Stream.createGherkinStream({printSource: true, printAst: true, printPickles: true}))
    .pipe(new ReducerStream(reducer))

  for(const event of events) {
    stream.write(event)
  }
  stream.end()

  await new Promise((resolve, reject) => {
    reducerStream.on('finish', resolve)
    reducerStream.on('error', reject)
  })
  return reducerStream.state
}

describe(reducer.name, () => {
  it("keeps a map of parsed gherkin AST documents", async function() {
    const state = await write([
      sourceEvent("features/hello.feature", "Feature: Hello\n"),
      sourceEvent("features/world.feature", "Feature: World\n")
    ])
    assert.deepEqual(featureNames(state), ['Hello', 'World'])
  })

  it("links attachments to line number", async function() {
    const data1 = "Exception in thread \"main\" java.lang.NullPointerException\n"
    const data2 = "Exception in thread \"main\" java.lang.RuntimeException\n"
    const state = await write([
      sourceEvent("features/hello.feature", "Feature: Hello\n"),
      attachmentEvent("features/hello.feature", 22, data1),
      attachmentEvent("features/hello.feature", 22, data2)
    ])

    const attachments = lineAttachments(state, 'features/hello.feature', 22)
    assert.deepEqual(attachments.toJS(), [
      { data: data1, media },
      { data: data2, media }
    ])
  })
})
