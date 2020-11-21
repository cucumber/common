require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'
require 'cucumber/cucumber_expressions/cucumber_expression_tokenizer'


module Cucumber
  module CucumberExpressions
    class CucumberExpressionParser
      def parse(expression)
        # text := token
        parse_text = lambda do |expression, tokens, current|
          token = tokens[current]
          return 1, [Node.new(NodeType::Text, nil, token.text, token.start, token.end)]
        end

        # parameter := '{' + text* + '}'
        parse_parameter = parse_between(
            NodeType::Parameter,
            TokenType::BeginParameter,
            TokenType::EndParameter,
            [parse_text]
        )

        # optional := '(' + option* + ')'
        # option := parameter | text
        parse_optional = parse_between(
            NodeType::Optional,
            TokenType::BeginOptional,
            TokenType::EndOptional,
            [parse_parameter, parse_text]
        )

        # alternation := alternative* + ( '/' + alternative* )+
        parse_alternative_separator = lambda do |expression, tokens, current|
          unless looking_at(tokens, current, TokenType::Alternation)
            return 0, nil
          end
          token = tokens[current]
          return 1, [Node.new(NodeType::Alternative, nil, token.text, token.start, token.end)]
        end

        alternative_parsers = [
            parse_alternative_separator,
            parse_optional,
            parse_parameter,
            parse_text,
        ]

        # alternation := (?<=left-boundary) + alternative* + ( '/' + alternative* )+ + (?=right-boundary)
        # left-boundary := whitespace | } | ^
        # right-boundary := whitespace | { | $
        # alternative: = optional | parameter | text
        parse_alternation = lambda do |expression, tokens, current|
          previous = current - 1
          unless looking_at_any(tokens, previous, [TokenType::StartOfLine, TokenType::WhiteSpace, TokenType::EndParameter])
            return 0, nil
          end

          consumed, ast = parse_tokens_until(expression, alternative_parsers, tokens, current, [TokenType::WhiteSpace, TokenType::EndOfLine, TokenType::BeginParameter])
          sub_current = current + consumed
          unless ast.map { |astNode| astNode.type }.include? NodeType::Alternative
            return 0, nil
          end

          start = tokens[current].start
          _end = tokens[sub_current].start
          # Does not consume right hand boundary token
          return consumed, [Node.new(NodeType::Alternation, split_alternatives(start, _end, ast), nil, start, _end)]
        end

        #
        # cucumber-expression :=  ( alternation | optional | parameter | text )*
        #
        parse_cucumber_expression = parse_between(
            NodeType::Expression,
            TokenType::StartOfLine,
            TokenType::EndOfLine,
            [parse_alternation, parse_optional, parse_parameter, parse_text]
        )

        tokenizer = CucumberExpressionTokenizer.new
        tokens = tokenizer.tokenize(expression)
        _, ast = parse_cucumber_expression.call(expression, tokens, 0)
        ast[0]
      end

      private

      def parse_between(type, begin_token, end_token, parsers)
        lambda do |expression, tokens, current|
          unless looking_at(tokens, current, begin_token)
            return 0, nil
          end
          sub_current = current + 1
          consumed, ast = parse_tokens_until(expression, parsers, tokens, sub_current, [end_token])
          sub_current += consumed

          # endToken not found
          unless looking_at(tokens, sub_current, end_token)
            raise MissingEndToken.new(expression, begin_token, end_token, tokens[current])
          end
          # consumes endToken
          start = tokens[current].start
          _end = tokens[sub_current].end
          consumed = sub_current + 1 - current
          ast = [Node.new(type, ast, nil, start, _end)]
          return consumed, ast
        end
      end

      def parse_token(expression, parsers, tokens, start_at)
        for parser in parsers do
          consumed, ast = parser.call(expression, tokens, start_at)
          unless consumed == 0
            return consumed, ast
          end
        end
        # If configured correctly this will never happen
        raise 'No eligible parsers for ' + tokens
      end

      def parse_tokens_until(expression, parsers, tokens, start_at, end_tokens)
        current = start_at
        size = tokens.length
        ast = []
        while current < size do
          if looking_at_any(tokens, current, end_tokens)
            break
          end
          consumed, sub_ast = parse_token(expression, parsers, tokens, current)
          if consumed == 0
            # If configured correctly this will never happen
            # Keep to avoid infinite loops
            raise 'No eligible parsers for ' + tokens
          end
          current += consumed
          ast += sub_ast
        end
        [current - start_at, ast]
      end

      def looking_at_any(tokens, at, token_types)
        for token_type in token_types
          if looking_at(tokens, at, token_type)
            return true
          end
        end
        false
      end

      def looking_at(tokens, at, token)
        if at < 0
          # If configured correctly this will never happen
          # Keep for completeness
          return token == TokenType::StartOfLine
        end
        if at >= tokens.length
          return token == TokenType::EndOfLine
        end
        tokens[at].type == token
      end

      def split_alternatives(start, _end, alternation)
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
        create_alternative_nodes(start, _end, separators, alternatives)
      end

      def create_alternative_nodes(start, _end, separators, alternatives)
        nodes = []
        alternatives.each_with_index do |n, i|
          if i == 0
            right_separator = separators[i]
            nodes.push(Node.new(NodeType::Alternative, n, nil, start, right_separator.start))
          elsif i == alternatives.length - 1
            left_separator = separators[i - 1]
            nodes.push(Node.new(NodeType::Alternative, n, nil, left_separator.end, _end))
          else
            left_separator = separators[i - 1]
            right_separator = separators[i]
            nodes.push(Node.new(NodeType::Alternative, n, nil, left_separator.end, right_separator.start))
          end
        end
        nodes
      end
    end
  end
end
