import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasLocation.dart';
import 'StepArgument.dart';

class DocString extends StepArgument implements IHasLocation
{
  static const empty = _InvalidDocString();

  final Location _location;

  final String mediaType;

  final String content;

  const DocString(this._location, this.mediaType, this.content);

  @override
  Location get location => _location;

  @override
  bool get isEmpty => false; /*_location.isEmpty
    && contentType.isEmpty
    && content.isEmpty;*/

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [DocString] instance.
class _InvalidDocString extends DocString
{
  const _InvalidDocString()
      : super(Location.empty, Strings.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}
