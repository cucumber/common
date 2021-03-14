import * as messages from '@cucumber/messages'
import IAstMaker from './IAstMaker'

export default class AstMaker implements IAstMaker {
  public makeGherkinDocument(uri: string, feature: messages.Feature): messages.GherkinDocument {
    return {
      uri,
      feature,
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
    tags?: readonly messages.Tag[]
  ): messages.FeatureChild {
    return {
      scenario: {
        id,
        location: { line },
        keyword,
        name,
        description,
        steps: steps.map((step) => step),
        tags: tags ? tags.map((tag) => tag) : undefined,
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
    doc_string?: messages.DocString,
    data_table?: messages.DataTable
  ): messages.Step {
    return {
      id,
      location: { line },
      keyword,
      text,
      doc_string,
      data_table,
    }
  }

  public makeDocstring(media_type: string, content: string): messages.DocString {
    return {
      media_type,
      content,
    }
  }

  public makeDataTable(cells: readonly ReadonlyArray<string>[]): messages.DataTable {
    return {
      rows: cells.map((row) => ({
        cells: row.map((cell) => ({
          value: cell,
        })),
      })),
    }
  }
}
