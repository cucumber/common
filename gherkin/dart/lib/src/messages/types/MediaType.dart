enum MediaType
{
  TEXT_X_CUCUMBER_GHERKIN_PLAIN,
  TEXT_X_CUCUMBER_GHERKIN_MARKDOWN
}

extension MediaTypeExtension on MediaType
{
  String get name {
    switch(this) {
      case MediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN:
        return 'text/x.cucumber.gherkin+plain';
      case MediaType.TEXT_X_CUCUMBER_GHERKIN_MARKDOWN:
        return 'text/x.cucumber.gherkin+markdown';
      default:
        throw ArgumentError('Invalid MediaType');
    }
  }
}