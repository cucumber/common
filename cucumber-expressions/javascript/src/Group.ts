export default class Group {
  constructor(
    public readonly value: string | null,
    public readonly start: number,
    public readonly end: number,
    public readonly children: Group[]
  ) {}

  get values(): string[] {
    return (this.children.length === 0 ? [this] : this.children)
      .filter(g => typeof g.start !== 'undefined')
      .map(g => g.value)
  }
}
