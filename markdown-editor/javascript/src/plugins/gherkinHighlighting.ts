import {Node as ProseMirrorNode} from "prosemirror-model";
import {Plugin, PluginKey} from "prosemirror-state";
import {Decoration, DecorationSet} from "prosemirror-view";
import makeGherkinLines from "../makeGherkinLines";
import makeMarkdownParser from "../makeMarkdownParser";
import {cucumberMarkdownSerializer} from "../markdownSerializer";

interface State {
  decorations: DecorationSet
}

export default function gherkinHighlighting(): Plugin<State> {
  const key = new PluginKey<State>();

  return new Plugin<State>({
    key,

    state: {
      init(_, instance) {
        return {
          decorations: DecorationSet.create(instance.doc, makeDecorations(instance.doc,))
        };
      },

      apply(tr, data) {
        if (!tr.docChanged) {
          return {
            decorations: data.decorations.map(tr.mapping, tr.doc),
          };
        }

        return {
          decorations: DecorationSet.create(tr.doc, makeDecorations(tr.doc)),
        };
      },
    },

    props: {
      decorations(state) {
        return this.getState(state).decorations;
      },
    }
  })
}

function makeDecorations(
  doc: ProseMirrorNode,
): Decoration[] {
  if (!doc || !doc.nodeSize) {
    return [];
  }
  const markdown = cucumberMarkdownSerializer.serialize(doc)
  const gherkinLines = makeGherkinLines(markdown)
  const markdownParser = makeMarkdownParser(gherkinLines)
  const newDoc = markdownParser.parse(markdown)

  const decorations: Decoration[] = [];

  newDoc.descendants((node, pos) => {
    if (node.attrs.gherkin) {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, {class: 'gherkin'}))
    }
  })

  console.log('DECS', decorations.length)

  return decorations
}
