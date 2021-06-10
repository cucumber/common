import * as messages from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableRule {
  id: string
  name: string
  description: string
}

export default class RuleSearch {
  private readonly index = elasticlunr<SearchableRule>((ctx) => {
    ctx.setRef('id')
    ctx.addField('name')
    ctx.addField('description')
    ctx.saveDocument(true)
  })
  private ruleById = new Map<string, messages.Rule>()

  public add(rule: messages.Rule): void {
    this.index.addDoc({
      id: rule.id,
      name: rule.name,
      description: rule.description,
    })
    this.ruleById.set(rule.id, rule)
  }

  public search(query: string): messages.Rule[] {
    const results = this.index.search(query, {
      fields: {
        name: { bool: 'OR', boost: 1 },
        description: { bool: 'OR', boost: 1 },
      },
    })

    return results.map((result) => this.ruleById.get(result.ref))
  }
}
