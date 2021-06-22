import React, { Dispatch, SetStateAction } from 'react'
import Editor from 'react-simple-code-editor'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markdown'
import 'prismjs/themes/prism.css'

import { EditorState } from 'prosemirror-state'
import makeConfig from '../makeConfig'

type Props = {
  markdown: string
  setMarkdown: Dispatch<SetStateAction<string>>
  setState: Dispatch<SetStateAction<EditorState>>
}

const MarkdownSimpleCodeEditor: React.FunctionComponent<Props> = ({
  markdown,
  setMarkdown,
  setState,
}) => (
  <Editor
    value={markdown}
    onValueChange={(markdown) => {
      const state = EditorState.create(makeConfig(markdown))
      setState(state)
      setMarkdown(markdown)
    }}
    highlight={(markdown) => highlight(markdown, languages.markdown)}
    padding={10}
    style={{
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12,
    }}
  />
)

export default MarkdownSimpleCodeEditor
