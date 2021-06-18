import plugins from './plugins'
import makeMarkdownParser from "./makeMarkdownParser";

export default function makeConfig(markdown: string) {
  const parser = makeMarkdownParser();
  const doc = parser.parse(markdown);
  return {
    doc,
    plugins,
  }
}
