require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionTokenizer
      def tokenize(expression)
        @expression = expression
        tokens = []
        @buffer = []
        previousTokenType = TokenType::StartOfLine
        treatAsText = false
        @escaped = 0
        @bufferStartIndex = 0

        codepoints = expression.codepoints

        if codepoints.empty?
          tokens.push(Token.new(TokenType::StartOfLine, '', 0, 0))
        end

        codepoints.each do |codepoint|
          if !treatAsText && Token.isEscapeCharacter(codepoint)
            @escaped += 1
            treatAsText = true
            next
          end
          currentTokenType = tokenTypeOf(codepoint, treatAsText)
          treatAsText = false

          if shouldCreateNewToken(previousTokenType, currentTokenType)
            token = convertBufferToToken(previousTokenType)
            previousTokenType = currentTokenType
            @buffer.push(codepoint)
            tokens.push(token)
          else
            previousTokenType = currentTokenType
            @buffer.push(codepoint)
          end
        end

        if @buffer.length > 0
          token = convertBufferToToken(previousTokenType)
          tokens.push(token)
        end

        if (treatAsText)
          raise TheEndOfLineCannotBeEscaped.new(expression)
        end

        tokens.push(
          Token.new(TokenType::EndOfLine, '', codepoints.length, codepoints.length)
        )
        tokens
      end

      private
      # TODO: Make these lambdas

      def convertBufferToToken(tokenType)
        escapeTokens = 0
        if (tokenType == TokenType::Text)
          escapeTokens = @escaped
          @escaped = 0
        end

        consumedIndex = @bufferStartIndex + @buffer.length + escapeTokens
        t = Token.new(
          tokenType,
          @buffer.map{|codepoint| codepoint.chr}.join(''),
          @bufferStartIndex,
          consumedIndex
        )
        @buffer = []
        @bufferStartIndex = consumedIndex
        return t
      end

      def tokenTypeOf(codepoint, treatAsText)
        if !treatAsText
          return Token.typeOf(codepoint)
        end
        if Token.canEscape(codepoint)
          return TokenType::Text
        end
        raise CantEscape.new(
          @expression,
          @bufferStartIndex + @buffer.length + @escaped
        )
      end

      def shouldCreateNewToken(previousTokenType, currentTokenType)
        if (currentTokenType != previousTokenType)
          return true
        end
        return (
          currentTokenType != TokenType::WhiteSpace &&
          currentTokenType != TokenType::Text
        )
      end
    end
  end
end
