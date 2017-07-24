class Group {
  constructor(value, start, end, children) {
    this._value = value
    this._start = start
    this._end = end
    this._children = children
  }

  get value() {
    return this._value
  }

  get start() {
    return this._start
  }

  get end() {
    return this._end
  }

  get children() {
    return this._children
  }

  get values() {
    return (this.children.length === 0 ? [this] : this.children).map(
      g => g.value
    )
  }
}

module.exports = Group
