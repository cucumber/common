import 'dart:io';

import 'package:gherkin/ast.dart';
import 'package:gherkin/exceptions.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart' as lang;
import 'package:gherkin/messages.dart';
import 'package:gherkin/parser.dart';
import 'package:gherkin/pickles.dart';
import 'package:gherkin/src/language/GherkinLanguageKeywords.dart';

class Gherkin
{
  final List<String> paths;
  final List<Envelope> envelopes;
  final bool includeSource;
  final bool includeAst;
  final bool includePickles;
  final lang.IdGenerator idGenerator;

  late Map<String, GherkinLanguageKeywords> _languages;
  late lang.IGherkinDialectProvider _dialectProvider;
  late ITokenMatcher _tokenMatcher;

  Gherkin(this.paths, this.envelopes, this.includeSource, this.includeAst
      , this.includePickles, this.idGenerator)
  {
    _languages = lang.loadGherkinLanguagesFromJsonAsset();
    _dialectProvider = lang.GherkinDialectProvider(_languages);
    _tokenMatcher = lang.TokenMatcher(_dialectProvider);
  }

  static Stream<Envelope> fromPaths(List<String> paths, bool includeSource
      , bool includeAst, bool includePickles, lang.IdGenerator idGenerator)
  {
    return Gherkin(paths, <Envelope>[], includeSource, includeAst
        , includePickles, idGenerator).messages();
  }

  static Stream<Envelope> fromSources(List<Envelope> envelopes, bool includeSource
      , bool includeAst, bool includePickles, lang.IdGenerator idGenerator)
  {
    return Gherkin(<String>[], envelopes, includeSource, includeAst
        , includePickles, idGenerator).messages();
  }

  static Envelope makeSourceEnvelope(String data, String uri) {
    final source = Source(uri, data, MediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN);
    var envelope = Envelope();
    envelope.source = source;
    return envelope;
  }

  Stream<Envelope> messages() {
    var envelopeStream = envelopes.isNotEmpty
        ? Stream.fromIterable(envelopes)
        : _envelopeStreamFromPaths(paths);
    return envelopeStream
        .expand((envelope)
          => _parserMessageStream(envelope, includeSource, includeAst
              , includePickles));
  }

  Stream<Envelope> _envelopeStreamFromPaths(List<String> paths) {
    return Stream.fromIterable(paths).map(_envelopeFromPath);
  }

  Envelope _envelopeFromPath(String path) {
    try {
      var data = File(path).readAsStringSync();
      return makeSourceEnvelope(data, path);
    }
    on IOException catch (e) {
      throw GherkinException(e.toString(), e);
    }
  }

  Iterable<Envelope> _parserMessageStream(Envelope envelope, bool includeSource
      , bool includeGherkinDocument, bool includePickles)
  {
    var messages = <Envelope>[];

    if (includeSource) {
      messages.add(envelope);
    }

    if (envelope.source.isNotEmpty) {
      final builder = GherkinDocumentBuilder(idGenerator);
      final parser = Parser<GherkinDocument>(builder);
      var source = envelope.source;
      var uri = source.uri;
      var data = source.data;

      final tokenScanner = lang.StringTokenScanner(data);

      try {
        GherkinDocument gherkinDocument = GherkinDocument.empty;

        if (includeGherkinDocument) {
          gherkinDocument = parser.parse(tokenScanner, _tokenMatcher);
          gherkinDocument.uri = uri;
          var gherkinDocumentEnvelope = Envelope();
          gherkinDocumentEnvelope.gherkinDocument = gherkinDocument;
          messages.add(gherkinDocumentEnvelope);
        }
        if (includePickles) {
          if (gherkinDocument.isEmpty) {
            gherkinDocument = parser.parse(tokenScanner, _tokenMatcher);
            gherkinDocument.uri = uri;
          }
          var pickleCompiler = PickleCompiler(idGenerator);
          var pickles = pickleCompiler.compile(gherkinDocument, uri);
          for (var pickle in pickles) {
            var pickleEnvelope = Envelope();
            pickleEnvelope.pickle = pickle;
            messages.add(pickleEnvelope);
          }
        }
      }
      on CompositeParserException catch (e) {
        for (var error in e.errors) {
          _addParseError(messages, error, uri);
        }
      }
      on ParserException catch (e) {
        _addParseError(messages, e, uri);
      }
    }
    return messages;
  }

  void _addParseError(List<Envelope> messages, ParserException e, String uri) {
    // We want 0 values not to be serialised, which is why we set them to null
    // This is a legacy requirement brought over from old protobuf behaviour
    final line = e.location.line == 0 ? Int.min : e.location.line;
    final column = e.location.column == 0 ? Int.min : e.location.column;
    final location = Location(line: line, column: column);

    final sourceReference = SourceReference(
        uri,
        // TODO null, null,
        location
    );
    var parseError = ParseError(sourceReference, e.message);
    var envelope = Envelope();
    envelope.parseError = parseError;
    messages.add(envelope);
  }
}