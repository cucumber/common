export default class StrictMap<K, V> {
  private readonly map = new Map<K, V>()

  public set(key: K, value: V): void {
    if (key === undefined) {
      throw new Error('Key cannot be undefined')
    }
    if (value === undefined) {
      throw new Error('Value cannot be undefined')
    }
    this.map.set(key, value)
  }

  public get(key: K): V {
    if (key === undefined) {
      throw new Error('Key cannot be undefined')
    }
    const value = this.map.get(key)
    if (value === undefined) {
      throw new Error(
        `No value found for key ${key}. Known keys: [${Array.from(
          this.map.keys()
        )}]`
      )
    }
    return value
  }
}
