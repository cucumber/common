(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    // Node.js/IO.js/RequireJS
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Gherkin = factory();
  }
}(this, function () {
  return {
    Parser: require('./lib/gherkin/parser'),
    TokenScanner: require('./lib/gherkin/token_scanner'),
    TokenMatcher: require('./lib/gherkin/token_matcher'),
    AstBuilder: require('./lib/gherkin/ast_builder'),
    Compiler: require('./lib/gherkin/pickles/compiler'),
    DIALECTS: require('./lib/gherkin/dialects'),
    Stream: {
      createGherkinStream: require('./lib/gherkin/stream/gherkin_stream'),
      createSourceEventStream: require('./lib/gherkin/stream/source_event_stream'),
      createNdjsonStream: require('./lib/gherkin/stream/ndjson_stream')
    }
  };
}));
