import { cucumberMarkdownParser } from './cucumberMarkdown'
import plugins from './plugins'

export default function makeConfig(markdown: string) {
  return {
    doc: cucumberMarkdownParser.parse(markdown),
    plugins,
  }
}
