import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-tables/style/tables.css'
import './styles.css'

import React, {Dispatch, SetStateAction} from 'react'
import {ProseMirror} from 'use-prosemirror'
import {EditorState} from 'prosemirror-state'
import {cucumberMarkdownSerializer} from "./markdownSerializer";
import {Decoration, DecorationSet} from 'prosemirror-view'
import makeMarkdownParser from "./makeMarkdownParser";
import makeGherkinLines from "./makeGherkinLines";

type Props = {
  state: EditorState
  setState: Dispatch<SetStateAction<EditorState>>
  setMarkdown: Dispatch<SetStateAction<string>>
}

const CucumberMarkdownProseMirror: React.FunctionComponent<Props> = ({
  setMarkdown,
  state,
  setState,
}) => {
  return (
    <ProseMirror
      state={state}
      decorations={(state) => {
        const decorations: Decoration[] = []
        state.doc.forEach((node, offset) => {
          if(node.attrs.gherkin) {
            console.log('gherkin node', node.textContent, offset, node.nodeSize)
            decorations.push(Decoration.node(offset, offset + node.nodeSize, {class: 'gherkin'}))
          } else {
            // console.log('non-gherkin node', node.textContent, node.attrs)
          }
        })
        return DecorationSet.create(state.doc, decorations)
      }}
      onChange={(newState) => {
        const markdown = cucumberMarkdownSerializer.serialize(newState.doc)
        const gherkinLines = makeGherkinLines(markdown)
        const markdownParser = makeMarkdownParser(gherkinLines)
        const newDoc = markdownParser.parse(markdown)

        // Cannot do `newState.doc = doc` here because it messes up editing.
        // Instead we iterate over both docs and modify the existing doc node if the nodes are "similar"
        newState.doc.forEach((newStateNode) => {
          newStateNode.attrs.gherkin = false
          newDoc.forEach((newDocNode) => {
            if(newDocNode.attrs.gherkin) {
              if(newStateNode.textContent === newDocNode.textContent) {
                newStateNode.attrs.gherkin = true
              }
            }
          })
        })

        setState(newState)
        setMarkdown(markdown)
      }}
    />
  )
}

export default CucumberMarkdownProseMirror
