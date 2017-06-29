class Group {
  constructor(a, b, c) {
    this.children = []

    if (Array.isArray(a)) {
      this._parse(a)
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

  _parse(matches) {
    if (matches.length === 0) {
      this.start = this.end = -1
      this.value = null
      return
    }

    this.start = matches.index[0]
    this.end = matches.index[0] + matches[0].length
    this.value = matches[0]

    const stack = []
    stack.push(this)

    for (let groupIndex = 1; groupIndex < matches.length; groupIndex++) {
      const value = matches[groupIndex] || null
      const start = matches.index[groupIndex]
      const end = value !== null && start >= 0 ? start + value.length : -1
      const group = new Group(start, end, value)

      while (!stack[stack.length - 1].contains(group)) {
        stack.pop()
      }
      stack[stack.length - 1].add(group)
      stack.push(group)
    }
  }
}

module.exports = Group
