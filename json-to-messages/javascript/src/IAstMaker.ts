import * as messages from '@cucumber/messages'

export default interface IAstMaker {
  makeGherkinDocument(
    uri: string,
    feature: messages.Feature
  ): messages.GherkinDocument

  makeFeature(
    line: number,
    keyword: string,
    name: string,
    description: string,
    children: ReadonlyArray<messages.FeatureChild>,
    tags?: ReadonlyArray<messages.Tag>
  ): messages.Feature

  makeTag(name: string, line: number): messages.Tag

  makeScenarioFeatureChild(
    id: string,
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.Step>,
    tags?: ReadonlyArray<messages.Tag>
  ): messages.FeatureChild

  makeBackgroundFeatureChild(
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.Step>,
    tags?: ReadonlyArray<messages.Tag>
  ): messages.FeatureChild

  makeStep(
    id: string,
    line: number,
    keyword: string,
    text: string,
    docString?: messages.DocString,
    dataTable?: messages.DataTable
  ): messages.Step

  makeDocstring(
    mediaType: string,
    content: string
  ): messages.DocString

  makeDataTable(
    cells: ReadonlyArray<ReadonlyArray<string>>
  ): messages.DataTable
}
