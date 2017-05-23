/* eslint-env browser */
const React = require('react')
const {createStore} = require('redux')
const {connect, Provider} = require('react-redux')
const {render} = require('react-dom')
const {CucumberReact, reducer} = require('cucumber-react')
const {Cucumber} = CucumberReact

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
