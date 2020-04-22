import { messages } from '@cucumber/messages'
import IAstMaker from './IAstMaker'

export default class AstMaker implements IAstMaker {
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
    children: ReadonlyArray<messages.GherkinDocument.Feature.IFeatureChild>,
    tags?: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      location: messages.Location.create({ line }),
      keyword,
      name,
      description,
      children: children.map(
        (child: messages.GherkinDocument.Feature.FeatureChild) => child
      ),
      tags: tags ? tags.map((tag) => tag) : undefined,
    })
  }

  public makeTag(
    name: string,
    line: number
  ): messages.GherkinDocument.Feature.ITag {
    return messages.GherkinDocument.Feature.Tag.create({
      name,
      location: messages.Location.create({ line }),
    })
  }

  public makeScenarioFeatureChild(
    id: string,
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.GherkinDocument.Feature.IStep>,
    tags?: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ) {
    return messages.GherkinDocument.Feature.FeatureChild.create({
      scenario: messages.GherkinDocument.Feature.Scenario.create({
        id,
        location: messages.Location.create({ line }),
        keyword,
        name,
        description,
        steps: steps.map((step) => step),
        tags: tags ? tags.map((tag) => tag) : undefined,
      }),
    })
  }

  public makeBackgroundFeatureChild(
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.GherkinDocument.Feature.IStep>
  ) {
    return messages.GherkinDocument.Feature.FeatureChild.create({
      background: messages.GherkinDocument.Feature.Background.create({
        location: messages.Location.create({ line }),
        keyword,
        name,
        description,
        steps: steps.map((step) => step),
      }),
    })
  }

  public makeStep(
    id: string,
    line: number,
    keyword: string,
    text: string,
    docString?: messages.GherkinDocument.Feature.Step.IDocString,
    dataTable?: messages.GherkinDocument.Feature.Step.IDataTable
  ): messages.GherkinDocument.Feature.IStep {
    return messages.GherkinDocument.Feature.Step.create({
      id,
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
      rows: cells.map((row) =>
        messages.GherkinDocument.Feature.TableRow.create({
          cells: row.map((cell) =>
            messages.GherkinDocument.Feature.TableRow.TableCell.create({
              value: cell,
            })
          ),
        })
      ),
    })
  }
}
