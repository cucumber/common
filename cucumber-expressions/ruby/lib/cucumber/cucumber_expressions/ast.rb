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
    # export class Node {
    #   readonly type: NodeType
    #   readonly nodes?: ReadonlyArray<Node> | undefined
    #   readonly token?: string | undefined
    #   readonly start: number
    #   readonly end: number
    #
    #   constructor(
    #     type: NodeType,
    #     nodes: ReadonlyArray<Node> = undefined,
    #     token: string = undefined,
    #     start: number,
    #     end: number
    #   ) {
    #     if (nodes === undefined && token === undefined) {
    #       throw new Error('Either nodes or token must be defined')
    #     }
    #     if (nodes === null || token === null) {
    #       throw new Error('Either nodes or token may not be null')
    #     }
    #     this.type = type
    #     this.nodes = nodes
    #     this.token = token
    #     this.start = start
    #     this.end = end
    #   }
    #
    #   text(): string {
    #     if (this.nodes) {
    #       return this.nodes.map((value) => value.text()).join('')
    #     }
    #     return this.token
    #   }
    # }
    #
    # export enum NodeType {
    #   text = 'TEXT_NODE',
    #   optional = 'OPTIONAL_NODE',
    #   alternation = 'ALTERNATION_NODE',
    #   alternative = 'ALTERNATIVE_NODE',
    #   parameter = 'PARAMETER_NODE',
    #   expression = 'EXPRESSION_NODE',
    # }
    #

    class Token
      def initialize(type, text, start, _end)
        @type, @text, @start, @end = type, text, start, _end
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
