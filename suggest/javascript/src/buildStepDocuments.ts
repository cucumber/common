import { StepDocument } from './types'
import StepDocumentBuilder from './StepDocumentBuilder'
import { Expression } from '@cucumber/cucumber-expressions'

/**
 * Builds an array of {@link StepDocument} from steps and step definitions.
 *
 * @param stepTexts
 * @param expressions
 */
export default function buildStepDocuments(
  stepTexts: readonly string[],
  expressions: readonly Expression[]
): readonly StepDocument[] {
  let stepDocuments: StepDocument[] = []
  const builders = expressions.map((expression) => new StepDocumentBuilder(expression))
  for (const builder of builders) {
    for (const step of stepTexts) {
      builder.update(step)
    }
    stepDocuments = stepDocuments.concat(builder.getStepDocuments())
  }
  return stepDocuments
}
