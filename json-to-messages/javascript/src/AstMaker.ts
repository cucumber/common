import * as messages from '@cucumber/messages'
import IAstMaker from './IAstMaker'

export default class AstMaker implements IAstMaker {
  public makeGherkinDocument(uri: string, feature: messages.Feature): messages.GherkinDocument {
    return {
      uri,
      feature,
      comments: [],
    }
  }

  public makeFeature(
    line: number,
    keyword: string,
    name: string,
    description: string,
    children: readonly messages.FeatureChild[],
    tags?: readonly messages.Tag[]
  ): messages.Feature {
    return {
      language: 'en',
      location: { line },
      keyword,
      name,
      description,
      children: children.slice(),
      tags: tags ? tags.slice() : undefined,
    }
  }

  public makeTag(name: string, line: number): messages.Tag {
    return {
      id: '123',
      name,
      location: { line },
    }
  }

  public makeScenarioFeatureChild(
    id: string,
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: readonly messages.Step[],
    tags: readonly messages.Tag[]
  ): messages.FeatureChild {
    return {
      scenario: {
        id,
        location: { line },
        keyword,
        name,
        description,
        steps: steps.slice(),
        tags: tags.slice(),
        examples: [],
      },
    }
  }

  public makeBackgroundFeatureChild(
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: readonly messages.Step[]
  ): messages.FeatureChild {
    return {
      background: {
        id: 'id',
        location: { line },
        keyword,
        name,
        description,
        steps: steps.map((step) => step),
      },
    }
  }

  public makeStep(
    id: string,
    line: number,
    keyword: string,
    text: string,
    docString?: messages.DocString,
    dataTable?: messages.DataTable
  ): messages.Step {
    return {
      id,
      location: { line },
      keyword,
      text,
      docString,
      dataTable,
    }
  }

  public makeDocstring(mediaType: string, content: string): messages.DocString {
    return {
      mediaType,
      content,
      delimiter: '"""',
      location: { line: 0, column: 0 },
    }
  }

  public makeDataTable(cells: readonly ReadonlyArray<string>[]): messages.DataTable {
    return {
      location: { line: 0, column: 0 },
      rows: cells.map((row) => ({
        id: 'id',
        location: { line: 0, column: 0 },
        cells: row.map((cell) => ({
          location: { line: 0, column: 0 },
          value: cell,
        })),
      })),
    }
  }
}
