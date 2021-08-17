import 'package:gherkin/core.dart';

class object extends Object implements INullSafetyObject {
  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}