using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Gherkin.CLI
{
    class Program
    {
        static int Main(string[] argv)
        {
            var jsonSerializerSettings = new JsonSerializerSettings ();
            jsonSerializerSettings.Formatting = Formatting.None;
            jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            jsonSerializerSettings.ContractResolver = new FeatureAstJSonContractResolver ();

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
            foreach (SourceEvent sourceEventEvent in sourceEvents) {
                foreach (IEvent evt in gherkinEvents.iterable(sourceEventEvent)) {
                    Console.WriteLine (JsonConvert.SerializeObject (evt, jsonSerializerSettings));
                }
            }
            return 0;
        }
    }
}
