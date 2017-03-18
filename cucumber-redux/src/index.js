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
          uri: action.uri,
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

module.exports = reducer
