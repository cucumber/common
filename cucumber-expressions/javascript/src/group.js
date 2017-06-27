class Group {
  constructor(a, b, c) {
    this.children = []

    if (Array.isArray(a)) {
      const matches = a
      const text = b
      this._parse(matches, text)
    } else {
      this.start = a
      this.end = b
      this.value = c
    }
  }

  contains(group) {
    return (
      group.isNull() || (group.start >= this.start && group.end <= this.end)
    )
  }

  add(group) {
    this.children.push(group)
  }

  isNull() {
    return this.value === null
  }

  get values() {
    return (this.children.length === 0 ? [this] : this.children).map(
      g => g.value
    )
  }

  _parse(matches, text) {
    const groups = Group._groups(matches, text)

    if (groups.length === 0) {
      this.start = this.end = -1
      this.value = null
      return
    }

    this.start = groups[0].start
    this.end = groups[0].end
    this.value = groups[0].value

    const stack = []
    stack.push(this)

    for (let groupIndex = 1; groupIndex < groups.length; groupIndex++) {
      const group = new Group(
        groups[groupIndex].start,
        groups[groupIndex].end,
        groups[groupIndex].value
      )

      while (!stack[stack.length - 1].contains(group)) {
        stack.pop()
      }
      stack[stack.length - 1].add(group)
      stack.push(group)
    }
  }

  static _groups(matches, text) {
    let index = matches.index
    const groups = []
    for (let i = 0; i < matches.length; i++) {
      const value = matches[i] === undefined ? null : matches[i]
      const start = value === null ? -1 : text.indexOf(value, index)
      const end = value === null ? -1 : start + value.length
      groups.push({
        value,
        start,
        end,
      })
      index = start
    }
    return groups
  }
}

module.exports = Group
