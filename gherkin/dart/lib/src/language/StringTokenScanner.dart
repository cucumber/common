import 'dart:convert';

import 'package:gherkin/language.dart';
import 'package:gherkin/parser.dart';

class StringTokenScanner implements ITokenScanner
{
  final Iterator<String> _linesIterator;
  int lineNumber = 0;

  StringTokenScanner(String source)
    : _linesIterator = LineSplitter.split(source).iterator;

  @override
  Token read() {
    var location = Location(++lineNumber, 0);
    if( _linesIterator.moveNext() ) {
      return Token(GherkinLine(_linesIterator.current, lineNumber), location);
    }
    return Token(GherkinLine.Eof(), location);
  }
}
