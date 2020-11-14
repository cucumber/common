module Cucumber
  module CucumberExpressions
    EscapeCharacter = '\\'
    AlternationCharacter = '/'
    BeginParameterCharacter = '{'
    EndParameterCharacter = '}'
    BeginOptionalCharacter = '('
    EndOptionalCharacter = ')'

    # export function symbolOf(token: TokenType): string {
    #   switch (token) {
    #     case TokenType.beginOptional:
    #       return BeginOptionalCharacter
    #     case TokenType.endOptional:
    #       return EndOptionalCharacter
    #     case TokenType.beginParameter:
    #       return BeginParameterCharacter
    #     case TokenType.endParameter:
    #       return EndParameterCharacter
    #     case TokenType.alternation:
    #       return AlternationCharacter
    #   }
    #   return ''
    # }
    #
    # export function purposeOf(token: TokenType): string {
    #   switch (token) {
    #     case TokenType.beginOptional:
    #     case TokenType.endOptional:
    #       return 'optional text'
    #     case TokenType.beginParameter:
    #     case TokenType.endParameter:
    #       return 'a parameter'
    #     case TokenType.alternation:
    #       return 'alternation'
    #   }
    #   return ''
    # }
    #
    # export interface Located {
    #   readonly start: number
    #   readonly end: number
    # }
    #
    class Node
      def initialize(type, nodes, token, start, _end)
        if nodes.nil? && token.nil?
          raise 'Either nodes or token must be defined'
        end
        @type = type
        @nodes = nodes
        @token = token
        @start = start
        @end = _end
      end

      def text
        if @token.nil?
          return @nodes.map { |value| value.text }.join('')
        end
        return @token
      end

      def to_hash
        {
            "type" => @type,
            "nodes" => @nodes.nil? ? @nodes : @nodes.map { |node| node.to_hash },
            "token" => @token,
            "start" => @start,
            "end" => @end
        }
      end
    end

    module NodeType
      Text = 'TEXT_NODE'
      Optional = 'OPTIONAL_NODE'
      Alternation = 'ALTERNATION_NODE'
      Alternative = 'ALTERNATIVE_NODE'
      Parameter = 'PARAMETER_NODE'
      Expression = 'EXPRESSION_NODE'
    end


    class Token
      def initialize(type, text, start, _end)
        @type, @text, @start, @end = type, text, start, _end
      end

      def type
        @type
      end

      def text
        @text
      end

      def start
        @start
      end

      def end
        @end
      end

      def self.isEscapeCharacter(codepoint)
        codepoint.chr == EscapeCharacter
      end

      def self.canEscape(codepoint)
        c = codepoint.chr
        if c == ' '
          # TODO: Unicode whitespace?
          return true
        end
        case c
        when EscapeCharacter
          true
        when AlternationCharacter
          true
        when BeginParameterCharacter
          true
        when EndParameterCharacter
          true
        when BeginOptionalCharacter
          true
        when EndOptionalCharacter
          true
        else
          false
        end
      end

      def self.typeOf(codepoint)
        c = codepoint.chr
        if c == ' '
          # TODO: Unicode whitespace?
          return TokenType::WhiteSpace
        end
        case c
        when AlternationCharacter
          TokenType::Alternation
        when BeginParameterCharacter
          TokenType::BeginParameter
        when EndParameterCharacter
          TokenType::EndParameter
        when BeginOptionalCharacter
          TokenType::BeginOptional
        when EndOptionalCharacter
          TokenType::EndOptional
        else
          TokenType::Text
        end
      end

      def to_hash
        {
            "type" => @type,
            "text" => @text,
            "start" => @start,
            "end" => @end
        }
      end
    end

    module TokenType
      StartOfLine = 'START_OF_LINE'
      EndOfLine = 'END_OF_LINE'
      WhiteSpace = 'WHITE_SPACE'
      BeginOptional = 'BEGIN_OPTIONAL'
      EndOptional = 'END_OPTIONAL'
      BeginParameter = 'BEGIN_PARAMETER'
      EndParameter = 'END_PARAMETER'
      Alternation = 'ALTERNATION'
      Text = 'TEXT'
    end
  end
end
