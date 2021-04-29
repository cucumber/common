import * as messages from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableScenario {
  id: string
  name: string
  description: string
}

export default class ScenarioSearch {
  private readonly index = elasticlunr<SearchableScenario>((ctx) => {
    ctx.setRef('id')
    ctx.addField('name')
    ctx.addField('description')
    ctx.saveDocument(true)
  })
  private scenarioById = new Map<string, messages.Scenario>()

  public add(scenario: messages.Scenario): void {
    this.index.addDoc({
      id: scenario.id,
      name: scenario.name,
      description: scenario.description,
    })
    this.scenarioById.set(scenario.id, scenario)
  }

  public search(query: string): messages.Scenario[] {
    const results = this.index.search(query, {
      fields: {
        name: { bool: 'OR', boost: 1 },
        description: { bool: 'OR', boost: 1 },
      },
    })

    return results.map((result) => this.scenarioById.get(result.ref))
  }
}
