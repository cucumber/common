import React from 'react'
import * as messages from '@cucumber/messages'
import ciCommitLink from '../../ciCommitLink'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  ci: messages.Ci
}

export const CICommitLink: React.FunctionComponent<IProps> = ({ ci: ci }) => {
  const commitLink = ciCommitLink(ci)

  if (commitLink) {
    return (
      <a href={commitLink}>
        <FontAwesomeIcon icon={faLink} />
        {ci.git.revision.substring(0, 7)}
      </a>
    )
  }
  return (
    <span>
      <FontAwesomeIcon icon={faLink} /> {ci.git.revision.substring(0, 7)}
    </span>
  )
}
