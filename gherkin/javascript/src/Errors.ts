import { messages } from 'cucumber-messages'
import Token from './Token'
import createLocation from './cli/createLocation'

class GherkinException extends Error {
  public errors: Error[]
  public location: messages.ILocation

  constructor(message: string) {
    super(message)

    const actualProto = new.target.prototype

    // https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto)
    } else {
      // @ts-ignore
      this.__proto__ = actualProto
    }
  }

  protected static _create<T>(location: messages.ILocation, message: string) {
    const column = location.column || 0
    const m = `(${location.line}:${column}): ${message}`
    const err = new this(m)
    err.location = location
    return err
  }
}

export class ParserException extends GherkinException {}

export class CompositeParserException extends GherkinException {
  public static create(errors: Error[]) {
    const message = 'Parser errors:\n' + errors.map(e => e.message).join('\n')
    const err = new this(message)
    err.errors = errors
    return err
  }
}

export class UnexpectedTokenException extends GherkinException {
  public static create(
    token: Token,
    expectedTokenTypes: string[],
    stateComment: string
  ) {
    const message = `expected: ${expectedTokenTypes.join(
      ', '
    )}, got '${token.getTokenValue().trim()}'`

    const location = tokenLocation(token)

    return this._create(location, message)
  }
}

export class UnexpectedEOFException extends GherkinException {
  public static create(
    token: Token,
    expectedTokenTypes: string[],
    stateComment: string
  ) {
    const message = `unexpected end of file, expected: ${expectedTokenTypes.join(
      ', '
    )}`
    const location = tokenLocation(token)

    return this._create(location, message)
  }
}

export class AstBuilderException extends GherkinException {
  public static create(message: string, location: messages.ILocation) {
    return this._create(location, message)
  }
}

export class NoSuchLanguageException extends GherkinException {
  public static create(language: string, location: messages.ILocation) {
    const message = 'Language not supported: ' + language
    return this._create(location, message)
  }
}

function tokenLocation(token: Token) {
  return token.location && token.location.line && token.line && token.line.indent !== undefined
    ? createLocation({
        line: token.location.line,
        column: token.line.indent + 1,
      })
    : token.location
}
