import Group from './Group'
import { RegExpExecArray } from 'regexp-match-indices'

export default class GroupBuilder {
  public source: string
  public capturing = true
  private readonly groupBuilders: GroupBuilder[] = []

  public add(groupBuilder: GroupBuilder) {
    this.groupBuilders.push(groupBuilder)
  }

  public build(match: RegExpExecArray, nextGroupIndex: () => number): Group {
    const groupIndex = nextGroupIndex()
    const children = this.groupBuilders.map((gb) => gb.build(match, nextGroupIndex))
    const value = match[groupIndex] || undefined
    const index = match.indices[groupIndex]
    const start = index ? index[0] : undefined
    const end = index ? index[1] : undefined
    return new Group(value, start, end, children)
  }

  public setNonCapturing() {
    this.capturing = false
  }

  get children() {
    return this.groupBuilders
  }

  public moveChildrenTo(groupBuilder: GroupBuilder) {
    this.groupBuilders.forEach((child) => groupBuilder.add(child))
  }
}
