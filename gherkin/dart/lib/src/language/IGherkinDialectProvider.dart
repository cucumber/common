import 'IGherkinDialect.dart';
import 'Location.dart';

abstract class IGherkinDialectProvider
{
  IGherkinDialect get defaultDialect;

  IGherkinDialect getDialect(String language, Location location);

  List<String> get languages;

}