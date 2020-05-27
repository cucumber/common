import { IdGenerator, messages } from '@cucumber/messages'

function makeFeature(
  name: string,
  description: string,
  scenarios: messages.GherkinDocument.Feature.IScenario[]
): messages.GherkinDocument.IFeature {
  return messages.GherkinDocument.Feature.create({
    name: name,
    description: description,
    children: scenarios.map((scenario) =>
      messages.GherkinDocument.Feature.FeatureChild.create({
        scenario: scenario,
      })
    ),
  })
}

function makeRule(
  name: string,
  description: string,
  scenarios: messages.GherkinDocument.Feature.IScenario[]
): messages.GherkinDocument.Feature.FeatureChild.IRule {
  const idGenerator = IdGenerator.uuid()

  return messages.GherkinDocument.Feature.FeatureChild.Rule.create({
    id: idGenerator(),
    name: name,
    description: description,
    children: scenarios.map((scenario) =>
      messages.GherkinDocument.Feature.FeatureChild.RuleChild.create({
        scenario: scenario,
      })
    ),
  })
}

function makeScenario(
  name: string,
  description: string,
  steps: messages.GherkinDocument.Feature.IStep[]
): messages.GherkinDocument.Feature.IScenario {
  const idGenerator = IdGenerator.uuid()

  return messages.GherkinDocument.Feature.Scenario.create({
    id: idGenerator(),
    name: name,
    description: description,
    steps: steps,
  })
}

function makeStep(
  keyword: string,
  text: string,
  docstring = '',
  datatable: ReadonlyArray<ReadonlyArray<string>> = []
): messages.GherkinDocument.Feature.IStep {
  const idGenerator = IdGenerator.uuid()
  const docStringParam = docstring
    ? messages.GherkinDocument.Feature.Step.DocString.create({
        content: docstring,
      })
    : undefined
  const datatableParam =
    datatable.length > 0
      ? messages.GherkinDocument.Feature.Step.DataTable.create({
          rows: datatable.map((row) =>
            messages.GherkinDocument.Feature.TableRow.create({
              cells: row.map((cell) =>
                messages.GherkinDocument.Feature.TableRow.TableCell.create({
                  value: cell,
                })
              ),
            })
          ),
        })
      : undefined

  return messages.GherkinDocument.Feature.Step.create({
    id: idGenerator(),
    keyword: keyword,
    text: text,
    docString: docStringParam,
    dataTable: datatableParam,
  })
}

export { makeFeature, makeScenario, makeStep, makeRule }
