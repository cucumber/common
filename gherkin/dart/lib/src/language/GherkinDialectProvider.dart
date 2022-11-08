import 'dart:convert';
import 'dart:io';

import 'package:gherkin/exceptions.dart';
import 'package:path/path.dart';
import 'package:gherkin/language.dart';

import 'GherkinLanguageKeywords.dart';
import 'IGherkinDialect.dart';
import 'IGherkinDialectProvider.dart';

class GherkinDialectProvider implements IGherkinDialectProvider
{
  final String _defaultDialectName;
  final Map<String, GherkinLanguageKeywords> _dialects;
  
  GherkinDialectProvider(this._dialects, [this._defaultDialectName = 'en']);

  @override
  IGherkinDialect get defaultDialect => getDialect(_defaultDialectName, Location.empty);

  @override
  IGherkinDialect getDialect(String language, [Location location=Location.empty]) {
    if( ! _dialects.containsKey(language) ) {
      throw NoSuchLanguageException(language, location);
    }
    var languageSettings = _dialects[language] ?? GherkinLanguageKeywords.empty;
    return GherkinDialect(language, languageSettings);
  }

  @override
  List<String> get languages => _dialects.keys.toList();
}

Map<String, GherkinLanguageKeywords> loadGherkinLanguagesFromJsonAsset() {
  final dialectsAsset = 'gherkin-languages.json';
  final assetPath = 'assets/$dialectsAsset';
  var path = join(Directory.current.path, assetPath);
  var file = File(path);
  if( ! file.existsSync() ) {
    throw Exception('Gherkin language resource not found: $dialectsAsset');
  }
  var languagesJson = file.readAsStringSync();
  return _parseLanguages(languagesJson);
}

Map<String, GherkinLanguageKeywords> _parseLanguages(String languagesString) {
  var map = json.decode(languagesString);
  var languages = <String, GherkinLanguageKeywords>{};
  for( var entry in map.entries) {
    languages[entry.key] = GherkinLanguageKeywords.fromJson(entry.value);
  }
  return languages;
}
