import * as messages from '@cucumber/messages'
import { ITable, IStep, IElement, IFeature } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'

import { IFeature as IGenericFeature } from '../cucumber-generic/JSONSchema'
import {
  traverseFeature as traverseGenericFeature,
  traverseTag,
} from '../cucumber-generic/JSONTraverse'
import { ITag } from '../types'

function makeTags(tags: readonly string[]): ITag[] {
  return tags
    ? tags.map((tag) => {
        return { name: `@${tag}` }
      })
    : []
}

function makeLine(location: string): number {
  return parseInt(location.split(':')[1])
}

function durationToMillis(duration: number): number {
  return duration ? duration / 1000 : 0
}

function makeGenericFeature(source: IFeature): IGenericFeature {
  const description = source.description ? source.description.join('\n') : ''
  const tags = makeTags(source.tags)

  return {
    uri: source.location.split(':')[0],
    id: '',
    line: makeLine(source.location),
    keyword: source.keyword,
    name: source.name,
    description,
    elements: source.elements,
    tags,
  }
}

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
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
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.FeatureChild {
  if (element.type === 'background') {
    return
  }
  const tags = element.tags
    ? makeTags(element.tags).map((tag) => traverseTag(tag, astMaker))
    : undefined

  return astMaker.makeScenarioFeatureChild(
    newId(),
    makeLine(element.location),
    element.keyword,
    element.name,
    element.description,
    element.steps.map((step) => traverseStep(step, astMaker, newId, predictableSupportCode)),
    tags
  )
}

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.Step {
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
      durationToMillis(step.result.duration),
      step.result.error_message
    )
  }

  return gherkinStep
}

export function traverseDocstring(text: string, astMaker: IAstMaker): messages.DocString {
  return astMaker.makeDocstring(null, text)
}

export function traverseTable(table: ITable, astMaker: IAstMaker): messages.DataTable {
  const cells: string[][] = [table.headings.map((head) => head)]
  for (const row of table.rows) {
    cells.push(row.map((cell) => cell))
  }
  return astMaker.makeDataTable(cells)
}
