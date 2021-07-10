export default class Group {
  constructor(
    public readonly value: string | undefined,
    public readonly start: number | undefined,
    public readonly end: number | undefined,
    public readonly children: readonly Group[]
  ) {}

  get values(): string[] {
    return (this.children.length === 0 ? [this] : this.children).map((g) => g.value)
  }
}
