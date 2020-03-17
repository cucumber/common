import assert, { match } from 'assert'
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

  function assertCopy(copy: any, source: any) {
    assert.deepEqual(copy, source)
    assert.notEqual(copy, source)
  }

  it('returns a deep copy', () => {
    const gherkinDocument = parser.parse(`Feature: hello
  Background:
    Given a passed step

  Scenario: salut

  Rule: roule
    Background: poupidou
    Scenario: pouet
`)
    const newGherkinDocument = walker.walkGherkinDocument(gherkinDocument)

    assertCopy(newGherkinDocument, gherkinDocument)
    assertCopy(newGherkinDocument.feature, gherkinDocument.feature)
    assertCopy(
      newGherkinDocument.feature.children[0].background,
      gherkinDocument.feature.children[0].background
    )
    assertCopy(
      newGherkinDocument.feature.children[1].scenario,
      gherkinDocument.feature.children[1].scenario
    )
    assertCopy(
      newGherkinDocument.feature.children[2].rule,
      gherkinDocument.feature.children[2].rule
    )
    assertCopy(
      newGherkinDocument.feature.children[2].rule.children[1],
      gherkinDocument.feature.children[2].rule.children[1]
    )
    assertCopy(
      newGherkinDocument.feature.children[0].background.steps,
      gherkinDocument.feature.children[0].background.steps
    )
  })

  it('filters one scenario', () => {
    const source = `Feature: Solar System

  Scenario: Saturn
    Given is the sixth planet from the Sun

  Scenario: Earth
    Given is a planet with liquid water
`
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    const gherkinDocument = parser.parse(source)

    const walker = new AstWalker({
      acceptScenario: scenario => scenario.name !== 'Saturn',
    })
    const newGherkinDocument = walker.walkGherkinDocument(gherkinDocument)
    const newSource = pretty(newGherkinDocument)
    const expectedNewSource = `Feature: Solar System

  Scenario: Earth
    Given is a planet with liquid water
`
    assert.strictEqual(newSource, expectedNewSource)
  })
})

/*describe('AstPruner', () => {
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

  it('return null when there are no elements', () => {
    const walker = new AstWalker()
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    const emptyFeature = ``
    const parseEmptyFeature = parser.parse(emptyFeature)
    let document: messages.IGherkinDocument = parseEmptyFeature
    assert.deepEqual(walker.walkGherkinDocument(document), null)
  })
  it('return a feature when there is one', () => {
    const pruner = new AstPruner([])
    const newId = IdGenerator.uuid()
    const parser = new Parser(new AstBuilder(newId))
    const feature = `Feature: Solar System`
    const parseFeature = parser.parse(feature)
    let document: messages.IGherkinDocument = parseFeature
    assert.deepEqual(pruner.walkGherkinDocument(document), document)
  })
})*/
