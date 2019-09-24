import countSymbols from './countSymbols'

export default class GherkinLine {
  public trimmedLineText: string
  public isEmpty: boolean
  public indent: number
  public column: number
  public text: string

  constructor(
    private readonly lineText: string,
    private readonly lineNumber: number
  ) {
    this.trimmedLineText = lineText.replace(/^\s+/g, '') // ltrim
    this.isEmpty = this.trimmedLineText.length === 0
    this.indent = countSymbols(lineText) - countSymbols(this.trimmedLineText)
  }

  public startsWith(prefix: string) {
    return this.trimmedLineText.indexOf(prefix) === 0
  }

  public startsWithTitleKeyword(keyword: string) {
    return this.startsWith(keyword + ':') // The C# impl is more complicated. Find out why.
  }

  public getLineText(indentToRemove: number) {
    if (indentToRemove < 0 || indentToRemove > this.indent) {
      return this.trimmedLineText
    } else {
      return this.lineText.substring(indentToRemove)
    }
  }

  public getRestTrimmed(length: number) {
    return this.trimmedLineText.substring(length).trim()
  }

  public getTableCells() {
    const cells = []
    let col = 0
    let startCol = col + 1
    let cell = ''
    let firstCell = true
    while (col < this.trimmedLineText.length) {
      let chr = this.trimmedLineText[col]
      col++

      if (chr === '|') {
        if (firstCell) {
          // First cell (content before the first |) is skipped
          firstCell = false
        } else {
          const cellIndent = cell.length - cell.replace(/^\s+/g, '').length
          const span = {
            column: this.indent + startCol + cellIndent,
            text: cell.trim(),
          }
          cells.push(span)
        }
        cell = ''
        startCol = col + 1
      } else if (chr === '\\') {
        chr = this.trimmedLineText[col]
        col += 1
        if (chr === 'n') {
          cell += '\n'
        } else {
          if (chr !== '|' && chr !== '\\') {
            cell += '\\'
          }
          cell += chr
        }
      } else {
        cell += chr
      }
    }

    return cells
  }

  public getTags() {
    let column = this.indent + 1
    const items = this.trimmedLineText.trim().split('@')
    items.shift()
    return items.map(function(item) {
      const length = item.length
      const span = { column, text: '@' + item.trim() }
      column += length + 1
      return span
    })
  }
}

module.exports = GherkinLine
