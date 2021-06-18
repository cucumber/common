import {EditorState, Transaction} from "prosemirror-state";
import createTableNode from "../src/createTableNode";
import makeConfig from "../src/makeConfig";
import assert from "assert";
import {cucumberMarkdownSerializer} from "../src/markdownSerializer";

describe('createTableNode', () => {
  it('creates a table node that can be turned into markdown', () => {
    const state = EditorState.create(makeConfig(''))
    const transaction: Transaction = state.tr
    transaction.replaceSelectionWith(createTableNode(state))

    const markdown = cucumberMarkdownSerializer.serialize(transaction.doc)
    assert.strictEqual(markdown, `| h | h | h |
| - | - | - |
| c | c | c |
| c | c | c |
`)
  })
})
