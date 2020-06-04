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
  stepContainer: messages.GherkinDocument.Feature.IScenario,
  indent: string
): string {
  let s = `\n${indent}${stepContainer.keyword}: ${stepContainer.name}\n`
  if (stepContainer.description) {
    s += stepContainer.description + '\n\n'
  }

  for (const step of stepContainer.steps) {
    s += `${indent}  ${step.keyword}${step.text}\n`
  }

  if (stepContainer.examples) {
    for (const example of stepContainer.examples) {
      s += prettyExample(example, `${indent}  `)
    }
  }
  return s
}

function prettyExample(
  example: messages.GherkinDocument.Feature.Scenario.IExamples,
  indent: string
): string {
  let s = `\n${indent}Examples: ${example.name}\n`

  s += prettyTableRow(example.tableHeader, `${indent}  `)
  for (const row of example.tableBody) {
    s += prettyTableRow(row, `${indent}  `)
  }

  return s
}

function prettyTableRow(
  row: messages.GherkinDocument.Feature.ITableRow,
  indent: string
): string {
  return `${indent}| ${row.cells.map((cell) => cell.value).join(' | ')} |\n`
}
