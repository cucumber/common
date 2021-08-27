import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { jsSearchIndex } from '@cucumber/suggest'
import { configure } from '../dist/src/index'

(function () {
  // create div to avoid needing a HtmlWebpackPlugin template
  const div = document.createElement('div');
  div.id = 'root';
  // @ts-ignore
  div.style = 'width:800px; height:600px; border:1px solid #ccc;';

  document.body.appendChild(div);
})();

const doc1 = {
  suggestion: 'I have {int} cukes in my belly',
  segments: ['I have ', ['42', '98'], ' cukes in my belly'],
}
const doc2 = {
  suggestion: 'I am a teapot',
  segments: ['I am a teapot'],
}
const index = jsSearchIndex([doc1, doc2])

configure(monaco, index, [])

monaco.editor.create(document.getElementById('root'), {
  value: `Feature: Hello
  Scenario: Hi
    Given I have 42 cukes in my belly
`,
  language: 'gherkin',
  theme: 'vs-dark',
  // semantic tokens provider is disabled by default
  'semanticHighlighting.enabled': true
});
