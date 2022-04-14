import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

abstract class IGherkinLine extends INullSafetyObject
{
  static const empty = _EmptyGherkinLine();

  static const entireLine = 0;

  /// The number of whitespace characters in the beginning of the line.
  int get indent;

  bool get isNotEof => !isEof;

  bool get isEof;

  /// Called by the parser to indicate non-streamed reading (e.g. during look-ahead).
  ///
  /// If the implementation depends on streamed reading behavior, with this method,
  /// it can clone itself, so that it will be detached.
  void detach();


  /// Returns the line text.
  /// [indentToRemove] is the maximum number of whitespace characters to remove.
  /// -1 removes all leading whitespaces.
  /// Returns the line text.
  String getLineText(int indentToRemove);

  /// Gets if the line is empty or contains whitespaces only.
  /// Returns true, if empty or contains whitespaces only; otherwise, false.
  bool get isEmptyLine;

  /// Determines whether the beginning of the line (without whitespaces)
  /// matches a specified string.
  /// [text] is the string to compare.
  /// Returns true if text matches the beginning of this line; otherwise, false.
  bool startsWith(String text);

  /// Returns the remaining part of the line.
  String getRestTrimmed(int length);

  /// Tries parsing the line as a tag list, and returns the tags without
  /// the leading '@' characters.
  /// Returns (position,text) pairs, position is 0-based index.
  Iterable<GherkinLineSpan> get tags;

  /// Determines whether the beginning of the line (without whitespaces)
  /// matches a specified title keyword (ie. a keyword followed by a ':' character).
  /// [keyword] is the keyword to compare.
  /// Returns true if keyword matches the beginning of this line and followed
  /// by a ':' character; otherwise, false.</returns>
  bool startsWithTitleKeyword(String keyword);

  /// Tries parsing the line as table row and returns the trimmed cell values.
  /// Returns (position,text) pairs, position is 0-based index.
  Iterable<GherkinLineSpan> get tableCells;
}


/// Convenience implementation of an invalid [IGherkinLine] instance.
class _EmptyGherkinLine
    implements IGherkinLine
{
  const _EmptyGherkinLine();

  @override
  void detach() => throw UnimplementedError();

  @override
  String getLineText(int indentToRemove) => throw UnimplementedError();

  @override
  String getRestTrimmed(int length) => throw UnimplementedError();


  @override
  int get indent => Int.min;

  @override
  bool get isEmptyLine => false;

  @override
  bool get isEmpty => true;

  @override
  bool get isNotEmpty => !isEmpty;

  @override
  bool get isEof => false;

  @override
  bool get isNotEof => !isEof;

  @override
  bool startsWith(String text) {
    throw UnimplementedError();
  }

  @override
  bool startsWithTitleKeyword(String keyword) {
    throw UnimplementedError();
  }

  @override
  Iterable<GherkinLineSpan> get tableCells => throw UnimplementedError();

  @override
  Iterable<GherkinLineSpan> get tags => throw UnimplementedError();
}