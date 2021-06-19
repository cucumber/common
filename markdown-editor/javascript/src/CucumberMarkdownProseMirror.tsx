import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-tables/style/tables.css'
import './styles.css'

import React, { Dispatch, SetStateAction } from 'react'
import { ProseMirror } from 'use-prosemirror'
import { EditorState } from 'prosemirror-state'
import {GherkinDocument } from '@cucumber/messages'
import {cucumberMarkdownSerializer} from "./markdownSerializer";

type Props = {
  state: EditorState
  setState: Dispatch<SetStateAction<EditorState>>
  setMarkdown: Dispatch<SetStateAction<string>>
  gherkinDocument: GherkinDocument
}

const CucumberMarkdownProseMirror: React.FunctionComponent<Props> = ({
  setMarkdown,
  state,
  setState,
}) => {
  return (
    <ProseMirror
      state={state}
      onChange={(newState) => {
        setMarkdown(cucumberMarkdownSerializer.serialize(newState.doc))
        setState(newState)
      }}
    />
  )
}

export default CucumberMarkdownProseMirror
