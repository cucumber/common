import { Token, TokenType } from './Ast'

export default class CucumberExpressionTokenizer {
  constructor() {
    // TODO:
  }

  tokenize(expression: string): ReadonlyArray<Token> {
    return [
      new Token(TokenType.startOfLine, '', 0, 0),
      new Token(TokenType.endOfLine, '', 0, 0),
    ]
  }
}
