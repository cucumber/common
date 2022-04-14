class PickleTag
{
  final String name;

  final String astNodeId;

  PickleTag(this.name, this.astNodeId);

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('name')
      ..write('=')
      ..write(name.isEmpty ? '<null>' : name)
      ..write(',')
      ..write('astNodeId')
      ..write('=')
      ..write(astNodeId.isEmpty ? '<null>' : astNodeId)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleTag)
        && other.name == name
        && other.astNodeId == astNodeId
    ;
  }

  @override
  int get hashCode => name.hashCode ^ astNodeId.hashCode;
}