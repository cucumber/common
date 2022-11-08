using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.CucumberMessages;
using Gherkin.Specs.EventStubs;
using Gherkin.Specs.Tokens;
using Utf8Json.Resolvers;

namespace Gherkin.Specs.CLI
{
    class Program
    {
        static int Main(string[] argv)
        {
            if (argv.Length == 0)
            {
                ShowUsage();
                return 100;
            }

            switch (argv[0].ToLowerInvariant())
            {
                case "tokens":
                    return PrintTokens(argv.Skip(1));
                case "events":
                    var printEventArgs = GetPrintEventsArgs(argv.Skip(1));
                    return PrintEvents(printEventArgs);
                default:
                    ShowUsage();
                    return 110;
            }
        }

        private static void ShowUsage()
        {
            Console.WriteLine(@"Usage: 
    dotnet Gherkin.Specs events [--no-source] [--no-ast] [--no-pickles] feature-file.feature
    - or -
    dotnet Gherkin.Specs tokens feature-file.feature
");
        }

        class PrintEventsArgs
        {
            public bool PrintSource { get; set; } = true;
            public bool PrintAst { get; set; } = true;
            public bool PrintPickles { get; set; } = true;
            public List<string> Paths { get; } = new();
        }

        private static PrintEventsArgs GetPrintEventsArgs(IEnumerable<string> args)
        {
            var result = new PrintEventsArgs();

            foreach (string arg in args)
            {
                switch (arg)
                {
                    case "--no-source":
                        result.PrintSource = false;
                        break;
                    case "--no-ast":
                        result.PrintAst = false;
                        break;
                    case "--no-pickles":
                        result.PrintPickles = false;
                        break;
                    default:
                        result.Paths.Add(arg);
                        break;
                }
            }

            return result;
        }

        private static int PrintTokens(IEnumerable<string> paths)
        {
            foreach (var featureFilePath in paths)
            {
                try
                {
                    var tokensText = TokensGenerator.GenerateTokens(featureFilePath);
                    Console.WriteLine(tokensText);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(ex.Message);
                    return 1;
                }
            }

            return 0;
        }

        private static int PrintEvents(PrintEventsArgs args)
        {
            var sourceProvider = new SourceProvider();
            var sources = sourceProvider.GetSources(args.Paths);
            var gherkinEventsProvider = new GherkinEventsProvider(args.PrintSource, args.PrintAst, args.PrintPickles, new IncrementingIdGenerator());
            foreach (var sourceEventEvent in sources)
            {
                foreach (var evt in gherkinEventsProvider.GetEvents(sourceEventEvent))
                {
                    var jsonString = Utf8Json.JsonSerializer.ToJsonString((object)evt, StandardResolver.ExcludeNullCamelCase);
                    Console.WriteLine(jsonString);
                }
            }
            return 0;
        }
    }
}
