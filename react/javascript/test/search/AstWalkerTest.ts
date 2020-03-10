import assert from 'assert'
import { messages, IdGenerator } from '@cucumber/messages'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'

class AstWalker {
  private stepTextList: string[] = []

  constructor(private readonly gherkinDocument: messages.IGherkinDocument) {}

  walkFeature(feature: messages.GherkinDocument.IFeature) {
    for (const child of feature.children) {
      if (child.background) {
        this.walkBackground(child.background)
      }
      if (child.scenario) {
        this.walkScenario(child.scenario)
      }
      if (child.rule) {
        this.walkRule(child.rule)
      }
    }
  }

  walkRule(rule: messages.GherkinDocument.Feature.FeatureChild.IRule) {
    for (const child of rule.children) {
      if (child.background) {
        this.walkBackground(child.background)
      }
      if (child.scenario) {
        this.walkScenario(child.scenario)
      }
    }
  }

  walkBackground(background: messages.GherkinDocument.Feature.IBackground) {
    for (const step of background.steps) {
      this.walkStep(step)
    }
  }

  walkScenario(scenario: messages.GherkinDocument.Feature.IScenario) {
    for (const step of scenario.steps) {
      this.walkStep(step)
    }
  }

  walkStep(step: messages.GherkinDocument.Feature.IStep) {
    this.stepTextList.push(step.text)
  }

  stepsText(): string[] {
    const feature = this.gherkinDocument.feature
    this.walkFeature(feature)

    console.log('stepList', this.stepTextList)
    return this.stepTextList
  }
}

describe('AstWalker', () => {
  let gherkinDocument: messages.IGherkinDocument
  const source = `Feature: Solar System

  Background: Universe
    Given the universe exists

  Scenario: Saturn
    Given is the sixth planet from the Sun

  Rule: Planet with life

    Background: A Planet
      Given the planet exists

    Scenario: Earth
      Given is a planet with liquid water
`

  beforeEach(() => {
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    gherkinDocument = parser.parse(source)
  })

  context('.walk', () => {
    it('reads steps inside a background', () => {
      const astWalker = new AstWalker(gherkinDocument)

      assert.ok(astWalker.stepsText().includes('the universe exists'))
    })

    it('reads steps inside a scenario', () => {
      const astWalker = new AstWalker(gherkinDocument)

      assert.ok(
        astWalker.stepsText().includes('is the sixth planet from the Sun')
      )
    })

    it('reads steps inside a rule and a scenario', () => {
      const astWalker = new AstWalker(gherkinDocument)

      assert.ok(astWalker.stepsText().includes('is a planet with liquid water'))
    })

    it('reads steps inside a rule and a background', () => {
      const astWalker = new AstWalker(gherkinDocument)

      assert.ok(astWalker.stepsText().includes('the planet exists'))
    })
  })
})
