import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/messages.dart';

class SourceReference implements INullSafetyObject
{
  static const empty = _InvalidSourceReference();

  final String uri;
  final Location location;

  //TODO JavaMethod _javaMethod;
  //TODO JavaStackTraceElement _javaStackTraceElement;

  const SourceReference(this.uri, this.location);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('uri')
      ..write('=')
      ..write(uri.isEmpty ? '<null>' : uri)
      ..write(',')
      //TODO ..write('javaMethod')
      //TODO ..write('=')
      //TODO ..write(this.javaMethod == null ? "<null>" : this.javaMethod)
      //TODO ..write(',')
      //TODO ..write("javaStackTraceElement")
      //TODO ..write('=')
      //TODO ..write(this.javaStackTraceElement == null ? "<null>" : this.javaStackTraceElement)
      //TODO..write(',')
      ..write('location')
      ..write('=')
      ..write(location.isEmpty ? '<null>' : location)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is SourceReference)
        && other.uri == uri
        && other.location == location;
  }

  @override
  int get hashCode
    => uri.hashCode ^ location.hashCode;
}

/// Convenience implementation of an invalid [SourceReference] instance.
class _InvalidSourceReference extends SourceReference
{
  const _InvalidSourceReference()
      : super(Strings.empty, Location.empty);

  @override
  bool get isEmpty => true;
}
