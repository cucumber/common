import Step from './Step'

export default class FeatureElement {
  private readonly indent = '  '

  constructor(
    private readonly line: number = 1,
    private readonly keyword: string,
    private readonly name: string,
    private readonly description: string,
    private readonly steps: Step[] = []
  ) {}

  public contentByLineNumber(): Map<number, string> {
    let lines = new Map<number, string>()

    lines.set(this.line, `${this.indent}${this.keyword}: ${this.name}`)
    if (this.description !== '') {
      this.description.split('\n').forEach((value, index) => {
        lines.set(this.line + 1 + index, value)
      })
    }

    for (const step of this.steps) {
      lines = new Map([
        ...Array.from(lines.entries()),
        ...Array.from(step.contentByLineNumber().entries()),
      ])
    }
    return lines
  }
}
