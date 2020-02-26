import { IdGenerator, messages } from '@cucumber/messages'

function makeFeature(
  name: string,
  description: string,
  scenarios: messages.GherkinDocument.Feature.IScenario[]
): messages.GherkinDocument.IFeature {
  return messages.GherkinDocument.Feature.create({
    name: name,
    description: description,
    children: scenarios.map(scenario =>
      messages.GherkinDocument.Feature.FeatureChild.create({
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
  text: string
): messages.GherkinDocument.Feature.IStep {
  const idGenerator = IdGenerator.uuid()

  return messages.GherkinDocument.Feature.Step.create({
    id: idGenerator(),
    keyword: keyword,
    text: text,
  })
}

export { makeFeature, makeScenario, makeStep }
