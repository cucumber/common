import Group from './Group'
import RegexExecArray from './RegexExecArray'

export default class GroupBuilder {
  public source: string
  public capturing = true
  private readonly groupBuilders: GroupBuilder[] = []

  public add(groupBuilder: GroupBuilder) {
    this.groupBuilders.push(groupBuilder)
  }

  public build(match: RegexExecArray, nextGroupIndex: () => number): Group {
    const groupIndex = nextGroupIndex()
    const children = this.groupBuilders.map((gb) =>
      gb.build(match, nextGroupIndex)
    )
    return new Group(
      match[groupIndex] || undefined,
      match.index[groupIndex],
      match.index[groupIndex] + (match[groupIndex] || '').length,
      children
    )
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
