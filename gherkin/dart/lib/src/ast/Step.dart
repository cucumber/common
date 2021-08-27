import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';
import 'package:gherkin/ast.dart';

class Step implements IHasLocation, INullSafetyObject
{
  static const empty = _InvalidStep();

  final String id;

  final Location _location;

  final String keyword;

  final String text;

  final StepArgument argument;

  const Step(this._location, this.keyword, this.text, this.argument,
      {this.id=Strings.empty} );

  @override
  Location get location => _location;

  DataTable get dataTable {
    if( argument is DataTable ) {
      return argument as DataTable;
    }
    return DataTable.empty;
  }

  DocString get docString {
    if( argument is DocString ) {
      return argument as DocString;
    }
    return DocString.empty;
  }

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}


/// Convenience implementation of an invalid [Step] instance.
class _InvalidStep extends Step
{
  const _InvalidStep()
    : super(Location.empty, Strings.empty, Strings.empty, StepArgument.empty );

  @override
  bool get isEmpty => true;
}
