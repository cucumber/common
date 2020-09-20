const escapeCharacter = '\\'
const alternationCharacter = '/'
const beginParameterCharacter = '{'
const endParameterCharacter = '}'
const beginOptionalCharacter = '('
const endOptionalCharacter = ')'

export class Token {
  readonly type: TokenType
  readonly text: string
  readonly start: number
  readonly end: number

  constructor(type: TokenType, text: string, start: number, end: number) {
    this.type = type
    this.text = text
    this.start = start
    this.end = end
  }

  static isEscapeCharacter(codePoint: string): boolean {
    return codePoint == escapeCharacter
  }

  static canEscape(codePoint: string): boolean {
    if (codePoint == ' ') {
      // TODO: Unicode whitespace?
      return true
    }
    switch (codePoint) {
      case escapeCharacter:
        return true
      case alternationCharacter:
        return true
      case beginParameterCharacter:
        return true
      case endParameterCharacter:
        return true
      case beginOptionalCharacter:
        return true
      case endOptionalCharacter:
        return true
    }
    return false
  }

  static typeOf(codePoint: string): TokenType {
    if (codePoint == ' ') {
      // TODO: Unicode whitespace?
      return TokenType.whiteSpace
    }
    switch (codePoint) {
      case alternationCharacter:
        return TokenType.alternation
      case beginParameterCharacter:
        return TokenType.beginParameter
      case endParameterCharacter:
        return TokenType.endParameter
      case beginOptionalCharacter:
        return TokenType.beginOptional
      case endOptionalCharacter:
        return TokenType.endOptional
    }
    return TokenType.text
  }
}

export enum TokenType {
  startOfLine = 'START_OF_LINE',
  endOfLine = 'END_OF_LINE',
  whiteSpace = 'WHITE_SPACE',
  beginOptional = 'BEGIN_OPTIONAL',
  endOptional = 'END_OPTIONAL',
  beginParameter = 'BEGIN_PARAMETER',
  endParameter = 'END_PARAMETER',
  alternation = 'ALTERNATION',
  text = 'TEXT',
}
