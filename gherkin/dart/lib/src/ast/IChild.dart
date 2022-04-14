import 'package:gherkin/ast.dart';

abstract class IChild
{
  Background get background;

  Scenario get scenario;
}
