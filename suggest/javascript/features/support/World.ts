import { setWorldConstructor } from '@cucumber/cucumber'
import { Suggestion } from '../../src/makeSuggest'

export default class World {
  steps: readonly string[]
  suggestions: readonly Suggestion[]
}

setWorldConstructor(World)
