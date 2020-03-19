export default class DataTable {
  private readonly indent = '      '

  constructor(
    private readonly line: number,
    private readonly rows: string[][]
  ) {}

  public contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>()

    this.justifiedRows().forEach((row, index) => {
      lines.set(this.line + index, `${this.indent}| ${row.join(' | ')} |`)
    })

    return lines
  }

  private justifiedRows(): string[][] {
    const columnCount = this.rows[0].length
    const justified: string[][] = []

    for (let index = 0; index < columnCount; index++) {
      const column = this.getColumn(index)
      const maxLength = Math.max.apply(
        null,
        column.map(cell => cell.length)
      )
      const justifiedColumn = column.map(
        cell => `${cell}${' '.repeat(maxLength - cell.length)}`
      )

      justifiedColumn.forEach((value, index) => {
        if (justified.length <= index) {
          justified.push([])
        }

        justified[index].push(value)
      })
    }

    return justified
  }

  private getColumn(index: number): string[] {
    return this.rows.map(row => row[index])
  }
}
