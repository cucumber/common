export default class DataTable {
  constructor(private readonly rows: string[][]) {}

  get raw() {
    return this.rows
  }

  public transpose(): DataTable {
    const transposed = this.rows[0].map((x, i) => this.rows.map(y => y[i]))
    return new DataTable(transposed)
  }

  public diff(other: DataTable): void {
    // TODO: implement this!
  }
}
