import * as messages from '@cucumber/messages'

function makeFeature(
  name: string,
  description: string,
  scenarios: messages.Scenario[]
): messages.Feature {
  return {
    keyword: 'Feature',
    language: 'en',
    location: { line: 1 },
    tags: [],
    name,
    description,
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
    keyword: 'Rule',
    location: { line: 1 },
    tags: [],
    name,
    description,
    children: scenarios.map((scenario) => ({
      scenario,
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
    keyword: 'Scenario',
    location: { line: 1 },
    tags: [],
    examples: [],
    name: name,
    description: description,
    steps: steps,
  }
}

function makeStep(
  keyword: string,
  text: string,
  docstring = '',
  datatable: readonly (readonly string[])[] = []
): messages.Step {
  const idGenerator = messages.IdGenerator.uuid()
  const docString: messages.DocString = docstring
    ? {
        content: docstring,
        delimiter: '"""',
        location: { line: 1 },
      }
    : undefined
  const dataTable: messages.DataTable =
    datatable.length > 0
      ? {
          location: { line: 1 },
          rows: datatable.map((row) => ({
            location: { line: 1 },
            id: '123',
            cells: row.map((cell) => ({
              value: cell,
              location: { line: 1 },
            })),
          })),
        }
      : undefined

  return {
    id: idGenerator(),
    location: { line: 1 },
    keyword: keyword,
    text: text,
    docString,
    dataTable,
  }
}

export { makeFeature, makeScenario, makeStep, makeRule }
