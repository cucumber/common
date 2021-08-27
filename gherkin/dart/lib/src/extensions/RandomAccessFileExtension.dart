import 'dart:convert';
import 'dart:io';

extension RandomAccessFileExtension on RandomAccessFile
{
  static const LF = 10;
  static const CR = 13;
  static const EOF = -1;

  /// Synchronously reads a single line from the file. If end-of-file
  /// has been reached then `null` string is returned.
  /// If not specified, [encoding] uses [utf8].
  ///
  /// Throws a [FileSystemException] if the operation fails.
  String? readLineSync({Encoding encoding=utf8}) {
    var line = <int>[];
    int chr;
    if( (chr = readByteSync()) == EOF) {
      return null;
    }
    do {
      if( chr == LF ) {
        break;
      }
      if(chr != CR) {
        line.add(chr);
      }
    } while((chr = readByteSync()) != EOF);
    return encoding.decode(line);
  }

  /// Synchronously peeks a single byte from file, without to move position pointer.
  ///
  /// Throws a [FileSystemException] if the operation fails.
  int peekByteSync() {
    var position = positionSync();
    var char = readByteSync();
    setPositionSync(position);
    return char;
  }

  /// Synchronously read a single byte from the file skipping the code bytes
  /// specified in [charsToAvoid].
  ///
  /// Throws a [FileSystemException] if the operation fails.
  int readByteSyncSkipping(Set<int> charsToAvoid) {
    int lastReadChar;
    while( charsToAvoid.contains(lastReadChar = readByteSync()) )
    {}
    return lastReadChar;
  }
}
