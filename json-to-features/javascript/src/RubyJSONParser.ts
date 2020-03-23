import { messages } from '@cucumber/messages'
import { isNullOrUndefined } from 'util'

export default class RubyJSONParser {
  public parse(sources: Record<string, any>[]): messages.IGherkinDocument[] {
    return sources.map(source => this.makeGherkinDocument(source))
  }

  private makeGherkinDocument(
    source: Record<string, any>
  ): messages.IGherkinDocument {
    return messages.GherkinDocument.create({
      uri: source.uri,
      feature: this.makeFeature(source),
    })
  }

  private makeFeature(
    source: Record<string, any>
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      name: source.name,
      description: source.description,
      children: this.makeChildren(source.elements || []),
    })
  }

  private makeChildren(
    elements: Record<string, any>[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    let backgroundFound = false

    return elements
      .map(element => {
        if (element.type === 'background' && !backgroundFound) {
          backgroundFound = true
          return this.makeBackground(element)
        }

        if (element.type == 'scenario') {
          return this.makeScenario(element)
        }
      })
      .filter(child => !isNullOrUndefined(child))
  }

  private makeBackground(
    element: Record<string, any>
  ): messages.GherkinDocument.Feature.IFeatureChild {
    return messages.GherkinDocument.Feature.FeatureChild.create({
      background: messages.GherkinDocument.Feature.Background.create({
        keyword: element.keyword,
        name: element.name,
        description: element.description,
        steps: this.makeSteps(element.steps || []),
      }),
    })
  }

  private makeScenario(
    element: Record<string, any>
  ): messages.GherkinDocument.Feature.IFeatureChild {
    return messages.GherkinDocument.Feature.FeatureChild.create({
      scenario: messages.GherkinDocument.Feature.Scenario.create({
        keyword: element.keyword,
        name: element.name,
        description: element.description,
        steps: this.makeSteps(element.steps || []),
      }),
    })
  }

  private makeSteps(
    steps: Record<string, any>[]
  ): messages.GherkinDocument.Feature.IStep[] {
    return steps.map(step => this.makeStep(step))
  }

  private makeStep(
    step: Record<string, any>
  ): messages.GherkinDocument.Feature.Step {
    return messages.GherkinDocument.Feature.Step.create({
      keyword: step.keyword,
      text: step.text,
      docString: this.makeDocString(step.doc_string),
      dataTable: this.makeDataTable(step.rows || []),
    })
  }

  private makeDocString(
    docString: Record<string, any>
  ): messages.GherkinDocument.Feature.Step.IDocString {
    if (isNullOrUndefined(docString)) {
      return null
    }

    return messages.GherkinDocument.Feature.Step.DocString.create({
      mediaType: docString.content_type,
      content: docString.value,
    })
  }

  private makeDataTable(
    rows: Record<string, any>[]
  ): messages.GherkinDocument.Feature.Step.IDataTable {
    if (rows.length == 0) {
      return null
    }

    return messages.GherkinDocument.Feature.Step.DataTable.create({
      rows: rows.map(row =>
        messages.GherkinDocument.Feature.TableRow.create({
          cells: row.cells.map((cell: string) =>
            messages.GherkinDocument.Feature.TableRow.TableCell.create({
              value: cell,
            })
          ),
        })
      ),
    })
  }
}
