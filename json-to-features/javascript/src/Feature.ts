export default class Feature {
  constructor(
    private readonly keyword: string,
    private readonly name: string,
    private readonly description: string = '',
    private readonly line: number = 1
  ) {}

  public toString(): string {
    const contentByLineNumber = this.contentByLineNumber()
    const maxLine = Math.max.apply(null, Array.from(contentByLineNumber.keys()))

    let toString = ''
    for (let i = 1; i <= maxLine; i++) {
      const lineContent = contentByLineNumber.get(i) || ''
      toString += `${lineContent}\n`
    }
    return toString
  }

  private contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>()

    lines.set(this.line, `${this.keyword}: ${this.name}`)
    if (this.description !== '') {
      this.description.split('\n').forEach((value, index) => {
        lines.set(this.line + 1 + index, value)
      })
    }
    return lines
  }
}
