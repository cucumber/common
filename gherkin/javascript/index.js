(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory)
  }
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/RequireJS
    module.exports = factory();
  }
  if (typeof window === 'object'){
    // Browser globals
    window.Gherkin = factory();
  }
}(function () {
  return {
    Parser: require('./lib/gherkin/parser'),
    TokenScanner: require('./lib/gherkin/token_scanner'),
    TokenMatcher: require('./lib/gherkin/token_matcher'),
    AstBuilder: require('./lib/gherkin/ast_builder'),
    Compiler: require('./lib/gherkin/pickles/compiler'),
    DIALECTS: require('./lib/gherkin/dialects'),
    MessageStream: require('./lib/gherkin/messages/message_stream'),
    SourceStream: require('./lib/gherkin/messages/source_stream')
  };
}));
