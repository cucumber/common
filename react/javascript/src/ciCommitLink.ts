import { messages } from '@cucumber/messages'

export default function ciCommitLink(ci: messages.Meta.ICI): string {
  const isGithubActions = ci.name == 'GitHub Actions'
  const isGithub =
    ci.git && ci.git.remote && ci.git.remote.match(/^https?:\/\/github.com\/.*/)

  if (isGithubActions || isGithub) {
    const repoUrl = ci.git.remote.replace(/\.git$/, '')
    return `${repoUrl}/commit/${ci.git.revision}`
  }
}
