class GherkinException implements Exception
{
  final String message;
  final Exception cause;

  GherkinException(this.message, this.cause);

  @override
  String toString() {
    return '$message: $cause';
  }
}
