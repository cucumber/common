import { IdGenerator, messages } from '@cucumber/messages'
import { IStep, IDocString, IDataTableRow, IElement } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'
import {
  traverseFeature as genericTraverseFeature,
  traverseTag,
} from '../cucumber-generic/JSONTraverse'
import { IFeature } from '../cucumber-generic/JSONSchema'

function durationToMillis(duration: number) {
  return duration ? duration / 1000000 : 0
}

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  return genericTraverseFeature(feature, astMaker, newId, predictableSupportCode, traverseElement)
}

export function traverseElement(
  element: IElement,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.FeatureChild {
  let child: messages.FeatureChild

  switch (element.type) {
    case 'background':
      child = astMaker.makeBackgroundFeatureChild(
        element.line,
        element.keyword,
        element.name,
        element.description,
        element.steps.map((step) => traverseStep(step, astMaker, newId, predictableSupportCode))
      )
      break
    case 'scenario': {
      const tags = element.tags ? element.tags.map((tag) => traverseTag(tag, astMaker)) : undefined
      child = astMaker.makeScenarioFeatureChild(
        newId(),
        element.line,
        element.keyword,
        element.name,
        element.description,
        element.steps.map((step) => traverseStep(step, astMaker, newId, predictableSupportCode)),
        tags
      )
      break
    }
    default:
      throw new Error(`Unsupported type for feature child: ${element.type}`)
  }

  if (element.before) {
    for (const beforeHook of element.before) {
      predictableSupportCode.addPredictableBeforeHook(
        beforeHook.match.location,
        child.scenario.id,
        beforeHook.result.status,
        durationToMillis(beforeHook.result.duration),
        beforeHook.result.error_message
      )
    }
  }

  if (element.after) {
    for (const afterHook of element.after) {
      predictableSupportCode.addPredictableAfterHook(
        afterHook.match.location,
        child.scenario.id,
        afterHook.result.status,
        durationToMillis(afterHook.result.duration),
        afterHook.result.error_message
      )
    }
  }

  return child
}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.Step {
  const docString = step.doc_string ? traverseDocString(step.doc_string, astMaker) : null
  const dataTable = step.rows ? traverseDataTable(step.rows, astMaker) : null
  const gherkinStep = astMaker.makeStep(
    newId(),
    step.line,
    step.keyword,
    step.name,
    docString,
    dataTable
  )

  if (gherkinStep && step.match && step.match.location) {
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

export function traverseDocString(
  docString: IDocString,
  astMaker: IAstMaker
): messages.DocString {
  return astMaker.makeDocstring(docString.content_type, docString.value)
}

export function traverseDataTable(
  rows: ReadonlyArray<IDataTableRow>,
  astMaker: IAstMaker
): messages.DataTable {
  return astMaker.makeDataTable(rows.map((row) => row.cells))
}
