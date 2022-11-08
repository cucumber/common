import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

class PickleDocString
  implements INullSafetyObject
{
  static const empty = _InvalidPickleDocString();

  final String mediaType;

  final String content;

  const PickleDocString(this.mediaType, this.content);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    var sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('mediaType')
      ..write('=')
      ..write(mediaType.isEmpty ? '<null>' : mediaType)
      ..write(',')
      ..write('content')
      ..write('=')
      ..write(content.isEmpty ? '<null>' : content)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is PickleDocString)
        && other.mediaType == mediaType
        && other.content == content
    ;
  }

  @override
  int get hashCode =>
      mediaType.hashCode
      ^ content.hashCode
  ;
}

class _InvalidPickleDocString
    extends PickleDocString
{
  const _InvalidPickleDocString()
      : super(Strings.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}