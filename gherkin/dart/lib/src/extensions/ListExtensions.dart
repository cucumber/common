extension ListExtension on List
{
  T singleOrDefault<T>(T defaultResult) =>
      isNotEmpty ? first : defaultResult;
}