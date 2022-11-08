import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';
import 'package:test/test.dart';

void main()
{
  final _languages = loadGherkinLanguagesFromJsonAsset();

  test('Provides emoji dialect', () {
    var em = GherkinDialectProvider(_languages).getDialect('em');
    var scenarioKeywords = em.scenarioKeywords[0];
    var length = scenarioKeywords.runes.length;
    expect(length, 1);
  });

  test('Provides language list', () {
    var languages = GherkinDialectProvider(_languages).languages;
    expect(languages.contains('en'), isTrue);
  });

  test('Provides native name which is used in cucumber jvm code generation',(){
    var no = GherkinDialectProvider(_languages).getDialect('no');
    expect(no.nativeName, 'norsk');
  });

  test('Should throw NoSuchLanguageException for invalid language', () {
    var provider = GherkinDialectProvider(_languages);
    expect(() => provider.getDialect('nosuchlang', Location(1,2)), throwsA(TypeMatcher<NoSuchLanguageException>()));
  });

  test('Should throw NoSuchLanguageException for invalid default language', () {
    var provider = GherkinDialectProvider(_languages, 'nosuchlang');
    expect(() => provider.defaultDialect, throwsA(TypeMatcher<NoSuchLanguageException>()));
  });

  test('Should throw NoSuchLanguageException for invalid language without location', () {
    var provider = GherkinDialectProvider(_languages);
    expect(() => provider.getDialect('nosuchlang'), throwsA(TypeMatcher<NoSuchLanguageException>()));
  });
}
