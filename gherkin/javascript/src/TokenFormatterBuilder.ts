import { RuleType } from './Parser'
import Token from './Token'

export default class TokenFormatterBuilder {
  private tokensText: string = ''

  public reset() {
    this.tokensText = ''
  }

  public startRule(ruleType: RuleType) {
    // no-op
  }

  public endRule(ruleType: RuleType) {
    // no-op
  }

  public build(token: Token) {
    this.tokensText += this.formatToken(token) + '\n'
  }

  public getResult() {
    return this.tokensText
  }

  public formatToken(token: Token) {
    if (token.isEof) {
      return 'EOF'
    }

    return (
      '(' +
      token.location.line +
      ':' +
      token.location.column +
      ')' +
      token.matchedType +
      ':' +
      (typeof token.matchedKeyword === 'string' ? token.matchedKeyword : '') +
      '/' +
      (typeof token.matchedText === 'string' ? token.matchedText : '') +
      '/' +
      token.matchedItems
        .map(function(i) {
          return i.column + ':' + i.text
        })
        .join(',')
    )
  }
}
