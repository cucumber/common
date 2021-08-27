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

configure(monaco, index, expressions)

monaco.editor.create(document.getElementById('root'), {
  value: `@foo
Feature: Hello
  Scenario: Hi
    Given I have 58 cukes in my belly
    And this is an undefined step
`,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true
});
