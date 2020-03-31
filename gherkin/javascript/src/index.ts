import GherkinStreams from './stream/GherkinStreams'
import IGherkinOptions from './IGherkinOptions'
import Query from './Query'
import Dialect from './Dialect'
import Parser from './Parser'
import AstBuilder from './AstBuilder'
import TokenScanner from './TokenScanner'
import compile from './pickles/compile'
import DIALECTS from './gherkin-languages.json'

const dialects = DIALECTS as Readonly<{ [key: string]: Dialect }>

export {
  GherkinStreams,
  IGherkinOptions,
  Query,
  dialects,
  Dialect,
  Parser,
  AstBuilder,
  TokenScanner,
  compile,
}
