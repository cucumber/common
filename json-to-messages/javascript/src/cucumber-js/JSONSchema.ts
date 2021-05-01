import { IMatch, IResult, ITag } from '../types'

export interface IElement {
  line: number
  id: string
  type: 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly IStep[]
  tags?: readonly ITag[]
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
  rows: readonly IDataTableRow[]
}

export interface IDataTableRow {
  cells: readonly string[]
}

export interface IDocString {
  line: number
  content: string
}
