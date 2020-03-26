import { messages, IdGenerator } from '@cucumber/messages'
import IAstMaker from './IAstMaker'

export default class AstMaker implements IAstMaker {
  constructor(private readonly idGenerator: IdGenerator.NewId) {}

  public makeGherkinDocument(
    uri: string,
    feature: messages.GherkinDocument.IFeature
  ): messages.IGherkinDocument {
    return messages.GherkinDocument.create({
      uri,
      feature,
    })
  }

  public makeFeature(
    line: number,
    keyword: string,
    name: string,
    description: string,
    children: ReadonlyArray<messages.GherkinDocument.Feature.IFeatureChild>
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      location: messages.Location.create({ line }),
      keyword,
      name,
      description,
      children: children.map(
        (child: messages.GherkinDocument.Feature.FeatureChild) => child
      ),
    })
  }

  public makeFeatureChild(
    type: string,
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.GherkinDocument.Feature.IStep>
  ): messages.GherkinDocument.Feature.IFeatureChild {
    if (type === 'background') {
      return messages.GherkinDocument.Feature.FeatureChild.create({
        background: messages.GherkinDocument.Feature.Background.create({
          location: messages.Location.create({ line }),
          keyword,
          name,
          description,
          steps: steps.map(step => step),
        }),
      })
    }

    if (type === 'scenario') {
      return messages.GherkinDocument.Feature.FeatureChild.create({
        scenario: messages.GherkinDocument.Feature.Scenario.create({
          id: this.idGenerator(),
          location: messages.Location.create({ line }),
          keyword,
          name,
          description,
          steps: steps.map(step => step),
        }),
      })
    }

    throw new Error(`Unsupported type for feature child: ${type}`)
  }

  public makeStep(
    line: number,
    keyword: string,
    text: string,
    docString?: messages.GherkinDocument.Feature.Step.IDocString,
    dataTable?: messages.GherkinDocument.Feature.Step.IDataTable
  ): messages.GherkinDocument.Feature.IStep {
    return messages.GherkinDocument.Feature.Step.create({
      id: this.idGenerator(),
      location: messages.Location.create({ line }),
      keyword,
      text,
      docString,
      dataTable,
    })
  }

  public makeDocstring(
    mediaType: string,
    content: string
  ): messages.GherkinDocument.Feature.Step.IDocString {
    return messages.GherkinDocument.Feature.Step.DocString.create({
      mediaType,
      content,
    })
  }

  public makeDataTable(
    cells: ReadonlyArray<ReadonlyArray<string>>
  ): messages.GherkinDocument.Feature.Step.IDataTable {
    return messages.GherkinDocument.Feature.Step.DataTable.create({
      rows: cells.map(row =>
        messages.GherkinDocument.Feature.TableRow.create({
          cells: row.map(cell =>
            messages.GherkinDocument.Feature.TableRow.TableCell.create({
              value: cell,
            })
          ),
        })
      ),
    })
  }
}
