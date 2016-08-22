import Gherkin from "gherkin"
import {Map, OrderedMap} from "immutable"

const parser = new Gherkin.Parser()

const reducer = (state, action) => {
  if (!state) return Map()

  switch (action.type) {
    case 'start':
      return state.set('sources', OrderedMap())
    case 'source':
      const gherkinDocument = parser.parse(action.data)
      return state.setIn(['sources', action.uri], gherkinDocument)
    default:
      throw new Error("Unsupported action: " + JSON.stringify(action))
  }
}

export default reducer