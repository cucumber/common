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
