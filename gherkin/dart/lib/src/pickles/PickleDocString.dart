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
}

class _InvalidPickleDocString
    extends PickleDocString
{
  const _InvalidPickleDocString()
      : super(Strings.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}