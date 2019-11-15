import { stubConstructor } from 'ts-sinon'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import StepDefinition from '../src/StepDefinition'

export function stubPassingSupportCodeExecutor(): SupportCodeExecutor {
  const supportCodeExecutorStub = stubConstructor<SupportCodeExecutor>(
    SupportCodeExecutor
  )
  supportCodeExecutorStub.execute.returns('ok')

  return supportCodeExecutorStub
}

export function stubFailingSupportCodeExecutor(
  message: string
): SupportCodeExecutor {
  const supportCodeExecutorStub = stubConstructor<SupportCodeExecutor>(
    SupportCodeExecutor
  )
  supportCodeExecutorStub.execute.throws(new Error(message))

  return supportCodeExecutorStub
}

export function stubMatchingStepDefinition(
  executor: SupportCodeExecutor = new SupportCodeExecutor(
    'some-id',
    () => null,
    []
  )
): StepDefinition {
  const stepDefinitionStub = stubConstructor<StepDefinition>(StepDefinition)
  stepDefinitionStub.match.returns(executor)

  return stepDefinitionStub
}

