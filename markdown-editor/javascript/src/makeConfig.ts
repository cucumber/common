import plugins from './plugins'
import makeMarkdownParser from "./makeMarkdownParser";
import makeGherkinLines from "./makeGherkinLines";

export default function makeConfig(markdown: string) {
  const gherkinLines = makeGherkinLines(markdown)

  const markdownParser = makeMarkdownParser(gherkinLines)
  const doc = markdownParser.parse(markdown)

  return {
    doc,
    plugins,
  }
}
