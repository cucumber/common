import assert from 'assert'
import { messages, IdGenerator } from '@cucumber/messages'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'

class AstWalker {
  constructor(protected readonly gherkinDocument: messages.IGherkinDocument) {}

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
  }
}

class StepTextGetter extends AstWalker {
  private stepTextList: string[] = []

  walkStep(step: messages.GherkinDocument.Feature.IStep) {
    super.walkStep(step)
    this.stepTextList.push(step.text)
  }

  stepsText(): string[] {
    const feature = this.gherkinDocument.feature
    this.walkFeature(feature)

    return this.stepTextList
  }
}

class AstPrinter extends AstWalker {
  private printed = ''

  astPrint(): string {
    this.walkFeature(this.gherkinDocument.feature)
    return this.printed
  }

  walkFeature(feature: messages.GherkinDocument.IFeature) {
    super.walkFeature(feature)

    this.printed += `feature (name: "${feature.name}", description: "${feature.description}")\n`
  }
}

describe('StepTextGetter', () => {
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
      const stepTextGetter = new StepTextGetter(gherkinDocument)

      assert.ok(stepTextGetter.stepsText().includes('the universe exists'))
    })

    it('reads steps inside a scenario', () => {
      const stepTextGetter = new StepTextGetter(gherkinDocument)

      assert.ok(
        stepTextGetter.stepsText().includes('is the sixth planet from the Sun')
      )
    })

    it('reads steps inside a rule and a scenario', () => {
      const stepTextGetter = new StepTextGetter(gherkinDocument)

      assert.ok(stepTextGetter.stepsText().includes('is a planet with liquid water'))
    })

    it('reads steps inside a rule and a background', () => {
      const stepTextGetter = new StepTextGetter(gherkinDocument)

      assert.ok(stepTextGetter.stepsText().includes('the planet exists'))
    })

    it('reads all the steps', () => {
      const stepTextGetter = new StepTextGetter(gherkinDocument)

      assert.deepStrictEqual(stepTextGetter.stepsText(), [
        'the universe exists',
        'is the sixth planet from the Sun',
        'the planet exists',
        'is a planet with liquid water'
      ])
    })
  })
})

describe('AstPrinter', () => {
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

  context('.print', () => {
    it('prints a feature', () => {
      const astPrinter = new AstPrinter(gherkinDocument)

      assert.deepStrictEqual(astPrinter.astPrint(), 'feature (name: "Solar System", description: "")\n')
    })
/*
    xit('prints the Gherkin document AST', () => {
      assert.deepEqual(astPrinter.print(gherkinDocument),
`
feature (name: "Solar System", description: "")
background (name: "Universe", description: "")
 - step(keyword: "Given", text: "the universe exists")
scenario (name: "Saturn", description: "")
 - step (keyword: "Given", text: "is the sixth planet from the Sun")
rule (name: "Planet with life", description: "")
background: "name: "A planet", description: "")
scenario (name: "Earth", description: "")
 - step (keyword: "Given", text: "is a planet with liquid water")
`)
    }
*/
  })
})
