import 'package:test/test.dart';
import 'package:gherkin/extensions.dart';

void main()
{
  final str = 'a bc def ghij klmno';
  var pattern = ' ';

  test('Split with limit 0', () {
    var result = str.splitWithLimit(pattern, limit: 0);
    expect(result, ['a', 'bc', 'def', 'ghij', 'klmno']);
  });

  test('Split with limit 1', () {
    var result = str.splitWithLimit(pattern, limit:1);
    expect(result, ['a bc def ghij klmno']);
  });

  test('Split with limit 2', () {
    var result = str.splitWithLimit(pattern, limit:2);
    expect(result, ['a','bc def ghij klmno']);
  });

  test('Split with limit 3', () {
    var result = str.splitWithLimit(pattern, limit:3);
    expect(result, ['a','bc','def ghij klmno']);
  });

  test('Split with limit 4', () {
    var result = str.splitWithLimit(pattern, limit:4);
    expect(result, ['a','bc','def','ghij klmno']);
  });

  test('Split with limit 5', () {
    var result = str.splitWithLimit(pattern, limit:5);
    expect(result, ['a','bc','def','ghij','klmno']);
  });

  test('Split with limit 6', () {
    var result = str.splitWithLimit(pattern, limit:6);
    expect(result, ['a','bc','def','ghij','klmno']);
  } );

  test('Split with limit 3 but without the pattern', () {
    pattern = '@';
    var result = str.splitWithLimit(pattern, limit:3);
    expect(result, [str]);
  } );

  test('Split with limit negative', () {
    expect(() => str.splitWithLimit(pattern, limit:-1), throwsA(const TypeMatcher<UnimplementedError>()));
  } );

}
