using System;
using System.IO;
using System.Linq;

namespace Gherkin.TokensGenerator
{
    class Program
    {
        static int Main(string[] args)
        {
            if (args.Length < 1)
            {
                Console.WriteLine("Usage: Gherkin.TokensGenerator.exe test-feature-file.feature");
                return 100;
            }

            foreach (var featureFilePath in args)
            {
                try
                {
                    var tokensText = TokensGenerator.GenerateTokens(featureFilePath);
                    Console.WriteLine(tokensText);
                }
                catch (Exception ex)
                {
                    // Ideally we'd write to STDERR here, but 2> doesn't seem
                    // to work on mono for some reason :-/
                    Console.WriteLine(ex.Message);
                    return 1;
                }
            }
            return 0;
        }

        /*private static int TestTokens(string featureFilePath)
        {
            try
            {
                return TestTokensInternal(featureFilePath);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return 1;
            }
        }

        private static int TestTokensInternal(string featureFilePath)
        {
            var parser = new Parser<object>();
            var tokenFormatterBuilder = new TokenFormatterBuilder();
            using (var reader = new StreamReader(featureFilePath))
                parser.Parse(new TokenScanner(reader), new TokenMatcher(), tokenFormatterBuilder);

            var tokensText = tokenFormatterBuilder.GetTokensText();
            Console.WriteLine(tokensText);
            return 0;
        }*/
    }
}
