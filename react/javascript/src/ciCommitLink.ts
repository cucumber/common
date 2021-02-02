import { messages } from '@cucumber/messages'
import toRepositoryId from './toRepositoryId'

export default function ciCommitLink(ci: messages.Meta.ICI): string | null {
  if (ci.git && ci.git.remote) {
    const repositoryId = toRepositoryId(ci.git.remote)
    const github =
      repositoryId.startsWith('github.com') || ci.name === 'GitHub Actions'
    if (ci.git.revision && github) {
      return `https://${repositoryId}/commit/${ci.git.revision}`
    }
  }
  return null
}
