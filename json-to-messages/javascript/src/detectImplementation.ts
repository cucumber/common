import { IFeature as IBehaveFeature } from './behave/JSONSchema'
import { IStep as IJSStep } from './cucumber-js/JSONSchema'
import { Implementation } from './types'
import { IFeature } from './cucumber-generic/JSONSchema'

export default function detectImplementation(feature: unknown): Implementation {
  const behaveFeature = feature as IBehaveFeature

  if (behaveFeature.status || behaveFeature.location) {
    return 'behave'
  }

  const genericFeature = feature as IFeature

  for (const element of genericFeature.elements || []) {
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
