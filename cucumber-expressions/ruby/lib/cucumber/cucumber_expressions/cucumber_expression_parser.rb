require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'


module Cucumber
  module CucumberExpressions
    class CucumberExpressionParser
      def parse(expression)
        # text := token
        parseText = lambda do |expression, tokens, current|
          token = tokens[current]
          return 1, [Node.new(NodeType::Text, nil, token.text, token.start, token.end)]
        end

        # parameter := '{' + text* + '}'
        parseParameter = parseBetween(
            NodeType::Parameter,
            TokenType::BeginParameter,
            TokenType::EndParameter,
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
          unless ast.map { |astNode| astNode.type }.include? NodeType::Alternative
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

        tokenizer = CucumberExpressionTokenizer.new
        tokens = tokenizer.tokenize(expression)
        _, ast = parseCucumberExpression.call(expression, tokens, 0)
        ast[0]
      end

      private

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

      def parseToken(expression, parsers, tokens, startAt)
        for parser in parsers do
          consumed, ast = parser.call(expression, tokens, startAt)
          unless consumed == 0
            return consumed, ast
          end
        end
        # If configured correctly this will never happen
        raise 'No eligible parsers for ' + tokens
      end

      def parseTokensUntil(expression, parsers, tokens, startAt, endTokens)
        current = startAt
        size = tokens.length
        ast = []
        while current < size do
          if lookingAtAny(tokens, current, endTokens)
            break
          end
          consumed, subAst = parseToken(expression, parsers, tokens, current)
          if consumed == 0
            # If configured correctly this will never happen
            # Keep to avoid infinite loops
            raise 'No eligible parsers for ' + tokens
          end
          current += consumed
          ast += subAst
        end
        return current - startAt, ast
      end

      def lookingAtAny(tokens, at, tokenTypes)
        for tokenType in tokenTypes
          if lookingAt(tokens, at, tokenType)
            return true
          end
        end
        return false
      end

      def lookingAt(tokens, at, token)
        if at < 0
          # If configured correctly this will never happen
          # Keep for completeness
          return token == TokenType::StartOfLine
        end
        if at >= tokens.length
          return token == TokenType::EndOfLine
        end
        return tokens[at].type == token
      end

      def splitAlternatives(start, _end, alternation)
        separators = []
        alternatives = []
        alternative = []
        alternation.each { |n|
          if NodeType::Alternative == n.type
            separators.push(n)
            alternatives.push(alternative)
            alternative = []
          else
            alternative.push(n)
          end
        }
        alternatives.push(alternative)
        return createAlternativeNodes(start, _end, separators, alternatives)
      end

      def createAlternativeNodes(start, _end, separators, alternatives)
        nodes = []
        for i in 0..alternatives.length - 1
          n = alternatives[i]
          if (i == 0)
            rightSeparator = separators[i]
            nodes.push(Node.new(NodeType::Alternative, n, nil, start, rightSeparator.start))
          elsif i == alternatives.length - 1
            leftSeparator = separators[i - 1]
            nodes.push(Node.new(NodeType::Alternative, n, nil, leftSeparator.end, _end))
          else
            leftSeparator = separators[i - 1]
            rightSeparator = separators[i]
            nodes.push(Node.new(NodeType::Alternative, n, nil, leftSeparator.end, rightSeparator.start))
          end
        end
        return nodes
      end
    end
  end
end
