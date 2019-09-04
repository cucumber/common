import { messages } from 'cucumber-messages'
import Token from './token'

class GherkinException extends Error {
  public errors: Error[]
  public location: messages.ILocation

  protected static _create(location: messages.ILocation, message: string) {
    const m = '(' + location.line + ':' + location.column + '): ' + message
    const err = new this(m)
    err.location = location
    return err
  }
}

export class ParserException extends GherkinException {}

export class CompositeParserException extends GherkinException {
  public static create(errors: Error[]) {
    const message =
      'Parser errors:\n' +
      errors
        .map(function(e) {
          return e.message
        })
        .join('\n')
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
    const message =
      'expected: ' +
      expectedTokenTypes.join(', ') +
      ", got '" +
      token.getTokenValue().trim() +
      "' - " +
      stateComment
    const location = !token.location.column
      ? messages.Location.fromObject({
          line: token.location.line,
          column: token.line.indent + 1,
        })
      : token.location

    return this._create(location, message)
  }
}

export class UnexpectedEOFException extends GherkinException {
  public static create(
    token: Token,
    expectedTokenTypes: string[],
    stateComment: string
  ) {
    const message =
      'unexpected end of file, expected: ' +
      expectedTokenTypes.join(', ') +
      ' - ' +
      stateComment
    const location = token.location && token.line
      ? messages.Location.fromObject({
          line: token.location.line,
          column: token.line.indent + 1,
        })
      : token.location

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

// const Errors = {};
//
// [
//   'ParserException',
//   'CompositeParserException',
//   'UnexpectedTokenException',
//   'UnexpectedEOFException',
//   'AstBuilderException',
//   'NoSuchLanguageException',
// ].forEach(function (name) {
//
//   function ErrorProto (message: string) {
//     this.message = message || ('Unspecified ' + name);
//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, arguments.callee);
//     }
//   }
//
//   ErrorProto.prototype = Object.create(Error.prototype);
//   ErrorProto.prototype.name = name;
//   ErrorProto.prototype.constructor = ErrorProto;
//   Errors[name] = ErrorProto;
// });
//
// Errors.CompositeParserException.create = function(errors) {
//   var message = "Parser errors:\n" + errors.map(function (e) { return e.message; }).join("\n");
//   var err = new Errors.CompositeParserException(message);
//   err.errors = errors;
//   return err;
// };
//
// Errors.UnexpectedTokenException.create = function(token, expectedTokenTypes, stateComment) {
//   var message = "expected: " + expectedTokenTypes.join(', ') + ", got '" + token.getTokenValue().trim() + "'";
//   var location = !token.location.column
//     ? {line: token.location.line, column: token.line.indent + 1 }
//     : token.location;
//   return createError(Errors.UnexpectedEOFException, message, location);
// };
//
// Errors.UnexpectedEOFException.create = function(token, expectedTokenTypes, stateComment) {
//   var message = "unexpected end of file, expected: " + expectedTokenTypes.join(', ');
//   return createError(Errors.UnexpectedTokenException, message, token.location);
// };
//
// Errors.AstBuilderException.create = function(message, location) {
//   return createError(Errors.AstBuilderException, message, location);
// };
//
// Errors.NoSuchLanguageException.create = function(language, location) {
//   var message = "Language not supported: " + language;
//   return createError(Errors.NoSuchLanguageException, message, location);
// };
//
//
// // function createError(Ctor, message, location) {
// //   var fullMessage = createMessage(location, message);
// //   var error = new Ctor(fullMessage);
// //   error.location = location;
// //   return error;
// // }
//
// export Errors;
