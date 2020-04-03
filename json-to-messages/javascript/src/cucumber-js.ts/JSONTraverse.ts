import { IDocString, IStep, IDataTable } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import { messages, IdGenerator } from '@cucumber/messages'
import IPredictableSupportCode from '../IPredictableSupportCode'
import { traverseDataTable } from '../cucumber-ruby/JSONTraverse'

export function traverseStep(
  step: IStep,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument.Feature.IStep {
  const stepArguments = step.arguments || []
  const docStringArgument = stepArguments
    .find((arg: IDocString) => arg.content) as IDocString
  const docString = docStringArgument
    ? traverseDocString(docStringArgument, astMaker)
    : null

  const datatableArgument = stepArguments
    .find((arg: IDataTable) => arg.rows) as IDataTable
  const datatable = datatableArgument
    ? traverseDataTable(datatableArgument.rows, astMaker)
    : null

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
      step.result.error_message
    )
  }

  return gherkinStep
}

export function traverseDocString(
  docString: IDocString,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDocString {
  return astMaker.makeDocstring(null, docString.content)
}
