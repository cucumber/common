export default class Group {
  constructor(
    public readonly value: string | undefined,
    public readonly start: number,
    public readonly end: number,
    public readonly children: ReadonlyArray<Group>
  ) {}

  get values(): string[] {
    return (this.children.length === 0 ? [this] : this.children).map((g) => g.value)
  }
}
