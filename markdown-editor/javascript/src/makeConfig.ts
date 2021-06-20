import plugins from './plugins'
import makeMarkdownParser from "./makeMarkdownParser";
import {AstBuilder, GherkinInMarkdownTokenMatcher, Parser} from '@cucumber/gherkin';
import {IdGenerator} from '@cucumber/messages';

export default function makeConfig(markdown: string) {
  const gherkinParser = new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinInMarkdownTokenMatcher())
  const gherkinLines: number[] = []
  try {
    const gherkinDocument = gherkinParser.parse(markdown)
    if(gherkinDocument) {
      for (const featureChild of gherkinDocument.feature.children) {
        if(featureChild.scenario) {
          gherkinLines.push(featureChild.scenario.location.line)
        }
      }
    }
  } catch (parseError) {
    console.log(parseError.message)
    console.log('---')
    console.log(markdown)
    // ignore
  }

  const markdownParser = makeMarkdownParser(gherkinLines)
  const doc = markdownParser.parse(markdown);
  return {
    doc,
    plugins,
  }
}
