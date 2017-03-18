/* eslint-env mocha */
const Stream = require('stream')
const assert = require('assert')
const Gherkin = require('gherkin')
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

class ReducerStream extends Stream.Writable {
  constructor(reducer) {
    super({
      objectMode: true,
      write: (event, _, callback) => {
        try {
          this.state = reducer(this.state, event)
          callback()
        } catch(err) {
          callback(err)
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
    const state = await write([
      sourceEvent("features/hello.feature", "Feature: Hello\n"),
      {
        "type": "attachment",
        "timestamp": 1471420027078,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "source": {
          "uri": "features/hello.feature",
          "start": {
            "line": 22,
            "column": 7
          }
        },
        "uri": "build/screenshots/hello.png"
      },
      {
        "type": "attachment",
        "timestamp": 1471420027078,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "source": {
          "uri": "features/hello.feature",
          "start": {
            "line": 22,
            "column": 7
          }
        },
        "uri": "build/screenshots/world.png"
      }
    ])

    const attachments = lineAttachments(state, 'features/hello.feature', 22)
    assert.deepEqual(attachments.toJS(), [
      { uri: 'build/screenshots/hello.png', data: undefined, media: undefined },
      { uri: 'build/screenshots/world.png', data: undefined, media: undefined }
    ])
  })
})
