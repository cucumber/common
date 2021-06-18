// Fork of https://github.com/cucumber/common/pull/1555/files
// This will be added back to the code in that PR

export type Syntax = 'markdown' | 'gherkin'

export type Table = readonly Row[]
type Row = readonly Cell[]
type Cell = string
type Widths = readonly number[]

export function computeCellWidths(tableRows: Table): Widths {
  const widths: number[] = new Array(tableRows[0].length).fill(0)
  tableRows.forEach((tableRow) => {
    tableRow.forEach((tableCell, j) => {
      widths[j] = Math.max(widths[j], escapeCell(tableCell).length)
    })
  })
  return widths
}

export function markdownSeparatorRow(row: Row, widths: Widths): Row {
  return row.map((cell, j) => (
    new Array(widths[j] + 1).join('-'))
  )
}

export function prettyTable(
  table: Table,
  level: number,
  syntax: Syntax
) {
  const widths = computeCellWidths(table)

  let n = 0
  let s = ''
  for (const row of table) {
    s += prettyTableRow(row, level, widths, syntax)
    if (n === 0 && syntax === 'markdown') {
      const separatorRow = markdownSeparatorRow(row, widths)
      s += prettyTableRow(separatorRow, level, widths, syntax)
    }
    n++
  }
  return s
}

export function prettyTableRow(
  row: Row,
  level: number,
  widths: Widths,
  syntax: Syntax
): string {
  return `${spaces(level)}| ${row
    .map((cell, j) => {
      const escapedCellValue = escapeCell(cell)
      const spaceCount = widths[j] - escapedCellValue.length
      const spaces = new Array(spaceCount + 1).join(' ')
      return isNumeric(escapedCellValue) ? spaces + escapedCellValue : escapedCellValue + spaces
    })
    .join(' | ')} |\n`
}

export function escapeCell(s: string) {
  let e = ''
  const characters = s.split('')
  for (const c of characters) {
    switch (c) {
      case '\\':
        e += '\\\\'
        break
      case '\n':
        e += '\\n'
        break
      case '|':
        e += '\\|'
        break
      default:
        e += c
    }
  }
  return e
}

function isNumeric(s: string) {
  return !isNaN(parseFloat(s))
}

function spaces(level: number): string {
  return new Array(level + 1).join('  ')
}
