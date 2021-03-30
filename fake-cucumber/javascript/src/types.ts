import { Readable } from 'stream'
import { IdGenerator, messages } from '@cucumber/messages'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import { Query, Query as GherkinQuery } from '@cucumber/gherkin-utils'
import IStopwatch from './IStopwatch'

export interface IWorld {
  attach: Attach
  log: Log
}

export interface ITestPlan {
  execute(listener: EnvelopeListener): Promise<void>
}

export interface ITestStep {
  alwaysExecute: boolean
  sourceId: string
  id: string

  toMessage(): messages.TestCase.ITestStep

  execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepFinished.ITestStepResult>

  skip(
    listener: EnvelopeListener,
    testCaseStartedId: string
  ): messages.TestStepFinished.ITestStepResult
}

export interface ISupportCodeExecutor {
  readonly stepDefinitionId: string

  execute(thisObj: IWorld): any

  argsToMessages(): messages.TestCase.TestStep.StepMatchArgumentsList.IStepMatchArgument[]
}

export interface IStepDefinition {
  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null

  toMessage(): messages.IEnvelope
}

export interface IHook {
  id: string

  match(pickle: messages.IPickle): ISupportCodeExecutor | null

  toMessage(): messages.IEnvelope
}

export interface ITestCase {
  toMessage(): messages.IEnvelope

  execute(listener: EnvelopeListener, attempt: number, testCaseStartedId: string): Promise<void>
}

export type EnvelopeListener = (envelope: messages.IEnvelope) => void
export type AnyBody = (...args: ReadonlyArray<any>) => any
export type Attach = (data: string | Buffer | Readable, mediaType: string) => void | Promise<void>
export type Log = (text: string) => void | Promise<void>

export type MakePickleTestStep = (
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  sourceFrames: ReadonlyArray<string>,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
) => ITestStep

export type MakeHookTestStep = (
  pickle: messages.IPickle,
  hook: IHook,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
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
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage,
  makePickleTestStep: MakePickleTestStep,
  makeHookStep: MakeHookTestStep
) => ITestCase

export type MakeTestPlan<SupportCode> = (
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  makeTestCase: MakeTestCase
) => ITestPlan
