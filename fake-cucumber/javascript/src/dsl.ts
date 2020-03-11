import SupportCode from './SupportCode'
import { AnyBody } from './types'
import { messages } from '@cucumber/messages'
import StackUtils from 'stack-utils'

// eslint-disable-next-line @typescript-eslint/camelcase
function __dangerously_setSupportCode__(setSupportCode: SupportCode) {
  console.error('__dangerously_setSupportCode__')
  // @ts-ignore
  global.supportCode = setSupportCode
}

function registerStepDefinition(expression: string | RegExp, body: AnyBody) {
  // @ts-ignore
  if (!global.supportCode) {
    throw new Error('supportCode not set')
  }
  // @ts-ignore
  global.supportCode.registerStepDefinition(
    getSourceReference(new Error().stack),
    expression,
    body
  )
}

function registerBeforeHook(
  tagExpressionOrBody: string | AnyBody,
  body: AnyBody
) {
  // @ts-ignore
  if (!global.supportCode) {
    throw new Error('supportCode not set')
  }
  // @ts-ignore
  global.supportCode.registerBeforeHook(
    getSourceReference(new Error().stack),
    tagExpressionOrBody,
    body
  )
}

function registerAfterHook(
  tagExpressionOrBody: string | AnyBody,
  body: AnyBody
) {
  // @ts-ignore
  if (!global.supportCode) {
    throw new Error('supportCode not set')
  }
  // @ts-ignore
  global.supportCode.registerAfterHook(
    getSourceReference(new Error().stack),
    tagExpressionOrBody,
    body
  )
}

function getSourceReference(stackTrace: string): messages.ISourceReference {
  const stack = new StackUtils({
    cwd: process.cwd(),
    internals: StackUtils.nodeInternals(),
  })
  const trace = stack.clean(stackTrace)
  const callSite = stack.parseLine(trace.split('\n')[1])
  const { file: uri, line } = callSite
  return new messages.SourceReference({
    uri,
    location: new messages.Location({
      line,
    }),
  })
}

const Given = registerStepDefinition
const When = registerStepDefinition
const Then = registerStepDefinition

const Before = registerBeforeHook
const After = registerAfterHook

// eslint-disable-next-line @typescript-eslint/camelcase
export { Given, When, Then, Before, After, __dangerously_setSupportCode__ }
