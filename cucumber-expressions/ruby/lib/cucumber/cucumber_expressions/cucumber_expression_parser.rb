require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'

# text := token
parseText = lambda do |expression, tokens, current|
  token = tokens[current]
  return 1, [Node.new(NodeType::Text, nil, token.text, token.start, token.end)]
end

# parameter := '{' + text* + '}'
parseParameter = parseBetween(
    NodeType::Parameter,
    TokenType::BeginParameter,
    TokenType.EndParameter,
    [parseText]
)

# optional := '(' + option* + ')'
# option := parameter | text
parseOptional = parseBetween(
    NodeType::Optional,
    TokenType::BeginOptional,
    TokenType::EndOptional,
    [parseParameter, parseText]
)

# alternation := alternative* + ( '/' + alternative* )+
parseAlternativeSeparator = lambda do |expression, tokens, current|
  unless lookingAt(tokens, current, TokenType::Alternation)
    return 0, nil
  end
  token = tokens[current]
  return 1, [Node.new(NodeType::Alternative, nil, token.text, token.start, token.end)]
end

alternativeParsers = [
    parseAlternativeSeparator,
    parseOptional,
    parseParameter,
    parseText,
]

# alternation := (?<=left-boundary) + alternative* + ( '/' + alternative* )+ + (?=right-boundary)
# left-boundary := whitespace | } | ^
# right-boundary := whitespace | { | $
# alternative: = optional | parameter | text
parseAlternation = lambda do |expression, tokens, current|
  previous = current - 1
  unless lookingAtAny(tokens, previous, [TokenType::StartOfLine, TokenType::WhiteSpace, TokenType::EndParameter])
    return 0, nil
  end

  consumed, ast = parseTokensUntil(expression, alternativeParsers, tokens, current, [TokenType::WhiteSpace, TokenType::EndOfLine, TokenType::BeginParameter])
  subCurrent = current + consumed
  if ast.map { |astNode| astNode.type }.include? NodeType::Alternative
    return 0, nil
  end

  start = tokens[current].start
  _end = tokens[subCurrent].start
  # Does not consume right hand boundary token
  return consumed, [Node.new(NodeType::Alternation, splitAlternatives(start, _end, ast), nil, start, _end)]
end

#
# cucumber-expression :=  ( alternation | optional | parameter | text )*
#
parseCucumberExpression = parseBetween(
    NodeType::Expression,
    TokenType::StartOfLine,
    TokenType::EndOfLine,
    [parseAlternation, parseOptional, parseParameter, parseText]
)

module Cucumber
  module CucumberExpressions
    class CucumberExpressionParser
      def parse(expression)
        tokenizer = CucumberExpressionTokenizer.new
        tokens = tokenizer.tokenize(expression)
        _, ast = parseCucumberExpression(expression, tokens, 0)
        ast[0]
      end
    end
  end
end

def parseBetween(type, beginToken, endToken, parsers)
  lambda do |expression, tokens, current|
    unless lookingAt(tokens, current, beginToken)
      return 0, nil
    end
    subCurrent = current + 1
    consumed, ast = parseTokensUntil(expression, parsers, tokens, subCurrent, [endToken])
    subCurrent += consumed

    # endToken not found
    unless lookingAt(tokens, subCurrent, endToken)
      raise "createMissingEndToken"
      # throw createMissingEndToken(
      #           expression,
      #           beginToken,
      #           endToken,
      #           tokens[current]
      #       )
    end
    # consumes endToken
    start = tokens[current].start
    _end = tokens[subCurrent].end
    consumed = subCurrent + 1 - current
    ast = [Node.new(type, ast, nil, start, _end)]
    return consumed, ast
  end
end

## Next up parseToken
