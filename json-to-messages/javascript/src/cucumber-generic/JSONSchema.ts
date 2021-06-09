import { IElement as IRubyElement } from '../cucumber-ruby/JSONSchema'
import { IElement as IJSElement } from '../cucumber-js/JSONSchema'
import { IElement as IBehaveElement } from '../behave/JSONSchema'
import { ITag } from '../types'

type IElement = IRubyElement | IJSElement | IBehaveElement

export interface IFeature {
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: readonly IElement[]
  tags?: readonly ITag[]
}
