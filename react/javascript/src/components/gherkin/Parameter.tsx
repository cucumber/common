import React from 'react'
import {
  ParameterClasses,
  ParameterProps,
  useCustomRendering,
} from '../customise/CustomRendering'
import styles from './Parameter.module.scss'

const Parameter: React.FunctionComponent<ParameterProps> = (props) => {
  const Customised = useCustomRendering<ParameterProps, ParameterClasses>('Parameter', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props}/>
  }
  return (
    <span title={props.parameterTypeName} className={Customised.parameter}>
      {props.children}
    </span>
  )
}

export default Parameter
