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

  @override
  String toString() {
    final hexIdentityHashCode = hashCode.toRadixString(16);
    var sb = StringBuffer();
    sb
      ..write(runtimeType)
      ..write('@')
      ..write(hexIdentityHashCode)
      ..write('[')
      ..write('uri')
      ..write('=')
      ..write(uri.isEmpty ? '<null>' : uri)
      ..write(',')
      ..write('feature')
      ..write('=')
      ..write(feature.isEmpty ? '<null>' : feature)
      ..write(',')
      ..write('comments')
      ..write('=')
      ..write(comments.isEmpty ? '<null>' : comments)
      ..write(']');
    return sb.toString();
  }

  @override
  bool operator ==(other) {
    return (other is GherkinDocument)
        && other.uri == uri
        && other.feature == feature
        && other.comments == comments;
  }

  @override
  int get hashCode
    => uri.hashCode
    ^ feature.hashCode
    ^ comments.hashCode;
}

/// Convenience implementation of an invalid [GherkinDocument] instance.
class _InvalidGherkinDocument extends GherkinDocument
{
  _InvalidGherkinDocument() : super.withUri(Strings.empty, Feature.empty
      , const <Comment>[]);

  @override
  bool get isEmpty => true;
}
