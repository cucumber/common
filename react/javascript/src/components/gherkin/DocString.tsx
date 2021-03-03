import React from 'react'
import { messages } from '@cucumber/messages'
import HighLight from '../app/HighLight'
import styles from './DocString.module.scss'

interface IProps {
  docString: messages.GherkinDocument.Feature.Step.IDocString
}

const DocString: React.FunctionComponent<IProps> = ({ docString }) => {
  return (
    <pre className={styles.docstring}>
      <HighLight text={docString.content} />
    </pre>
  )
}

export default DocString
