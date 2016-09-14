import Gherkin from "gherkin"
import {Map, OrderedMap, List, fromJS} from "immutable"

const parser = new Gherkin.Parser()

const reducer = (state, action) => {
  if (!state) return new Map({sources: new Map()})

  switch (action.type) {
    case 'start': {
      return state.set('sources', OrderedMap())
    }
    case 'source': {
      const gherkinDocument = parser.parse(action.data)
      return state.setIn(['sources', action.uri], fromJS(gherkinDocument))
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
      throw new Error("Unsupported action: " + JSON.stringify(action))
    }
  }
}

export default reducer