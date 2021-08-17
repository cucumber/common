import 'package:characters/characters.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';

import 'GherkinLanguageConstants.dart';

class GherkinLine implements IGherkinLine
{
  // TODO: set this to 0 when/if we change to 0-indexed columns
  static final int _offset = 1;

  final String _lineText;
  final int _lineNumber;
  final String _trimmedLineText;
  final bool _isEof;

  @override
  bool get isEmpty => false;//_lineText.isEmpty && _lineNumber.isMin;

  @override
  bool get isNotEmpty => !isEmpty;

  GherkinLine(this._lineText, this._lineNumber)
    : _trimmedLineText = _lineText.trimLeft()
    , _isEof = false;

  GherkinLine.Eof()
      : _lineText = Strings.empty
      , _lineNumber = Int.min
      , _trimmedLineText = Strings.empty
      , _isEof = true;

  @override
  bool get isEof => _isEof;

  @override
  bool get isNotEof => !isEof;

  /// NOP
  @override
  void detach() {}

  int get lineNumber => _lineNumber;

  @override
  String getLineText([int indentToRemove=0]) {
    if (indentToRemove < 0 || indentToRemove > indent) {
      return _trimmedLineText;
    }
    return _lineText.substring(indentToRemove);
  }

  @override
  String getRestTrimmed(int length) =>
      _trimmedLineText.substring(length).trim();

  /// TODO Veja o fonte desta classe no Java e note que esse atributo é final
  @override
  int get indent => _lineText.length - _trimmedLineText.length;

  @override
  bool get isEmptyLine => _trimmedLineText.isEmpty;

  @override
  bool startsWith(String prefix) => _trimmedLineText.startsWith(prefix);

  @override
  bool startsWithTitleKeyword(String text) {
    var textLength = text.length;
    if( _trimmedLineText.length <= textLength ) {
      return false;
    }
    var b2 = _trimmedLineText.startsWith(text);
    var separatorLength = GherkinLanguageConstants.titleKeywordSeparator.length;
    var substr = _trimmedLineText.substring(textLength, textLength+separatorLength);
    var b3 = substr == GherkinLanguageConstants.titleKeywordSeparator;
    return b2 && b3;
  }

  @override
  Iterable<GherkinLineSpan> get tags {
    var tags = <GherkinLineSpan>[];
    final pattern = RegExp(r'\s'+GherkinLanguageConstants.commentPrefix);
    var parts = _trimmedLineText.splitWithLimit(pattern, limit:2);
    var uncommentedLine = parts[0];

    var indexInUncommentedLine = 0;
    var elements = uncommentedLine.split(GherkinLanguageConstants.tagPrefix);

    for (var element in elements) {
      var token = element.rtrim();
      if (token.isEmpty) {
        continue;
      }
      var symbolLength = uncommentedLine.substring(0, indexInUncommentedLine).length;
      var column = indent + symbolLength + 1;
      final subPattern = RegExp(r'^\S+$');
      if (!subPattern.hasMatch(token)) {
        throw ParserException('A tag may not contain whitespace'
            , Location(lineNumber, column));
      }
      tags.add(GherkinLineSpan(column, GherkinLanguageConstants.tagPrefix+token));
      indexInUncommentedLine += element.length + 1;
    }

    return tags;
  }

  /// TODO usar yield* como no C#
  @override
  Iterable<GherkinLineSpan> get tableCells {
    var lineSpans = <GherkinLineSpan>[];
    var cellBuffer = StringBuffer();
    var beforeFirst = true;
    var col = 0;
    var cellStart = 0;
    var escape = false;
    var iterator = _lineText.characters;
    for (var chr in iterator) {
      if (escape) {
        switch (chr) {
          case GherkinLanguageConstants.tableCellNewLineEscape:
            cellBuffer.write('\n');
            break;
          case GherkinLanguageConstants.tableCellEscapeChar:
            cellBuffer.write(r'\');
            break;
          case GherkinLanguageConstants.tableCellSeparator:
            cellBuffer.write('|');
            break;
          default:
          // Invalid escape. We'll just ignore it.
            cellBuffer.write(r'\');
            cellBuffer.write(chr);
            break;
        }
        escape = false;
      }
      else {
        switch (chr) {
          case GherkinLanguageConstants.tableCellEscapeChar:
            escape = true;
            break;
          case GherkinLanguageConstants.tableCellSeparator:
            if (beforeFirst) {
              // Skip the first empty span
              beforeFirst = false;
            }
            else {
              final cell = cellBuffer.toString();
              final leftTrimmedCell = cell.ltrimKeepNewLines();
              //! int cellIndent = symbolCount(cell) - symbolCount(leftTrimmedCell);
              final cellIndent = cell.length - leftTrimmedCell.length;
              final column = cellStart + cellIndent + _offset;
              final text = leftTrimmedCell.rtrimKeepNewLines();
              var lineSpan = GherkinLineSpan(column, text);
              lineSpans.add(lineSpan);
            }
            cellBuffer = StringBuffer();
            cellStart = col + 1;
            break;
          default:
            cellBuffer.write(chr);
        }
      }
      col++;
    }
    return lineSpans;
  }
}

/// Returns true if rune represents a whitespace character.
///
/// The definition of whitespace matches that used in String.trim which is based
/// on Unicode 6.2. This maybe be a different set of characters than the
/// environment's RegExp definition for whitespace, which is given by the
/// ECMAScript standard: http://ecma-international.org/ecma-262/5.1/#sec-15.10
///
/// (c) https://pub.dev/documentation/quiver/latest/quiver.strings/isWhitespace.html
bool isWhitespace(int rune) =>
    (rune >= 0x0009 && rune <= 0x000D) || // TAB, CR
        rune == 0x0020 || // SPC
        rune == 0x0085 || // Next line
        rune == 0x00A0 || // No-break space
        rune == 0x1680 ||
        rune == 0x180E ||
        (rune >= 0x2000 && rune <= 0x200A) ||
        rune == 0x2028 ||
        rune == 0x2029 ||
        rune == 0x202F ||
        rune == 0x205F ||
        rune == 0x3000 ||
        rune == 0xFEFF;

