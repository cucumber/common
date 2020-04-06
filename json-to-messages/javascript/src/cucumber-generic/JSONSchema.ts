import { IElement as IRubyElement } from '../cucumber-ruby/JSONSchema'
import { IElement as IJSElement } from '../cucumber-js/JSONSchema'

export interface IFeature {
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: ReadonlyArray<IRubyElement | IJSElement>
}

export interface IMatch {
  location: string
}

export interface IResult {
  duration?: number
  status: string
  error_message?: string
}