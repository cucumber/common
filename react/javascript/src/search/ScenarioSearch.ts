import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableScenario {
  id: string
  name: string
  description: string
}

export default class ScenarioSearch {
  private readonly index = elasticlunr<SearchableScenario>(ctx => {
    ctx.setRef('id')
    ctx.addField('name')
    ctx.addField('description')
    ctx.saveDocument(true)
  })
  private scenarioById = new Map<
    string,
    messages.GherkinDocument.Feature.IScenario
  >()

  public add(scenario: messages.GherkinDocument.Feature.IScenario): void {
    this.index.addDoc({
      id: scenario.id,
      name: scenario.name,
      description: scenario.description,
    })
    this.scenarioById.set(scenario.id, scenario)
  }

  public search(query: string): messages.GherkinDocument.Feature.IScenario[] {
    const results = this.index.search(query, {
      fields: {
        name: { bool: 'OR', expand: true, boost: 1 },
        description: { bool: 'OR', expand: true, boost: 1 },
      },
    })

    return results.map(result => this.scenarioById.get(result.ref))
  }
}
