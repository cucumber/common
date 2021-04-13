import React, { useContext } from 'react'
import HighLight from '../app/HighLight'
import { CustomRenderingContext, mixinStyles, TagsProps } from '../customise/CustomRendering'
import styles from './Tags.module.scss'

const Tags: React.FunctionComponent<TagsProps> = ({ tags }) => {
  const { Tags: Custom } = useContext(CustomRenderingContext)
  if (!tags) {
    return null
  }
  if (typeof Custom === 'function') {
    return <Custom tags={tags} />
  }
  const composedStyles = mixinStyles(styles, Custom)
  return (
    <ul className={composedStyles.tags}>
      {tags.map((tag, index) => (
        <li className={composedStyles.tag} key={index}>
          <HighLight text={tag.name} />
        </li>
      ))}
    </ul>
  )
}

export default Tags
