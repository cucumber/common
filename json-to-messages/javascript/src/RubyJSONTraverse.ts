import { messages } from '@cucumber/fake-cucumber/node_modules/@cucumber/messages'
import {
  IStep,
  IDocString,
  IDataTableRow,
  IElement,
  IFeature,
} from './RubyJSONSchema'
import IAstMaker from './IAstMaker'
import IPredictableSupportCode from './IPredictableSupportCode'

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  supportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  const children: messages.GherkinDocument.Feature.IFeatureChild[] = []
  let backgroundFound = false

  for (const element of feature.elements) {
    const isBackground = element.type == 'background'

    if (!isBackground || !backgroundFound) {
      children.push(traverseElement(element, astMaker, supportCode))
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
  supportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IFeatureChild {
  const child = astMaker.makeFeatureChild(
    element.type,
    element.line,
    element.keyword,
    element.name,
    element.description,
    element.steps.map(step => traverseStep(step, astMaker, supportCode))
  )

  if (element.before) {
    for (const beforeHook of element.before) {
      supportCode.addPredictableBeforeHook(
        beforeHook.match.location,
        child.scenario.id,
        beforeHook.result.status,
        beforeHook.result.error_message
      )
    }
  }

  if (element.after) {
    for (const afterHook of element.after) {
      supportCode.addPredictableAfterHook(
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
  supportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IStep {
  const docString = step.doc_string
    ? traverseDocString(step.doc_string, astMaker)
    : null
  const dataTable = step.rows ? traverseDataTable(step.rows, astMaker) : null
  const gherkinStep = astMaker.makeStep(
    step.line,
    step.keyword,
    step.name,
    docString,
    dataTable
  )

  if (gherkinStep) {
    supportCode.addPredictableStepDefinition(
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
