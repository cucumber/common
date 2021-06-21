import {Node as ProseMirrorNode} from 'prosemirror-model'
import makeGherkinLines from "../makeGherkinLines";
import makeMarkdownParser from "../makeMarkdownParser";

/**
 * Parses a Gherkin Markdown string into a ProseMirror document, adding special
 * node attributes to indicate gherkin content or parse error. These attributes
 * are used by the gherkinHighlighting plugin.
 *
 * @param markdown
 */
export default function parseMarkdown(markdown: string): ProseMirrorNode {
  const {gherkinLines, parseError} = makeGherkinLines(markdown)
  const markdownParser = makeMarkdownParser(gherkinLines, parseError)
  return markdownParser.parse(markdown);
}
