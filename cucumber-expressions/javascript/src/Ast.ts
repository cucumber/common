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
