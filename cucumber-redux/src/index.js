const {Map, OrderedMap, List, fromJS} = require('immutable')

const reducer = (state, action) => {
  if (!state) return new Map({sources: new OrderedMap()})
  switch (action.type) {
    case 'gherkin-document': {
      return state.setIn(['sources', action.uri], fromJS(action.document))
    }
    case 'attachment': {
      return state.updateIn(['sources', action.source.uri, 'attachments', action.source.start.line], list => {
        return (list ? list : new List()).push(fromJS({
          data: action.data,
          media: action.media
        }))
      })
    }
    default: {
      return state
    }
  }
}

const lineAttachments = (state, uri, lineNumber) => state.getIn(['sources', uri, 'attachments', lineNumber])
const featureNames = (state) => Array.from(state.get('sources').values()).map(gherkinDocument => gherkinDocument.getIn(['feature', 'name']))

module.exports = {
  reducer,
  lineAttachments,
  featureNames
}
