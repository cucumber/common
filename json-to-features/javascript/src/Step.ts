import DocString from './DocString'
import DataTable from './DataTable'

export default class Step {
  private readonly indent = '    '

  constructor(
    private readonly line: number,
    private readonly keyword: string,
    public readonly name: string,
    private readonly docstring?: DocString,
    private readonly datatable?: DataTable
  ) {}

  public contentByLineNumber(): Map<number, string> {
    let lines = new Map<number, string>()
    lines.set(this.line, `${this.indent}${this.keyword}${this.name}`)

    if (this.docstring) {
      lines = new Map([
        ...Array.from(lines.entries()),
        ...Array.from(this.docstring.contentByLineNumber().entries()),
      ])
    }

    if (this.datatable) {
      lines = new Map([
        ...Array.from(lines.entries()),
        ...Array.from(this.datatable.contentByLineNumber().entries()),
      ])
    }
    return lines
  }
}
