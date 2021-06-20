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
        // console.log('---decorations ---')
        state.doc.forEach((node, offset) => {
          if(node.attrs.gherkin) {
            decorations.push(Decoration.node(offset, offset + node.nodeSize, {class: 'gherkin'}));
          }
        })
        // console.log('decorations:', decorations.length)
        return DecorationSet.create(state.doc, decorations);
      }}
      onChange={(newState) => {
        const markdown = cucumberMarkdownSerializer.serialize(newState.doc);
        setMarkdown(markdown)
        setState(newState)
      }}
    />
  )
}

export default CucumberMarkdownProseMirror
