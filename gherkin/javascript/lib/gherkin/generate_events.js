var Parser = require('./parser')
var Compiler = require('./pickles/compiler')

var compiler = new Compiler()
var parser = new Parser()
parser.stopAtFirstError = false

function events(data, uri) {
  result = []

  try {
    result.push({
      type: 'source',
      uri: uri,
      data: data,
      media: {
        encoding: 'utf-8',
        type: 'text/vnd.cucumber.gherkin+plain'
      }
    })
    var gherkinDocument = parser.parse(data)
    result.push({
      type: 'gherkin-document',
      uri: uri,
      document: gherkinDocument
    })
    var pickles = compiler.compile(gherkinDocument)
    for (var p in pickles) {
      result.push({
        type: 'pickle',
        uri: uri,
        pickle: pickles[p]
      })
    }
  } catch (err) {
    var errors = err.errors || [err]
    for (var e in errors) {
      result.push({
        type: "attachment",
        source: {
          uri: uri,
          start: {
            line: errors[e].location.line,
            column: errors[e].location.column
          }
        },
        data: errors[e].message,
        media: {
          encoding: "utf-8",
          type: "text/vnd.cucumber.stacktrace+plain"
        }
      })
    }
  }
  return result
}

module.exports = events
