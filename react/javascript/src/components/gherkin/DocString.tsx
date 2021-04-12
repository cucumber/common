import React, { useContext } from 'react'
import HighLight from '../app/HighLight'
import styles from './DocString.module.scss'
import { CustomRenderingContext, DocStringProps } from '../customise/CustomRendering'

const DocString: React.FunctionComponent<DocStringProps> = ({ docString }) => {
  const { DocString: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom docString={docString} />
  }
  return (
    <pre className={(Custom ?? styles).docstring}>
      <HighLight text={docString.content} />
    </pre>
  )
}

export default DocString
