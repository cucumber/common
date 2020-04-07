import { IMatch, IResult, ITag } from '../cucumber-generic/JSONSchema'

export interface IElement {
  line: number
  id: string
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  steps: ReadonlyArray<IStep>
  before?: ReadonlyArray<IHook>
  after?: ReadonlyArray<IHook>
  tags?: ReadonlyArray<ITag>
}

export interface IHook {
  match: IMatch
  result: IResult
}

export interface IStep {
  keyword: string
  line: number
  match?: IMatch
  name: string
  result: IResult
  doc_string?: IDocString
  rows?: ReadonlyArray<IDataTableRow>
}

export interface IDataTableRow {
  cells: ReadonlyArray<string>
}

export interface IDocString {
  content_type: string
  value: string
}
