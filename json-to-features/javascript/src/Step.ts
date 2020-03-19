export default class Step {
  constructor(private readonly line: number, private readonly keyword: string, private readonly text: string) { }
  public contentByLineNumber(): Map<number, string> {
    const lines = new Map<number, string>();
    lines.set(this.line, `    ${this.keyword}${this.text}`);
    return lines;
  }
}
