import React from 'react'
import { messages } from '@cucumber/messages'
import ciCommitLink from '../../ciCommitLink'

interface IProps {
  ci: messages.Meta.ICI
}

const CommitLink: React.FunctionComponent<IProps> = ({ ci: ci }) => {
  const commitLink = ciCommitLink(ci)

  if (commitLink) {
    return <a href={commitLink}>#{ci.git.revision}</a>
  }
  return <span>#{ci.git.revision}</span>
}

const CIInformation: React.FunctionComponent<IProps> = ({ ci: ci }) => {
  return (
    <div className="cucumber-ci-information">
      <ul>
        <li>
          Build: <a href={ci.url}>{ci.name}</a>
        </li>
        <li>
          Commit: <CommitLink ci={ci} />
        </li>
      </ul>
    </div>
  )
}
export default CIInformation
