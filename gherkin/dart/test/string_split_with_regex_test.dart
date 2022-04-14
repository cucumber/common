import 'package:test/test.dart';
import 'package:gherkin/extensions.dart';

void main()
{
  final str = 'a bc def ghij klmno';
  final regexp = RegExp(r'\s');

  test('Split string using RegExp with limit 2 and specific char', () {
    var str2 = '@this @is #acomment  ';
    final regexp2 = RegExp(r'\s#');
    var result = str2.splitWithLimit(regexp2, limit: 2);
    expect(result[0], '@this @is');
  });

  test('Split string using RegExp with limit 0', () {
    var result = str.splitWithLimit(regexp, limit: 0);
    expect(result, ['a', 'bc', 'def', 'ghij', 'klmno']);
  });

  test('Split string using RegExp with limit 1', () {
    var result = str.splitWithLimit(regexp, limit:1);
    expect(result, ['a bc def ghij klmno']);
  });

  test('Split string using RegExp with limit 2', () {
    var result = str.splitWithLimit(regexp, limit:2);
    expect(result, ['a','bc def ghij klmno']);
  });

  test('Split string using RegExp with limit 3', () {
    var result = str.splitWithLimit(regexp, limit:3);
    expect(result, ['a','bc','def ghij klmno']);
  });

  test('Split string using RegExp with limit 4', () {
    var result = str.splitWithLimit(regexp, limit:4);
    expect(result, ['a','bc','def','ghij klmno']);
  });

  test('Split string using RegExp with limit 5', () {
    var result = str.splitWithLimit(regexp, limit:5);
    expect(result, ['a','bc','def','ghij','klmno']);
  });

  test('Split string using RegExp with limit 6', () {
    var result = str.splitWithLimit(regexp, limit:6);
    expect(result, ['a','bc','def','ghij','klmno']);
  } );

  test('Split string using RegExp with limit 3 but without the pattern', () {
    final regexp2 = RegExp('[@]');
    var result = str.splitWithLimit(regexp2, limit:3);
    expect(result, [str]);
  } );

  test('Split string using RegExp with limit negative', () {
    expect(() => str.splitWithLimit(regexp, limit:-1), throwsA(const TypeMatcher<UnimplementedError>()));
  } );

}
