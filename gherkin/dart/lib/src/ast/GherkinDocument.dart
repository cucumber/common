import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';

class GherkinDocument implements INullSafetyObject
{
  static const empty = _InvalidGherkinDocument();

  final Feature feature;

  final Iterable<Comment> comments;

  const GherkinDocument(this.feature, this.comments);

  @override
  bool get isEmpty => false;//feature.isEmpty && comments.isEmpty;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [GherkinDocument] instance.
class _InvalidGherkinDocument extends GherkinDocument
{
  const _InvalidGherkinDocument() : super(Feature.empty, const <Comment>[]);

  @override
  bool get isEmpty => true;
}
