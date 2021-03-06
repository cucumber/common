import React, { useContext } from 'react'
import HighLight from '../app/HighLight'
import styles from './DocString.module.scss'
import {
  CustomRenderingContext,
  DocStringProps,
} from '../customise/CustomRendering'

const DocString: React.FunctionComponent<DocStringProps> = ({ docString }) => {
  const { DocString } = useContext(CustomRenderingContext)
  if (typeof DocString === 'function') {
    return <DocString docString={docString} />
  }
  return (
    <pre className={(DocString ?? styles).docstring}>
      <HighLight text={docString.content} />
    </pre>
  )
}

export default DocString
