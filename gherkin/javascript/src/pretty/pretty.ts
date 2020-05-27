import { messages } from '@cucumber/messages'

export default function pretty(
  gherkinDocument: messages.IGherkinDocument
): string {
  const feature = gherkinDocument.feature
  let s = feature.keyword + ': ' + feature.name + '\n'
  for (const child of feature.children) {
    if (child.background) {
      s += prettyStepContainer(child.background, '  ')
    } else if (child.scenario) {
      s += prettyStepContainer(child.scenario, '  ')
    } else if (child.rule) {
      s += `\n  ${child.rule.keyword}: ${child.rule.name}\n`
      for (const ruleChild of child.rule.children) {
        if (ruleChild.background) {
          s += prettyStepContainer(ruleChild.background, '    ')
        }
        if (ruleChild.scenario) {
          s += prettyStepContainer(ruleChild.scenario, '    ')
        }
      }
    }
  }
  return s
}

function prettyStepContainer(
  stepContainer: messages.GherkinDocument.Feature.IBackground,
  indent: string
): string {
  let s = `\n${indent}${stepContainer.keyword}: ${stepContainer.name}\n`
  for (const step of stepContainer.steps) {
    s += `${indent}  ${step.keyword}${step.text}\n`
  }
  return s
}
