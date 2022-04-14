using System;
using System.IO;

namespace Gherkin.Specs.Tokens
{
    public class TokensGenerator
    {
        public static string GenerateTokens(string featureFilePath)
        {
            var tokenFormatterBuilder = new TokenFormatterBuilder();
            var parser = new Parser<object>(tokenFormatterBuilder);
            
            using (var stream = new FileStream(featureFilePath, FileMode.Open))
            {
                using (var reader = new StreamReader(stream))
                {
                    parser.Parse(new TokenScanner(reader), new TokenMatcher());
                }
            }

            var tokensText = tokenFormatterBuilder.GetTokensText();

            return NormalizeLineEndings(tokensText);
        }

        public static string NormalizeLineEndings(string text)
        {
            return text.Replace("\r\n", "\n").TrimEnd('\n');
        }
    }
}
