import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';

class GherkinDocument implements INullSafetyObject
{
  static final empty = _InvalidGherkinDocument();

  final Feature feature;

  final Iterable<Comment> comments;

  String uri;

  GherkinDocument(Feature feature, Iterable<Comment> comments)
    : this.withUri(Strings.empty, feature, comments);

  GherkinDocument.withUri(this.uri, this.feature, this.comments);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [GherkinDocument] instance.
class _InvalidGherkinDocument extends GherkinDocument
{
  _InvalidGherkinDocument() : super.withUri(Strings.empty, Feature.empty
      , const <Comment>[]);

  @override
  bool get isEmpty => true;
}
