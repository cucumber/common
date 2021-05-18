import * as messages from '@cucumber/messages'

type Syntax = 'markdown' | 'gherkin'

export default function pretty(gherkinDocument: messages.GherkinDocument, syntax: Syntax): string {
  const feature = gherkinDocument.feature
  let s = prettyTags(feature.tags, 0, syntax)

  s += indent(0, syntax) + feature.keyword + ': ' + feature.name + '\n'
  if (feature.description) {
    s += formatDescription(feature.description, syntax)
  }
  for (const child of feature.children) {
    if (child.background) {
      s += prettyStepContainer(child.background, 1, syntax)
    } else if (child.scenario) {
      s += prettyStepContainer(child.scenario, 1, syntax)
    } else if (child.rule) {
      s += `\n${indent(1, syntax)}${child.rule.keyword}: ${child.rule.name}\n`
      if (child.rule.description) {
        s += formatDescription(child.rule.description, syntax)
      }
      for (const ruleChild of child.rule.children) {
        if (ruleChild.background) {
          s += prettyStepContainer(ruleChild.background, 2, syntax)
        }
        if (ruleChild.scenario) {
          s += prettyStepContainer(ruleChild.scenario, 2, syntax)
        }
      }
    }
  }
  return s
}

function prettyStepContainer(
  stepContainer: messages.Scenario | messages.Background,
  level: number,
  syntax: Syntax
): string {
  const scenario: messages.Scenario = 'tags' in stepContainer ? stepContainer : null
  const tags: readonly messages.Tag[] = scenario?.tags || []
  let s = `\n${prettyTags(tags, level, syntax)}${indent(level,syntax)}${stepContainer.keyword}: ${stepContainer.name}\n`
  if (stepContainer.description) {
    s += formatDescription(stepContainer.description, syntax) + '\n'
  }

  for (const step of stepContainer.steps) {
    s += `${stepIndent(level + 1, syntax)}${step.keyword}${step.text}\n`
  }

  if (scenario) {
    for (const example of scenario.examples) {
      s += prettyExample(example, level+1, syntax)
    }
  }
  return s
}

function prettyExample(example: messages.Examples, level: number, syntax: Syntax): string {
  let s = `\n${indent}Examples: ${example.name}\n`

  s += prettyTableRow(example.tableHeader, level+1, syntax)
  for (const row of example.tableBody) {
    s += prettyTableRow(row, level+1, syntax)
  }

  return s
}

function prettyTableRow(row: messages.TableRow, level: number, syntax: Syntax): string {
  return `${indent(level, syntax)}| ${row.cells.map((cell) => cell.value).join(' | ')} |\n`
}

function prettyTags(tags: readonly messages.Tag[], level: number, syntax: Syntax): string {
  if (tags === undefined || tags.length == 0) {
    return ''
  }

  if(syntax === 'gherkin')
    return indent(level, syntax) + tags.map((tag) => tag.name).join(' ') + '\n'
  else
    return tags.map(tag => `\`${tag.name}\``).join(' ') + '\n'
}

function indent(level: number, syntax: Syntax): string {
  if(syntax === 'markdown') {
    return new Array(level + 2).join('#') + ' '
  } else {
    return new Array(level + 1).join('  ')
  }
}

function stepIndent(level: number, syntax: Syntax): string {
  if(syntax === 'markdown') {
    return '* '
  } else {
    return new Array(level + 1).join('  ')
  }
}

function formatDescription(description: string, syntax: Syntax): string {
  if(syntax === 'gherkin')
    return description + '\n'
  else
    return description.replace(/^\s*/gm, '') + '\n'
}