class GherkinLineSpan
{
  /// One-based line position
  final int column;

  /// Text part of the line
  final String text;

  GherkinLineSpan(this.column, this.text);

  @override
  bool operator ==(dynamic other) =>
    identical(this, other)
        || (other is GherkinLineSpan && column == other.column && text == other.text);

  @override
  int get hashCode => 31 * column + text.hashCode;
}

