var Parser = require('./parser')
var Compiler = require('./pickles/compiler')
var Crypto = require('crypto')
var TokenMatcher = require('./token_matcher')

var compiler = new Compiler()
var parser = new Parser()
parser.stopAtFirstError = false

function numberToInt32LE(value) {
  var buffer = Buffer.allocUnsafe(4)
  buffer.writeInt32LE(value)
  return buffer
}

function makeId(data, locations) {
  var shasum = Crypto.createHash('sha1')
  shasum.update(Buffer.from(data))
  for (var l in locations) {
    shasum.update(numberToInt32LE(locations[l].line));
    shasum.update(numberToInt32LE(locations[l].column));
  }
  return shasum.digest('hex')
}

function generateEvents(data, uri, types, language) {
  types = Object.assign({
    'source': true,
    'gherkin-document': true,
    'pickle': true
  }, types || {})

  result = []

  try {
    if (types['source']) {
      result.push({
        source: {
          uri: uri,
          data: data,
          media: {
            encoding: 'UTF8',
            contentType: 'text/x.cucumber.gherkin+plain'
          }
        }
      })
    }

    if (!types['gherkin-document'] && !types['pickle'])
      return result

    var gherkinDocument = parser.parse(data, new TokenMatcher(language))

    if (types['gherkin-document']) {
      result.push({
        gherkinDocument: { ...gherkinDocument, uri }
      })
    }

    if (types['pickle']) {
      var pickles = compiler.compile(gherkinDocument)
      for (var p in pickles) {
        var id = makeId(data, pickles[p].locations);
        result.push({
          pickle: { ...pickles[p], id, uri }
        })
      }
    }
  } catch (err) {
    var errors = err.errors || [err]
    for (var e in errors) {
      result.push({
        attachment: {
          source: {
            uri: uri,
            location: {
              line: errors[e].location.line,
              column: errors[e].location.column
            }
          },
          data: errors[e].message
        }
      })
    }
  }
  return result
}

module.exports = generateEvents
