import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasChildren.dart';
import 'IHasDescription.dart';
import 'IHasLocation.dart';

class Rule implements IHasLocation, IHasDescription
  , IHasChildren<RuleChild>
  , INullSafetyObject
{
  static const empty = _InvalidRule();

  final Location _location;
  final String _keyword;
  final String _name;
  final String _description;
  final Iterable<RuleChild> _children;

  @override
  Location get location => _location;

  @override
  String get keyword => _keyword;

  @override
  String get name => _name;

  @override
  String get description => _description;

  @override
  Iterable<RuleChild> get children => _children;

  const Rule(this._location, this._keyword, this._name, this._description
      , this._children);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Rule] instance.
class _InvalidRule extends Rule
{
  const _InvalidRule() : super(Location.empty, Strings.empty, Strings.empty
      , Strings.empty, const <RuleChild>[] );

  @override
  bool get isEmpty => true;
}