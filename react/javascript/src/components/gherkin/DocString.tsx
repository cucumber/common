import React, { useContext } from 'react'
import { messages } from '@cucumber/messages'
import HighLight from '../app/HighLight'
import styles from './DocString.module.scss'
import { CustomRenderingContext } from '../customise/CustomRendering'

interface IProps {
  docString: messages.GherkinDocument.Feature.Step.IDocString
}

const DocString: React.FunctionComponent<IProps> = ({ docString }) => {
  const { DocString } = useContext(CustomRenderingContext)
  return (
    <pre className={DocString?.docstring ?? styles.docstring}>
      <HighLight text={docString.content} />
    </pre>
  )
}

export default DocString
