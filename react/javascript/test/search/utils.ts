import { IdGenerator, messages } from '@cucumber/messages'

function makeFeature(
  name: string,
  scenarios: messages.GherkinDocument.Feature.IScenario[]
): messages.GherkinDocument.IFeature {
  return messages.GherkinDocument.Feature.create({
    name: name,
    children: scenarios.map(scenario =>
      messages.GherkinDocument.Feature.FeatureChild.create({
        scenario: scenario,
      })
    ),
  })
}

function makeScenario(
  name: string,
  steps: messages.GherkinDocument.Feature.IStep[]
): messages.GherkinDocument.Feature.IScenario {
  const idGenerator = IdGenerator.uuid()

  return messages.GherkinDocument.Feature.Scenario.create({
    id: idGenerator(),
    name: name,
    steps: steps,
  })
}

function makeStep(
  keyword: string,
  text: string
): messages.GherkinDocument.Feature.IStep {
  return messages.GherkinDocument.Feature.Step.create({
    keyword: keyword,
    text: text,
  })
}

export { makeFeature, makeScenario, makeStep }
