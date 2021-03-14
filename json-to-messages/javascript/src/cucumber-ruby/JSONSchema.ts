import { IMatch, IResult, ITag } from '../types'

export interface IElement {
  line: number
  id: string
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly IStep[]
  before?: readonly IHook[]
  after?: readonly IHook[]
  tags?: readonly ITag[]
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
  docString?: IDocString
  rows?: readonly IDataTableRow[]
}

export interface IDataTableRow {
  cells: readonly string[]
}

export interface IDocString {
  content_type: string
  value: string
}
