import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/messages.dart';

class Source implements INullSafetyObject
{
  static const empty = _InvalidSource();

  final String uri;

  final String data;

  final MediaType mediaType;

  const Source(this.uri, this.data, this.mediaType);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    final sb = StringBuffer();
    sb..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('uri')
      ..write('=')
      ..write(uri.isEmpty ? '<null>' : uri)
      ..write(',')
      ..write('data')
      ..write('=')
      ..write(data.isEmpty ? '<null>' : data)
      ..write(',')
      ..write('mediaType')
      ..write('=')
      ..write(mediaType.name)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is Source)
        && other.uri == uri
        && other.data == data
        && other.mediaType == mediaType
    ;
  }

  @override
  int get hashCode
    => uri.hashCode
    ^ data.hashCode
    ^ mediaType.hashCode;
}

/// Convenience implementation of an invalid [Source] instance.
class _InvalidSource
    extends Source
{
  const _InvalidSource()
      : super(Strings.empty, Strings.empty
        , MediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN);

  @override
  bool get isEmpty => true;
}
