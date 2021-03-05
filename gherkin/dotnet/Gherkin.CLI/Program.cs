using System;
using System.Collections.Generic;
using Gherkin.Events;
using Gherkin.Stream;
using Utf8Json;
using Utf8Json.Resolvers;
using System.Text.RegularExpressions;

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

            SourceEvents sourceEvents = new SourceEvents (paths);
            GherkinEvents gherkinEvents = new GherkinEvents (printSource, printAst, printPickles);
            foreach (var sourceEventEvent in sourceEvents) {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent)) {
                    var jsonString = Utf8Json.JsonSerializer.ToJsonString((object)evt, StandardResolver.ExcludeNullCamelCase);
                    // manual way of ignoring empty arrays... This is not that easy with Utf8Json...
                    jsonString = Regex.Replace(jsonString, @",?""\w+"":\s*\[\]", "");
                    Console.WriteLine(jsonString);
                }
            }
            return 0;
        }
    }
}
