import { Readable } from 'stream'
import { IdGenerator, messages } from '@cucumber/messages'
import IStepDefinition from './IStepDefinition'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import ITestStep from './ITestStep'
import { Query } from '@cucumber/gherkin'
import IHook from './IHook'
import ITestCase from './ITestCase'
import SupportCode from './SupportCode'
import ITestPlan from './ITestPlan'
import { Query as GherkinQuery } from '@cucumber/gherkin'

export type EnvelopeListener = (envelope: messages.IEnvelope) => void
export type AnyBody = (...args: ReadonlyArray<any>) => any
export type Attach = (
  data: string | Buffer | Readable,
  mediaType: string
) => void | Promise<void>
export type Log = (text: string) => void | Promise<void>

export type MakePickleTestStep = (
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  sourceFrames: ReadonlyArray<string>,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage
) => ITestStep

export type MakeHookTestStep = (
  pickle: messages.IPickle,
  hook: IHook,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage
) => ITestStep

export type MakeTestCase = (
  pickle: messages.IPickle,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  beforeHooks: ReadonlyArray<IHook>,
  afterHooks: ReadonlyArray<IHook>,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage,
  makePickleTestStep: MakePickleTestStep,
  makeHookStep: MakeHookTestStep
) => ITestCase

export type MakeTestPlan = (
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  makeTestCase: MakeTestCase
) => ITestPlan
