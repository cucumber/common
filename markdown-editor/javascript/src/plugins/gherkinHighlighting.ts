import { Node as ProseMirrorNode } from 'prosemirror-model'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { cucumberMarkdownSerializer } from '../markdown/markdownSerializer'
import parseMarkdown from '../markdown/parseMarkdown'

interface State {
  decorations: DecorationSet
}

/**
 * ProseMirror plugin that highlights Gherkin lines
 */
export default function gherkinHighlighting(): Plugin<State> {
  const key = new PluginKey<State>()

  return new Plugin<State>({
    key,

    state: {
      init(_, instance) {
        return {
          decorations: DecorationSet.create(instance.doc, makeDecorations(instance.doc)),
        }
      },

      apply(tr, data) {
        if (!tr.docChanged) {
          return {
            decorations: data.decorations.map(tr.mapping, tr.doc),
          }
        }

        return {
          decorations: DecorationSet.create(tr.doc, makeDecorations(tr.doc)),
        }
      },
    },

    props: {
      decorations(state) {
        return this.getState(state).decorations
      },
    },
  })
}

function makeDecorations(doc: ProseMirrorNode): Decoration[] {
  if (!doc || !doc.nodeSize) {
    return []
  }
  const markdown = cucumberMarkdownSerializer.serialize(doc)
  const parsedDoc = parseMarkdown(markdown)

  const decorations: Decoration[] = []

  parsedDoc.descendants((node, pos) => {
    if (node.attrs.gherkin) {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: 'gherkin' }))
    }
    if (node.attrs.error) {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: 'error' }))
    }
  })

  return decorations
}
