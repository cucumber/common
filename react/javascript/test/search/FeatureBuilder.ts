import { messages } from "@cucumber/messages"
import { makeScenario, makeFeature, makeStep } from "./utils"
import assert from "assert"

class FeatureBuilder {
  public build(
    sourceFeature: messages.GherkinDocument.IFeature,
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      keyword: sourceFeature.keyword,
      location: sourceFeature.location,
      name: sourceFeature.name,
      description: sourceFeature.name,
      tags: sourceFeature.tags,
      children: this.filterChidren(sourceFeature.children, scenarios)
    })
  }

  private filterChidren(
    children: messages.GherkinDocument.Feature.IFeatureChild[],
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    return children.filter(child => child.background)
  }
}

describe('FeatureBuilder', () => {
  let builder = new FeatureBuilder()
  let scenarios: messages.GherkinDocument.Feature.IScenario[]
  let feature: messages.GherkinDocument.IFeature
  let backgroundFeature: messages.GherkinDocument.IFeature

  beforeEach(() => {
    scenarios = [
      makeScenario('first scenario', '', []),
      makeScenario('second scenario', '', []),
      makeScenario('third scenario', '', [])
    ]

    feature = makeFeature('My feature', '', [scenarios[0], scenarios[2]])
    backgroundFeature = messages.GherkinDocument.Feature.create({
      name: 'A feature with background',
      children: [
        messages.GherkinDocument.Feature.FeatureChild.create({
          background: messages.GherkinDocument.Feature.Background.create({
            name: 'A named background',
            steps: [
              makeStep('Given', 'some context')
            ]
          })
        })
      ]
    })
  })

  context('#build', () => {
    it('creates a feature file with the original attributes', () => {
      const built = builder.build(feature, [])

      assert.equal(built.name, feature.name)
      assert.equal(built.keyword, feature.keyword)
      assert.equal(built.location, feature.location)
    })

    it('keeps the feature background', () => {
      const built = builder.build(backgroundFeature, [])
      const builtBackground = backgroundFeature.children.find(child => child.background).background

      assert.deepStrictEqual(
        built.children.find(child => child.background).background,
        builtBackground
      )
    })

    xit('filters out scenarios that do not belong to the feature', () => {})
    xit('does not add scenarios that did not belong to the feature', () => {})
  })
})