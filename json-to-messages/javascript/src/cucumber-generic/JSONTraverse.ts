import { IdGenerator, messages } from '@cucumber/messages'
import { IFeature } from './JSONSchema'
import IAstMaker from '../IAstMaker'
import IPredictableSupportCode from '../IPredictableSupportCode'
import { IElement as IRubyElement } from '../cucumber-ruby/JSONSchema'
import { IElement as IJSElement } from '../cucumber-js/JSONSchema'
import { IElement as IBehaveElement } from '../behave/JSONSchema'

type traverseElementType = (
  element: IRubyElement | IJSElement | IBehaveElement,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
) => messages.GherkinDocument.Feature.IFeatureChild

export function traverseFeature(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode,
  traverseElement: traverseElementType
): messages.IGherkinDocument {
  const children: messages.GherkinDocument.Feature.IFeatureChild[] = []
  let backgroundFound = false

  for (const element of feature.elements) {
    const isBackground = element.type === 'background'

    if (!isBackground || !backgroundFound) {
      children.push(
        traverseElement(element, astMaker, newId, predictableSupportCode)
      )
    }
    backgroundFound = backgroundFound || isBackground
  }

  const gherkinFeature = astMaker.makeFeature(
    feature.line,
    feature.keyword,
    feature.name,
    feature.description,
    children.filter(child => child)
  )

  return astMaker.makeGherkinDocument(feature.uri, gherkinFeature)
}
