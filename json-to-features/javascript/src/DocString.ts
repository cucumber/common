export default class DocString {
  private readonly indent = '      '

  constructor(
    private readonly line: number,
    private readonly contentType: string,
    private readonly content: string
  ) {}

  public contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>()
    let currentLine = this.line
    lines.set(currentLine, `${this.indent}${this.openingString()}`)
    this.content.split('\n').forEach(line => {
      currentLine += 1
      lines.set(currentLine, `${this.indent}${line}`)
    })
    lines.set(currentLine + 1, `${this.indent}${this.closingString()}`)
    return lines
  }

  private openingString(): string {
    return `${this.closingString()}${this.contentType}`
  }

  private closingString(): string {
    return this.contentType !== '' ? '```' : '"""'
  }
}
