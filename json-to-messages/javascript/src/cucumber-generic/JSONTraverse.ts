import * as messages from '@cucumber/messages'
import { IFeature } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'
import { IElement as IRubyElement } from '../cucumber-ruby/JSONSchema'
import { IElement as IJSElement } from '../cucumber-js/JSONSchema'
import { IElement as IBehaveElement } from '../behave/JSONSchema'
import { ITag } from '../types'

type traverseElementType = (
  element: IRubyElement | IJSElement | IBehaveElement,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
) => messages.FeatureChild

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode,
  traverseElement: traverseElementType
): messages.GherkinDocument {
  const children: messages.FeatureChild[] = []
  let backgroundFound = false
  const tags = feature.tags ? feature.tags.map((tag) => traverseTag(tag, astMaker)) : []

  for (const element of feature.elements) {
    const isBackground = element.type === 'background'

    if (!isBackground || !backgroundFound) {
      children.push(traverseElement(element, astMaker, newId, predictableSupportCode))
    }
    backgroundFound = backgroundFound || isBackground
  }

  const gherkinFeature = astMaker.makeFeature(
    feature.line,
    feature.keyword,
    feature.name,
    feature.description,
    children.filter((child) => child),
    tags
  )

  return astMaker.makeGherkinDocument(feature.uri, gherkinFeature)
}

export function traverseTag(tag: ITag, astMaker: IAstMaker): messages.Tag {
  return astMaker.makeTag(tag.name, tag.line)
}
