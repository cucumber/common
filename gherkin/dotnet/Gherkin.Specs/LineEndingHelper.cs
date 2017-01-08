namespace Gherkin.CLI
{
    public static class LineEndingHelper
    {
        public static string NormalizeLineEndings(string text)
        {
            return text.Replace("\r\n", "\n").TrimEnd('\n');
        }

        public static string NormalizeJSonLineEndings(string text)
        {
            return text.Replace("\\r\\n", "\\n");
        }
    }
}
