import React from 'react'
import HighLight from '../app/HighLight'
import { TagsClasses, TagsProps, useCustomRendering } from '../customise/CustomRendering'
import styles from './Tags.module.scss'

const Tags: React.FunctionComponent<TagsProps> = (props) => {
  const Customised = useCustomRendering<TagsProps, TagsClasses>('Tags', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props} />
  }
  if (!props.tags.length) {
    return null
  }
  return (
    <ul className={Customised.tags}>
      {props.tags.map((tag, index) => (
        <li className={Customised.tag} key={index}>
          <HighLight text={tag.name} />
        </li>
      ))}
    </ul>
  )
}

export default Tags
