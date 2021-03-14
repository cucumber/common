import * as messages from '@cucumber/messages'

function makeFeature(
  name: string,
  description: string,
  scenarios: messages.Scenario[]
): messages.Feature {
  return {
    name: name,
    description: description,
    children: scenarios.map((scenario) => ({
      scenario,
    })),
  }
}

function makeRule(
  name: string,
  description: string,
  scenarios: messages.Scenario[]
): messages.Rule {
  const idGenerator = messages.IdGenerator.uuid()

  return {
    id: idGenerator(),
    name: name,
    description: description,
    children: scenarios.map((scenario) => ({
      scenario: scenario,
    })),
  }
}

function makeScenario(
  name: string,
  description: string,
  steps: messages.Step[]
): messages.Scenario {
  const idGenerator = messages.IdGenerator.uuid()

  return {
    id: idGenerator(),
    name: name,
    description: description,
    steps: steps,
  }
}

function makeStep(
  keyword: string,
  text: string,
  docstring = '',
  datatable: readonly ReadonlyArray<string>[] = []
): messages.Step {
  const idGenerator = messages.IdGenerator.uuid()
  const docString: messages.DocString = docstring
    ? {
        content: docstring,
      }
    : undefined
  const dataTable: messages.DataTable =
    datatable.length > 0
      ? {
          rows: datatable.map((row) => ({
            cells: row.map((cell) => ({
              value: cell,
            })),
          })),
        }
      : undefined

  return {
    id: idGenerator(),
    keyword: keyword,
    text: text,
    docString,
    dataTable,
  }
}

export { makeFeature, makeScenario, makeStep, makeRule }
