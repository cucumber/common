import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableScenario {
  id: string
  name: string
}

export default class ScenarioSearch {
  private readonly index = elasticlunr<SearchableScenario>(ctx => {
    ctx.setRef('id')
    ctx.addField('name')
    ctx.saveDocument(true)
  })
  private scenarioById = new Map<string, messages.GherkinDocument.Feature.IScenario>()

  public add(scenario: messages.GherkinDocument.Feature.IScenario): void {
    this.index.addDoc({
      id: scenario.id,
      name: scenario.name
    })
    this.scenarioById.set(scenario.id, scenario)
  }

  public search(query: string): messages.GherkinDocument.Feature.IScenario[] {
    const results = this.index.search(query, {
      fields: {
        name: { boost: 1 }
      }
    })

    return results.map(result => this.scenarioById.get(result.ref))
  }
}