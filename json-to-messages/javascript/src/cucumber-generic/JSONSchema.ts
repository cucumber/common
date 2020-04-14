import { IElement as IRubyElement } from '../cucumber-ruby/JSONSchema'
import { IElement as IJSElement } from '../cucumber-js/JSONSchema'
import { IElement as IBehaveElement } from '../behave/JSONSchema'

type IElement = IRubyElement | IJSElement | IBehaveElement

export interface IFeature {
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: ReadonlyArray<IElement>
  tags?: ReadonlyArray<ITag>
}

export interface IMatch {
  location: string
}

export interface IResult {
  duration?: number
  status: string
  error_message?: string
}

export interface ITag {
  name: string
  line?: number
}
