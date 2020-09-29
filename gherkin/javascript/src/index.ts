import GherkinStreams from './stream/GherkinStreams'
import generateMessages from './stream/generateMessages'
import makeSourceEnvelope from './stream/makeSourceEnvelope'
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
  generateMessages,
  makeSourceEnvelope,
  IGherkinOptions,
  Query,
  dialects,
  Dialect,
  Parser,
  AstBuilder,
  TokenScanner,
  compile,
}
