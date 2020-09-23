import { messages } from '@cucumber/messages'
import gitUrlParse from 'git-url-parse'

export default function ciCommitLink(ci: messages.Meta.ICI): string | null {
  if (ci.git && ci.git.remote) {
    const gitUrl = gitUrlParse(ci.git.remote)
    const github =
      gitUrl.resource === 'github.com' || ci.name === 'GitHub Actions'
    if (ci.git.revision && gitUrl && github) {
      return `https://${gitUrl.resource}/${gitUrl.owner}/${gitUrl.name}/commit/${ci.git.revision}`
    }
  }
  return null
}
