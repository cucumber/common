import 'package:gherkin/ast.dart';
import 'package:gherkin/parser.dart';
import 'package:gherkin/language.dart';
import 'package:test/test.dart';

void main() {
  test('Change default language', () {
      var languages = loadGherkinLanguagesFromJsonAsset();
      var dialectProvider = GherkinDialectProvider(languages, 'no');
      var matcher = TokenMatcher(dialectProvider);
      var idGenerator = IdGenerator.incrementingGenerator;

      var builder = GherkinDocumentBuilder(idGenerator);

      var tokenScanner = StringTokenScanner('Egenskap: i18n support\n');

      var parser = Parser<GherkinDocument>(builder);

      var gherkinDocument = parser.parse(tokenScanner, matcher);

      expect('no', gherkinDocument.feature.language);
  });
}

