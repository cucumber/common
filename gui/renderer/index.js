const electron = require('electron')
const moment = require('moment')
const path = require('path')

// const Chart = require('chart.js')
// const Options = require('../cli/options')
// const options = new Options(electron.remote.process.argv)

const $ = window.jQuery = require('jquery')
require('bootstrap')

process.on('unhandledRejection', function (reason) {
  console.log(reason.message + '\\n' + reason.stack)
  electron.remote.process.exit(3)
})

const setProgress = (bar, states) => {
  Object.keys(states).forEach((status) => {
    bar.getElementsByClassName(status)[0].style.width = `${states[status]}%`
  })
}

class State {
  constructor() {
    this.testCases = []
    this.gherkinDocs = {}
  }

  getTestCase(sourceLocation) {
    return this.testCases.find(testCase => (
      testCase.sourceLocation.uri == sourceLocation.uri &&
      testCase.sourceLocation.line == sourceLocation.line
    ))
  }
}
let state = new State()

const render = (state) => {
  const projectName = path.basename(state.pwd)
  const startTime = moment(state.startTime).format('h:mm:ss a on MMMM Do YYYY')
  document.title = `Cucumber - ${projectName} (${startTime})`

  $('.status-waiting').hide()
  $('.status-started').show()

  document.getElementsByClassName('pwd')[0].innerText = state.pwd
  document.getElementsByClassName('start-time')[0].innerText = startTime

  if (!state.currentTestCase) {
    $('.status-done').show()
    $('.status-running').hide()
  } else {
    $('.status-done').hide()
    $('.status-running').show()
  }

  console.log(state.currentTestCase)
  document.getElementById('current-test-case').innerHTML =
    state.currentTestCase && locationToString(state.currentTestCase.sourceLocation)

  document.getElementById('current-test-step').innerHTML =
    state.currentTestStep && locationToString(state.currentTestStep.actionLocation)

  const completedTestCases = state.testCases.filter(testCase => testCase.result)
  $('.test-cases-finished-count').text(completedTestCases.length)
  const completedTestCasesWithResult = (status) => {
    return completedTestCases.filter(testCase => testCase.result.status == status)
  }

  setProgress(
    document.getElementById('progressOfTestRun'),
    {
      passed: completedTestCasesWithResult('passed').length / state.testCases.length * 100,
      failed: completedTestCasesWithResult('failed').length / state.testCases.length * 100,
      pending: completedTestCasesWithResult('pending').length / state.testCases.length * 100,
    }
  )

  const allTestSteps = state.testCases.reduce((result, testCase) => result.concat(testCase.steps), [])
  const completedTestSteps = allTestSteps.filter(step => step.result)
  $('.test-steps-finished-count').text(completedTestSteps.length)
}

const events = electron.ipcRenderer

events.on('test-run-started', (event, message) => {
  state.startTime = message.timestamp * 1000 || new Date()
  state.pwd = message.workingDirectory || 'unknown'

  render(state)
})

events.on('source', (event, message) => {
  state.gherkinDocs[message.uri] = {
    body: message.data,
  }
})

events.on('test-case-compiled', (event, testCase) => {
  state.testCases.push(testCase)
  const div = document.createElement('div')

  testCase.div = div
  const h2 = document.createElement('h2')
  h2.innerText = locationToString(testCase.sourceLocation)
  div.appendChild(h2)

  const p = document.createElement('p')
  p.innerText = `This scenario has ${testCase.steps.length} steps:`
  div.appendChild(p)

  const ul = document.createElement('ul')
  testCase.steps.forEach((step) => {
    const li = document.createElement('li')
    step.element = li
    li.innerHTML = getStepHtml(step)
    ul.appendChild(li)
  })
  div.appendChild(ul)

  document.getElementById('main').appendChild(div)
})

events.on('test-case-started', (event, message) => {
  state.currentTestCase = state.getTestCase(message.sourceLocation)
  render(state)
})

events.on('test-step-started', (event, message) => {
  state.currentTestStep = state
    .getTestCase(message.testCase.sourceLocation)
    .steps[message.index]
  render(state)
})

events.on('test-step-finished', (event, message) => {
  const testStep = state
    .getTestCase(message.testCase.sourceLocation)
    .steps[message.index]
  testStep.result = message.result
  render(state)

  const li = testStep.element
  li.appendChild(createResultBadge(message.result))
  li.appendChild(createDurationBadge(message.result))

  if (message.result.exception) {
    const error = document.createElement('pre')
    error.className = 'alert alert-danger'
    error.innerHTML = message.result.exception.message || 'No error message was reported'
    li.appendChild(error)
    const stackTrace = document.createElement('pre')
    stackTrace.innerText = message.result.exception.stackTrace.join('\n')
    li.appendChild(stackTrace)
  }
})

events.on('test-case-finished', (event, message) => {
  state.getTestCase(message.sourceLocation).result = message.result
  render(state)

  const div = getTestCaseDiv(message.sourceLocation)
  const h2 = div.querySelector('h2')
  h2.appendChild(createResultBadge(message.result))
  h2.appendChild(createDurationBadge(message.result))
})

events.on('end', () => {
  state.currentTestCase = null
  state.currentTestStep = null
  render(state)
})

const createResultBadge = (result) => {
  const badge = document.createElement('span')
  badge.className = `badge ${result.status}`
  badge.innerText = result.status
  return badge
}

const createDurationBadge = (result) => {
  const badge = document.createElement('span')
  badge.className = 'badge'
  badge.innerText = `${Math.ceil(result.duration / 1000000)}ms`
  return badge
}

const getStepHtml = (step) => {
  if (isHook(step))
    return locationToString(step.actionLocation)

  const line = step.sourceLocation.line
  const text = state.gherkinDocs[step.sourceLocation.uri].body.split('\n')[line - 1]
  return `<span title="${locationToString(step.sourceLocation)}" data-toggle="tooltip" data-placement="right">${text}</span>`
}

const locationToString = (location) => `${location.uri}:${location.line}`

const isHook = (step) => !state.gherkinDocs[step.sourceLocation.uri]

const getTestCaseDiv = (sourceLocation) => {
  return state.getTestCase(sourceLocation).div
}
