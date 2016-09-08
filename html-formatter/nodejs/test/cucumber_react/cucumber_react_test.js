import assert from "assert"
import React from "react" // eslint-disable-line no-unused-vars
import {shallow} from "enzyme"
import {GherkinDocument, Feature, Scenario, Step, Attachment} from "../../lib/cucumber_react/cucumber_react"
import reducer from "../../lib/common/reducer"

const events = [
  {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
  {
    "type": "source",
    "timestamp": 1471614838650,
    "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
    "uri": "features/hello.feature",
    "data": "Feature: Hello\n  Scenario: World\n    Given hello"
  },
  {
    "type": "attachment",
    "timestamp": 1471420027078,
    "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
    "source": {
      "uri": "features/hello.feature",
      "start": {
        "line": 22,
        "column": 7
      }
    },
    // 16x16 cucumber logo, compressed with pngquant
    "data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAELUExURUdwTACoGAClFACqHACoFwCnGQCnFQCnGACoGQCoGQCoGACuGgCnFwCiFwCoGACoGACnFwClFgCpGACoFwD/AACnGAC2JACoGACnFwCqKgCoGACoGACqGQCoFwCnFwCoFwB/AACnGACoGAC/AACoGACoFgCmFwCnFwCnFwCqFgCmFgCZAACoGC64Ql3IbA2sJBuxMBiwLhewLR2yMgmrIOn36/z+/BGuJ9/04rHkuIDUjGHJcA6tJeD04wGoGQusIpnco+T257PlugSpHN704XDOfQeqHiCzNc7u0+z57t3z4HvSh7fmvj69UJzdpSi2PNjy3AKpGlrHahqxMBCtJpHZm83u0jS6R0vCXEWczDEAAAAsdFJOUwDIJQlYPSP7cFCqE1cW+mf4ImiBAXQHPu8GfP0zzoyOAp2wBOg4a2PqOU4FxgPjdgAAAK9JREFUGNNNj1UCwkAMRBcotLi7uw1S3N3d4f4nYSvIfO28bCYJIaI0OSabJ1+pFaDKpD4+zUJS1CHVWSwer+esDNhEQP+fV/f5uAd4XEIesNldl5WK0KSlQAtcDkc5xUcBA+y3tL/UKQIhCpLA+sTzw1K7UQVHQTyB23QyKraaNSAgTOGAQb9bqBeAoDg2EpMT4XdLm3rD8qrO7zFWO7UW8+86oodJp/zzRGUwyq83Mjcb8VXl0ZMAAAAASUVORK5CYII=",
    "media": {
      "encoding": "base64",
      "type": "image/png"
    }
  }]

const state = events.reduce(reducer, reducer())

describe('Cucumber React', () => {
  describe(GherkinDocument.name, () => {
    it("renders the feature", () => {
      const node = state.getIn(['sources', 'features/hello.feature'])
      const component = shallow(<GherkinDocument node={node}/>)
      assert.equal(component.find(Feature).length, 1)
    })
  })

  describe(Feature.name, () => {
    it("renders the name", () => {
      const node = state.getIn(['sources', 'features/hello.feature', 'feature'])
      const attachmentsByLine = state.getIn(['sources', 'features/hello.feature', 'attachments'])

      const component = shallow(<Feature node={node} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find('.name').text(), 'Hello')
    })

    it("renders the scenario", () => {
      const node = state.getIn(['sources', 'features/hello.feature', 'feature'])
      const attachmentsByLine = state.getIn(['sources', 'features/hello.feature', 'attachments'])

      const component = shallow(<Feature node={node} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find(Scenario).length, 1)
    })
  })

  describe(Scenario.name, () => {
    it("renders the name", () => {
      const node = state.getIn(['sources', 'features/hello.feature', 'feature', 'children', 0])
      const attachmentsByLine = state.getIn(['sources', 'features/hello.feature', 'attachments'])

      const component = shallow(<Scenario node={node} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find('.name').text(), 'World')
    })

    it("renders the step", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature', 'feature', 'children', 0])
      const attachmentsByLine = state.getIn(['sources', 'features/hello.feature', 'attachments'])

      const component = shallow(<Scenario node={node} attachmentsByLine={attachmentsByLine}/>)
      assert.equal(component.find(Step).length, 1)
    })
  })

  describe(Step.name, () => {
    it("renders attachments", () => {
      const node = state.getIn(['sources', 'features/hello.feature', 'feature', 'children', 0])
      const attachments = state.getIn(['sources', 'features/hello.feature', 'attachments', 22])

      const component = shallow(<Step node={node} attachments={attachments}/>)
      assert.equal(component.find(Attachment).length, 1)
    })
  })

  describe(Attachment.name, () => {
    it("renders attached pngs", () => {
      const attachment = state.getIn(['sources', 'features/hello.feature', 'attachments', 22, 0])
      const component = shallow(<Attachment attachment={attachment}/>)

      assert.equal(component.find('img').length, 1)
      const expectedSrc = `data:image/png;base64,${attachment.get('data')}`
      assert.equal(component.find('img').prop('src'), expectedSrc)
    })
  })
})
