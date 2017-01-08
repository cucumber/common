var Stream = require('stream')
var Parser = require('../parser')
var Compiler = require('../pickles/compiler')

var compiler = new Compiler();
var parser = new Parser();
parser.stopAtFirstError = false;

function gherkinStream(options) {
  return new Stream.Transform({
    objectMode: true,
    transform: function (event, _, callback) {
      if (event.type === 'source') {
        try {
          var gherkinDocument = parser.parse(event.data);

          if (options.printSource)
            this.push(event);

          if (options.printAst)
            this.push({
              type: 'gherkin-document',
              uri: event.uri,
              document: gherkinDocument
            });

          if (options.printPickles) {
            var pickles = compiler.compile(gherkinDocument  );
            for (var p in pickles) {
              this.push({
                type: 'pickle',
                uri: event.uri,
                pickle: pickles[p]
              })
            }
          }
        } catch (err) {
          var errors = err.errors || [err]
          for (var e in errors) {
            this.push({
              type: "attachment",
              source: {
                uri: event.uri,
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
      } else {
        this.push(event)
      }
      callback()
    }
  })
}

module.exports = gherkinStream
