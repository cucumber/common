using System;
using System.Collections.Generic;
using Gherkin.Events;
using Gherkin.Stream;
using Newtonsoft.Json;

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

            var jsonSerializerSettings = new JsonSerializerSettings ();
            jsonSerializerSettings.Formatting = Formatting.Indented;
            jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            jsonSerializerSettings.ContractResolver =  new FeatureAstJSonContractResolver();   

            SourceEvents sourceEvents = new SourceEvents (paths);
            GherkinEvents gherkinEvents = new GherkinEvents (printSource, printAst, printPickles);
            foreach (var sourceEventEvent in sourceEvents) {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent)) {
                    Console.WriteLine (JsonConvert.SerializeObject (evt, jsonSerializerSettings));
                    //Console.WriteLine (Utf8Json.JsonSerializer.ToJsonString((object)evt));
                }
            }
            return 0;
        }
    }
}
