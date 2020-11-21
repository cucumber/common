module Cucumber
  module CucumberExpressions
    EscapeCharacter = '\\'
    AlternationCharacter = '/'
    BeginParameterCharacter = '{'
    EndParameterCharacter = '}'
    BeginOptionalCharacter = '('
    EndOptionalCharacter = ')'

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

      def type
        @type
      end

      def nodes
        @nodes
      end

      def token
        @token
      end

      def start
        @start
      end

      def end
        @end
      end

      def text
        if @token.nil?
          return @nodes.map { |value| value.text }.join('')
        end
        return @token
      end

      def to_hash
        hash = Hash.new
        hash["type"] = @type
        unless @nodes.nil?
          hash["nodes"] = @nodes.map { |node| node.to_hash }
        end
        unless @token.nil?
          hash["token"] = @token
        end
        hash["start"] = @start
        hash["end"] = @end
        hash
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
        codepoint.chr(Encoding::UTF_8) == EscapeCharacter
      end

      def self.canEscape(codepoint)
        c = codepoint.chr(Encoding::UTF_8)
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
        c = codepoint.chr(Encoding::UTF_8)
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

      def self.symbolOf(token)
        case token
        when TokenType::BeginOptional
          return BeginOptionalCharacter
        when TokenType::EndOptional
          return EndOptionalCharacter
        when TokenType::BeginParameter
          return BeginParameterCharacter
        when TokenType::EndParameter
          return EndParameterCharacter
        when TokenType::Alternation
          return AlternationCharacter
        else
          return ''
        end
      end

      def self.purposeOf(token)
        case token
        when TokenType::BeginOptional
          return 'optional text'
        when TokenType::EndOptional
          return 'optional text'
        when TokenType::BeginParameter
          return 'a parameter'
        when TokenType::EndParameter
          return 'a parameter'
        when TokenType::Alternation
          return 'alternation'
        else
          return ''
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
