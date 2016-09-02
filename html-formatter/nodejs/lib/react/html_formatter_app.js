import React from "react"
import {createStore} from "redux"
import {connect, Provider} from "react-redux"
import {render} from "react-dom"
import reducer from "../common/reducer"
import {Cucumber} from "../cucumber_react/cucumber_react"

const store = createStore(reducer)

const mapStateToProps = (state) => {
  return {
    sources: state.get('sources')
  }
}

const ConnectedCucumber = connect(mapStateToProps)(Cucumber)

const provider = <Provider store={store}>
  <ConnectedCucumber sources={store.getState().get('sources')}/>
</Provider>

render(provider, document.getElementById('app'))

const es = new EventSource('/sse')
es.onmessage = function (messageEvent) {
  const event = JSON.parse(messageEvent.data)
  store.dispatch(event)
}
