import { messages } from '@cucumber/fake-cucumber/node_modules/@cucumber/messages'
import {
  IStep,
  IDocString,
  IDataTableRow,
  IElement,
  IFeature,
} from './RubyJSONSchema'
import IAstMaker from './IAstMaker'

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker
): messages.IGherkinDocument {
  const children: messages.GherkinDocument.Feature.IFeatureChild[] = []
  let backgroundFound = false

  for (const element of feature.elements) {
    const isBackground = element.type == 'background'

    if (!isBackground || !backgroundFound) {
      children.push(traverseElement(element, astMaker))
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
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.IFeatureChild {
  return astMaker.makeFeatureChild(
    element.type,
    element.line,
    element.keyword,
    element.name,
    element.description,
    element.steps.map(step => traverseStep(step, astMaker))
  )
}

// export function traverseBefore(hooks: IHook[], scenarioId: string) {}
// export function traverseAfter(hooks: IHook[], scenarioId: string) {}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.IStep {
  const docString = step.doc_string
    ? traverseDocString(step.doc_string, astMaker)
    : null
  const dataTable = step.rows ? traverseDataTable(step.rows, astMaker) : null

  return astMaker.makeStep(
    step.line,
    step.keyword,
    step.name,
    docString,
    dataTable
  )
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
