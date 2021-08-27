import 'dart:io';

import 'package:gherkin/ast.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/parser.dart';
import 'package:test/test.dart';

void main()
{
  final idGenerator = IdGenerator.incrementingGenerator;
  final languages = loadGherkinLanguagesFromJsonAsset();

  test('Test successful parsing', () async
  {
    var dialectProvider = GherkinDialectProvider(languages);

    var matcher = TokenMatcher(dialectProvider);

    final goodDir = Directory('test/assets/testdata/good');

    final filesEntities = goodDir.listSync().where((file) => file.path.endsWith('.feature'));

    var builder = GherkinDocumentBuilder(idGenerator);

    var parser = Parser<GherkinDocument>(builder);

    for( var fileEntity in filesEntities )
    {
      print('Validating ${fileEntity.path.replaceAll('\\', '/')} ...');

      var file = File(fileEntity.path);

      var tokenScanner = FileTokenScanner.fromFile(file);

      var parsingResult = parser.parse(tokenScanner, matcher);

      expect(parsingResult, isNotNull);
    }
  });
}
