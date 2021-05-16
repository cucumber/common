import React from 'react'
import HighLight from '../app/HighLight'
import styles from './DocString.module.scss'
import {
  DocStringClasses,
  DocStringProps,
  useCustomRendering,
} from '../customise/CustomRendering'

const DocString: React.FunctionComponent<DocStringProps> = (props) => {
  const Customised = useCustomRendering<DocStringProps, DocStringClasses>('DocString', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props}/>
  }
  return (
    <pre className={Customised.docString}>
      <HighLight text={props.docString.content} />
    </pre>
  )
}

export default DocString
