module.exports = {
  Parser: require('./gherkin/parser'),
  TokenScanner: require('./gherkin/token_scanner'),
  TokenMatcher: require('./gherkin/token_matcher'),
  AstBuilder: require('./gherkin/ast_builder'),
  Compiler: require('./gherkin/pickles/compiler'),
  DIALECTS: require('./gherkin/dialects'),
  generateEvents: require('./gherkin/generate_events'),
  EventStream: require("./gherkin/stream/event_stream")
};