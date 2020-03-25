export interface IFeature {
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: ReadonlyArray<IElement>
}

export interface IElement {
  line: number
  id: string
  type: string
  keyword: string
  name: string
  description: string
  steps: ReadonlyArray<IStep>
  before?: ReadonlyArray<IHook>
  after?: ReadonlyArray<IHook>
}

export interface IHook {
  match: IMatch
  result: IResult
}

export interface IStep {
  keyword: string
  line: number
  match: IMatch
  name: string
  result: IResult
  doc_string?: IDocString
  rows?: ReadonlyArray<IDataTableRow>
}

export interface IMatch {
  location: string
}

export interface IResult {
  duration: number
  status: string
}

export interface IDataTableRow {
  cells: ReadonlyArray<string>
}

export interface IDocString {
  content_type: string
  value: string
}
