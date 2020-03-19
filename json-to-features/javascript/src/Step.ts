import DocString from "./DocString"

export default class Step {
  private readonly indent = '    '

  constructor(
    private readonly line: number,
    private readonly keyword: string,
    private readonly name: string,
    private readonly docstring?: DocString
  ) {}

  public contentByLineNumber(): Map<number, string> {
    let  lines = new Map<number, string>()
    lines.set(this.line, `${this.indent}${this.keyword}${this.name}`)

    if (this.docstring) {
      lines = new Map([
        ...Array.from(lines.entries()),
        ...Array.from(this.docstring.contentByLineNumber().entries()),
      ])
    }
    return lines
  }
}
