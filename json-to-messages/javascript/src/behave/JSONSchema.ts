import { IMatch, IResult } from '../types'

export interface IFeature {
  location: string
  keyword: string
  name: string
  description: readonly string[]
  status: string
  elements: readonly IElement[]
  tags: readonly string[]
}

export interface IElement {
  location: string
  type: 'scenario' | 'background'
  keyword: string
  name: string
  description?: string
  status: string
  steps: readonly IStep[]
  tags?: readonly string[]
}

export interface IStep {
  step_type: string
  keyword: string
  name: string
  location: string
  result: IResult
  match?: IMatch
  text?: string
  table?: ITable
}

export interface ITable {
  headings: cells
  rows: readonly cells[]
}

export type cells = readonly string[]
