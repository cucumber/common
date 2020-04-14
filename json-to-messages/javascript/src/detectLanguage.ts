import { IFeature } from '../src/cucumber-generic/JSONSchema'
import { IFeature as IBehaveFeature } from '../src/behave/JSONSchema'
import { IStep as IJSStep } from '../src/cucumber-js/JSONSchema'

export default function detectLanguage(
  feature: IFeature | IBehaveFeature
): string {
  const featureAsBehave = feature as IBehaveFeature

  if (featureAsBehave.status || featureAsBehave.location) {
    return 'behave'
  }

  for (const element of feature.elements || []) {
    for (const step of element.steps || []) {
      const stepAsJS = step as IJSStep
      if (stepAsJS.hidden) {
        return 'javascript'
      }

      if (stepAsJS.arguments) {
        return 'javascript'
      }
    }
  }

  return 'ruby'
}
