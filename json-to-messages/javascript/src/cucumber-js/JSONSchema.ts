import { IResult, IMatch, ITag } from '../cucumber-generic/JSONSchema'

export interface IElement {
  line: number
  id: string
  type: 'scenario'
  keyword: string
  name: string
  description: string
  steps: ReadonlyArray<IStep>
  tags?: ReadonlyArray<ITag>
}

export interface IStep {
  keyword: string
  line: number
  match?: IMatch
  name: string
  result: IResult
  hidden?: boolean
  arguments?: ReadonlyArray<IDocString | IDataTable>
}

export interface IDataTable {
  rows: ReadonlyArray<IDataTableRow>
}

export interface IDataTableRow {
  cells: ReadonlyArray<string>
}

export interface IDocString {
  line: number
  content: string
}
