import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasDescription.dart';
import 'IHasLocation.dart';
import 'IHasSteps.dart';
import 'Step.dart';

abstract class StepsContainer implements IHasLocation, IHasDescription
, IHasSteps, INullSafetyObject
{
  static const empty = _EmptyStepsContainer();

  final Location _location;
  final String _keyword;
  final String _name;
  final String _description;
  final Iterable<Step> _steps;

  const StepsContainer(this._location, this._keyword, this._name, this._description, this._steps);

  @override
  Location get location => _location;

  @override
  String get keyword => _keyword;

  @override
  String get name => _name;

  @override
  String get description => _description;

  @override
  Iterable<Step> get steps => _steps;

  @override
  bool get isEmpty => false;/*_location.isEmpty
    && _keyword.isEmpty
    && _name.isEmpty
    && _description.isEmpty
    && _steps.isEmpty;*/

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [StepsContainer] instance.
class _EmptyStepsContainer
    extends StepsContainer
{
  const _EmptyStepsContainer()
      : super(Location.empty, Strings.empty, Strings.empty, Strings.empty
        , const <Step>[]);

  @override
  bool get isEmpty => true;
}
