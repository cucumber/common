import 'package:gherkin/extensions.dart';

class LineEndingHelper
{
  static String normalizeLineEndings(String text)
  {
    if(text.isNotEmpty) {
      text = text.replaceAll('\r\n', '\n').trimEnd('\n');
    }
    return text;
  }

  static String stripLineEndings(String text)
  {
    return text.replaceAll('\r', '').replaceAll('\n', '').trim();
  }
}
