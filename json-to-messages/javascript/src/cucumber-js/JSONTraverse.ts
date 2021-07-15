import { IDocString, IStep, IDataTable, IElement } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import * as messages from '@cucumber/messages'
import IPredictableSupportCode from '../IPredictableSupportCode'
import { traverseDataTable } from '../cucumber-ruby/JSONTraverse'
import {
  traverseFeature as genericTraverseFeature,
  traverseTag,
} from '../cucumber-generic/JSONTraverse'
import { IFeature } from '../cucumber-generic/JSONSchema'

function durationToMillis(duration: number): number {
  return duration ? duration / 1000000 : 0
}

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  return genericTraverseFeature(feature, astMaker, newId, predictableSupportCode, traverseElement)
}

export function traverseElement(
  element: IElement,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.FeatureChild {
  const beforeHooks: IStep[] = []
  const scenarioSteps: IStep[] = []
  const afterHooks: IStep[] = []

  let currentStepIs = 'before'

  for (const step of element.steps) {
    if (currentStepIs === 'before' && !step.hidden) {
      currentStepIs = 'scenario'
    } else if (currentStepIs === 'scenario' && step.hidden) {
      currentStepIs = 'after'
    }

    switch (currentStepIs) {
      case 'before': {
        beforeHooks.push(step)
        break
      }
      case 'scenario': {
        scenarioSteps.push(step)
        break
      }
      case 'after': {
        afterHooks.push(step)
        break
      }
    }
  }
  const tags = element.tags ? element.tags.map((tag) => traverseTag(tag, astMaker)) : []

  const featureChild = astMaker.makeScenarioFeatureChild(
    newId(),
    element.line,
    element.keyword,
    element.name,
    element.description,
    scenarioSteps.map((step) => traverseStep(step, astMaker, newId, predictableSupportCode)),
    tags
  )

  for (const hook of beforeHooks) {
    traverseBeforeHook(hook, featureChild.scenario, predictableSupportCode)
  }

  for (const hook of afterHooks) {
    traverseAfterHook(hook, featureChild.scenario, predictableSupportCode)
  }

  return featureChild
}

export function traverseBeforeHook(
  step: IStep,
  scenario: messages.Scenario,
  predictableSupportCode: IPredictableSupportCode
): void {
  predictableSupportCode.addPredictableBeforeHook(
    step.match?.location || '',
    scenario.id,
    step.result.status,
    durationToMillis(step.result.duration),
    step.result.error_message
  )
}

export function traverseAfterHook(
  step: IStep,
  scenario: messages.Scenario,
  predictableSupportCode: IPredictableSupportCode
): void {
  predictableSupportCode.addPredictableAfterHook(
    step.match?.location || '',
    scenario.id,
    step.result.status,
    durationToMillis(step.result.duration),
    step.result.error_message
  )
}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.Step {
  const stepArguments = step.arguments || []
  const docStringArgument = stepArguments.find((arg: IDocString) => arg.content) as IDocString
  const docString = docStringArgument ? traverseDocString(docStringArgument, astMaker) : null

  const datatableArgument = stepArguments.find((arg: IDataTable) => arg.rows) as IDataTable
  const datatable = datatableArgument ? traverseDataTable(datatableArgument.rows, astMaker) : null

  const gherkinStep = astMaker.makeStep(
    newId(),
    step.line,
    step.keyword,
    step.name,
    docString,
    datatable
  )

  if (gherkinStep && step.match) {
    predictableSupportCode.addPredictableStepDefinition(
      step.match.location,
      gherkinStep.id,
      step.result.status,
      durationToMillis(step.result.duration),
      step.result.error_message
    )
  }

  return gherkinStep
}

export function traverseDocString(docString: IDocString, astMaker: IAstMaker): messages.DocString {
  return astMaker.makeDocstring(null, docString.content)
}
