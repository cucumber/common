import assert from 'assert'
import { IdGenerator, messages } from '@cucumber/messages'
import Parser from '@cucumber/gherkin/dist/src/Parser'
import AstBuilder from '@cucumber/gherkin/dist/src/AstBuilder'
import AstWalker from '../../src/search/AstWalker'
import pretty from '../../src/pretty-formatter/pretty'

describe('AstWalker', () => {
  let parser: Parser
  let walker: AstWalker

  beforeEach(() => {
    const newId = IdGenerator.uuid()
    parser = new Parser(new AstBuilder(newId))
    walker = new AstWalker()
  })
  it.only('returns a deep copy', () => {
    const gherkinDocument = parser.parse(`Feature: hello
  Background:
    Given a passed step

  Scenario: salut
`)
    const newGherkinDocument = walker.walkGherkinDocument(gherkinDocument)

    console.log('gherkinDocument', gherkinDocument.feature)
    console.log('newGherkinDocument', newGherkinDocument.feature)

    assert.deepEqual(newGherkinDocument, gherkinDocument)
    assert.notEqual(newGherkinDocument, gherkinDocument)

    assert.deepEqual(newGherkinDocument.feature, gherkinDocument.feature)
    assert.notEqual(newGherkinDocument.feature, gherkinDocument.feature)

    assert.deepEqual(
      newGherkinDocument.feature.children[0].background,
      gherkinDocument.feature.children[0].background
    )
    assert.notEqual(
      newGherkinDocument.feature.children[0].background,
      gherkinDocument.feature.children[0].background
    )

    assert.deepEqual(
      newGherkinDocument.feature.children[1].scenario,
      gherkinDocument.feature.children[1].scenario
    )
    assert.notEqual(
      newGherkinDocument.feature.children[1].scenario,
      gherkinDocument.feature.children[1].scenario
    )
  })
})

class StepTextGetter extends AstWalker {
  private stepTextList: string[] = []

  walkStep(step: messages.GherkinDocument.Feature.IStep) {
    super.walkStep(step)
    this.stepTextList.push(step.text)
  }

  stepsText(): string[] {
    return this.stepTextList
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
      const stepTextGetter = new StepTextGetter()
      stepTextGetter.walkGherkinDocument(gherkinDocument)

      assert.ok(stepTextGetter.stepsText().includes('the universe exists'))
    })

    it('reads steps inside a scenario', () => {
      const stepTextGetter = new StepTextGetter()
      stepTextGetter.walkGherkinDocument(gherkinDocument)

      assert.ok(
        stepTextGetter.stepsText().includes('is the sixth planet from the Sun')
      )
    })

    it('reads steps inside a rule and a scenario', () => {
      const stepTextGetter = new StepTextGetter()
      stepTextGetter.walkGherkinDocument(gherkinDocument)

      assert.ok(
        stepTextGetter.stepsText().includes('is a planet with liquid water')
      )
    })

    it('reads steps inside a rule and a background', () => {
      const stepTextGetter = new StepTextGetter()
      stepTextGetter.walkGherkinDocument(gherkinDocument)

      assert.ok(stepTextGetter.stepsText().includes('the planet exists'))
    })

    it('reads all the steps', () => {
      const stepTextGetter = new StepTextGetter()
      stepTextGetter.walkGherkinDocument(gherkinDocument)

      assert.deepStrictEqual(stepTextGetter.stepsText(), [
        'the universe exists',
        'is the sixth planet from the Sun',
        'the planet exists',
        'is a planet with liquid water',
      ])
    })
  })
})

describe('AstPruner', () => {
  let gherkinDocument: messages.IGherkinDocument
  const source = `Feature: Solar System

  Scenario: Saturn
    Given is the sixth planet from the Sun

  Scenario: Earth
    Given is a planet with liquid water
`

  beforeEach(() => {
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    gherkinDocument = parser.parse(source)
  })

  it('removes saturn', () => {
    const astPruner = new AstPruner()
    astPruner.walkGherkinDocument(gherkinDocument)

    assert.deepStrictEqual(
      pretty(gherkinDocument),
      `Feature: Solar System

  Scenario: Earth
    Given is a planet with liquid water
`
    )
  })

  class AstPruner extends AstWalker {}
})
