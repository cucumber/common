/* TODO
import 'dart:io';

import 'package:dart/language.dart';
import 'dart:convert' show utf8;

void _main(List<String> args) async
{
  var printSource = true;
  var printAst = true;
  var printPickles = true;
  var paths = <String>[];

  for( var arg in args ) {
    switch(arg) {
      case '--no-source':
        printSource = false;
        break;
      case '--no-ast':
        printAst = false;
        break;
      case '--no-pickles':
        printPickles = false;
        break;
      default:
        paths.add(arg);
    }

    //SourceEvents sourceEvents = SourceEvents(paths);
    var dialectProvider = await GherkinDialectProvider.initialize();
    var gherkinEvents = GherkinEvents(dialectProvider, printSource, printAst, printPickles);
  }
}*/
