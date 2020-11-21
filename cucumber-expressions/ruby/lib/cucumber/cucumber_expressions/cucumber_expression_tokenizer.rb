require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionTokenizer
      def tokenize(expression)
        @expression = expression
        tokens = []
        @buffer = []
        previous_token_type = TokenType::StartOfLine
        treat_as_text = false
        @escaped = 0
        @buffer_start_index = 0

        codepoints = expression.codepoints

        if codepoints.empty?
          tokens.push(Token.new(TokenType::StartOfLine, '', 0, 0))
        end

        codepoints.each do |codepoint|
          if !treat_as_text && Token.isEscapeCharacter(codepoint)
            @escaped += 1
            treat_as_text = true
            next
          end
          current_token_type = token_type_of(codepoint, treat_as_text)
          treat_as_text = false

          if should_create_new_token(previous_token_type, current_token_type)
            token = convert_buffer_to_token(previous_token_type)
            previous_token_type = current_token_type
            @buffer.push(codepoint)
            tokens.push(token)
          else
            previous_token_type = current_token_type
            @buffer.push(codepoint)
          end
        end

        if @buffer.length > 0
          token = convert_buffer_to_token(previous_token_type)
          tokens.push(token)
        end

        if treat_as_text
          raise TheEndOfLineCannotBeEscaped.new(expression)
        end

        tokens.push(
            Token.new(TokenType::EndOfLine, '', codepoints.length, codepoints.length)
        )
        tokens
      end

      private

      # TODO: Make these lambdas

      def convert_buffer_to_token(token_type)
        escape_tokens = 0
        if token_type == TokenType::Text
          escape_tokens = @escaped
          @escaped = 0
        end

        consumed_index = @buffer_start_index + @buffer.length + escape_tokens
        t = Token.new(
            token_type,
            @buffer.map { |codepoint| codepoint.chr(Encoding::UTF_8) }.join(''),
            @buffer_start_index,
            consumed_index
        )
        @buffer = []
        @buffer_start_index = consumed_index
        t
      end

      def token_type_of(codepoint, treat_as_text)
        unless treat_as_text
          return Token.typeOf(codepoint)
        end
        if Token.canEscape(codepoint)
          return TokenType::Text
        end
        raise CantEscape.new(
            @expression,
            @buffer_start_index + @buffer.length + @escaped
        )
      end

      def should_create_new_token(previous_token_type, current_token_type)
        current_token_type != previous_token_type ||
            (current_token_type != TokenType::WhiteSpace && current_token_type != TokenType::Text)
      end
    end
  end
end
