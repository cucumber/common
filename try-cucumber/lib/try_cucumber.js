require('./style.css')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/vibrant-ink.css')

const CodeMirror = require('codemirror')
require('codemirror/addon/mode/simple')
const CucumberExpressions = require('cucumber-expressions')

const stepMirror = CodeMirror(document.getElementById('step'), {
  value: "I have 7 cukes in my belly",
  theme: "vibrant-ink"
})
makeOneLine(stepMirror)

const regexpMirror = CodeMirror(document.getElementById('regexp'), {
  theme: "vibrant-ink",
  readOnly: true
})
makeOneLine(regexpMirror)

CodeMirror.defineSimpleMode("cucumber-expression", {
  start: [
    {regex: /{[^}]+}/, token: 'number'},
    {regex: /\w+(?:\/\w+)+/, token: 'string'},
    {regex: /\(([^)]+)\)/, token: 'string'}
  ]
})

const cukexpMirror = CodeMirror(document.getElementById('cukexp'), {
  value: "I have {int} cuke(s) in {word} stomach/belly/bag",
  theme: "vibrant-ink"
})
//cukexpMirror.setMode('cucumber-expression')
makeOneLine(cukexpMirror)

const parameterTypeRegistry = new CucumberExpressions.ParameterTypeRegistry()
let cucumberExpression

// Wire up so cukexpMirror edits update the readonly regexpMirror
cukexpMirror.on("change", function(cm, change) {
  updateExpressions()
  matchStepWithExpression()
})
updateExpressions()

stepMirror.on("change", function(cm, change) {
  matchStepWithExpression()
})
matchStepWithExpression()

function updateExpressions() {
  try {
    console.log('HELLO', cukexpMirror.getValue(), parameterTypeRegistry)
    cucumberExpression = new CucumberExpressions.CucumberExpression(
      cukexpMirror.getValue(),
      parameterTypeRegistry)
    regexpMirror.setValue(cucumberExpression._regexp.source)
  } catch(err) {
    console.error(err)
    // Failed to parse the Cucumber Expression
    regexpMirror.setValue('')
  }
}

function matchStepWithExpression() {
  // Remove old children
  const stepdefNode = document.getElementById('stepdef')
  while (stepdefNode.hasChildNodes()) {
    stepdefNode.removeChild(stepdefNode.lastChild)
  }

  // Match step against cukexp
  const args = cucumberExpression.match(stepMirror.getValue())
  if(!args) {
    stepMirror.getWrapperElement().classList.add('no-match')
    cukexpMirror.getWrapperElement().classList.add('not-used')
    return
  }
  stepMirror.getWrapperElement().classList.remove('no-match')
  cukexpMirror.getWrapperElement().classList.remove('not-used')

  // Add widgets to the steps
  for(const arg of args) {
    const argWidget = createArgWidget(stepMirror, arg.value.length)
    stepMirror.addWidget({line: 0, ch: arg.offset}, argWidget)
  }

  // Generate parameter names
  // We're using internal logic in the generator to generate parameter names,
  // because it generates unique variable names (int, int2) etc.
  const parameters = cucumberExpression._parameters
  const generator = new CucumberExpressions.CucumberExpressionGenerator()
  const usageByTypeName = {}
  const parameterNames = parameters.map(parameter => {
    return generator._getParameterName(parameter.typeName || 'string', usageByTypeName)
  })

  addSpan("(", stepdefNode)
  parameterNames.forEach((parameterName, i) => {
    if(i > 0) {
      addSpan(", ", stepdefNode)
    }
    const value = args[i].transformedValue
    addSpan(parameterName, stepdefNode).setAttribute('data-label', JSON.stringify(value))
  })
  addSpan(") => { /* your code here */ }", stepdefNode)
}

function addSpan(text, parent) {
  const span = document.createElement('span')
  span.textContent = text
  parent.appendChild(span)
  return span
}

function createArgWidget(cm, width) {
  const rect = document.createElement('div')
  rect.style.width = width * cm.defaultCharWidth() + 'px'
  rect.style.height = cm.defaultTextHeight() + 'px'
  rect.style.top = '-' + cm.defaultTextHeight() + 'px'
  rect.style.position = 'relative'
  rect.style.background = '#118811'
  const cursor = document.createElement('div')
  cursor.appendChild(rect)
  return cursor
}
// http://stackoverflow.com/questions/13026285/codemirror-for-just-one-line-textfield
function makeOneLine(cm) {
  cm.setSize(cm.getScrollInfo().width, cm.defaultTextHeight() + 2 * 4);
  // now disallow adding newlines in the following simple way
  cm.on("beforeChange", function(instance, change) {
    const newtext = change.text.join("").replace(/\n/g, ""); // remove ALL \n !
    change.update(change.from, change.to, [newtext])
    return true;
  })
}
