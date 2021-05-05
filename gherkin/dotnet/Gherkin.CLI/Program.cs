using System;
using System.Collections.Generic;
using Utf8Json;
using Utf8Json.Resolvers;
using System.Text.RegularExpressions;
using Gherkin.CucumberMessages;
using Gherkin.Specs.EventStubs;

namespace Gherkin.CLI
{
    class Program
    {
        static int Main(string[] argv)
        {
            if (argv.Length == 0)
            {
                Console.WriteLine("Usage: Gherkin.CLI [--no-source] [--no-ast] [--no-pickles] feature-file.feature");
                return 100;
            }

            List<string> args = new List<string> (argv);
            List<string> paths = new List<string> ();

            bool printSource = true;
            bool printAst = true;
            bool printPickles = true;

            foreach (string arg in args) {
                switch (arg) {
                    case "--no-source":
                        printSource = false;
                        break;
                    case "--no-ast":
                        printAst = false;
                        break;
                    case "--no-pickles":
                        printPickles = false;
                        break;
                    default:
                        paths.Add (arg);
                        break;
                }
            }

            var resolver = CompositeResolver.Create(
                new IJsonFormatter[] {},
                new IJsonFormatterResolver[] { StandardResolver.ExcludeNullCamelCase }
            );

            var sourceProvider = new SourceProvider();
            var sources = sourceProvider.GetSources(paths);
            var gherkinEventsProvider = new GherkinEventsProvider(printSource, printAst, printPickles, new IncrementingIdGenerator());
            foreach (var sourceEventEvent in sources) {
                foreach (var evt in gherkinEventsProvider.GetEvents(sourceEventEvent)) {
                    var jsonString = Utf8Json.JsonSerializer.ToJsonString((object)evt, StandardResolver.ExcludeNullCamelCase);
                    Console.WriteLine(jsonString);
                }
            }
            return 0;
        }
    }
}
