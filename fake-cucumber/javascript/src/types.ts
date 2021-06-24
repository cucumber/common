import { Readable } from 'stream'
import * as messages from '@cucumber/messages'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import { Query, Query as GherkinQuery } from '@cucumber/gherkin-utils'
import IStopwatch from './IStopwatch'

export interface RunOptions {
  allowedRetries: number
}

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

  toMessage(): messages.TestStep

  execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener,
    previousPassed: boolean
  ): Promise<messages.TestStepResult>
}

export interface ISupportCodeExecutor {
  readonly stepDefinitionId: string

  execute(thisObj: IWorld): any

  argsToMessages(): messages.StepMatchArgument[]
}

export interface IStepDefinition {
  match(pickleStep: messages.PickleStep): ISupportCodeExecutor | null

  toMessage(): messages.Envelope
}

export interface IHook {
  id: string

  match(pickle: messages.Pickle): ISupportCodeExecutor | null

  toMessage(): messages.Envelope
}

export interface ITestCase {
  toMessage(): messages.Envelope

  execute(
    listener: EnvelopeListener,
    attempt: number,
    retryable: boolean,
    testCaseStartedId: string
  ): Promise<messages.TestStepResultStatus>
}

export type EnvelopeListener = (envelope: messages.Envelope) => void
export type AnyBody = (...args: readonly unknown[]) => unknown
export type Attach = (data: string | Buffer | Readable, mediaType: string) => void | Promise<void>
export type Log = (text: string) => void | Promise<void>

export type MakePickleTestStep = (
  testStepId: string,
  pickleStep: messages.PickleStep,
  stepDefinitions: readonly IStepDefinition[],
  sourceFrames: readonly string[],
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
) => ITestStep

export type MakeHookTestStep = (
  pickle: messages.Pickle,
  hook: IHook,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: messages.IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
) => ITestStep

export type MakeTestCase = (
  pickle: messages.Pickle,
  stepDefinitions: readonly IStepDefinition[],
  beforeHooks: readonly IHook[],
  afterHooks: readonly IHook[],
  gherkinQuery: Query,
  newId: messages.IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage,
  makePickleTestStep: MakePickleTestStep,
  makeHookStep: MakeHookTestStep
) => ITestCase

export type MakeTestPlan<SupportCode> = (
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  runOptions: RunOptions,
  makeTestCase: MakeTestCase
) => ITestPlan
