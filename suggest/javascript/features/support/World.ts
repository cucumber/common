import { setWorldConstructor } from '@cucumber/cucumber'
import { Expression } from '@cucumber/cucumber-expressions'
import { Suggestion } from '../../src/makeSuggest'

export default class World {
  steps: readonly string[] = []
  expressions: readonly Expression[] = []
  suggestions: readonly Suggestion[]
}

setWorldConstructor(World)
