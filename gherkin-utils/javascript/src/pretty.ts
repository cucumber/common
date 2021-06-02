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

function prettyStep(step: messages.Step, level: number, syntax: 'markdown' | 'gherkin') {
  let s = `${stepIndent(level, syntax)}${step.keyword}${step.text}\n`
  if (step.dataTable) {
    s += prettyTableRows(step.dataTable.rows, level + 1, syntax)
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
  let s = `\n${prettyTags(tags, level, syntax)}${indent(level, syntax)}${stepContainer.keyword}: ${
    stepContainer.name
  }\n`
  if (stepContainer.description) {
    s += formatDescription(stepContainer.description, syntax) + '\n'
  }

  for (const step of stepContainer.steps) {
    s += prettyStep(step, level + 1, syntax)
  }

  if (scenario) {
    for (const example of scenario.examples) {
      s += prettyExample(example, level + 1, syntax)
    }
  }
  return s
}

function prettyExample(example: messages.Examples, level: number, syntax: Syntax): string {
  let s = `\n${indent}Examples: ${example.name}\n`
  s += prettyTableRows([example.tableHeader, ...example.tableBody], level, syntax)
  return s
}

function prettyTableRows(
  tableRows: readonly messages.TableRow[],
  level: number,
  syntax: 'markdown' | 'gherkin'
) {
  const maxWidths: number[] = new Array(tableRows[0].cells.length).fill(0)
  tableRows.forEach((tableRow) => {
    tableRow.cells.forEach((tableCell, j) => {
      maxWidths[j] = Math.max(maxWidths[j], tableCell.value.length)
    })
  })

  let n = 0
  let s = ''
  for (const row of tableRows) {
    s += prettyTableRow(row, level, maxWidths, syntax)
    if (n === 0 && syntax === 'markdown') {
      const separatorRow: messages.TableRow = {
        location: row.location,
        id: row.id + '-separator',
        cells: row.cells.map((cell, j) => ({
          location: cell.location,
          value: new Array(maxWidths[j] + 1).join('-'),
        })),
      }
      s += prettyTableRow(separatorRow, level, maxWidths, syntax)
    }
    n++
  }
  return s
}

function prettyTableRow(
  row: messages.TableRow,
  level: number,
  maxWidths: readonly number[],
  syntax: Syntax
): string {
  const actualLevel = syntax === 'markdown' ? 1 : level
  return `${indentSpace(actualLevel)}| ${row.cells
    .map((cell, j) => {
      const spaceCount = maxWidths[j] - cell.value.length
      const spaces = new Array(spaceCount + 1).join(' ')
      return isNumeric(cell.value) ? spaces + cell.value : cell.value + spaces
    })
    .join(' | ')} |\n`
}

function isNumeric(s: string) {
  return !isNaN(parseFloat(s))
}

function prettyTags(tags: readonly messages.Tag[], level: number, syntax: Syntax): string {
  if (tags === undefined || tags.length == 0) {
    return ''
  }

  if (syntax === 'gherkin')
    return indent(level, syntax) + tags.map((tag) => tag.name).join(' ') + '\n'
  else return tags.map((tag) => `\`${tag.name}\``).join(' ') + '\n'
}

function indent(level: number, syntax: Syntax): string {
  if (syntax === 'markdown') {
    return new Array(level + 2).join('#') + ' '
  } else {
    return new Array(level + 1).join('  ')
  }
}

function indentSpace(level: number): string {
  return new Array(level + 1).join('  ')
}

function stepIndent(level: number, syntax: Syntax): string {
  if (syntax === 'markdown') {
    return '* '
  } else {
    return new Array(level + 1).join('  ')
  }
}

function formatDescription(description: string, syntax: Syntax): string {
  if (syntax === 'gherkin') return description + '\n'
  else return description.replace(/^\s*/gm, '') + '\n'
}
