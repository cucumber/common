import React from 'react'
import { messages } from '@cucumber/messages'
import ciCommitLink from '../../ciCommitLink'

interface IProps {
  ci: messages.Meta.ICI
}

const CICommitLink: React.FunctionComponent<IProps> = ({ ci: ci }) => {
  const commitLink = ciCommitLink(ci)

  if (commitLink) {
    return <a href={commitLink}>#{ci.git.revision}</a>
  }
  return <span>#{ci.git.revision}</span>
}

export default CICommitLink
