/* eslint-env mocha */
const assert = require('assert')
const React = require('react') // eslint-disable-line node/no-unpublished-require
const { shallow } = require('enzyme') // eslint-disable-line node/no-unpublished-require
const { reducer } = require('cucumber-redux') // eslint-disable-line node/no-unpublished-require
const generateEvents = require('gherkin').generateEvents
const { javaStacktraceAttachmentEvent, pngAttachmentEvent } = require('./attachmentEvent')
const { GherkinDocument, Feature, Scenario, Step, Attachment } = require('../src/index.jsx')

function someEvents() {
  return []
    .concat(generateEvents("Feature: Hello F\nScenario: Hello S\nGiven hello g", "features/hello.feature"))
    .concat(generateEvents("Feature: World F\nScenario: World S\nGiven world g", "features/world.feature"))
    .concat([
      javaStacktraceAttachmentEvent("features/hello.feature", 3),
      pngAttachmentEvent("features/hello.feature", 3)
    ])
}

describe('Cucumber React', () => {
  let state

  before(() => {
    const events = someEvents()
    state = events.reduce(reducer, reducer())
  })

  describe(GherkinDocument.name, () => {
    it("renders the feature", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri])

      const component = shallow(<GherkinDocument node={node} uri={uri}/>)
      assert.equal(component.find(Feature).length, 1)
    })
  })

  describe(Feature.name, () => {
    it("renders the name", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri, 'feature'])
      const attachmentsByLine = state.getIn(['sources', uri, 'attachments'])

      const component = shallow(<Feature node={node} uri={uri} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find('.name').text(), 'Hello F')
    })

    it("renders the scenario", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri, 'feature'])
      const attachmentsByLine = state.getIn(['sources', uri, 'attachments'])

      const component = shallow(<Feature node={node} uri={uri} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find(Scenario).length, 1)
    })
  })

  describe(Scenario.name, () => {
    it("renders the name", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri, 'feature', 'children', 0])
      const attachmentsByLine = state.getIn(['sources', uri, 'attachments'])

      const component = shallow(<Scenario node={node} uri={uri} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find('.name').text(), 'Hello S')
    })

    it("renders the step", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri, 'feature', 'children', 0])
      const attachmentsByLine = state.getIn(['sources', uri, 'attachments'])

      const component = shallow(<Scenario node={node} uri={uri} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find(Step).length, 1)
    })
  })

  describe(Step.name, () => {
    it("renders attachments", () => {
      const uri = 'features/hello.feature'
      const node = state.getIn(['sources', uri, 'feature', 'children', 0])
      const attachments = state.getIn(['sources', uri, 'attachments', 3])

      const component = shallow(<Step node={node} uri={uri} attachments={attachments}/>)
      assert.equal(component.find(Attachment).length, 2)
    })
  })

  describe(Attachment.name, () => {
    it("renders stack trace", () => {
      const uri = 'features/hello.feature'
      const attachment = state.getIn(['sources', uri, 'attachments', 3, 0])
      const component = shallow(<Attachment attachment={attachment}/>)

      assert.equal(component.find('pre').length, 1)
      assert.equal(component.find('pre').text().split(/\n/)[0], 'Exception in thread "main" java.lang.NullPointerException')
    })

    it("renders pngs", () => {
      const uri = 'features/hello.feature'
      const attachment = state.getIn(['sources', uri, 'attachments', 3, 1])
      const component = shallow(<Attachment attachment={attachment}/>)

      assert.equal(component.find('img').length, 1)
      const expectedSrc = `data:image/png;base64,${attachment.get('data')}`
      assert.equal(component.find('img').prop('src'), expectedSrc)
    })
  })
})
