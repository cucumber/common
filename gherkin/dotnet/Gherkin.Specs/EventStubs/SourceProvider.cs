using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Specs.EventStubs
{
    public class SourceProvider
    {
        private const string GherkinMediaType = "text/x.cucumber.gherkin+plain";

        public IEnumerable<Source> GetSources(IEnumerable<string> paths)
        {
            foreach (var path in paths)
            {
                string data = File.ReadAllText(path);
                yield return new Source
                {
                    Data = data,
                    Uri = path,
                    MediaType = GherkinMediaType
                };
            }
        }

    }
}
