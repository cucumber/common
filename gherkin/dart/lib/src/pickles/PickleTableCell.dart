class PickleTableCell
{
  final String value;

  PickleTableCell(this.value);

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('value')
      ..write('=')
      ..write(value.isEmpty ? '<null>' : value)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleTableCell)
        && other.value == value
    ;
  }

  @override
  int get hashCode => value.hashCode;
}