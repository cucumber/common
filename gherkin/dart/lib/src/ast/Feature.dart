import 'package:gherkin/ast.dart';
import 'package:gherkin/core.dart';
import 'package:gherkin/extensions.dart';
import 'package:gherkin/language.dart';

import 'IHasChildren.dart';
import 'IHasDescription.dart';
import 'IHasLocation.dart';
import 'IHasTags.dart';
import 'Tag.dart';

class Feature
    implements IHasLocation, IHasDescription, IHasTags
    , IHasChildren<FeatureChild>
    , INullSafetyObject
{
  static const empty = _InvalidFeature();

  const Feature(this._tags, this._location, this.language, this._keyword,
      this._name, this._description, this._children);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;

  final Iterable<Tag> _tags;
  final Location _location;
  final String language;
  final String _keyword;
  final String _name;
  final String _description;
  final Iterable<FeatureChild> _children;

  @override
  Iterable<Tag> get tags => _tags;

  @override
  Location get location => _location;

  @override
  String get keyword => _keyword;

  @override
  String get name => _name;

  @override
  String get description => _description;

  @override
  Iterable<FeatureChild> get children => _children;
}

/// Convenience implementation of an invalid [Feature] instance.
class _InvalidFeature
    extends Feature
{
  const _InvalidFeature()
      : super(
        const <Tag>[]
      , Location.empty
      , Strings.empty
      , Strings.empty
      , Strings.empty
      , Strings.empty
      , const <FeatureChild>[]
  );

  @override
  bool get isEmpty => true;
}
