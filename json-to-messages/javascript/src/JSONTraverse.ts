import { IFeature } from './cucumber-generic/JSONSchema'
import { IFeature as IJSFeature } from './cucumber-js/JSONSchema'
import { traverseFeature as traverseJSFeature } from './cucumber-js/JSONTraverse'

import { IFeature as IRubyFeature } from './cucumber-ruby/JSONSchema'
import { traverseFeature as traverseRubyFeature } from './cucumber-ruby/JSONTraverse'

import IPredictableSupportCode from './IPredictableSupportCode'
import IAstMaker from './IAstMaker'
import { IdGenerator, messages } from '@cucumber/messages'

export default function traverseFeature(
  sourceLang: string,
  feature: IFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  if (sourceLang == 'js') {
    return traverseJS(
      feature as IJSFeature,
      astMaker,
      newId,
      predictableSupportCode
    )
  }

  return traverseRuby(
    feature as IRubyFeature,
    astMaker,
    newId,
    predictableSupportCode
  )
}

function traverseJS(
  feature: IJSFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  return traverseJSFeature(feature, astMaker, newId, predictableSupportCode)
}

function traverseRuby(
  feature: IRubyFeature,
  astMaker: IAstMaker,
  newId: IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.IGherkinDocument {
  return traverseRubyFeature(feature, astMaker, newId, predictableSupportCode)
}
