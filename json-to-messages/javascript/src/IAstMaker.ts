import { messages } from '@cucumber/messages'

export default interface IAstMaker {
  makeGherkinDocument(
    uri: string,
    feature: messages.GherkinDocument.IFeature
  ): messages.IGherkinDocument

  makeFeature(
    line: number,
    keyword: string,
    name: string,
    description: string,
    children: ReadonlyArray<messages.GherkinDocument.Feature.IFeatureChild>,
    tags?: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ): messages.GherkinDocument.IFeature

  makeTag(name: string, line: number): messages.GherkinDocument.Feature.ITag

  makeScenarioFeatureChild(
    id: string,
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.GherkinDocument.Feature.IStep>,
    tags?: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ): messages.GherkinDocument.Feature.IFeatureChild

  makeBackgroundFeatureChild(
    line: number,
    keyword: string,
    name: string,
    description: string,
    steps: ReadonlyArray<messages.GherkinDocument.Feature.IStep>,
    tags?: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ): messages.GherkinDocument.Feature.IFeatureChild

  makeStep(
    id: string,
    line: number,
    keyword: string,
    text: string,
    docString?: messages.GherkinDocument.Feature.Step.IDocString,
    dataTable?: messages.GherkinDocument.Feature.Step.IDataTable
  ): messages.GherkinDocument.Feature.IStep

  makeDocstring(
    mediaType: string,
    content: string
  ): messages.GherkinDocument.Feature.Step.IDocString

  makeDataTable(
    cells: ReadonlyArray<ReadonlyArray<string>>
  ): messages.GherkinDocument.Feature.Step.IDataTable
}
