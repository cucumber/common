import { messages } from "@cucumber/messages"
import { makeScenario, makeFeature, makeStep } from "./utils"
import assert from "assert"
import FeatureBuilder from "../../src/search/FeatureBuilder"

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

    it('filters out scenarios that are not specified in the scenario list', () => {
      const built = builder.build(feature, [scenarios[2]])

      assert.strictEqual(built.children.length, 1)
      assert.deepStrictEqual(built.children[0].scenario, scenarios[2])
    })

    it('can select multiple scenarios and keep original order', () => {
      const built = builder.build(feature, [scenarios[2], scenarios[0]])

      assert.deepStrictEqual(built.children, feature.children)
    })

    it('does not add scenarios that did not belong to the feature', () => {
      const built = builder.build(feature, [scenarios[1]])

      assert.deepStrictEqual(built.children, [])
    })
  })
})