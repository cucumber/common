import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { buildStepDocuments, jsSearchIndex } from '@cucumber/suggest'
import { ExpressionFactory, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import { configure } from '../dist/src/index'

(function () {
  // create div to avoid needing a HtmlWebpackPlugin template
  const div = document.createElement('div');
  div.id = 'root';
  // @ts-ignore
  div.style = 'width:800px; height:600px; border:1px solid #ccc;';

  document.body.appendChild(div);
})();

const ef = new ExpressionFactory(new ParameterTypeRegistry())
const docs = buildStepDocuments(
  [
    'I have 42 cukes in my belly',
    'I have 96 cukes in my belly',
    'there are 38 blind mice',
  ],
  [
    ef.createExpression('I have {int} cukes in my belly'),
    ef.createExpression('there are {int} blind mice')
  ]
)
const index = jsSearchIndex(docs)

configure(monaco, index, [])

monaco.editor.create(document.getElementById('root'), {
  value: `Feature: Hello
  Scenario: Hi
    Given 
`,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true
});
