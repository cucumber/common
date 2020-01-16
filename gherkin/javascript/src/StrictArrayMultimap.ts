import { ArrayMultimap } from '@teppeis/multimaps'

export default class StrictArrayMultimap<K, V> extends ArrayMultimap<K, V> {
  public put(key: K, value: V): boolean {
    if (key === undefined) {
      throw new Error('Key cannot be undefined')
    }
    if (value === undefined) {
      throw new Error('Value cannot be undefined')
    }
    return super.put(key, value)
  }

  public get(key: K): V[] {
    if (key === undefined) {
      throw new Error('Key cannot be undefined')
    }
    const result = super.get(key)
    // if (result.length === 0) {
    //   throw new Error(
    //     `No values found for key ${key}. Keys: [${Array.from(this.keys())}]`
    //   )
    // }
    return result
  }
}
