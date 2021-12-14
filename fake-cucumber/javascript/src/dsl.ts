import SupportCode from './SupportCode'
import { AnyBody } from './types'
import * as messages from '@cucumber/messages'
import StackUtils from 'stack-utils'
import IParameterTypeDefinition from './IParameterTypeDefinition'
import { deprecate } from 'util'

function setSupportCode(supportCode: SupportCode) {
  //@ts-ignore
  global.supportCode = supportCode
}

function defineStepDefinition(expression: string | RegExp, body: AnyBody) {
  //@ts-ignore
  global.supportCode.defineStepDefinition(getSourceReference(new Error().stack), expression, body)
}

function defineBeforeHook(tagExpressionOrBody: string | AnyBody, body?: AnyBody) {
  //@ts-ignore
  global.supportCode.defineBeforeHook(
    getSourceReference(new Error().stack),
    tagExpressionOrBody,
    body
  )
}

function defineAfterHook(tagExpressionOrBody: string | AnyBody, body?: AnyBody) {
  //@ts-ignore
  global.supportCode.defineAfterHook(
    getSourceReference(new Error().stack),
    tagExpressionOrBody,
    body
  )
}

function defineParameterType0(parameterTypeDefinition: IParameterTypeDefinition) {
  //@ts-ignore
  global.supportCode.defineParameterType(parameterTypeDefinition)
}

function getSourceReference(stackTrace: string): messages.SourceReference {
  const stack = new StackUtils({
    cwd: process.cwd(),
    internals: StackUtils.nodeInternals(),
  })
  const trace = stack.clean(stackTrace)
  const callSite = stack.parseLine(trace.split('\n')[1])
  const { file: uri, line } = callSite
  return {
    uri,
    location: {
      line,
    },
  }
}

const Given = defineStepDefinition
const When = defineStepDefinition
const Then = defineStepDefinition

const Before = defineBeforeHook
const After = defineAfterHook
const ParameterType = defineParameterType0
const defineParameterType = deprecate(defineParameterType0, 'Please use ParameterType instead')

export { Given, When, Then, Before, After, ParameterType, defineParameterType, setSupportCode }
