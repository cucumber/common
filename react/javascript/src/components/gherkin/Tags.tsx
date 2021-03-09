import React, { useContext } from 'react'
import HighLight from '../app/HighLight'
import { CustomRenderingContext, TagsProps } from '../customise/CustomRendering'
import styles from './Tags.module.scss'

const Tags: React.FunctionComponent<TagsProps> = ({ tags }) => {
  const { Tags: Custom } = useContext(CustomRenderingContext)
  if (!tags) {
    return null
  }
  if (typeof Custom === 'function') {
    return <Custom tags={tags} />
  }
  return (
    <ul className={(Custom ?? styles).tags}>
      {tags.map((tag, index) => (
        <li className={(Custom ?? styles).tag} key={index}>
          <HighLight text={tag.name} />
        </li>
      ))}
    </ul>
  )
}

export default Tags
