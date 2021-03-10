import createLocation from './createLocation'
import IToken from './IToken'
import { messages } from '@cucumber/messages'

/**
 * The scanner reads a gherkin doc (typically read from a .feature file) and creates a token for each line.
 * The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).
 *
 * If the scanner sees a `#` language header, it will reconfigure itself dynamically to look for
 * Gherkin keywords for the associated language. The keywords are defined in gherkin-languages.json.
 */
export default class TokenScanner<TokenType> {
  private lineNumber = 0
  private lines: string[]

  constructor(
    source: string,
    private readonly makeToken: (line: string, location: messages.ILocation) => IToken<TokenType>
  ) {
    this.lines = source.split(/\r?\n/)
    if (this.lines.length > 0 && this.lines[this.lines.length - 1].trim() === '') {
      this.lines.pop()
    }
  }

  public read(): IToken<TokenType> {
    const line = this.lines[this.lineNumber++]
    const location = createLocation({
      line: this.lineNumber,
    })
    location.column = undefined
    return this.makeToken(line, location)
  }
}
