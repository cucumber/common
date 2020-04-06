import { messages, IdGenerator } from "@cucumber/messages"
import { ITable, IStep } from './JSONSchema'
import IAstMaker from "../IAstMaker"
import IPredictableSupportCode from "../IPredictableSupportCode"

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IStep {
  const line = parseInt(step.location.split(':')[1])
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
  const cells: string[][] = [
    table.heading.map(head => head)
  ]
  for (const row of table.rows) {
    cells.push(row.map(cell => cell))
  }
  return astMaker.makeDataTable(cells)
}