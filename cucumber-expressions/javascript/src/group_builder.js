const Group = require('./group')

class GroupBuilder {
  constructor() {
    this._groupBuilders = []
    this._capturing = true
  }

  add(group_builder) {
    this._groupBuilders.push(group_builder)
  }

  build(match, nextGroupIndex) {
    const groupIndex = nextGroupIndex()
    const children = this._groupBuilders.map(gb =>
      gb.build(match, nextGroupIndex)
    )
    return new Group(
      match[groupIndex],
      match.index[groupIndex],
      match.index[groupIndex] + (match[groupIndex] || '').length,
      children
    )
  }

  setNonCapturing() {
    this._capturing = false
  }

  get capturing() {
    return this._capturing
  }

  get children() {
    return this._groupBuilders
  }

  moveChildrenTo(groupBuilder) {
    this._groupBuilders.forEach(child => groupBuilder.add(child))
  }
}

module.exports = GroupBuilder
