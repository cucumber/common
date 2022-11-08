import 'dart:collection';

import 'package:gherkin/exceptions.dart';
import 'package:gherkin/language.dart';

import 'ITokenMatcher.dart';
import 'ITokenScanner.dart';

/// Internal use only.
class ParserContext
{
  final ITokenScanner tokenScanner;
  final ITokenMatcher tokenMatcher;
  final Queue<Token> tokenQueue;
  final List<ParserException> errors;

  ParserContext(this.tokenScanner, this.tokenMatcher, this.tokenQueue, this.errors);
}
