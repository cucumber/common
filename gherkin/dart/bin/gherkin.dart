/* TODO
import 'package:gherkin/Gherkin.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/messages.dart';

void main(List<String> args) async
{
  final languages = loadGherkinLanguagesFromJsonAsset();

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

    MessageWriter messageWriter = makeMessageWriter();

    var messages = Gherkin.fromPaths(paths, includeSource
        , includeAst, includePickles, idGenerator);
    printMessages(messageWriter, messages);
  }

  void printMessages(MessageWriter messageWriter, Stream<Envelope> messages) {
    messages.forEach((envelope) {
      try {
        messageWriter.write(envelope);
      } catch (IOException e) {
        throw GherkinException("Couldn't print messages", e);
      }
    });
   }

  MessageWriter makeMessageWriter() {
    return MessageToNdjsonWriter(print);
  }
}
*/