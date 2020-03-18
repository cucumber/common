export default class Scenario {
  constructor(
    private readonly line: number = 1,
    private readonly keyword: string,
    private readonly name: string,
    private readonly description: string
  ){}

  public contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>()

    lines.set(this.line, `  ${this.keyword}: ${this.name}`)
    if (this.description !== '') {
      this.description.split('\n').forEach((value, index) => {
        lines.set(this.line + 1 + index, value)
      })
    }
    return lines
  }
}