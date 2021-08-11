import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

class Comment implements INullSafetyObject
{
  static const empty = _InvalidComment();

  final Location location;

  final String text;

  const Comment(this.location, this.text);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Comment] instance.
class _InvalidComment extends Comment
{
  const _InvalidComment()
      : super(Location.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}