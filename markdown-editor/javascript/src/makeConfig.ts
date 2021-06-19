import plugins from './plugins'
import makeMarkdownParser from "./makeMarkdownParser";
import {AstBuilder, GherkinInMarkdownTokenMatcher, Parser} from '@cucumber/gherkin';
import {IdGenerator} from '@cucumber/messages';

const gherkinParser = new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinInMarkdownTokenMatcher())

export default function makeConfig(markdown: string) {
  const gherkinKeywordLines: number[] = []
  try {
    const gherkinDocument = gherkinParser.parse(markdown)
    if(gherkinDocument) {
      for (const featureChild of gherkinDocument.feature.children) {
        if(featureChild.scenario) {
          gherkinKeywordLines.push(featureChild.scenario.location.line)
        }
      }
    }
  } catch (parseError) {
    // ignore
  }

  const markdownParser = makeMarkdownParser(gherkinKeywordLines);
  const doc = markdownParser.parse(markdown);
  return {
    doc,
    plugins,
  }
}
