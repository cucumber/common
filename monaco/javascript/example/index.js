import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { buildStepDocuments, jsSearchIndex } from '@cucumber/suggest'
import { ExpressionFactory, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import { configureMonaco } from '../dist/src/index'

// Build some sample step texts and cucumber expressions. These would typically come from a stream
// of Cucumber Messages.
const ef = new ExpressionFactory(new ParameterTypeRegistry())
const expressions = [
  ef.createExpression('I have {int} cukes in my belly'),
  ef.createExpression('there are {int} blind mice')
];
const docs = buildStepDocuments(
  [
    'I have 42 cukes in my belly',
    'I have 96 cukes in my belly',
    'there are 38 blind mice',
  ],
  expressions
)
const index = jsSearchIndex(docs)

const value = `@foo
Feature: Hello
Scenario: Hi
  Given I have 58 cukes in my belly
  And this is an undefined step
    | some | poorly |
    | formatted | table |
`

const editor1 = monaco.editor.create(document.getElementById('editor1'), {
  value,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true
})

const editor2 = monaco.editor.create(document.getElementById('editor2'), {
  value,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true
})

const configureEditor = configureMonaco(monaco, index, expressions)

configureEditor(editor1)
configureEditor(editor2)
