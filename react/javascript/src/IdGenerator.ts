export default class IdGenerator {
  private generatedIds: string[] = []

  public generate(title: string): string {
    let id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    if (id.match(/^-*$/)) {
      id = 'id'
    }

    if (!this.idAlreadyUsed(id)) {
      this.generatedIds.push(id)
      return id
    }

    let index = 1
    while (this.idAlreadyUsed(`${id}-${index}`)) {
      index += 1
    }
    this.generatedIds.push(`${id}-${index}`)
    return `${id}-${index}`
  }

  private idAlreadyUsed(id: string): boolean {
    return this.generatedIds.includes(id)
  }
}
