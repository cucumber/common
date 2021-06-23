import 'dart:io';

import 'package:gherkin/Gherkin.dart';
import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/messages.dart';

void main(List<String> args) async
{
  var includeSource = true;
  var includeAst = true;
  var includePickles = true;
  var paths = <String>[];
  var idGenerator = IdGenerator.uuidGenerator;

  for( var arg in args ) {
    switch(arg) {
      case '--no-source':
        includeSource = false;
        break;
      case '--no-ast':
        includeAst = false;
        break;
      case '--no-pickles':
        includePickles = false;
        break;
      case '--predictable-ids':
        idGenerator = IdGenerator.incrementingGenerator;
        break;
      default:
        paths.add(arg);
    }

    var messageWriter = makeMessageWriter();

    var messages = Gherkin.fromPaths(paths, includeSource
        , includeAst, includePickles, idGenerator);
    printMessages(messageWriter, messages);
  }
}

IMessageWriter makeMessageWriter() {
  return MessageToNdjsonWriter(stdout);
}

void printMessages(IMessageWriter messageWriter, Stream<Envelope> messages) {
  messages.forEach((envelope) {
    try {
      messageWriter.write(envelope);
    }
    on IOException catch (e) {
      throw GherkinException("Couldn't print messages", e);
    }
  });
}

