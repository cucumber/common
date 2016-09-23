/* eslint-env mocha */
import assert from "assert"
import React from "react"
import {shallow} from "enzyme"
import {CucumberReact, reducer} from "../lib"
const {GherkinDocument, Feature, Scenario, Step, Attachment} = CucumberReact

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
        "line": 3,
        "column": 7
      }
    },
    "data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAELUExURUdwTACoGAClFACqHACoFwCnGQCnFQCnGACoGQCoGQCoGACuGgCnFwCiFwCoGACoGACnFwClFgCpGACoFwD/AACnGAC2JACoGACnFwCqKgCoGACoGACqGQCoFwCnFwCoFwB/AACnGACoGAC/AACoGACoFgCmFwCnFwCnFwCqFgCmFgCZAACoGC64Ql3IbA2sJBuxMBiwLhewLR2yMgmrIOn36/z+/BGuJ9/04rHkuIDUjGHJcA6tJeD04wGoGQusIpnco+T257PlugSpHN704XDOfQeqHiCzNc7u0+z57t3z4HvSh7fmvj69UJzdpSi2PNjy3AKpGlrHahqxMBCtJpHZm83u0jS6R0vCXEWczDEAAAAsdFJOUwDIJQlYPSP7cFCqE1cW+mf4ImiBAXQHPu8GfP0zzoyOAp2wBOg4a2PqOU4FxgPjdgAAAK9JREFUGNNNj1UCwkAMRBcotLi7uw1S3N3d4f4nYSvIfO28bCYJIaI0OSabJ1+pFaDKpD4+zUJS1CHVWSwer+esDNhEQP+fV/f5uAd4XEIesNldl5WK0KSlQAtcDkc5xUcBA+y3tL/UKQIhCpLA+sTzw1K7UQVHQTyB23QyKraaNSAgTOGAQb9bqBeAoDg2EpMT4XdLm3rD8qrO7zFWO7UW8+86oodJp/zzRGUwyq83Mjcb8VXl0ZMAAAAASUVORK5CYII=",
    "media": {
      "encoding": "base64",
      "type": "image/png"
    }
  },
  {
    "type": "attachment",
    "timestamp": 1471420027078,
    "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
    "source": {
      "uri": "features/hello.feature",
      "start": {
        "line": 3,
        "column": 7
      }
    },
    "data": "Exception in thread \"main\" java.lang.NullPointerException\n        at com.example.myproject.Book.getTitle(Book.java:16)\n        at com.example.myproject.Author.getBookTitles(Author.java:25)\n        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)\n",
    "media": {
      "encoding": "utf-8",
      "type": "text/vnd.cucumber.stacktrace.java+plain"
    }
  }
]

const state = events.reduce(reducer, reducer())

describe('Cucumber React', () => {
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
      assert.equal(component.find('.name').text(), 'Hello')
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
      assert.equal(component.find('.name').text(), 'World')
    })

    it("renders the step", () => {
      const uri = 'features/hello.feature'
      const node = events.reduce(reducer, reducer()).getIn(['sources', uri, 'feature', 'children', 0])
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
    it("renders pngs", () => {
      const uri = 'features/hello.feature'
      const attachment = state.getIn(['sources', uri, 'attachments', 3, 0])
      const component = shallow(<Attachment attachment={attachment}/>)

      assert.equal(component.find('img').length, 1)
      const expectedSrc = `data:image/png;base64,${attachment.get('data')}`
      assert.equal(component.find('img').prop('src'), expectedSrc)
    })

    it("renders stack trace", () => {
      const uri = 'features/hello.feature'
      const attachment = state.getIn(['sources', uri, 'attachments', 3, 1])
      const component = shallow(<Attachment attachment={attachment}/>)

      assert.equal(component.find('pre').length, 1)
      assert.equal(component.find('pre').text().split(/\n/)[0], 'Exception in thread "main" java.lang.NullPointerException')
    })
  })
})
