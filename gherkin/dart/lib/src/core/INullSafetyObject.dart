abstract class INullSafetyObject<T> extends Object
{
  /// Returns if this instance is invalid or not.
  bool get isEmpty;

  /// Returns if this instance is valid or not.
  bool get isNotEmpty => !isEmpty;
}
