import 'Tag.dart';

abstract class IHasTags
{
  Iterable<Tag> get tags;
}