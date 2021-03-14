import { IFeature } from './cucumber-generic/JSONSchema'
import { traverseFeature as traverseJSFeature } from './cucumber-js/JSONTraverse'
import { traverseFeature as traverseRubyFeature } from './cucumber-ruby/JSONTraverse'

import { IFeature as IBehaveFeature } from './behave/JSONSchema'
import { traverseFeature as traverseBehaveFeature } from './behave/JSONTraverse'

import IPredictableSupportCode from './IPredictableSupportCode'
import IAstMaker from './IAstMaker'
import * as messages from '@cucumber/messages'
import { Implementation } from './types'

export default function traverseFeature(
  implementation: Implementation,
  feature: unknown,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  if (implementation === 'cucumber-js') {
    return traverseJS(feature as IFeature, astMaker, newId, predictableSupportCode)
  }

  if (implementation === 'behave') {
    return traverseBehave(feature as IBehaveFeature, astMaker, newId, predictableSupportCode)
  }

  return traverseRuby(feature as IFeature, astMaker, newId, predictableSupportCode)
}

function traverseJS(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  return traverseJSFeature(feature, astMaker, newId, predictableSupportCode)
}

function traverseRuby(
  feature: IFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  return traverseRubyFeature(feature, astMaker, newId, predictableSupportCode)
}

function traverseBehave(
  feature: IBehaveFeature,
  astMaker: IAstMaker,
  newId: messages.IdGenerator.NewId,
  predictableSupportCode: IPredictableSupportCode
): messages.GherkinDocument {
  return traverseBehaveFeature(feature, astMaker, newId, predictableSupportCode)
}
