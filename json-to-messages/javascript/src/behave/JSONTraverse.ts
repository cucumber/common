import { messages, IdGenerator } from '@cucumber/messages'
import { ITable, IStep, IElement, IFeature } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'

import { IFeature as IGenericFeature } from '../cucumber-generic/JSONSchema'
import { traverseFeature as traverseGenericFeature } from '../cucumber-generic/JSONTraverse'

function makeLine(location: string): number {
  return parseInt(location.split(':')[1])
}

function makeGenericFeature(source: IFeature): IGenericFeature {
  return {
    uri: source.location.split(':')[0],
    id: '',
    line: makeLine(source.location),
    keyword: source.keyword,
    name: source.name,
    description: source.description,
    elements: source.elements,
  }
}

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  return traverseGenericFeature(
    makeGenericFeature(feature),
    astMaker,
    newId,
    predictableSupportCode,
    traverseElement
  )
}

export function traverseElement(
  element: IElement,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IFeatureChild {
  if (element.type === 'background') {
    return
  }
  return astMaker.makeScenarioFeatureChild(
    newId(),
    makeLine(element.location),
    element.keyword,
    element.name,
    element.description,
    element.steps.map(step =>
      traverseStep(step, astMaker, newId, predictableSupportCode)
    )
  )
}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IStep {
  const line = makeLine(step.location)
  const docstring = step.text ? traverseDocstring(step.text, astMaker) : null
  const datatable = step.table ? traverseTable(step.table, astMaker) : null

  const gherkinStep = astMaker.makeStep(
    newId(),
    line,
    `${step.keyword} `,
    step.name,
    docstring,
    datatable
  )

  if (gherkinStep && step.match) {
    predictableSupportCode.addPredictableStepDefinition(
      step.match.location,
      gherkinStep.id,
      step.result.status,
      step.result.error_message
    )
  }

  return gherkinStep
}

export function traverseDocstring(
  text: string,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDocString {
  return astMaker.makeDocstring(null, text)
}

export function traverseTable(
  table: ITable,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDataTable {
  const cells: string[][] = [table.headings.map(head => head)]
  for (const row of table.rows) {
    cells.push(row.map(cell => cell))
  }
  return astMaker.makeDataTable(cells)
}
