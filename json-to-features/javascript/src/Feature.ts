import FeatureElement from "./FeatureElement"

export default class Feature {
  constructor(
    private readonly line: number = 1,
    private readonly keyword: string,
    private readonly name: string,
    private readonly description: string,
    private readonly elements: FeatureElement[] = []
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
    let lines = new Map<number, string>()

    lines.set(this.line, `${this.keyword}: ${this.name}`)
    if (this.description !== '') {
      this.description.split('\n').forEach((value, index) => {
        lines.set(this.line + 1 + index, value)
      })
    }

    for (const element of this.elements) {
      lines = new Map([
        ...Array.from(lines.entries()),
        ...Array.from(element.contentByLineNumber().entries())
      ])
    }
    return lines
  }
}
