import { IFeature } from './cucumber-generic/JSONSchema'
import { IFeature as IBehaveFeature } from '../src/behave/JSONSchema'
import { IStep as IJSStep } from '../src/cucumber-js/JSONSchema'
import { Platform } from './types'

export default function detectPlatform(
  feature: IFeature | IBehaveFeature
): Platform {
  const featureAsBehave = feature as IBehaveFeature

  if (featureAsBehave.status || featureAsBehave.location) {
    return 'behave'
  }

  for (const element of feature.elements || []) {
    for (const step of element.steps || []) {
      const stepAsJS = step as IJSStep
      if (stepAsJS.hidden) {
        return 'cucumber-js'
      }

      if (stepAsJS.arguments) {
        return 'cucumber-js'
      }
    }
  }

  return 'cucumber-ruby'
}
