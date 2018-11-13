using System;
using System.Collections.Generic;
using Gherkin.Events;
using Gherkin.Stream;

namespace Gherkin.CLI
{
    class Program
    {
        static int Main(string[] argv)
        {
         

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

            SourceEvents sourceEvents = new SourceEvents (paths);
            GherkinEvents gherkinEvents = new GherkinEvents (printSource, printAst, printPickles);
            foreach (var sourceEventEvent in sourceEvents) {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent)) {
                    Console.WriteLine (Utf8Json.JsonSerializer.Serialize(evt));
                }
            }
            return 0;
        }
    }
}
