import React from 'react'
import HighLight from '../app/HighLight'
import {
  DescriptionClasses,
  DescriptionProps,
  useCustomRendering,
} from '../customise/CustomRendering'
import styles from './Description.module.scss'

const Description: React.FunctionComponent<DescriptionProps> = ({ description }) => {
  const Customised = useCustomRendering<DescriptionProps, DescriptionClasses>('Description', styles)
  if (typeof Customised === 'function') {
    return <Customised description={description} />
  }
  if (description && description.trim() !== '') {
    return (
      <div className={Customised.content}>
        <HighLight text={description} markdown={true} />
      </div>
    )
  }
  return null
}

export default Description
