import React from "react"
import {createStore} from "redux"
import {connect, Provider} from "react-redux"
import {render} from "react-dom"
import reducer from "./reducer"
import {Cucumber} from "./cucumber_react"

const store = createStore(reducer)
console.log('STATE', store.getState())

const mapStateToProps = (state) => {
  return {
    sources: state.get('sources')
  }
}

const ConnectedCucumber = connect(mapStateToProps)(Cucumber)

render(<Provider store={store}>
    <ConnectedCucumber sources={store.getState().get('sources')}/>
  </Provider>,
  document.getElementById('app'))


var es = new EventSource('/sse')
es.onmessage = function (messageEvent) {
  var event = JSON.parse(messageEvent.data)
  console.log(event)
  store.dispatch(event)
}
