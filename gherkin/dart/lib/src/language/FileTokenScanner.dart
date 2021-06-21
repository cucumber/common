import 'dart:io';

import 'package:gherkin/language.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/parser.dart';

/// The scanner reads a gherkin doc (typically read from a .feature file) and
/// creates a token for each line.
///
/// The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).
///
/// If the scanner sees a `#` language header, it will reconfigure itself dynamically
/// to look for Gherkin keywords for the associated language. The keywords are defined in
/// gherkin-languages.json.
class FileTokenScanner implements ITokenScanner
{
  int lineNumber = 0;

  final RandomAccessFile _access;

  FileTokenScanner.fromPath(String filepath)
      : _access = File(filepath).openSync(mode: FileMode.read);

  FileTokenScanner.fromFile(File file)
      : _access = file.openSync(mode: FileMode.read);

  @override
  Token read() {
    var line = _access.readLineSync();
    var location = Location(++lineNumber, 0);
    return line == null
        ? Token(GherkinLine.Eof(), location)
        : Token(GherkinLine(line, lineNumber), location);
  }
}
