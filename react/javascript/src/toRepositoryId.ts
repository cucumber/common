export default function toRepositoryId(s: string): string {
  if (!s.includes('://') && s.includes(':')) {
    // scp style URL (not really a URL)
    const [host, path] = s.split(':', 2)
    s = `ssh://${host}/${path}`
  }
  s = s.replace(/\.git$/, '')
  const url = new URL(s)
  return `${url.hostname}${url.pathname}`
}
