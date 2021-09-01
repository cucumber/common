import 'package:gherkin/helpers.dart';
import 'package:test/test.dart';

void main() {
  test('Test LineEndingHelper.normalizeLineEndings', () async
  {
    var text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\r\n\r\n\r\n\r\n\r\n';
    text = LineEndingHelper.normalizeLineEndings(text);
    expect('\n\n\n\n\nLoren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\r\n';
    text = LineEndingHelper.normalizeLineEndings(text);
    expect('\n\n\n\n\nLoren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\n\r';
    text = LineEndingHelper.normalizeLineEndings(text);
    expect('\n\n\n\n\nLoren Ipsum\n\r', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\n';
    text = LineEndingHelper.normalizeLineEndings(text);
    expect('\n\n\n\n\nLoren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum';
    text = LineEndingHelper.normalizeLineEndings(text);
    expect('\n\n\n\n\nLoren Ipsum', text);
  } );

  test('Test LineEndingHelper.stripLineEndings', () async
  {
    var text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\r\n\r\n\r\n\r\n\r\n';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\r\n';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\n\r';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum\n';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '\r\n\r\n\r\n\r\n\r\nLoren Ipsum';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '\rL\no\rr\ne\rn\n \rI\np\rs\nu\rm\n';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);

    text = '           \rL\no\rr\ne\rn\n \rI\np\rs\nu\rm\n               ';
    text = LineEndingHelper.stripLineEndings(text);
    expect('Loren Ipsum', text);
  } );
}
