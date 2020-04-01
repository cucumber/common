import { IdGenerator, messages } from '@cucumber/messages'
import {
  IStep,
  IDocString,
  IDataTableRow,
  IElement,
  IFeature,
} from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  const children: messages.GherkinDocument.Feature.IFeatureChild[] = []
  let backgroundFound = false

  for (const element of feature.elements) {
    const isBackground = element.type === 'background'

    if (!isBackground || !backgroundFound) {
      children.push(
        traverseElement(element, astMaker, newId, predictableSupportCode)
      )
    }
    backgroundFound = backgroundFound || isBackground
  }

  const gherkinFeature = astMaker.makeFeature(
    feature.line,
    feature.keyword,
    feature.name,
    feature.description,
    children
  )

  return astMaker.makeGherkinDocument(feature.uri, gherkinFeature)
}

export function traverseElement(
  element: IElement,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IFeatureChild {
  let child: messages.GherkinDocument.Feature.IFeatureChild

  switch (element.type) {
    case 'background':
      child = astMaker.makeBackgroundFeatureChild(
        element.line,
        element.keyword,
        element.name,
        element.description,
        element.steps.map(step =>
          traverseStep(step, astMaker, newId, predictableSupportCode)
        )
      )
      break
    case 'scenario':
      child = astMaker.makeScenarioFeatureChild(
        newId(),
        element.line,
        element.keyword,
        element.name,
        element.description,
        element.steps.map(step =>
          traverseStep(step, astMaker, newId, predictableSupportCode)
        )
      )
      break
    default:
      throw new Error(`Unsupported type for feature child: ${element.type}`)
  }

  if (element.before) {
    for (const beforeHook of element.before) {
      predictableSupportCode.addPredictableBeforeHook(
        beforeHook.match.location,
        child.scenario.id,
        beforeHook.result.status,
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
        afterHook.result.error_message
      )
    }
  }

  return child
}

// export function traverseBefore(hooks: IHook[], scenarioId: string) {}
// export function traverseAfter(hooks: IHook[], scenarioId: string) {}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IStep {
  const docString = step.doc_string
    ? traverseDocString(step.doc_string, astMaker)
    : null
  const dataTable = step.rows ? traverseDataTable(step.rows, astMaker) : null
  const gherkinStep = astMaker.makeStep(
    newId(),
    step.line,
    step.keyword,
    step.name,
    docString,
    dataTable
  )

  if (gherkinStep && step.match) {
    predictableSupportCode.addPredictableStepDefinition(
      step.match.location,
      gherkinStep.id,
      step.result.status
    )
  }

  return gherkinStep
}

export function traverseDocString(
  docString: IDocString,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDocString {
  return astMaker.makeDocstring(docString.content_type, docString.value)
}

export function traverseDataTable(
  rows: ReadonlyArray<IDataTableRow>,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDataTable {
  return astMaker.makeDataTable(rows.map(row => row.cells))
}
