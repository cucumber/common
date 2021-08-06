import 'dart:convert';
import 'dart:io';

import 'package:gherkin/helpers.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/tokens.dart';
import 'package:test/test.dart';

void main()
{
  test('Test successful token matching', () async
  {
    final languages = loadGherkinLanguagesFromJsonAsset();
    /**
     * TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
     * Qdo concluir, remover fontes:
     * java/src/test/java/io/cucumber/gherkin/GherkinTest.java
     * java/src/test/java/io/cucumber/gherkin/TokensGenerator.java
     * TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
     **/
    final assetDir = 'test/assets';
    final testDataDir = 'testdata/good';
    final path = Directory('$assetDir/$testDataDir');
    final files = path.listSync().where((file) => file.path.endsWith('.feature'));
//    final files = path.listSync().where((file) => file.path.endsWith('rule_with_tag.feature'));

    final dialectProvider = GherkinDialectProvider(languages);
    final tokenMatcher = TokenMatcher(dialectProvider);

    for( var file in files )
    {
      var fullPathToTestFeatureFile = file.path.replaceAll('\\', '/');

      var expectedTokensFile = '$fullPathToTestFeatureFile.tokens';

      print('Validating $expectedTokensFile ...');

      var tokensText = TokensGenerator.generateTokens(fullPathToTestFeatureFile, tokenMatcher);
      var tokens = await File(expectedTokensFile).readAsString(encoding: utf8);
      var expectedTokensText = LineEndingHelper.normalizeLineEndings(tokens);

      expect(tokensText, expectedTokensText);
    }
  } );
}
