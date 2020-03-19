export default class Step {
  private readonly indent = '    '

  constructor(
    private readonly line: number,
    private readonly keyword: string,
    private readonly name: string
  ) {}

  public contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>()
    lines.set(this.line, `${this.indent}${this.keyword}${this.name}`)
    return lines
  }
}
