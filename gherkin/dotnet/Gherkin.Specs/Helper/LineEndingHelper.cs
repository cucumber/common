﻿namespace Gherkin.Specs.Helper
{
    public static class LineEndingHelper
    {
        public static string NormalizeLineEndings(string text)
        {
            return text.Replace("\r\n", "\n").TrimEnd('\n');
        }

        public static string StripLineEndings(string text)
        {
            return text.Replace("\r", "").Replace("\n", "").Trim();
        }
    }
}
