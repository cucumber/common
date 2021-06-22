import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

class Tag implements IHasLocation, INullSafetyObject
{
  static const empty = _InvalidTag();

  final String id;

  final Location _location;

  const Tag(this._location, this.name, {this.id=Strings.empty} );

  @override
  Location get location => _location;

  final String name;

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

/// Convenience implementation of an invalid [Tag] instance.
class _InvalidTag extends Tag
{
  const _InvalidTag() : super(Location.empty, Strings.empty);

  @override
  bool get isEmpty => true;
}