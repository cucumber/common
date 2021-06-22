import plugins from './plugins'
import parseMarkdown from './markdown/parseMarkdown'

export default function makeConfig(markdown: string) {
  const doc = parseMarkdown(markdown)

  return {
    doc,
    plugins,
  }
}
